#!/usr/bin/env node
/**
 * Hero image generator — Nano Banana (Google) or gpt-image-1 (OpenAI).
 *
 * Dependency-free: Node 24's built-in fetch, nothing to install.
 *
 *   GEMINI_API_KEY=... node tools/genhero.js            # Nano Banana Pro, 16:9, 4K
 *   GEMINI_API_KEY=... node tools/genhero.js logistics  # one slide only
 *   OPENAI_API_KEY=... node tools/genhero.js --openai   # fallback, 3:2 (see note)
 *
 * Writes straight into src/assets/img/hero/<key>.jpg, which is where
 * src/content/expertise.js already points.
 *
 * Prompts follow Harbour §14 and the S1 brief in
 * Brand Guidelines/Image Placement Sheet.md:
 *   - quiet left third (the headline and the 94%-opacity end of the scrim)
 *   - subject right of centre, where the scrim lightens to 22%
 *   - subject in the middle horizontal band: the hero crops to ~3.4:1 on a
 *     wide viewport, so the top and bottom sixth of the frame get cut
 *   - no text, no CGI, no data overlays, no orange, no duotone
 */
'use strict';

const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'src', 'assets', 'img', 'hero');

/* The three shared constraints, written once. Repeating them verbatim in each
   prompt is what keeps the three slides looking like one commissioned set. */
const FRAMING = `Ultra-photorealistic editorial photograph, shot on a full-frame camera with a 35mm lens, natural daylight, natural film grain, no filters, no colour wash, no duotone. 16:9 landscape. COMPOSITION IS CRITICAL: the left third of the frame must be visually quiet and uncluttered — open sky, open water or plain surface — because headline text is overlaid there. The main subject sits right of centre. Keep everything important inside the middle horizontal band; the top sixth and bottom sixth of the frame will be cropped away. Absolutely no text, lettering, watermarks, signage, logos, numbers, data overlays, graphs or UI of any kind anywhere in the image. No CGI, no 3D render, no illustration — this must look like a real photograph of a real working place.`;

const PROMPTS = {
  maritime: `A real product tanker berthed alongside at a working commercial port at golden hour, seen from the quay at eye level. Mooring lines run to bollards, the accommodation block and bridge wing are visible right of centre, hull weathered and genuinely in service. Calm harbour water. Warm low sun raking across the hull. Deep navy and steel tones with warm highlights. NOT a container ship, NOT a bow-on sunset silhouette. ${FRAMING}`,

  logistics: `A real inland freight and container yard at early morning, elevated three-quarter view. Stacked shipping containers in muted industrial colours recede toward a rail-mounted gantry crane right of centre; a container is under lift. Open pale overcast sky fills the left third. Wet tarmac holding soft reflections. Cool blue-grey palette, restrained and documentary, the feel of a working logistics hub rather than an advertisement. ${FRAMING}`,

  legal: `The interior of a quiet modern maritime law office at dusk, wide view. Floor-to-ceiling windows on the right look out over a working port — cranes and a berthed vessel visible in soft focus beyond the glass. Right of centre, a dark timber meeting table with closed document folders and a single desk lamp casting warm light. The left third is plain shadowed wall and empty floor. Deep navy and charcoal interior with one warm pool of lamplight. Empty of people. Serious and restrained, not corporate stock. ${FRAMING}`,
};

/* ------------------------------------------------------------ Nano Banana */

/**
 * Nano Banana Pro. `gemini-2.5-flash-image` is the cheaper, faster sibling and
 * takes the same request shape — swap the id if the Pro tier is not enabled on
 * the key. aspectRatio + imageSize live under generationConfig.imageConfig.
 */
async function gemini(key, prompt) {
  const model = process.env.GEMINI_IMAGE_MODEL || 'gemini-3-pro-image-preview';
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: 'POST',
      headers: { 'x-goog-api-key': key, 'content-type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseModalities: ['IMAGE'],
          imageConfig: { aspectRatio: '16:9', imageSize: '4K' },
        },
      }),
    }
  );

  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`);

  const json = await res.json();
  const parts = json.candidates?.[0]?.content?.parts || [];
  const img = parts.find((p) => p.inlineData || p.inline_data);
  if (!img) throw new Error(`No image in response: ${JSON.stringify(json).slice(0, 400)}`);
  return Buffer.from((img.inlineData || img.inline_data).data, 'base64');
}

/* ---------------------------------------------------------------- OpenAI */

/**
 * gpt-image-1 has no 16:9 size — 1536x1024 is 3:2, the widest it offers. The
 * hero crops to roughly 3.4:1 anyway, so 3:2 survives the crop, but it is a
 * genuine downgrade from Nano Banana's native 16:9 4K. Use it as a fallback.
 */
async function openai(key, prompt) {
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      model: 'gpt-image-1',
      prompt,
      size: '1536x1024',
      quality: 'high',
      n: 1,
    }),
  });

  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${await res.text()}`);

  const json = await res.json();
  const b64 = json.data?.[0]?.b64_json;
  if (!b64) throw new Error(`No image in response: ${JSON.stringify(json).slice(0, 400)}`);
  return Buffer.from(b64, 'base64');
}

/* ------------------------------------------------------------------ main */

async function main() {
  const args = process.argv.slice(2);
  const useOpenai = args.includes('--openai');
  const keys = args.filter((a) => !a.startsWith('--'));
  const slides = keys.length ? keys : Object.keys(PROMPTS);

  for (const k of slides) {
    if (!PROMPTS[k]) {
      console.error(`Unknown slide "${k}" — expected one of: ${Object.keys(PROMPTS).join(', ')}`);
      process.exit(1);
    }
  }

  const key = useOpenai ? process.env.OPENAI_API_KEY : process.env.GEMINI_API_KEY;
  if (!key) {
    console.error(
      useOpenai ? 'OPENAI_API_KEY is not set.' : 'GEMINI_API_KEY is not set.'
    );
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const slide of slides) {
    process.stdout.write(`${slide} … `);
    try {
      const buf = useOpenai
        ? await openai(key, PROMPTS[slide])
        : await gemini(key, PROMPTS[slide]);
      const out = path.join(OUT_DIR, `${slide}.jpg`);
      fs.writeFileSync(out, buf);
      console.log(`${(buf.length / 1024 / 1024).toFixed(1)} MB → ${path.relative(process.cwd(), out)}`);
    } catch (e) {
      console.log('failed');
      console.error(`  ${e.message}`);
      process.exitCode = 1;
    }
  }
}

main();

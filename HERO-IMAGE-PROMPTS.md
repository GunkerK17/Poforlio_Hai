# Hero image generation

Tool: built-in ImageGen (not CLI). Original photos are preserved.

Assets:
- public/images/hero-player-cutout.png — transparent foreground, AI-assisted extraction from hero-football.jpg.
- public/images/hero-stadium-night.png — generated empty stadium background.

## Cutout prompt
Use case: background-extraction. Edit target: attached original football photograph. Produce a genuinely transparent PNG cutout of ONLY the central young man in blue/light-blue football kit and the football by his feet. Preserve his exact face, hair, body proportions, original pose, kit number 18, clothing, hands, white socks and both shoes. Full body with nothing cropped. Remove all background, all other people, pitch, signs, logos outside his clothing, and the airborne ball. Portrait canvas closely framing the full subject with a small transparent margin. Natural photographic detail; no illustration, no new facial features, no text, no fake checkerboard. This will be a foreground layer in a cinematic portfolio website. Actual alpha transparency required.

## Background prompt
Create a photorealistic cinematic empty football training pitch at blue hour for a personal portfolio hero background. Wide 16:9 landscape composition. Dark teal charcoal shadows, subtle warm amber stadium floodlight on far right, distant low stands and wire fence, moody cloudy evening sky, realistic artificial grass occupying bottom 18 percent, ground-level eye-height camera. Center and left mostly dark quiet negative space so white website text and a separately composited full-body footballer can be placed over it. No people, no balls, no logos, no words, no interface, no text, no watermarks. Restrained realistic photography, not fantasy, not excessive fog.

## Current foreground update
The active hero now uses `public/images/hero-player-original.png`, extracted directly from `hero-football.jpg` with a hand-traced alpha mask. The source RGB pixels are preserved, not regenerated. The extraction script is `tmp/hero/extract_original.py`. The earlier ImageGen foreground is retained on disk but no longer referenced by the hero. The generated stadium remains the background.

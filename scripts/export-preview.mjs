/**
 * Export the static Astro page as a standalone review artifact.
 * This page deliberately contains only HTML and CSS: no frontmatter,
 * interpolation, components, client scripts, or external assets.
 * Astro's sole directive is removed for a regular browser. This is not
 * a substitute for running the production Astro build before deployment.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const source = await readFile(new URL('src/pages/index.astro', root), 'utf8');
if (source.trimStart().startsWith('---') || /<script\b|<Fragment\b|<[A-Z][A-Za-z]*\b|\bclient:|\bset:html/.test(source)) {
  throw new Error('The page is no longer plain HTML/CSS. Use astro build to generate the review artifact.');
}
const html = source.replace('<style is:global>', '<style>');
const destination = new URL('preview/', root);
await mkdir(destination, { recursive: true });
await writeFile(new URL('index.html', destination), html);
console.log(`Standalone preview written to ${fileURLToPath(new URL('index.html', destination))}`);

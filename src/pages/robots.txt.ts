// robots.txt, pointing crawlers at the sitemap on the site's own address (astro.config.mjs).
import type { APIContext } from 'astro';

export const GET = ({ site }: APIContext) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site)}\n`);

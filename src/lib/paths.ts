/**
 * The public URL path for a page. Builds see file paths (`/index.html`,
 * `/blog/x.html`, see `build.format` in astro.config.mjs); dev sees clean URLs.
 * Both become `/` and `/blog/x`.
 */
export const cleanPath = (pathname: string) => pathname.replace(/(\/index)?\.html$|\/$/, '') || '/';

/** A URL fragment for a heading: "Example Corp" -> "example-corp". */
export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

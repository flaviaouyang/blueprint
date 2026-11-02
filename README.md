<div align="center">

# Blueprint

**A personal site that looks like an engineering drawing.**<br>
Fill in one file about yourself, deploy, done.

[**Live demo**](https://flaviaouyang.github.io/blueprint) ·
[**Use this template**](https://github.com/new?template_name=blueprint&template_owner=flaviaouyang) ·
[**Docs**](doc/content.md)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fflaviaouyang%2Fblueprint&project-name=my-site&repository-name=my-site)

<br>

<img src=".github/screenshots/home.png" alt="Ada Example's home page on bone paper: a framed sheet with a grid panel behind the name, a GitHub card, the latest post, and a drawing title block as the footer">

<table>
  <tr>
    <td width="50%"><img src=".github/screenshots/post.png" alt="A blog post on the blueprint (dark) paper, with a table of contents in the margin, numbered sections, and highlighted code"></td>
    <td width="50%"><img src=".github/screenshots/about.png" alt="The About page on white paper, with experience and education tabs, a contents list of companies, and role titles with their dates"></td>
  </tr>
  <tr>
    <td align="center"><sub>A post, on blueprint (the dark theme)</sub></td>
    <td align="center"><sub>About, on white</sub></td>
  </tr>
</table>

</div>

## What you get

<table>
  <tr>
    <td width="33%" valign="top"><b>Five pages</b><br>Home, About (experience and education), Projects, a blog, and a Now page.</td>
    <td width="33%" valign="top"><b>Plain files</b><br>Everything you write lives in <code>content/</code>: one YAML file about you, Markdown for posts. Typos are caught at build time.</td>
    <td width="33%" valign="top"><b>Three papers</b><br>Bone, white, and blueprint (dark). Visitors in dark mode get blueprint automatically.</td>
  </tr>
  <tr>
    <td valign="top"><b>Drafting details</b><br>A framed sheet, grid panels that read out coordinates on hover, and a title block as the footer.</td>
    <td valign="top"><b>Built for writing</b><br>Numbered sections, a table of contents in the margin, highlighted code, numbered figures, Bluesky comments.</td>
    <td valign="top"><b>Fast and accessible</b><br>Static HTML, about 1 KB of JavaScript, 65 KB of fonts, WCAG AA contrast, RSS, sitemap, and social previews.</td>
  </tr>
</table>

Built with [Astro](https://astro.build), plain CSS from a small set of design tokens, and the [Geist](https://vercel.com/font) fonts. Deploys to [Vercel](https://vercel.com) or GitHub Pages.

## Quickstart

1. **Get a copy.** Click **Deploy with Vercel** above to copy the repository and put it online in one go, or **Use this template** to just copy it.
2. **Run it locally** (needs [bun](https://bun.sh) and Node 22.23+):

   ```bash
   bun install
   bun run dev    # http://localhost:4321
   ```

3. **Make it yours.** Edit `content/profile.yaml`, set your address in `astro.config.mjs` (`site:`), and replace the example post, project, and Now page in `content/`. Push, and your site redeploys.

The dev server updates as you save, and if a field is wrong it tells you which file and which field.

## Writing

| File | What it holds |
| --- | --- |
| `content/profile.yaml` | You: name, tagline, links, Home's paragraphs, each page's opening line, experience, education |
| `content/posts/*.mdx` | Blog posts. Start one with `make blog SLUG=my-post TITLE="My post"` |
| `content/projects/*.mdx` | Projects. Give one a body and it gets its own page |
| `content/now.mdx` | What you're doing now |

- **Drafts:** `draft: true` keeps a post or project off the live site; it still shows in `bun run dev`.
- **Hiding:** `hidden: true` takes a job or school off the site without deleting it.
- **Placeholders:** write `TODO(content)` anywhere you mean to come back to; production deploys refuse to go out until it's gone.

Every field, with examples, is in **[doc/content.md](doc/content.md)**.

<details>
<summary><b>Deploy to GitHub Pages instead</b></summary>

<br>

The included workflow (`.github/workflows/pages.yml`) publishes the site to `https://<you>.github.io/<repository>` on every push to `main`.

1. In your repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
2. Push, or run **Deploy to GitHub Pages** from the **Actions** tab.

The workflow sets the address and sub-path for you, and does nothing in repositories where Pages is off. Links you write by hand inside posts should be relative (`../about`) or full URLs, since the site lives under `/<repository>/`.

</details>

<details>
<summary><b>Make it look like you</b></summary>

<br>

- **Favicon:** replace `public/favicon.ico`, `icon-32.png`, `icon-192.png`, and `apple-touch-icon.png`.
- **Social preview:** replace `public/og.png` (1200 × 630).
- **Avatar:** set `avatar:` in `profile.yaml` to an image in `public/images/`.
- **Colours, type, spacing:** all in `src/styles/tokens.css`, including each paper's palette.

</details>

<details>
<summary><b>Commands</b></summary>

<br>

```bash
bun run dev      # local site at http://localhost:4321
bun run build    # static site in dist/
bun run preview  # serve dist/ locally
make blog SLUG=my-post TITLE="My post"               # new draft post
node scripts/check-urls.mjs http://localhost:4321   # check every internal link
```

If the dev server errors on content that builds fine (usually right after changing `src/content.config.ts`), clear Astro's cache with `rm -rf .astro node_modules/.astro` and start it again.

</details>

<details>
<summary><b>Project layout</b></summary>

<br>

| Path | What it holds |
| --- | --- |
| `content/` | Your writing |
| `src/pages/` | One file per route |
| `src/layouts/Base.astro` | Page shell: head, framed sheet, nav, title-block footer |
| `src/components/` | Plate (grid panel), SiteNav, TitleBlock, Tabs, Toc, Figure, Replies, Arrow |
| `src/lib/` | Content queries and formatting, the section list, URL helpers |
| `src/styles/tokens.css` | Design tokens: each paper's colours, type, spacing, fonts |
| `src/styles/site.css` | Components and page shell, built only from tokens |
| `src/scripts/` | Optional interactions: grid readout, paper switch, TOC highlight, Bluesky replies |
| `src/content.config.ts` | The rules every content file is checked against |
| `public/` | Fonts, images, icons, social-preview image |
| `vercel.json` | Build settings, clean URLs, and security headers |

</details>

## License

[MIT](LICENSE). Designed by [Flavia Ouyang](https://www.flaviaouyang.com). If you use it, a small credit, like a link in your README or your site's footer, is appreciated but not required.

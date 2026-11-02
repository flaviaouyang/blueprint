# Writing content

Everything on the site is written in files under `content/`; no copy lives in the code.
Each file is checked when the site builds: a missing field, a misspelled key, or a bad
date stops the build and names the file and field. Preview with `bun run dev`
(http://localhost:4321); pages update as you save.

| File | Shows up on |
|---|---|
| `content/profile.yaml` | Home, About (experience and education tabs), and every page's opening line |
| `content/posts/<slug>.mdx` | The blog (`/blog`), the post at `/blog/<slug>`, Home (the 3 newest), RSS |
| `content/projects/<slug>.mdx` | Projects (`/projects`), and `/projects/<slug>` if it has a body |
| `content/now.mdx` | Now (`/now`) |

## Text in YAML

Text fields in `profile.yaml` accept a little Markdown: `[link text](https://...)`,
`**bold**`, `*italic*`, and `` `code` ``. Put a value in `"double quotes"` if it contains
a colon followed by a space, or starts with a special character like `*` or `[`.

Dates in `profile.yaml` are `YYYY` or `YYYY-MM`. Leave out `end` for something current
("Present"). Add `hidden: true` to any experience or education entry to take it off the
site without deleting it.

## Profile

`profile.yaml` holds:

| Field | Used for |
|---|---|
| `name`, `tagline`, `location` | Home's title, the line under it, and Home's title block. The nav's mark is your name's first letter and a period |
| `description` | The search and social-preview description of pages that don't have their own |
| `feed` | Your RSS feed's `title` and `description` |
| `avatar` | Optional square image on Home's GitHub card, like `/images/avatar.png` |
| `links` | `email`, `github`, and optional `linkedin` |
| `contact` | How Home's email and LinkedIn links read |
| `home` | Home's paragraphs: `intro` (before the GitHub card), `writing` (before the latest posts), `closing` (after) |
| `pages` | Each page's opening line, also its search description: `about`, `education` (optional), `projects`, `blog`, `now` |
| `experience` | About's experience tab, newest first |
| `education` | About's education tab |

### Experience

Every job has a company `org`, an optional `url`, and one `summary` of your work there.
A job with one role takes `title`, `start`, `end`, and `highlights` directly:

```yaml
experience:
  - org: Small Startup
    summary: A five-person startup making scheduling software for clinics.
    title: Software Engineer
    start: 2021-01
    end: 2022-05
    highlights:
      - Build the booking flow from scratch, used by 200 clinics at launch.
```

For a promotion, or any change of role at the same company, list them under `roles`,
newest first; each shows its own title, dates, and highlights under one heading:

```yaml
  - org: Example Corp
    url: https://example.com
    summary: I build internal tools for engineering teams.
    roles:
      - title: Senior Software Engineer
        start: 2024-03
        highlights:
          - Lead a **build-caching service** used by every team.
      - title: Software Engineer
        start: 2022-06
        end: 2024-03
        highlights:
          - Ship the **deploy dashboard**.
```

### Education

```yaml
education:
  - school: Example University
    degree: Bachelor of Science in Computer Science
    start: 2017
    end: 2021
    details:
      - "Selected coursework: Algorithms, Operating Systems, Databases."
```

## Posts

```bash
make blog SLUG=my-post TITLE="My post"
```

creates `content/posts/my-post.mdx` as a draft and `public/images/my-post/` for its
images. The file name is the URL: `/blog/my-post`.

```yaml
---
title: "My post"
publishedAt: '2026-11-01'
updatedAt: '2026-12-01'        # optional
summary: 'One sentence, used in lists, RSS, and search results.'
image: '/images/my-post/cover.png'   # optional social preview image
showToc: true                  # optional; false hides the table of contents
blueskyPostUrl: https://bsky.app/profile/<handle>/post/<id>   # optional; shows replies as comments
draft: true                    # optional; drafts show in dev only
---
```

Write the post in Markdown below the frontmatter. `##` headings are numbered and listed in
the table of contents. Code blocks (```` ```python ````) are highlighted in the site's
palette.

Images go in `public/images/my-post/`:

```mdx
<Image src={`/images/my-post/diagram.png`} alt={`What it shows`} width={1136} height={898} caption="Optional caption" />
```

They're drawn in the site's duotone and numbered "Fig. N". Give `width` and `height` the
image's real size. Add `dark` to terminal or editor screenshots so they're inverted first
and read like light code blocks, and `eager` to an image near the top of a post so it
loads right away.

**Comments:** after publishing, post about it on Bluesky and set `blueskyPostUrl` to that
post. Replies appear under the post; readers always get a "Reply on Bluesky" link.

## Projects

```yaml
---
title: My project
summary: One sentence on what it does.
role: Creator          # optional
years: '2024–2025'
links:
  repo: https://github.com/...   # optional
  demo: https://...              # optional
order: 1               # lower comes first
draft: false
---
```

Anything written below the frontmatter becomes a write-up page at `/projects/<slug>`;
leave it empty to only list the project, linked to its repo or demo. Projects stays out
of the nav until at least one project is published.

## Now

`now.mdx` has one field, `updatedAt`, and a few paragraphs of Markdown. Update the date
whenever you edit it.

## Placeholders

`TODO(content)` marks placeholder text. Builds warn while any remain, and production
deploys on Vercel fail, listing the files, so placeholder copy can't go live.

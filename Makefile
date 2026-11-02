dev:
	bun install
	bun dev

# New draft post: make blog SLUG=my-post TITLE="My post"
blog:
	printf -- "---\ntitle: \"%s\"\npublishedAt: '%s'\nsummary: ''\ndraft: true\n---\n" "${TITLE}" "`date +%Y-%m-%d`" > content/posts/${SLUG}.mdx
	mkdir -p public/images/${SLUG}


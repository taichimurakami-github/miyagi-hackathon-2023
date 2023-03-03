dev:
	pnpm dev

publish:
	pnpm build && firebase deploy --only hosting
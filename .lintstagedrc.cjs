const prettier = `prettier --plugin-search-dir . --write . --ignore-unknown`;
const eslint = 'eslint --max-warnings 0 --fix';

module.exports = {
	'*.{ts,js,cjs,mjs,svelte}': [eslint, prettier],
	'*.{md,svx,mdx}': [prettier],
	'*': prettier
};

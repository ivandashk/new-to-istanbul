import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import rehypeFigure from 'rehype-figure';

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [],
	rehypePlugins: [rehypeFigure]
});

export default config;

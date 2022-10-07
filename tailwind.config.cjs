const config = {
	content: ['./src/app.html', './src/**/*.{js,svelte,ts}'],

	theme: {
		extend: {}
	},

	plugins: [require('@tailwindcss/typography')]
};

module.exports = config;

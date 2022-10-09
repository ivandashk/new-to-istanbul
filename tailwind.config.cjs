/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme');
/* eslint-enable @typescript-eslint/no-var-requires */

/** @type {import('tailwindcss').Config} */
const config = {
	content: ['./src/app.html', './src/**/*.{js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', ...defaultTheme.fontFamily.sans]
			}
		}
	},

	plugins: [require('@tailwindcss/typography')]
};

module.exports = config;

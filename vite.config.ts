import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { resolve } from 'path';

const config: UserConfig = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$cms: resolve('./src/cms'),
			$components: resolve('./src/components'),
			$constants: resolve('./src/constants'),
			$metadata: resolve('./src/metadata')
		}
	}
};

export default config;

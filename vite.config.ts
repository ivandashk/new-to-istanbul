import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { resolve } from 'path';

const config: UserConfig = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$cms: resolve('./src/cms'),
			$components: resolve('./src/components'),
			$metadata: resolve('./src/metadata.ts')
		}
	}
};

export default config;

import path from 'path';
import glob from 'glob';
import { cwd } from 'process';
import { existsSync, rmSync, writeFileSync } from 'fs';
import mkdirp from 'mkdirp';

const src = path.join(cwd(), 'src');
const inputBase = path.join(src, 'cms');
const outputBase = path.join(src, 'routes', 'content');

function process(filePath) {
	const relativePathDir = path.relative(inputBase, path.dirname(filePath));

	const newDir = path.join(outputBase, relativePathDir, path.basename(filePath, '.md'));
	const pageFileName = '+page.svelte';
	
	const newPath = path.join(newDir, pageFileName);
	
	const pathToContent = path.join(relativePathDir, path.basename(filePath));
	const pageSource = `
		<script lang="ts">
			import Content from '$cms/${pathToContent}'
		</script>

		<Content />
	`;

	console.log(newPath);

	mkdirp.sync(newDir);
	writeFileSync(newPath, pageSource);
}

export function generateContentPages(folderName) {
	const generatesRoutesDir = path.join(outputBase, folderName);
	if (existsSync(generatesRoutesDir)) {
		rmSync(generatesRoutesDir, { recursive: true, force: true });
	}
	glob.sync(path.join(inputBase, '**', '*.md')).forEach(process);
}

generateContentPages('posts');

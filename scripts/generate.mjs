import path from 'path';
import glob from 'glob';
import { cwd } from 'process';
import { existsSync, rmSync, writeFileSync, readFileSync } from 'fs';
import mkdirp from 'mkdirp';

import extract from 'remark-extract-frontmatter';
import frontmatter from 'remark-frontmatter';
import compiler from 'remark-stringify';
import parser from 'remark-parse';
import { unified } from 'unified';
import yaml from 'yaml';

const src = path.join(cwd(), 'src');
const inputBase = path.join(src, 'cms');
const routesOutputBase = path.join(src, 'routes', 'content');

const metadataPath = path.join(src, 'metadata.ts');
const metadata = {};

function cleanRoutes(folderName) {
	const generatesRoutesDir = path.join(routesOutputBase, folderName);
	if (existsSync(generatesRoutesDir)) {
		rmSync(generatesRoutesDir, { recursive: true, force: true });
	}
}

function processMdFile(filePath) {
	const relativePathDir = path.relative(inputBase, path.dirname(filePath));

	const newDir = path.join(routesOutputBase, relativePathDir, path.basename(filePath, '.md'));
	const pageFileName = '+page.svelte';

	const newPath = path.join(newDir, pageFileName);

	const pathToContent = path.join(relativePathDir, path.basename(filePath));
	const pageSource = `
		<script lang="ts">
			import Content from '$cms/${pathToContent}'
		</script>

		<Content />
	`;

	populateMetadata(filePath);

	mkdirp.sync(newDir);
	writeFileSync(newPath, pageSource);
}

function populateMetadata(filePath) {
	const category = path.basename(path.dirname(filePath));
	const fileName = path.basename(filePath, '.md');

	if (!metadata[category]) {
		metadata[category] = [];
	}

	unified()
		.use(parser)
		.use(compiler)
		.use(frontmatter)
		.use(extract, { yaml: yaml.parse })
		.process(readFileSync(filePath), function (err, file) {
			if (err) {
				throw new Error(err);
			}

			file.data.slug = fileName;

			metadata[category].push(file.data);
		});
}

function cleanMetadata() {
	rmSync(metadataPath, { force: true });
}

function writeMetadata() {
	writeFileSync(
		metadataPath,
		`
		import type { Metadata } from './types';

		export const metadata: Metadata = ${JSON.stringify(metadata)};`
	);
}

function generatePagesForCollection(collectionName) {
	cleanRoutes('posts');
	glob.sync(path.join(inputBase, collectionName, '*.md')).forEach(processMdFile);
}

function populateMetadataForCollection(collectionName) {
	glob.sync(path.join(inputBase, collectionName, '*.md')).forEach(populateMetadata);
}

export function generateContentPages() {
	cleanMetadata();

	generatePagesForCollection('posts');
	populateMetadataForCollection('creators');

	writeMetadata();
}

generateContentPages();

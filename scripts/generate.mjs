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

const metadataBase = path.join(src, 'metadata');
const metadataMapsBase = path.join(metadataBase, 'maps');
const collectionsPath = path.join(metadataBase, 'collections.ts');

const collections = {};

function cleanRoutes(folderName) {
	const generatesRoutesDir = path.join(routesOutputBase, folderName);
	if (existsSync(generatesRoutesDir)) {
		rmSync(generatesRoutesDir, { recursive: true, force: true });
	}
}

function processPosts(filePath) {
	const relativePathDir = path.relative(inputBase, path.dirname(filePath));

	const slug = path.basename(filePath, '.md');
	const newDir = path.join(routesOutputBase, relativePathDir, slug);
	const pageFileName = '+page.svelte';

	const newPath = path.join(newDir, pageFileName);

	const pathToContent = path.join(relativePathDir, path.basename(filePath));
	const pageSource = `
		<script lang="ts">
			import Content from '$cms/${pathToContent}';
			import PostLayout from '$components/PostLayout/PostLayout.svelte';
		</script>

		<PostLayout slug="${slug}">
			<Content />
		</PostLayout>
	`;

	mkdirp.sync(newDir);
	writeFileSync(newPath, pageSource);
}

function addToCollection(filePath) {
	const collection = path.basename(path.dirname(filePath));
	const fileName = path.basename(filePath, '.md');

	if (!collections[collection]) {
		collections[collection] = [];
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

			collections[collection].push(file.data);
		});
}

function cleanMetadata() {
	rmSync(metadataBase, { force: true, recursive: true });
}

function writeCollections() {
	mkdirp.sync(metadataBase);
	writeFileSync(
		collectionsPath,
		`
		import type { Collections } from '../types';

		export const collections: Collections = ${JSON.stringify(collections)};
		`
	);
}

function generatePagesForCollection(collectionName) {
	cleanRoutes('posts');
	glob.sync(path.join(inputBase, collectionName, '*.md')).forEach(processPosts);
}

function addCollectionCategoryToCollection(collectionName) {
	glob.sync(path.join(inputBase, collectionName, '*.md')).forEach(addToCollection);
}

function createCollectionMapByKey(collectionName, key) {
	const map = collections[collectionName].reduce((acc, collection) => {
		return {
			...acc,
			[collection[key]]: collection
		};
	}, {});

	mkdirp.sync(metadataMapsBase);

	const functionName = `map${capitalizeFirstLetter(collectionName)}By${capitalizeFirstLetter(key)}`;
	writeFileSync(
		path.join(metadataMapsBase, `${functionName}.ts`),
		`
		export const ${functionName} = ${JSON.stringify(map)} as const;
		`
	);
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function generateContentPages() {
	cleanMetadata();

	addCollectionCategoryToCollection('posts');
	createCollectionMapByKey('posts', 'slug');

	addCollectionCategoryToCollection('creators');
	createCollectionMapByKey('creators', 'name');

	generatePagesForCollection('posts');

	writeCollections();
}

generateContentPages();

<script lang="ts">
	import { page } from '$app/stores';
	import ArticlePreface from '$components/ArticlePreface/ArticlePreface.svelte';
	import { siteName } from '$constants/siteName';
	import { mapCreatorsByName } from '$metadata/maps/mapCreatorsByName';
	import { mapPostsBySlug } from '$metadata/maps/mapPostsBySlug';

	export let slug: keyof typeof mapPostsBySlug;

	const post = mapPostsBySlug[slug];
	const creator = mapCreatorsByName[post.creator];
</script>

<svelte:head>
	<title>{post.title}</title>

	<meta property="og:type" content="article" />
	<meta property="article:author" content={creator.name} />
	<meta property="article:publisher" content="https://www.facebook.com/YOUR-PAGE" />
	<meta property="og:title" content={post.title} />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:image" content="{$page.url.origin}{post.thumbnail}" />
</svelte:head>

<article
	class="prose mx-auto p-6 py-16 prose-img:w-full prose-img:rounded-lg md:prose-lg md:py-24 lg:prose-xl"
>
	<ArticlePreface {post} {creator} />
	<slot />
</article>

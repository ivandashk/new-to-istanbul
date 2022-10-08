<script lang="ts">
	import ArticlePreface from '$components/ArticlePreface/ArticlePreface.svelte';
	import { mapCreatorsByName } from '$metadata/maps/mapCreatorsByName';
	import { mapPostsBySlug } from '$metadata/maps/mapPostsBySlug';

	export let slug: keyof typeof mapPostsBySlug;

	const post = mapPostsBySlug[slug];
	const creator = mapCreatorsByName[post.creator];
</script>

<article class="prose mx-auto p-6 py-16 md:prose-lg md:py-24 lg:prose-xl">
	<ArticlePreface {post} {creator} />
	<slot />
</article>

<style>
	:global(article.prose img) {
		border-radius: 0.5rem;
		width: 100%;
	}
</style>

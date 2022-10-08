<script lang="ts">
	import PostCard from '$components/PostCard/PostCard.svelte';
	import { metadata } from '$metadata';

	const { posts } = metadata;
</script>

<div id="guides" class="py-12 px-4 text-center">
	<h2 class="text-3xl font-extrabold text-slate-900 md:text-5xl">Гайды и руководства</h2>

	<p class="my-8 mx-auto max-w-3xl text-slate-500">
		Мы тщательно отобрали для вас информацию и оставили только самое важное
	</p>

	{#each posts as post (post.title)}
		<div class="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			<PostCard {post} />
		</div>
	{/each}
</div>

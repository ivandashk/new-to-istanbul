<script lang="ts">
	import type { Creator, Post } from 'src/types';

	export let creator: Creator;
	export let post: Post;

	const publicationDate = new Date(post.date).toLocaleDateString('ru-RU', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
</script>

<div class="my-8 flex items-center">
	<div
		style="background-image: url('{creator.avatar}');"
		class="mr-4 h-12 w-12 rounded-full bg-cover"
	/>

	<div style="font-size: 0;lint-height: 0;">
		<div class="text-base text-slate-800">{creator.name}</div>
		<div class="text-sm text-slate-400">{publicationDate}</div>
	</div>
</div>

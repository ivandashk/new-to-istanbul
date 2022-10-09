<script lang="ts">
	import type { Post } from 'src/types';

	export let post: Post;
</script>

<div class="rounded-md border border-slate-200 shadow-md">
	<a href={`/content/posts/${post.slug}`}>
		<img src={post.thumbnail} alt="Thumbnail" class="h-36 w-full rounded-t-lg object-cover" />
		<div class="px-4 pt-6 pb-1">
			{post.title}
		</div>
		<div class="p-2 text-right text-sm text-slate-400">{post.readingTime} мин</div>
	</a>
</div>

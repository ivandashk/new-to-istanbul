<script lang="ts">
	import type { Post } from 'src/types';

	export let post: Post;
</script>

<div class="rounded-md border border-slate-200 shadow-md">
	<a href={`/content/posts/${post.slug}`}>
		<img src={post.thumbnail} alt="Thumbnail" class="h-36 w-full rounded-t-lg object-cover" />
		<div class="px-4 py-6 font-semibold">
			{post.title}
		</div>
	</a>
</div>

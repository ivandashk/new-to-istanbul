<script lang="ts">
	import { browser } from '$app/environment';

	export let text: string;
	export let guideHref: string | undefined = undefined;

	let isChecked = (browser && Boolean(localStorage.getItem(text))) || false;

	$: {
		if (browser) {
			if (isChecked) {
				localStorage.setItem(text, '1');
			} else {
				localStorage.removeItem(text);
			}
		}
	}
</script>

<div class="text-md lg:text-xlt my-6 block font-semibold lg:my-4">
	<label class="text-slate-{isChecked ? 400 : 700} cursor-pointer" class:line-through={isChecked}>
		<input type="checkbox" bind:checked={isChecked} class="mr-2" />
		{text}
	</label>
	{#if guideHref}
		<a href={guideHref} class="text-orange-500 hover:text-orange-600"> — Гайд </a>
	{/if}
</div>

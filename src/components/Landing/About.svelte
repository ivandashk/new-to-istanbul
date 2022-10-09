<script lang="ts">
	import { collections } from '$metadata/collections';
	import { siteName } from '$constants/siteName';

	import { landingIds } from './constants';

	const { creators } = collections;
</script>

<div id={landingIds.about} class="py-12 px-4 text-center">
	<h2 class="text-3xl font-extrabold text-slate-900 md:text-5xl">О проекте</h2>

	<p class="my-8 mx-auto max-w-4xl text-slate-500">
		Освоиться самостоятельно в новом городе и новой стране может быть непростой задачей.<br />Проект
		{siteName} создан с целью помочь адаптироваться людям в новом окружении, получать удовольствие и
		комфорт от жизни в Стамбуле
	</p>

	<div class="mx-auto grid max-w-5xl grid-cols-1 justify-items-center gap-6">
		{#each creators as creator (creator.name)}
			<div class="flex w-72 flex-col items-center">
				<img class="h-40 w-40 rounded-full" src={creator.avatar} alt="" />
				<div class="mt-4 font-semibold">{creator.name}</div>
				<div class="text-sm text-slate-500">{creator.description}</div>
			</div>
		{/each}
	</div>
</div>

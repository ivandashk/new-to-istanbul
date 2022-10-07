<script lang="ts">
	import { Landing } from '$components/Landing';
	import ToDoCheckbox from '$components/ToDoCheckbox/ToDoCheckbox.svelte';
</script>

<Landing.Hero />

<div id="most-important" class="my-16 px-4 text-center lg:my-32">
	<h2 class="text-3xl font-extrabold text-slate-900 md:text-5xl">Самое важное</h2>

	<p class="my-8 mx-auto max-w-3xl text-slate-500">
		Здесь мы собрали список коротких дел, которые мы рекомендуем выполнить как можно раньше.
		Переходи по ссылкам, читай гайды и отмечай свой прогресс. Прогресс выполнения задач сохраняется
		на устройстве
	</p>

	<div class="mx-auto lg:max-w-lg lg:text-left">
		<ToDoCheckbox text="Доехать от аэропорта до Стамбула" />
		<ToDoCheckbox
			text="Научиться пользоваться Istanbulcard"
			guideHref="/content/posts/научиться-пользоваться-istanbulcard-07-10"
		/>
		<ToDoCheckbox text="Арендовать жилье на первое время" />
		<ToDoCheckbox text="Купить симкарту с мобильным интернетом" />
	</div>

	<h4 class="my-20 mx-auto max-w-3xl text-xl font-semibold text-slate-500">Что дальше?</h4>
</div>

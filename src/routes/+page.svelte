<script lang="ts">
	import { page } from '$app/stores';
	import { Landing } from '$components/Landing';
	import { siteName } from '$constants/siteName';
</script>

<svelte:head>
	<title>{siteName}</title>

	<meta property="og:title" content={siteName} />
	<meta property="og:type" content="website" />
	<meta
		property="og:description"
		content="Мы собрали для вас пошаговые руководства как быстро освоиться в Стамбуле и начать чувствовать себя комфортно"
	/>
	<meta property="og:url" content={$page.url.origin} />
	<meta property="og:image" content="{$page.url.origin}/images/hero-aya-sophia.jpg" />
</svelte:head>

<Landing.Hero />
<Landing.MostImportant />
<Landing.Posts />
<Landing.About />
<Landing.Footer />

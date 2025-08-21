<script setup>
const props = defineProps({
	title: { type: String, required: true },
	description: { type: String, required: true },
	icon: { type: String, required: true },
});
</script>

<template>
	<div class="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)] animate-slide-in">
		<div class="w-14 h-14 rounded-xl flex items-center justify-center mb-4 border border-white/10 bg-white/10">
			<span class="text-2xl">{{ icon }}</span>
		</div>
		<h3 class="text-xl font-semibold mb-2">{{ title }}</h3>
		<p class="text-white/80 text-sm leading-relaxed">{{ description }}</p>
	</div>
</template>

<style scoped></style> 
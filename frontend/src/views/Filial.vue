<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

import image2 from '@/assets/photo/image-2.webp';
import image3 from '@/assets/photo/image-3.jpg';
import login2 from '@/assets/photo/login-2.png';

const slides = ref([
	image2,
	image3,
	login2,
]);

const currentIndex = ref(0);
const passwordVisible = ref(false);
const acceptTerms = ref(false);

const form = ref({ firstName: '', lastName: '', email: '', password: '' });
const profilePhoto = ref(null);
const profilePhotoUrl = ref('');

const onAvatarClick = () => {
	document.getElementById('profile-photo-input').click();
};

const onPhotoChange = (e) => {
	const file = e.target.files[0];
	if (file) {
		profilePhoto.value = file;
		profilePhotoUrl.value = URL.createObjectURL(file);
	}
};

let timerId = null;
const startAutoplay = () => {
	stopAutoplay();
	timerId = setInterval(() => {
		currentIndex.value = (currentIndex.value + 1) % slides.value.length;
	}, 5000);
};
const stopAutoplay = () => {
	if (timerId) { clearInterval(timerId); timerId = null; }
};

onMounted(() => startAutoplay());
onBeforeUnmount(() => stopAutoplay());

const goTo = (i) => {
	currentIndex.value = i;
	startAutoplay();
};

const togglePassword = () => { passwordVisible.value = !passwordVisible.value; };
const submit = () => {
	console.log('Register form submitted', { ...form.value, acceptTerms: acceptTerms.value });
};
</script>

<template>
	<div class="page">
		<div class="card">
		<!-- slides sisiny 1 -->
			<section class="media" @mouseenter="stopAutoplay" @mouseleave="startAutoplay">
				<div class="slides">
					<img
					v-for="(src, i) in slides"
					:key="src"
					:src="src"
					:alt="'Slide ' + (i + 1)"
					class="slide"
					:class="{ 'is-active': i === currentIndex }"
					/>
				</div>
				<div class="media__overlay">
					<div class="branding">
						<h1 style="display: contents; align-items: center; font-size: 2.1rem; letter-spacing: 2px ; color: white;">Choisissez votre filiale</h1>
					</div>
					<div class="creefile"  style="display: flex; justify-content: center; left: 28px; bottom: 34px; color: #dff8f0; text-shadow: 0 4px 24px rgba(0,0,0,.45); margin-top: 25.2rem;">
						
						<p class="hint">Voulez-vous créer une filiale ? <RouterLink class="link" to="/createfilial" style="margin-top: 2px; font-size: clamp(20px, 1.6vw, 10px); font-weight: 900; letter-spacing: .06em; color: #b7ffd9;  ">cree</RouterLink></p>
					</div>
				</div>
				
				<div class="dots">
					<button
						v-for="(src, i) in slides"
						:key="'dot-' + i"
						class="dot"
						:class="{ 'is-active': i === currentIndex }"
						@click="goTo(i)"
						aria-label="Aller au slide"
					></button>
				</div>
			</section>

			
		</div>
	</div>
</template>

<style scoped>
.page {
	min-height: 100vh;
	display: grid;
	place-items: center;
	padding: 24px;
	background-color:rgb(222, 246, 242) ;
}

.card {
	width: min(1120px, 96vw);
	/* display: grid; */
	grid-template-columns: 1.15fr 1fr;
	border-radius: 22px;
	box-shadow: 0 30px 80px rgba(0,0,0,.25);
	overflow: hidden;
	background: rgba(255,255,255,0.08);
	backdrop-filter: blur(8px);
	border: 1px solid rgba(255,255,255,0.18);
}

/* gauche: slider */
.media { position: relative; min-height: 560px; background: #0b0f14;}
.slides { position: absolute; inset: 0; }
.slide {
	position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
	opacity: 0; transform: scale(1.05);
	transition: opacity 800ms ease, transform 12000ms ease-in-out;
	filter: brightness(.8) saturate(.95);
}
.slide.is-active { opacity: 1; transform: scale(1.0); }
.media__overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(11,15,20,.35) 0%, rgba(11,15,20,.55) 55%, rgba(11,15,20,.75) 100%); }
.branding { display: flex; justify-content: center; left: 28px; bottom: 34px; color: #dff8f0; text-shadow: 0 4px 24px rgba(0,0,0,.45); margin-top: 1.2rem;}
.branding h3 { font-size: clamp(18px, 2.1vw, 22px); letter-spacing: .12em; font-weight: 800; }
.branding h1 { margin-top: 2px; font-size: clamp(28px, 4.6vw, 44px); font-weight: 900; letter-spacing: .06em; color: #b7ffd9;  }
.dots { position: absolute; left: 50%; transform: translateX(-50%); bottom: 16px; display: flex; gap: 10px; z-index: 2; }
.dot { width: 10px; height: 10px; border-radius: 999px; background: rgba(255,255,255,.55); border: none; cursor: pointer; box-shadow: 0 0 0 0 rgba(255,255,255,.45); transition: transform .2s ease, background .2s ease, box-shadow .2s ease; }
.dot:hover { transform: scale(1.1); }
.dot.is-active { background: #b7ffd9; box-shadow: 0 0 0 6px rgba(183,255,217,0.12); }

/* Right: form */
.form { background: linear-gradient(180deg, #0e5360 0%, #0e3e55 100%); color: #e9fffb; padding: 34px 32px; display: flex; flex-direction: column; justify-content: center; }
.head { text-align: center; }
.avatar { width: 84px; height: 84px; margin: 0 auto 10px auto; border-radius: 999px; background: radial-gradient(circle at 30% 30%, #0f2d36, #0a1e26); border: 1px solid rgba(126,248,208,.35); box-shadow: 0 8px 30px rgba(33,212,165,.25), inset 0 0 22px rgba(33,212,165,.15); display: grid; place-items: center; }
.head h2 { font-size: clamp(22px, 2.8vw, 28px); font-weight: 800; letter-spacing: .4px; margin: 6px 0;}
.hint { color: #C7F6E7; opacity: .9; font-size: 14px; }
.link { color: #7ef8d0; text-decoration: none; border-bottom: 1px dashed rgba(126,248,208,.45); }
.link:hover { color: #b8ffec; }

.body { margin-top: 18px; display: grid; gap: 14px; }
.row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.field { display: grid; gap: 6px; }
.field > span { font-size: 13px; color: #cdeee6; }
.input { width: 92%; padding: 12px 14px; border-radius: 12px; background: rgba(0,0,0,.35); border: 1px solid rgba(255,255,255,.18); color: #ecfffb; outline: none; transition: border-color .2s ease, box-shadow .2s ease, background .2s ease, transform .2s ease; }
.input::placeholder { color: #b8e9df; opacity: .8; }
.input:focus { border-color: rgba(33,212,165,.85); box-shadow: 0 0 0 4px rgba(33,212,165,.18), 0 14px 34px rgba(33,212,165,.25); background: rgba(0,0,0,.28); transform: translateY(-1px); }
.password { position: relative; }
.eye { position: absolute; right: 8px; top: 50%; transform: translateY(-50%); width: 36px; height: 36px; display: grid; place-items: center; border-radius: 10px; background: transparent; border: none; cursor: pointer; transition: background .2s ease, transform .2s ease; }
.eye:hover { background: rgba(126,248,208,.12); transform: translateY(-50%) scale(1.05); }

.checkbox { display: flex; align-items: center; gap: 10px; margin-top: 2px; font-size: 14px; color: #dcfff9; }
.checkbox input { width: 16px; height: 16px; accent-color: #21d4a5; }

.btn { width: 100%; border: 0; border-radius: 14px; padding: 12px 16px; font-weight: 800; cursor: pointer; transition: transform .2s ease, box-shadow .2s ease, filter .2s ease; }
.btn--primary { background: linear-gradient(90deg, #36e5b3 0%, #b8f5aa 100%); color: #05352c; box-shadow: 0 12px 32px rgba(33,212,165,.35); }
.btn--primary:hover { transform: translateY(-2px) scale(1.02); filter: brightness(1.02); }
.btn--primary:active { transform: translateY(0) scale(.98); }

.divider { position: relative; text-align: center; margin: 10px 0 4px 0; }
.divider::before, .divider::after { content: ""; position: absolute; top: 50%; width: 38%; height: 1px; background: linear-gradient(90deg, rgba(255,255,255,.2), rgba(255,255,255,0)); }
.divider::before { left: 0; }
.divider::after { right: 0; transform: scaleX(-1); }
.divider span { font-size: 12px; color: #c7efe4; }

.social { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 8px; }
.btn--social { background: rgba(255,255,255,.06); color: #f2fffb; display: inline-flex; align-items: center; justify-content: center; gap: 8px; }
.btn--social:hover { box-shadow: 0 10px 28px rgba(0,0,0,.25); transform: translateY(-2px); }
.btn--wa { background: rgba(49, 178, 110, .22); }

/* Responsive */

@media (max-width: 1120px) {
	.card {
		width: 95vw;
		grid-template-columns: 1fr 1fr;
	}
	.branding h2 { font-size: clamp(24px, 5vw, 36px); }
	.branding h3 { font-size: clamp(16px, 3vw, 20px); }
}

@media (max-width: 980px) {
	.card {
		grid-template-columns: 1fr;
	}
	.media { min-height: 300px; }
	.form { padding: 24px 20px; }
	.input { width: 95%; }
	.social { grid-template-columns: 1fr; }
	.branding { left: 16px; bottom: 24px; }
	.dots { bottom: 12px; gap: 8px; }
}

@media (max-width: 600px) {
	.page { padding: 12px; }
	.card { border-radius: 16px; }
	.branding h2 { font-size: clamp(20px, 6vw, 28px); }
	.branding h3 { font-size: clamp(14px, 4vw, 18px); }
	.form { padding: 18px 16px; }
	.btn { padding: 10px 14px; font-size: 14px; }
	.divider span { font-size: 11px; }
	.eye { width: 30px; height: 30px; }
}
</style>

<!-- ========================================================
	👉 Rectification pour la facilité backend/frontend
	========================================================
	- Ici, la page sert à choisir une filiale.
	- Le backend doit renvoyer la liste des filiales (avec id, nom, code, base_donnee_nom).
	- Quand l’utilisateur clique sur une filiale, le frontend enregistre 
	  `base_donnee_nom` et l’envoie dans les requêtes API.
	- Cela permet d’indiquer au backend dans quelle base/schéma travailler.
-->

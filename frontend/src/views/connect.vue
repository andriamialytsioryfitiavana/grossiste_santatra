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
				<div class="media__overlay"></div>
				<div class="branding">
					<h3>GROSSISTE</h3>
					<h2>SANTATRA</h2>
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

			<!-- Right: Form -->
			<section class="form">
				<div class="head">
					<h2>Log in</h2>
					<p class="hint">Don't have an account ? <RouterLink class="link" to="/registre">Registre</RouterLink></p>
				</div>

				<form class="body" @submit.prevent="submit">

					<label class="field">
						<span>Email</span>
						<input class="input" v-model="form.email" type="email" placeholder="Entrer votre email" />
					</label>

					<label class="field">
						<span>Mot de passe</span>
						<div class="password">
							<input class="input" v-model="form.password" :type="passwordVisible ? 'text' : 'password'" placeholder="Entrer votre mot de passe" />
							<button type="button" class="eye" @click="togglePassword" :aria-label="passwordVisible ? 'Masquer' : 'Afficher'">
								<svg v-if="!passwordVisible" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="#a2f5d9" d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7Zm0 12a5 5 0 1 1 5-5 5.006 5.006 0 0 1-5 5Z"/></svg>
								<svg v-else viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="#a2f5d9" d="M2 12s3-7 10-7a9.9 9.9 0 0 1 4 .8l-1.59 1.59A6.992 6.992 0 0 0 12 7C7 7 4 12 4 12a14.5 14.5 0 0 0 3.06 3.88l-1.44 1.44A17.3 17.3 0 0 1 2 12Zm19.78-7.22L18.56 8l-2 2-2 2-6 6-1.22 1.22-1.42-1.42L17.14 6.58l3.64-3.64 1.42 1.42ZM20 12s-3 7-8 7a9.6 9.6 0 0 1-4-.89l1.61-1.61A6.985 6.985 0 0 0 12 17c5 0 8-5 8-5a14.5 14.5 0 0 0-2.89-3.86l1.43-1.43A17.3 17.3 0 0 1 22 12Z"/></svg>
							</button>
						</div>
					</label>

					<label class="checkbox">
						<input type="checkbox" v-model="acceptTerms" />
						<span>J'accepte les <a href="#" class="link">termes & conditions</a></span>
					</label>

					<button class="btn btn--primary" type="submit">se connecte</button>

					<div class="divider"><span>ou s'inscrire avec</span></div>

					<div class="social">
						<button type="button" class="btn btn--social">
							<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="#fff" d="M22 12a10 10 0 1 0-11.56 9.9v-7h-2v-2.9h2v-2.2c0-2 1.2-3.1 3-3.1.9 0 1.8.16 1.8.16v2h-1c-1 0-1.3.63-1.3 1.3v1.84h2.3L14.7 14.9h-2v7A10 10 0 0 0 22 12Z"/></svg>
							<span>Facebook</span>
						</button>
						<button type="button" class="btn btn--social btn--wa">
							<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="#fff" d="M20.2 3.8A10 10 0 0 0 3.7 20.3L2 22l1.9-.5A10 10 0 1 0 20.2 3.8Zm-8.2 15a7 7 0 0 1-3.6-1l-.3-.2-2 .5.5-2-.2-.3a7 7 0 1 1 5.6 3Z"/></svg>
							<span>WhatsApp</span>
						</button>
					</div>
				</form>
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
	display: grid;
	grid-template-columns: 1.15fr 1fr;
	border-radius: 22px;
	box-shadow: 0 30px 80px rgba(0,0,0,.25);
	overflow: hidden;
	background: rgba(255,255,255,0.08);
	backdrop-filter: blur(8px);
	border: 1px solid rgba(255,255,255,0.18);
}

/* gauche: slider */
.media { position: relative; min-height: 560px; background: #0b0f14; }
.slides { position: absolute; inset: 0; }
.slide {
	position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
	opacity: 0; transform: scale(1.05);
	transition: opacity 800ms ease, transform 12000ms ease-in-out;
	filter: brightness(.8) saturate(.95);
}
.slide.is-active { opacity: 1; transform: scale(1.0); }
.media__overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(11,15,20,.35) 0%, rgba(11,15,20,.55) 55%, rgba(11,15,20,.75) 100%); }
.branding { position: absolute; left: 28px; bottom: 34px; color: #dff8f0; text-shadow: 0 4px 24px rgba(0,0,0,.45); }
.branding h3 { font-size: clamp(18px, 2.1vw, 22px); letter-spacing: .12em; font-weight: 800; }
.branding h2 { margin-top: 6px; font-size: clamp(28px, 4.6vw, 44px); font-weight: 900; letter-spacing: .06em; color: #b7ffd9; }
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

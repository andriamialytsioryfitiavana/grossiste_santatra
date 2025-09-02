<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { RouterLink } from 'vue-router';
import image2 from '@/assets/photo/image-2.webp';
import image3 from '@/assets/photo/image-3.jpg';
import login2 from '@/assets/photo/login-2.png';

const slides = ref([image2, image3, login2]);
const currentIndex = ref(0);
const passwordVisible = ref(false);
const acceptTerms = ref(false);

// CHANGED: aligner les champs avec le modèle backend
const form = ref({
  name: '',        // nom de la filiale
  email: '',
  address: '',
  city: '',
  country: '',
  access_code: ''
});
const profilePhoto = ref(null);
const profilePhotoUrl = ref('');

const roles = ref(['Administrateur', 'Vendeur']);

const onAvatarClick = () => document.getElementById('profile-photo-input').click();
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

const goTo = (i) => { currentIndex.value = i; startAutoplay(); };
const togglePassword = () => { passwordVisible.value = !passwordVisible.value; };

// CHANGED: envoyer la requête au backend
const submit = async () => {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/filiales/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || res.statusText);
    }
    const data = await res.json();
    console.log('Filiale créée', data);
    // optionnel: vider le formulaire ou rediriger
  } catch (err) {
    console.error('Erreur création filiale:', err);
  }
};
</script>

<template>
  <div class="page">
    <div class="card">
      <!-- Slider -->
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

      <!-- Form -->
      <section class="form">
        <div class="head">
          <h2>Créer un filiale</h2>
          <p class="hint">Vous avez déjà une filiale ? <RouterLink class="link" to="/filial">Choisir</RouterLink></p>
        </div>

        <form class="body" @submit.prevent="submit">
          <label class="field">
            <span>Nom</span>
            <input class="input" v-model="form.name" type="text" placeholder="Nom" />
          </label>

          <label class="field">
            <span>Email</span>
            <input class="input" v-model="form.email" type="email" placeholder="Entrer votre email" />
          </label>

          <label class="field">
            <span>Adresse</span>
            <input class="input" v-model="form.address" type="text" placeholder="Entrer votre adresse" />
          </label>

          <div class="row">
            <label class="field">
              <span>Ville</span>
              <input class="input" v-model="form.city" type="text" placeholder="Entrer votre ville" />
            </label>
            <label class="field">
              <span>Pays</span>
              <input class="input" v-model="form.country" type="text" placeholder="Entrer votre pays" />
            </label>
          </div>

          <label class="field">
            <span>Code d'accès</span>
            <div class="password">
              <input class="input" v-model="form.access_code" :type="passwordVisible ? 'text' : 'password'" placeholder="Entrer votre code d'accès" />
              <button type="button" class="eye" @click="togglePassword" :aria-label="passwordVisible ? 'Masquer' : 'Afficher'">
                <svg v-if="!passwordVisible" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path fill="#a2f5d9" d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7Zm0 12a5 5 0 1 1 5-5 5.006 5.006 0 0 1-5 5Z"/>
                </svg>
                <svg v-else viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path fill="#a2f5d9" d="M2 12s3-7 10-7a9.9 9.9 0 0 1 4 .8l-1.59 1.59A6.992 6.992 0 0 0 12 7C7 7 4 12 4 12a14.5 14.5 0 0 0 3.06 3.88l-1.44 1.44A17.3 17.3 0 0 1 2 12Zm19.78-7.22L18.56 8l-2 2-2 2-6 6-1.22 1.22-1.42-1.42L17.14 6.58l3.64-3.64 1.42 1.42ZM20 12s-3 7-8 7a9.6 9.6 0 0 1-4-.89l1.61-1.61A6.985 6.985 0 0 0 12 17c5 0 8-5 8-5a14.5 14.5 0 0 0-2.89-3.86l1.43-1.43A17.3 17.3 0 0 1 22 12Z"/>
                </svg>
              </button>
            </div>
          </label>

          <button class="btn btn--primary" type="submit">Créer la filiale</button>
        </form>
      </section>
    </div>
  </div>
</template>


<style scoped>
/* Style spécifique pour le select de rôle */
.field select {
  width: 98%;          /* prend toute la largeur du parent */
  padding: 12px 14px;   /* même padding que tes inputs */
  border-radius: 12px;
  background: rgba(0,0,0,.35);
  border: 1px solid rgba(255,255,255,.18);
  color: #ecfffb;
  outline: none;
  transition: border-color .2s ease, box-shadow .2s ease, background .2s ease, transform .2s ease;
  appearance: none;     /* supprime la flèche native pour customiser si besoin radial-gradient(1200px 700px at -10% -20%, #e7fff5 0%, #b6f0dc 35%, #6edec5 65%, #2a9c8a 100%);*/
}

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

/* Left: slider */
.media { position: relative; min-height: 580px; background: #0b0f14; }
.slides { position: absolute; inset: 0; }
.slide {
	position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
	opacity: 0; transform: scale(1.05);
	transition: opacity 800ms ease, transform 12000ms ease-in-out;
	filter: brightness(.8) saturate(.95);
}
.slide.is-active { opacity: 1; transform: scale(1.0); }
.media__overlay { position: absolute; inset: 0;width: 1; background: linear-gradient(180deg, rgba(11,15,20,.35) 0%, rgba(11,15,20,.55) 55%, rgba(11,15,20,.75) 100%); }
.branding { position: absolute; left: 28px; bottom: 34px; color: #dff8f0; text-shadow: 0 4px 24px rgba(0,0,0,.45); }
.branding h3 { font-size: clamp(18px, 2.1vw, 22px); letter-spacing: .12em; font-weight: 800; }
.branding h2 { margin-top: 6px; font-size: clamp(28px, 4.6vw, 44px); font-weight: 900; letter-spacing: .06em; color: #b7ffd9; }
.dots { position: absolute; left: 50%; transform: translateX(-50%); bottom: 16px; display: flex; gap: 10px; z-index: 2; }
.dot { width: 10px; height: 10px; border-radius: 999px; background: rgba(255,255,255,.55); border: none; cursor: pointer; box-shadow: 0 0 0 0 rgba(255,255,255,.45); transition: transform .2s ease, background .2s ease, box-shadow .2s ease; }
.dot:hover { transform: scale(1.1); }
.dot.is-active { background: #b7ffd9; box-shadow: 0 0 0 6px rgba(183,255,217,0.12); }

/* Right: form */
.form {
  background: linear-gradient(180deg, #0e5360 0%, #0e3e55 100%);
  color: #e9fffb;
  padding: 34px 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1;
  box-sizing: border-box;
}
.head { text-align: center; }
.avatar { width: 84px; height: 84px; margin: 0 auto 10px auto; border-radius: 999px; background: radial-gradient(circle at 30% 30%, #0f2d36, #0a1e26); border: 1px solid rgba(126,248,208,.35); box-shadow: 0 8px 30px rgba(33,212,165,.25), inset 0 0 22px rgba(33,212,165,.15); display: grid; place-items: center; }
.head h2 { font-size: clamp(22px, 2.8vw, 28px); font-weight: 800; letter-spacing: .4px; margin: 6px 0; }
.hint { color: #C7F6E7; opacity: .9; font-size: 14px; }
.link { color: #7ef8d0; text-decoration: none; border-bottom: 1px dashed rgba(126,248,208,.45); }
.link:hover { color: #b8ffec; }

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

@media (max-width: 980px) {
	.card { 
		grid-template-columns: 1fr; 
		max-width: 640px;
	}
	.media { 
		min-height: 260px; 
	}
	.form { 
		padding: 28px 24px; 
	}
}

@media (max-width: 720px) {
	.page { 
		padding: 16px; 
	}
	.card { 
		width: 100%; 
		border-radius: 16px; 
	}
	.form { 
		padding: 24px 18px; 
	}
	.row { 
		grid-template-columns: 1fr; 
		gap: 10px; 
	}
	.head h2 { 
		font-size: 20px; 
	}
	.branding h2 { 
		font-size: 32px; 
	}
}

@media (max-width: 480px) {
	.page { 
		padding: 10px; 
	}
	.card { 
		box-shadow: none; 
		border-radius: 12px; 
	}
	.form { 
		padding: 20px 16px; 
	}
	@media (max-width: 480px) {
	.input { 
		font-size: clamp(12px, 4vw, 14px);
		padding: clamp(8px, 2vw, 12px) clamp(10px, 3vw, 14px);
	}
}

@media (max-width: 360px) {
	.input { 
		font-size: clamp(11px, 4vw, 13px); 
		padding: clamp(6px, 2vw, 10px) clamp(8px, 3vw, 12px); 
	}
	}
	.btn { 
		font-size: 14px; 
		padding: 10px; 
	}
	.social { 
		grid-template-columns: 1fr; 
	}
	.avatar { 
		width: 72px; 
		height: 72px; 
	}
	.branding { 
		left: 16px; 
		bottom: 20px; 
	}
	.branding h3 { font-size: 14px; }
	.branding h2 { font-size: 24px; }
}

@media (max-width: 360px) {
	.form { 
		padding: 16px 12px; 
	}
	.input { 
		font-size: 13px; 
		padding: 8px 10px; 
	}
	.btn { 
		font-size: 13px; 
	}
	.head h2 { 
		font-size: 18px; 
	}
}

/* Form tweaks: garantir que les champs occupent l'espace, box-sizing et responsive */
.form {
  background: linear-gradient(180deg, #0e5360 0%, #0e3e55 100%);
  color: #e9fffb;
  padding: 34px 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1;
  box-sizing: border-box;
}

.body {
  margin-top: 18px;
  display: grid;
  gap: 14px;
  width: 100%;
  box-sizing: border-box;
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
}

.field {
  display: grid;
  gap: 6px;
  width: 100%;
}

.field > span { font-size: 13px; color: #cdeee6; }

.input {
  width: 100%;               /* important: utiliser 100% pour aligner avec le parent */
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(0,0,0,.35);
  border: 1px solid rgba(255,255,255,.18);
  color: #ecfffb;
  outline: none;
  transition: border-color .2s ease, box-shadow .2s ease, background .2s ease, transform .2s ease;
  box-sizing: border-box;    /* évite débordement dû au padding */
}

.input::placeholder { color: #b8e9df; opacity: .8; }
.input:focus { border-color: rgba(33,212,165,.85); box-shadow: 0 0 0 4px rgba(33,212,165,.18); background: rgba(0,0,0,.28); transform: translateY(-1px); }

/* small helper for the password eye */
.password { position: relative; width: 100%; }
.eye { position: absolute; right: 8px; top: 50%; transform: translateY(-50%); width: 36px; height: 36px; display: grid; place-items: center; border-radius: 10px; background: transparent; border: none; cursor: pointer; }
.eye:hover { background: rgba(126,248,208,.12); transform: translateY(-50%) scale(1.05); }
</style>

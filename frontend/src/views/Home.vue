<script setup>
import { ref } from 'vue';
import grossisteVideo from '../assets/image/grossiste.mp4';

const videoReady = ref(false);
const onVideoLoaded = () => {
  videoReady.value = true;
};
</script>

<template>
  <div class="hero" :class="{ 'is-ready': videoReady }">
    <video
      class="hero__bg"
      :src="grossisteVideo"
      autoplay
      muted
      loop
      playsinline
      @loadeddata="onVideoLoaded"
    ></video>

    <div class="hero__overlay"></div>

    <div class="hero__content">
      <h1 class="hero__title">
        Tongasoa eto amin'ny <br />
        <span>Grossiste Santatra</span>
      </h1>
      <p class="hero__subtitle">
        Votre partenaire de confiance pour des produits en gros de qualité, au meilleur prix, partout où vous êtes à Madagascar.
      </p>
      <RouterLink class="hero__cta" to="/filial">Miditra</RouterLink>
    </div>
  </div>
</template>

<style scoped>

.hero {
  position: relative;
  height: 100dvh; 
  width: 100%;
  overflow: hidden;
  background: #0b0f14;

  display: flex;
  align-items: center;
  justify-content: center;
}

.hero__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7);
  transform: scale(1.05);
  animation: slowZoom 18s ease-in-out infinite alternate;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0.25) 0%,
    rgba(0, 0, 0, 0.55) 60%,
    rgba(0, 0, 0, 0.8) 100%
  );
  pointer-events: none;
}

.hero__content {
  position: relative;
  z-index: 2;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.2rem;
  text-align: center;
  color: #ffffff;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


.hero__title,
.hero__subtitle,
.hero__cta {
  opacity: 0;
  transform: translateY(16px);
}

.is-ready .hero__title {
  animation: fadeUp 700ms ease-out forwards 100ms;
}
.is-ready .hero__subtitle {
  animation: fadeUp 700ms ease-out forwards 300ms;
}
.is-ready .hero__cta {
  animation: fadeUp 700ms ease-out forwards 500ms,
    pulseGlow 2.2s ease-in-out 1s infinite;
}

.hero__title {
  font-size: clamp(28px, 6vw, 64px);
  line-height: 1.2;
  font-weight: 800;
  letter-spacing: 0.4px;
}
.hero__title span {
  color: #21d4a5;
}

.hero__subtitle {
  max-width: 850px;
  margin-top: 16px;
  font-size: clamp(14px, 2.5vw, 20px);
  line-height: 1.6;
  color: #e6f2ee;
}


.hero__cta {
  margin-top: 28px;
  padding: 14px 26px;
  border-radius: 9999px;
  border: 1px solid rgba(33, 212, 165, 0.6);
  background: rgba(33, 212, 165, 0.1);
  color: #dff8f0;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  backdrop-filter: blur(2px);
  transition: transform 200ms ease, background 200ms ease, box-shadow 200ms ease;
  text-decoration: none;
}
.hero__cta:hover {
  transform: translateY(-2px) scale(1.03);
  background: rgba(33, 212, 165, 0.18);
  box-shadow: 0 8px 28px rgba(33, 212, 165, 0.25);
}
.hero__cta:active {
  transform: translateY(0) scale(0.98);
}


@keyframes fadeUp {
  0% {
    opacity: 0;
    transform: translateY(16px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes pulseGlow {
  0%,
  100% {
    box-shadow: 0 0 0 rgba(33, 212, 165, 0);
  }
  50% {
    box-shadow: 0 0 24px rgba(33, 212, 165, 0.45);
  }
}
@keyframes slowZoom {
  0% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1.0);
  }
}


@media (max-width: 992px) {
  .hero__title {
    font-size: clamp(24px, 7vw, 48px);
  }
  .hero__subtitle {
    font-size: clamp(13px, 3vw, 18px);
  }
}

@media (max-width: 600px) {
  .hero {
    height: 100dvh;
  }
  .hero__title {
    font-size: clamp(20px, 8vw, 32px);
  }
  .hero__subtitle {
    font-size: clamp(12px, 4vw, 15px);
    line-height: 1.4;
  }
  .hero__cta {
    width: 100%;
    max-width: 260px;
  }
}
</style>

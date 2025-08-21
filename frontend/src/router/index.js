import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Registre from '../views/registre.vue';
import connect from '@/views/connect.vue';
import Filial from '@/views/Filial.vue';
import CreateFilial from '@/views/CreateFilial.vue';

const routes = [
	{ path: '/', name: 'home', component: Home },
	{ path: '/registre', name: 'registre', component: Registre },
	{ path: '/connect', name: 'connect', component: connect },
	{ path: '/filial', name: 'filial', component: Filial },
	{ path: '/createfilial', name: 'createfilial', component: CreateFilial },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Registre from '../views/registre.vue';
import connect from '@/views/connect.vue';
import Filial from '@/views/Filial.vue';
import CreateFilial from '@/views/CreateFilial.vue';
import Produit from '@/views/page/produit.vue';
import TableauDeBord from '@/views/page/TableauDeBord.vue';
import Commandes from '@/views/page/Commandes.vue';
import Fournisseurs from '@/views/page/Fournisseurs.vue';
import Stock from '@/views/page/Stock.vue';
import Facture from '@/views/page/Facture.vue';
import Rapports from '@/views/page/Rapports.vue';
import Parametre from '@/views/page/Parametre.vue';
import Livraison from '@/views/page/Livraison.vue';

const routes = [
	{ path: '/', name: 'home', component: Home },
	{ path: '/registre', name: 'registre', component: Registre },
	{ path: '/connect', name: 'connect', component: connect },
	{ path: '/filial', name: 'filial', component: Filial },
	{ path: '/createfilial', name: 'createfilial', component: CreateFilial },
	{ path: '/produit', name: 'produit', component: Produit },
	{ path: '/tableau-de-bord', name: 'tableau-bord', component: TableauDeBord },
	{ path: '/commandes', name: 'commandes', component: Commandes },
	{ path: '/fournisseurs', name: 'fournisseurs', component: Fournisseurs },
	{ path: '/stock', name: 'stock', component: Stock },
	{ path: '/facture', name: 'facture', component: Facture },
	{ path: '/rapports', name: 'rapports', component: Rapports },
	{ path: '/parametre', name: 'parametre', component: Parametre },
	{ path: '/livraison', name: 'livraison', component: Livraison },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
// import VueAxios from 'vue-axios';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		canciones: [],
		cancion: {},
		
	},
	mutations: {
		
		OBTENER_CANCIONES(state, payload) {
			console.log(payload);
			state.canciones = payload;
		},

	},
	actions: {
	
		buscarCancion({ commit }, payload) {
			axios
				.get(
					`https://pure-stream-06458.herokuapp.com/https://api.deezer.com/search?q=${payload}`
				)
				.then((res) => {
					// return res.data;
					commit('OBTENER_CANCIONES', res.data.data);
				})
				.catch((e) => {
					console.log(e);
				});
		}
	},
	getters: {
		canciones: (state) => state.canciones,
	},
	modules: {},
});

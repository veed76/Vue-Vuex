import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth.module";
import htmlClass from "./htmlclass.module";
import config from "./config.module";
import blog from "./blog.module";


// mutation types
export const SET_LOADING = "setLoading";
export const SET_ERRORS = "setErrors";
export const RESET_ERRORS = "resetErrors";
export const SET_MESSAGE = "setMessage";
export const SET_SNAKBAR= "setSnackbar";
export const INIT = "init";

Vue.use(Vuex);


const si = {
    namespaced: true,
    modules: {
        blog
    }
};

const getters = {
    loading: (state) => {
        return state.loading;
    },
    errors: (state) => {
        return state.errors;
    },
    message: (state) => {
        return state.message;
    },
    snackbar: (state) => {
        return state.snackbar;
    }
};

const mutations = {
    [SET_LOADING](state, data) {
        state.loading = data;
    },
    [SET_ERRORS](state, data) {

        state.errors = data.data.message;

        console.log( state.errors);
    },
    [RESET_ERRORS](state) {
        state.errors = [];
    },
    [SET_MESSAGE](state, message) {
        state.message = message;
        state.snackbar = true;

    },
    [SET_SNAKBAR](state, data) {
        state.snackbar = data;
    },
    [INIT](state){
        state.loading = true;
        state.errors = [];
        state.message = null;
        state.snackbar = false;
    }
};

const state = {
    loading: true,
    errors: [],
    message: null,
    snackbar: false,
}


export default new Vuex.Store({
    strict: true,
    state,
    mutations,
    getters,
    modules: {
        auth,
        htmlClass,
        config,
        si
    },
});


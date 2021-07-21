// action types
import ApiService from "@/core/services/api.service";
import {SET_LOADING, SET_ERRORS, RESET_ERRORS, SET_MESSAGE, SET_SNAKBAR } from "@/core/services/store";

// action types
export const LOADBLOGS = "loadBlogs";
export const STOREBLOG = "storeBlog";
export const EDITBLOG = "editBlog";
export const UPDATEBLOG = "updateBlog";
export const DELETEBLOG = "deleteBlog";

// mutation types
export const SET_BLOGS = "setBlogs";
export const INIT_BLOG = "initBlogs";

const state = {
    blogs: [],
};

const getters = {
    blogs: (state) => {
        return state.blogs;
    }
};

const actions = {
    [LOADBLOGS](context, payload) {
        context.commit(SET_LOADING, true, {root: true});
        return new Promise((resolve) => {
            ApiService.query("/api/blogs", {params: payload})
                .then(({data}) => {
                    context.commit(SET_BLOGS, data);
                    context.commit(SET_LOADING, false, {root: true});
                    resolve(data)
                })
                .catch(({response}) => {
                    console.log(response.data.errors);
                });
        })
    },
    [STOREBLOG](context, payload) {
        context.commit(SET_LOADING, true, {root: true});
        return new Promise((resolve) => {
            ApiService.post("/api/blogs", payload)
                .then(({data}) => {
                    context.commit(RESET_ERRORS,"", {root: true});
                    context.commit(SET_MESSAGE, data.message, {root: true});
                    context.commit(SET_LOADING, false, {root: true});
                    setTimeout( function() {
                        context.commit(SET_SNAKBAR, false, {root: true});
                    }, 2000)
                    resolve(data)
                })
                .catch(({response}) => {
                    console.log('----error');
                    context.commit(SET_ERRORS, response, {root: true});
                });
        })
    },
    [EDITBLOG](context, payload) {
        context.commit(SET_LOADING, true, {root: true});
        return new Promise((resolve) => {
            ApiService.get("/api/blogs", payload)
                .then(({data}) => {
                    context.commit(SET_LOADING, false, {root: true});
                    resolve(data)
                })
                .catch(({response}) => {
                    console.log(response.data.errors);
                });
        })
    },
    [UPDATEBLOG](context, payload) {
        context.commit(SET_LOADING, true, {root: true});
        context.commit(RESET_ERRORS,"", {root: true});
        return new Promise((resolve) => {
            ApiService.put("/api/blogs/" + payload.id, payload)
                .then(({data}) => {
                    context.commit(RESET_ERRORS,"", {root: true});
                    context.commit(SET_MESSAGE, data.message, {root: true});
                    context.commit(SET_LOADING, false, {root: true});
                    setTimeout( function() {
                        context.commit(SET_SNAKBAR, false, {root: true});
                    }, 2000)
                    resolve(data)
                })
                .catch(({response}) => {
                    context.commit(SET_ERRORS, response, {root: true});
                });
        })
    },
    [DELETEBLOG](context, payload) {
        context.commit(SET_LOADING, true, {root: true});
        return new Promise((resolve) => {
            ApiService.delete("/api/blogs/" + payload)
                .then(({data}) => {
                    context.commit(SET_MESSAGE, data.message, {root: true});
                    context.commit(SET_LOADING, false, {root: true});
                    resolve(data)
                })
                .catch(({response}) => {
                    context.commit(SET_MESSAGE, response.data.error,{root: true});
                });
        })
    }
};

const mutations = {
    [SET_BLOGS](state, data) {
        state.blogs = data;
    },
    [INIT_BLOG](state){
        state.blogs = [];
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};

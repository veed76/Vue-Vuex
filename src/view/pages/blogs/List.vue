<template>
    <b-container class="bv-example-row">
        <b-row class="text-center">
            <b-col></b-col>
            <b-col cols="8">
                <div class="" >
                    <br>
                    <div class="form-inline" action="#">
                        <input type="text" id="form-name" v-model="item.name"  placeholder="Name" class="form-control">
                        <div align="left" v-if="errors && errors.name"> <b class="alert-danger" v-for="(error,index) in errors.name" v-bind:key="index"> {{error}} </b>  </div>
                        <br>
                        <input type="text"  placeholder="Description" v-model="item.description"  class="form-control">
                        <div align="left" v-if="errors && errors.description"> <b class="alert-danger" v-for="(error,index) in errors.description" v-bind:key="index"> {{error}} </b>  </div><br>
                        <button @click="addItem" class="btn btn-dark">Add</button>
                    </div>

                    <br><br>
                    <table class="table table-striped table-bordered table-sm">
                        <thead class="thead-light">
                        <th>Name</th>
                        <th>Description</th>
                        <th class="col-2">Edit/Del</th>
                        </thead>
                        <tr v-for="(item) in blogs.data" :key="item.id">
                            <td>
                                <input v-if="item.edit" type="text" v-model="item.name"  >
                                <span v-else>{{item.name}} </span>
                            </td>
                            <td>
                                <input v-if="item.edit" type="text" v-model="item.desc" >
                                <span v-else>{{item.description}} </span>
                            </td>
                            <td>
                                <button @click="deleteItemMethod(item.id)" class="btn btn-info">Delete</button></td>
                        </tr>
                    </table>
                </div>
            </b-col>
            <b-col><br><button @click="logout()" class="btn btn-dark">Logout</button></b-col>
        </b-row>
    </b-container>
</template>

<script>
    import {mapGetters} from "vuex";
    import {LOADBLOGS, DELETEBLOG, STOREBLOG} from "@/core/services/store/blog.module";
    import {LOGOUT} from "@/core/services/store/auth.module";



    export default {
        data() {
            return {
                item: {name: "", description: ""},
                items: [],
                deleteItem: {},
                viewDeleteDialog: false,
            }
        },
        computed: {
            ...mapGetters({
                blogs:"si/blog/blogs",
                loading:"loading",
                errors:"errors",
                message:"message",
                snackbar:"snackbar"
            })
        },
        async created() {

            this.$store.commit("init")
            await this.$store
                .dispatch("si/blog/"+LOADBLOGS);
            console.log(this.blogs);
        },
        methods: {
            logout(){
                this.$store
                    .dispatch(LOGOUT).then(() => this.$router.push({ name: "login" }))
                    .catch(() => {});
            },
            showDeleteDialog(item) {
                this.viewDeleteDialog = true;
                this.deleteItem = item;
            },
            async deleteItemMethod(id) {
                this.viewDeleteDialog = false;

                await this.$store
                    .dispatch("si/blog/"+DELETEBLOG, id);

                await this.$store
                    .dispatch("si/blog/"+LOADBLOGS);
            },
            async addItem(){

                await this.$store
                    .dispatch("si/blog/"+STOREBLOG, this.item);
                this.item = {name: "", description: ""};

                await this.$store
                    .dispatch("si/blog/"+LOADBLOGS);
            },
        }
    };
</script>

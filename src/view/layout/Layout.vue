<template>
  <b-container class="bv-example-row">
    <b-row class="text-center">
      <b-col></b-col>
      <b-col cols="8">
        <div class="" >
          <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
              <li v-for="(error,index) in errors" v-bind:key="index">{{ error }}</li>
            </ul>
          </p>
          <br>
          <div class="form-inline" action="#">
            <input type="text" id="form-name" v-model="item.name"  placeholder="Name" class="form-control">
            <input type="text"  placeholder="Description" v-model="item.desc"  class="form-control">
            <button @click="addItem" class="btn btn-dark">Add</button>
          </div>

          <br><br>
          <table class="table table-striped table-bordered table-sm">
            <thead class="thead-light">
            <th>Name</th>
            <th>Description</th>
            <th class="col-2">Edit/Del</th>
            </thead>
            <tr v-for="(item, index) in items" :key="item.id">
              <td>
                <input v-if="item.edit" type="text" v-model="item.name"  >
                <span v-else>{{item.name}} </span>
              </td>
              <td>
                <input v-if="item.edit" type="text" v-model="item.desc" >
                <span v-else>{{item.desc}} </span>
              </td>
              <td><button @click="item.edit = !item.edit" class="btn btn-info">Edit</button>
                <button @click="removeItem(index)" class="btn btn-info">Delete</button></td>
            </tr>
          </table>
        </div>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>

</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Layout",
  data: function() {
    return {
      errors: [],
      item: {name: "", desc: "", edit: false},
      items: []
    }
  },
  methods:{
    addItem(){

      if (!this.item.name && !this.item.desc) {
        this.errors = [];

        if (!this.name) {
          this.errors.push('Name required.');
        }
        if (!this.age) {
          this.errors.push('Age required.');
        }
        return true;
      }

      this.items.push({name:this.item.name, desc:this.item.desc, edit: false})
      this.item = [];

    },
    removeItem(index){
      this.items.splice(index, 1)
    }
  },
  computed: {
    ...mapGetters([
      "isAuthenticated",
    ]),

  }
};
</script>

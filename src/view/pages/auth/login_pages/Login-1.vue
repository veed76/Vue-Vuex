<template>
  <div class="content">
    <div class="container">
      <b-row class="justify-content-md-center Absolute-Center is-Responsive">
        <b-col col lg="2"></b-col>
        <b-col cols="12" md="auto">
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
                    id="input-group-1"
                    label="Email address:"
                    label-for="input-1"
                    description="We'll never share your email with anyone else."
            >
              <b-form-input
                      id="input-1"
                      v-model="form.email"
                      type="email"
                      placeholder="Enter email"
                      required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
              <b-form-input
                      id="input-2"
                      type="password"
                      v-model="form.password"
                      placeholder="Enter Password"
                      required
              ></b-form-input>
            </b-form-group>
            <br>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
        </b-col>
        <b-col col lg="2"></b-col>
      </b-row>
    </div>


  </div>
</template>

<script>

import { mapGetters, mapState } from "vuex";
import { LOGIN } from "@/core/services/store/auth.module";
// import Swal from "sweetalert2";

export default {
  name: "login-1",
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      show: true
    }
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    }),
    ...mapGetters(["currentUser"]),
  },
  mounted() {
    console.log(process.env.VUE_APP_ROOT_API)
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      let base = this;
      this.$store
              .dispatch(LOGIN,  base.form)
              .then(() => this.$router.push({ name: "blogs" }))
              .catch(() => {});
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
};
</script>

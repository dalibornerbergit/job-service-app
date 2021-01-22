<template>
  <div class="pa-4">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Register</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field v-model="first_name" label="First name" required>
              </v-text-field>
              <v-text-field v-model="last_name" label="Last name" required>
              </v-text-field>
              <v-text-field v-model="email" label="Email" type="email" required>
              </v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
              >
              </v-text-field>
              <v-text-field
                v-model="password_confirmation"
                label="Password confirmation"
                type="password"
                required
              >
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="pa-4"
            ><v-spacer></v-spacer
            ><v-btn
              :disabled="checkPassword"
              class="blue white--text"
              depressed
              @click="register"
              >register</v-btn
            ></v-card-actions
          >
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Api from "../../Api/Api";

export default {
  data: () => ({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  }),
  computed: {
    checkPassword: function () {
      if (this.password != this.password_confirmation) return true;
      else return false;
    },
  },
  methods: {
    register() {
      console.log("Register");

      Api.post("/register", {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
      })
        .then(() => {
          window.location.href = "/login";
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>
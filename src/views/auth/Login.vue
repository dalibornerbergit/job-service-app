<template>
  <div class="pa-4">
    <div>
      <v-alert v-model="errorAlert" border="top" color="red lighten-2" dark>
        {{ errorMessage }}
      </v-alert>
    </div>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-text-field v-model="email" label="Email" required>
            </v-text-field>
            <v-text-field
              v-model="password"
              type="password"
              label="Password"
              required
            >
            </v-text-field>
          </v-card-text>
          <v-card-actions class="pa-4">
            <v-spacer></v-spacer>
            <v-btn class="blue white--text" depressed @click="login"
              >Login</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Api from "../../Api/Api";

export default {
  data: () => ({
    email: "",
    password: "",
    errorMessage: "",
    errorAlert: false,
  }),
  methods: {
    login() {
      Api.post("/login", {
        email: this.email,
        password: this.password,
      })
        .then((response) => {
          console.log(response);
          localStorage.setItem("api_token", response.data.data.api_token);
          this.$store.dispatch("user", response.data.data);
          window.location.href = "/";
        })
        .catch(() => {
          this.errorAlert = true;
          this.errorMessage = "Invalid input";
        });
    },
  },
};
</script>

<style>
</style>
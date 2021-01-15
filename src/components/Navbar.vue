<template>
  <nav>
    <!-- Nav -->
    <v-app-bar app flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase">
        <span>ks</span>
        <span class="font-weight-bold">interface</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- Dropdown menu -->
      <div class="d-none d-md-flex mx-2">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="grey" text v-bind="attrs" v-on="on">
              <v-icon left>mdi-chevron-down</v-icon>menu
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(link, index) in links"
              :key="index"
              link
              :to="link.route"
            >
              <v-list-item-title>
                <v-icon left>{{ link.icon }}</v-icon>
                {{ link.text }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <span
        class="blue-grey darken-4 white--text d-none d-sm-flex py-1 px-2 rounded"
        >example@gmail.com</span
      >

      <!-- Logout -->
      <div>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn @click="logout" icon v-bind="attrs" v-on="on">
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </template>
          <span class="red--text">Logout</span>
        </v-tooltip>
      </div>
    </v-app-bar>

    <!-- Sidebar -->
    <v-navigation-drawer app v-model="drawer" class="blue-grey darken-4">
      <v-row class="mb-4">
        <v-col class="text-center">
          <span class="overline white--text">job service</span>
        </v-col>
      </v-row>

      <!-- List of actions -->
      <v-list>
        <v-list-item
          v-for="(link, index) in links"
          :key="index"
          link
          :to="link.route"
        >
          <v-list-item-title class="white--text">
            <v-icon color="white" left>{{ link.icon }}</v-icon>
            {{ link.text }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Api from "../Api/Api";

export default {
  data: () => ({
    drawer: false,
    links: [
      { icon: "mdi-account-circle", text: "Register", route: "/register" },
      { icon: "mdi-account", text: "Login", route: "/login" },
      { icon: "mdi-office-building", text: "Jobs", route: "/jobs" },
    ],
  }),
  methods: {
    logout() {
      Api.post("/logout")
        .then((response) => {
          console.log(response);
          localStorage.removeItem("api_token");
          window.location.href = "/";
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
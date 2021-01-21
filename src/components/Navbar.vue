<template>
  <nav>
    <!-- Nav -->
    <v-app-bar app flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase">
        <span>job</span>
        <span class="font-weight-bold">service</span>
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
            <v-list-item to="/admin-panel">
              <v-list-item-title>
                <v-icon left>mdi-account-key</v-icon>
                Admin panel
              </v-list-item-title>
            </v-list-item>
            <v-list-item v-if="!user" to="/login">
              <v-list-item-title>
                <v-icon left>mdi-account</v-icon>
                Login
              </v-list-item-title>
            </v-list-item>
            <v-list-item v-if="!user" to="/register">
              <v-list-item-title>
                <v-icon left>mdi-account-circle</v-icon>
                Register
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <span
        v-if="user"
        class="blue-grey darken-4 white--text d-none d-sm-flex py-1 px-2 rounded"
        >{{ user.email }}</span
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
          <v-list-item-title>
            <v-icon left>{{ link.icon }}</v-icon>
            {{ link.text }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item to="/admin-panel">
          <v-list-item-title>
            <v-icon left>mdi-account-key</v-icon>
            Admin panel
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-if="!user" to="/login">
          <v-list-item-title>
            <v-icon left>mdi-account</v-icon>
            Login
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-if="!user" to="/register">
          <v-list-item-title>
            <v-icon left>mdi-account-circle</v-icon>
            Register
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Api from "../Api/Api";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    drawer: false,
    links: [{ icon: "mdi-office-building", text: "Jobs", route: "/jobs" }],
  }),
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    logout() {
      Api.post("/logout")
        .then((response) => {
          console.log(response);
          localStorage.removeItem("api_token");
          this.$store.dispatch("user", null);
          window.location.href = "/login";
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
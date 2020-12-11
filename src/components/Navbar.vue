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
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </template>
          <span class="red--text">Logout</span>
        </v-tooltip>
      </div>
    </v-app-bar>

    <!-- Sidebar -->
    <v-navigation-drawer app v-model="drawer" class="blue-grey darken-4">
      <v-row class="mt-5">
        <v-col class="d-flex justify-center">
          <v-avatar color="transparent" size="100">
            <img src="/ante.jpg" alt="Image not found" />
          </v-avatar>
        </v-col>
      </v-row>

      <v-row class="mb-4">
        <v-col class="text-center">
          <span class="overline white--text">Some text</span>
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
export default {
  data: () => ({
    drawer: false,
    links: [
      { icon: "mdi-plus", text: "test", route: "/test" },
      { icon: "mdi-plus", text: "test1", route: "/test1" },
      { icon: "mdi-plus", text: "test2", route: "/test2" },
    ],
  }),
};
</script>
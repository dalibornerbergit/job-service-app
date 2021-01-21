<template>
  <div class="pa-4">
    <v-card class="mx-auto mt-10" max-width="600px">
      <v-card-title class="blue-grey darken-4 white--text"
        >{{ user.first_name }} {{ user.last_name }}</v-card-title
      >
      <v-card-text class="pa-4">
        <p>
          Email: <b>{{ user.email }}</b>
        </p>
        <p>
          Joined:
          <b>{{
            moment(user.created_at).format("DD.MM.YYYY.")
          }}</b>
        </p>
      </v-card-text>
      <v-card-actions class="pa-4">
        <v-btn depressed text @click="$router.back()">back</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Api from "../../Api/Api";

export default {
  data: () => ({
    user: {},
  }),
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      let id = this.$route.params.id;

      Api.get(`/users/${id}`)
        .then((response) => {
          console.log(response);

          this.user = response.data.data;
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
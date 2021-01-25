<template>
  <div class="pa-4">
    <v-card class="mx-auto mt-10" max-width="600px">
      <v-card-title class="blue-grey darken-4 white--text"
        >{{ userProfile.first_name }} {{ userProfile.last_name }}</v-card-title
      >
      <v-card-text class="pa-4">
        <p>
          Email: <b>{{ userProfile.email }}</b>
        </p>
        <p>
          Joined:
          <b>{{ moment(userProfile.created_at).format("DD.MM.YYYY.") }}</b>
        </p>
      </v-card-text>
      <v-card-actions class="pa-4">
        <v-btn depressed text @click="$router.back()">back</v-btn>
      </v-card-actions>
    </v-card>

    <div v-if="user.id === userProfile.id">
      <h2>Active jobs</h2>

      <v-row>
        <v-col v-for="job in jobs" :key="job.id" cols="12" sm="6" md="3">
          <v-card>
            <v-card-title class="blue-grey darken-4 white--text"
              >{{ job.title }} {{ job.id }}</v-card-title
            >
            <v-card-text class="pa-4">
              <p>{{ job.description.slice(0, 40) }}...</p>
            </v-card-text>
            <v-card-actions class="pa-4">
              <v-btn @click="removeJob(job.id)" text small depressed
                >delete</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn
                @click="
                  $router.push({ name: 'EditJob', params: { id: job.id } })
                "
                depressed
                small
                class="orange"
                >edit</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn
                @click="
                  $router.push({ name: 'ShowJob', params: { id: job.id } })
                "
                depressed
                small
                class="blue white--text"
                >details</v-btn
              ></v-card-actions
            >
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Api from "../../Api/Api";

export default {
  data: () => ({
    userProfile: {},
    jobs: [],
  }),
  created() {
    this.fetchUser();
    this.fetchUsersJobs();
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapActions(["deleteJob"]),
    fetchUser() {
      let id = this.$route.params.id;

      Api.get(`/users/${id}?include=userJobs`)
        .then((response) => {
          console.log(response);

          this.userProfile = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchUsersJobs() {
      let id = this.$route.params.id;

      Api.get(`/recruiters/${id}/recruiterJobs`)
        .then((response) => {
          console.log(response);

          this.jobs = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removeJob(id) {
      this.deleteJob(id)
        .then(() => {
          this.fetchUsersJobs();
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
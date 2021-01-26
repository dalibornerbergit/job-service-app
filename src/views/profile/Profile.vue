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
        <p>
          Skills:
          <b v-for="skill in userProfile.skills" :key="skill.id">
            {{ skill.name }} /
          </b>
        </p>
        <div v-if="user.id === userProfile.id" class="text-center">
          <v-btn
            @click="showAddSkills = !showAddSkills"
            depressed
            small
            class="blue white--text"
            >Add more skills</v-btn
          >
        </div>
        <div v-if="showAddSkills && user.id === userProfile.id">
          <v-select
            :items="allSkills.data"
            item-value="id"
            item-text="name"
            multiple
            v-model="selectedSkills"
          ></v-select>
          <div class="text-right">
            <v-btn @click="addSkills()" depressed small class="blue white--text"
              >Add skills</v-btn
            >
          </div>
        </div>
      </v-card-text>
      <v-card-actions class="pa-4">
        <v-btn depressed text @click="$router.back()">back</v-btn>
      </v-card-actions>
    </v-card>

    <div class="py-4" v-if="user.id === userProfile.id">
      <h2>Active jobs</h2>

      <v-row>
        <v-col v-for="job in jobs" :key="job.id" cols="12" sm="6" md="3">
          <v-card>
            <v-card-title class="blue-grey darken-4 white--text"
              >{{ job.title }}
              <v-spacer></v-spacer>
              <v-chip
                v-if="!job.in_progress && !job.finished"
                class="yellow"
              ></v-chip>
              <v-chip v-if="job.in_progress" class="orange"></v-chip>
              <v-chip v-if="job.finished" class="green"></v-chip>
            </v-card-title>
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
    userProfile: {
      skills: [],
    },
    selectedSkills: [],
    jobs: [],
    showAddSkills: false,
  }),
  created() {
    this.fetchUser();
    this.fetchSkills();
    this.fetchUsersJobs();
  },
  computed: {
    ...mapGetters(["user", "allSkills"]),
  },
  methods: {
    ...mapActions(["fetchSkills", "deleteJob"]),
    fetchUser() {
      let id = this.$route.params.id;

      Api.get(`/users/${id}?include=skills`)
        .then((response) => {
          console.log(response);

          this.userProfile = response.data.data;
          this.selectedSkills = response.data.data.skills;
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
    addSkills() {
      Api.patch(`/users/${this.userProfile.id}/skills/sync`, {
        resources: this.selectedSkills,
      })
        .then(() => {
          window.location.reload();
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
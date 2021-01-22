<template>
  <div class="pa-4">
    <div class="text-center">
      <v-btn @click="applyForJob()" depressed class="green white--text"
        >Apply</v-btn
      >
    </div>
    <h1>{{ job.title }}</h1>
    <p>{{ job.description }}</p>
    <v-btn @click="$router.back()" text>back</v-btn>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Api from "../../Api/Api";

export default {
  data: () => ({
    job: {
      title: "",
      description: "",
    },
  }),
  created() {
    this.fetchJob();
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    fetchJob() {
      let id = this.$route.params.id;

      Api.get(`/jobs/${id}`)
        .then((response) => {
          this.job = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    applyForJob() {
      Api.post(`/jobs/${this.job.id}/applications/attach`, {
        resources: [this.user.id],
      })
        .then((response) => {
          console.log(response);
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
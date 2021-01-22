<template>
  <div class="pa-4">
    <div class="text-center">
      <v-btn depressed class="green white--text">Apply</v-btn>
    </div>
    <h1>{{ job.title }}</h1>
    <p>{{ job.description }}</p>
    <v-btn @click="$router.back()" text>back</v-btn>
  </div>
</template>

<script>
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
  },
};
</script>

<style>
</style>
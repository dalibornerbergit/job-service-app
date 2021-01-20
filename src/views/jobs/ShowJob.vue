<template>
  <div class="pa-4">
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
    let id = this.$route.params.id;

    Api.get(`/jobs/${id}`)
      .then((response) => {
        this.job = response.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
</style>
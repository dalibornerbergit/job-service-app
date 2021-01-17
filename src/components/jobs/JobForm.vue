<template>
  <v-card>
    <v-card-title>Crate job</v-card-title>
    <v-card-text>
      <v-text-field v-model="job.title" label="Title"></v-text-field>
      <v-textarea v-model="job.description" label="Description"></v-textarea>
    </v-card-text>
    <v-card-actions class="pa-4">
      <v-spacer></v-spacer>
      <v-btn @click="submitJob" depressed class="blue white--text"
        >create</v-btn
      ></v-card-actions
    >
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    job: {
      title: "",
      description: "",
      employee_id: null,
      recruiter_id: null,
      in_progress: false,
      finished: false,
    },
  }),
  methods: {
    ...mapActions(["addJob"]),
    submitJob() {
      this.addJob(this.job)
        .then(() => {
          console.log();
          this.$emit("jobCreated");
        })
        .catch(() => {
          console.log("Fail");
          this.$emit("error");
        });
    },
  },
};
</script>

<style>
</style>
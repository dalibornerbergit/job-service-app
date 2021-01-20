<template>
  <div class="pa-4">
    <div class="text-right">
      <v-btn @click="dialog = true" depressed class="blue white--text"
        ><v-icon left>mdi-plus</v-icon>Job</v-btn
      >
    </div>

    <v-row>
      <v-col v-for="job in allJobs.data" :key="job.id" cols="12" sm="6" md="4">
        <v-card flat>
          <v-card-title>{{ job.title }}</v-card-title>
          <v-card-text>{{ job.description }}</v-card-text>
          <v-card-actions class="pa-4">
            <v-btn @click="deleteJob(job.id)" depressed>delete</v-btn>
            <v-spacer></v-spacer>
            <v-btn
              @click="$router.push({ name: 'EditJob', params: { id: job.id } })"
              depressed
              class="orange"
              >edit</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn
              @click="$router.push({ name: 'ShowJob', params: { id: job.id } })"
              depressed
              class="blue white--text"
              >details</v-btn
            ></v-card-actions
          >
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" width="600">
      <add-job
        :job="job"
        @jobCreated="dialog = false"
        @closeDialog="dialog = false"
      />
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AddJob from "../../components/jobs/AddJob.vue";

export default {
  components: {
    AddJob,
  },
  data: () => ({
    job: {},
    dialog: false,
  }),
  methods: {
    ...mapActions(["fetchJobs", "deleteJob"]),
  },
  computed: {
    ...mapGetters(["allJobs"]),
  },
  created() {
    this.fetchJobs();
  },
};
</script>

<style>
</style>
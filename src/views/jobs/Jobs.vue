<template>
  <div class="pa-4">
    <div class="text-right">
      <v-btn @click="dialog = true" depressed class="blue white--text"
        ><v-icon left>mdi-plus</v-icon>Job</v-btn
      >
    </div>

    <v-row>
      <v-col cols="12" lg="2"
        ><v-select
          :items="allSkills.data"
          label="Filter by skill"
          return-object
          item-text="name"
          v-model="selectedSkill"
        ></v-select
      ></v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="job in allJobs.data.filter(
          (job) => !job.in_progress && !job.finished
        )"
        :key="job.id"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card>
          <v-card-title class="blue-grey darken-4 white--text">{{
            job.title
          }}</v-card-title>
          <v-card-text class="pa-4">
            <p>{{ job.description.slice(0, 40) }}...</p>
            <p>
              Skills:
              <b v-for="skill in job.skills" :key="skill.id"
                >{{ skill.name }} /</b
              >
            </p>

            <div class="text-right">
              <div>
                Crated by:
                <b
                  style="cursor: pointer"
                  @click="
                    $router.push({
                      name: 'Profile',
                      params: { id: job.recruiter_id },
                    })
                  "
                >
                  {{ job.recruiter.first_name }}
                  {{ job.recruiter.last_name }}
                </b>
              </div>
            </div>
          </v-card-text>
          <v-card-actions class="pa-4">
            <v-btn
              v-if="job.recruiter.id === user.id"
              @click="deleteJob(job.id)"
              text
              small
              depressed
              >delete</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn
              v-if="job.recruiter.id === user.id"
              @click="$router.push({ name: 'EditJob', params: { id: job.id } })"
              depressed
              small
              class="orange"
              >edit</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn
              @click="$router.push({ name: 'ShowJob', params: { id: job.id } })"
              depressed
              small
              class="blue white--text"
              >details</v-btn
            ></v-card-actions
          >
        </v-card>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="allJobs.meta.last_page"
      ></v-pagination>
    </div>

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
    selectedSkill: null,
    page: 1,
  }),
  watch: {
    page: function () {
      this.fetchJobs(this.page);
    },
  },
  methods: {
    ...mapActions(["fetchJobs", "fetchSkills", "deleteJob"]),
  },
  computed: {
    ...mapGetters(["user", "allJobs", "allSkills"]),
  },
  created() {
    this.fetchJobs();
  },
};
</script>

<style>
</style>
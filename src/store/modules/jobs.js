import Api from '../../Api/Api'

const state = {
    jobs: []
}

const getters = {
    allJobs: (state) => state.jobs
}

const actions = {
    async fetchJobs({ commit }) {

        const response = await Api.get(`/jobs`)

        console.log(response)

        commit('setJobs', response.data)
    },
    async addJob({ commit }, job) {
        const response = await Api.post('/jobs', job)

        commit('newJob', response.data.data)
    },
}

const mutations = {
    setJobs: (state, jobs) => state.jobs = jobs,
    newJob: (state, job) => state.jobs.data.unshift(job)
}

export default {
    state, getters, actions, mutations
}
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
    async updateJob({ commit }, job) {
        const response = await Api.put(`jobs/${job.id}`, job)

        commit('updatedJob', response.data.data)
    },
    async deleteJob({ commit }, id) {
        await Api.delete(`jobs/${id}`)

        commit('removeJob', id)
    },
}

const mutations = {
    setJobs: (state, jobs) => state.jobs = jobs,
    newJob: (state, job) => state.jobs.data.unshift(job),
    updatedJob: (state, updJob) => {
        const index = state.jobs.data.findIndex(job => job.id === updJob.id)

        if (index !== -1) {
            state.jobs.data.splice(index, 1, updJob)
        }
    },
    removeJob: (state, id) => state.jobs.data.splice(state.jobs.data.map(item => item.id).indexOf(id), 1)
}

export default {
    state, getters, actions, mutations
}
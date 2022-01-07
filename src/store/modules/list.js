import request from "@/util/request";

const state = {
  picks: [],
};

// getters
const getters = {
  getPicks: (state) => state.picks,
};

// actions
const actions = {
  getPicks(context) {
    return request({
      url: `/picklist`,
      method: "get",
      async: true,
    }).then((resp) => {
      context.commit("SET_PICK", resp);
      return resp;
    });
  },
};

// mutations
const mutations = {
  SET_PICK(state, data) {
    state.picks = data;
  },
};

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations,
};

import request from "@/util/request";

const state = {
  orders: [],
};

// getters
const getters = {
  getOrders: (state) => state.orders,
};

// actions
const actions = {
  getOrders(context, query) {
    return request({
      url: `/orders`,
      method: "get",
    }).then((resp) => {
      context.commit("SET_ORDER", resp);
      return resp;
    });
  },
};

// mutations
const mutations = {
  SET_ORDER(state, data) {
    state.orders = data;
  },
};

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations,
};

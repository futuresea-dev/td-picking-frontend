<template>
  <v-app dark>
    <router-view></router-view>
    <v-snackbar v-model="snackbar.show" :timeout="3000" app top centered :color="snackbar.color">
      {{ snackbar.text }}
      <template #action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="$store.commit('HIDE_SNACKBAR')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {
  },
  data() {
    return {
      rightDrawer: false,
      showSetting: true,
    }
  },
  computed: {
    ...mapGetters(['getSnackbar']),
    snackbar: {
      get() {
        return this.getSnackbar
      },
      set(val) {
        this.$store.commit('UPDATE_SNACKBAR', val)
      },
    },
  },
  mounted() {
    if (typeof window !== undefined && window._VMA === undefined) {
      window._VMA = this
    }
  },
  created() {},
  methods: {
  },
}
</script>

<style lang="sass" scoped>
.setting-fab
  top: 50% !important
  right: 0
  border-radius: 0
.chat-fab
  top: calc(50% + 40px) !important
  right: 0
  border-radius: 0
.v-application .primary
    background-color: #1edae9 !important
    border-color: #1edae9 !important

</style>

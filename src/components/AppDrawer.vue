<template>
  <v-navigation-drawer
    v-model="showDrawer"
    dark
    app
    class="app-drawer"
    mini-variant="true"
    mini-variant-width="64"
    :width="drawerWidth"
    style="background-color: #132639"
  >
    <v-toolbar style="background-color: #132639" dark>
      <img :src="computeLogo" height="36" alt="Vue Material Admin Template" />
      <v-toolbar-title>
        <span class="hidden-sm-and-down">Picking System</span>
      </v-toolbar-title>
    </v-toolbar>
    <!-- <app-switcher /> -->
    <vue-perfect-scrollbar class="app-drawer__scrollbar">
      <div class="app-drawer__inner">
        <nav-list :items="computeMenu" :mini="mini" />
      </div>
    </vue-perfect-scrollbar>
  </v-navigation-drawer>
</template>
<script>
import { protectedRoute as routes } from "@/router/config";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import NavList from "@/components/nav/NavList";
export default {
  name: "AppDrawer",
  components: { VuePerfectScrollbar, NavList },
  props: {},
  data() {
    return {
      mini: false,
      showDrawer: true,
      drawerWidth: 256,
      scrollSettings: {
        maxScrollbarLength: 160,
      },
    };
  },

  computed: {
    computeLogo() {
      return "/static/m.png";
    },
    computeMenu() {
      return this.filterRouteItem(routes[0].children);
    },
    computeHeight() {
      return {
        height: this.height || "",
      };
    },
  },
  created() {},

  methods: {
    filterRouteItem(routes) {
      return routes
        .filter((item) => item.meta.hidden !== true)
        .map((item) => {
          return {
            title: this.$t(item.meta.title),
            icon: item.meta.icon,
            path: item.path,
            isNew: item.meta.isNew || false,
            children: item.children ? this.filterRouteItem(item.children) : [],
          };
        });
    },
    handleDrawerCollapse() {
      this.mini = !this.mini;
    },
    toggleDrawer() {
      this.showDrawer = !this.showDrawer;
    },
  },
};
</script>

<style lang="sass" scoped>
.app-drawer
  &__srollbar
    max-height:  calc(100vh - 64px - 36px - 44px)
  &__inner
    height: calc(100vh - 64px - 36px - 44px)
</style>

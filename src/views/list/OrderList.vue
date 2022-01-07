<template>
  <v-container>
    <v-row>
      <v-col cols="9">
        <v-card tile>
          <v-tabs v-model="tab">
            <v-tab
              v-for="item in items"
              :key="item.tab"
              style="border: 1px solid black; border-radius: 8px 8px 0 0"
            >
              {{ item.tab }}
              <v-btn icon @click="dialog = true"> [...] </v-btn>
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in items" :key="item.tab">
              <v-card flat>
                <v-data-table
                  :headers="headers"
                  :items="picks"
                  :items-per-page="itemsPerPage"
                  :items-per-page-options="[15, 30, 50]"
                  :loading="loadingItems"
                  :page.sync="filter['page']"
                  hide-default-header
                  item-key="2"
                  show-select
                >
                </v-data-table>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="card-right" tile>
          <v-card-title>Filters</v-card-title>
          <v-text-field
            flat
            label="search files, folders"
            placeholder="search"
            prepend-icon="mdi-magnify"
            solo
            width="250"
          />
          <label class="font-weight-bold">Warehouse</label>
          <v-select
            v-model="selectmodel"
            :items="options"
            label="Warehouse"
            outlined
            placeholder="Warehouse"
            required
          />
          <label class="font-weight-bold">Size</label>
          <v-select
            v-model="selectmodel"
            :items="options"
            label="Size"
            outlined
            placeholder="Size"
            required
          />
          <label class="font-weight-bold">Weight</label>
          <v-select
            v-model="selectmodel"
            :items="options"
            label="Weight"
            outlined
            placeholder="Weight"
            required
          />
          <label class="font-weight-bold">Order ID</label>
          <v-select
            v-model="selectmodel"
            :items="options"
            label="Order ID"
            outlined
            placeholder="Order ID"
            required
          />
          <label class="font-weight-bold">Order Amount</label>
          <v-select
            v-model="selectmodel"
            :items="options"
            label="Order Amount"
            outlined
            placeholder="Order Amount"
            required
          />
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="300px">
      <v-card>
        <v-card-title>Daily KPI Prompt</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px">
          <v-radio-group v-model="dialogm1" column>
            <v-radio label="Selected" value="Selected"></v-radio>
            <v-radio label="Unselected" value="Unselected"></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import TooltipMixin from "@/mixins/Tooltip";
import { mapGetters } from "vuex";

export default {
  name: "OrderList",
  components: {},
  mixins: [TooltipMixin],
  data() {
    return {
      tab: null,
      items: [
        { tab: "01/11/2021 Monday", content: "Tab 1 Content" },
        { tab: "02/11/2021 Monday", content: "Tab 2 Content" },
        { tab: "03/11/2021 Monday", content: "Tab 3 Content" },
        { tab: "04/11/2021 Monday", content: "Tab 4 Content" },
        { tab: "05/11/2021 Monday", content: "Tab 5 Content" },
        { tab: "06/11/2021 Monday", content: "Tab 6 Content" },
        { tab: "07/11/2021 Monday", content: "Tab 7 Content" },
      ],
      headers: [
        { text: "delivery_type", value: "0" },
        { text: "warehouse", value: "1" },
        { text: "number", value: "2" },
      ],
      picks: [],
      dialog: false,
      dialogm1: null,

      options: ["options1", "options2", "options3"],
      selectmodel: [],

      showDialog: false,
      search: "",
      loadingItems: false,
      selectedItem: null,
      serverItemsLength: 0,
      itemsPerPage: 15,
      showFilter: true,
      filter: {
        page: 1,
        "filter[name]": null,
        "filter[project_id]": null,
        "filter[status]": null,
      },
    };
  },
  computed: {
    ...mapGetters(["getPicks"]),
  },
  watch: {
    "$route.query": {
      handler(query) {
        const filter = this.updateFilterQuery(query);
        this.fetchRecords(filter);
      },
      immediate: true,
    },
  },

  methods: {
    //
    updateFilterQuery(query) {
      const filter = Object.assign(this.filter, this.transformQuery(query));
      return filter;
    },
    transformQuery(query) {
      const numbers = ["filter[project_id]", "filter[status]", "page"];
      for (let key in query) {
        if (numbers.includes(key)) {
          const val = query[key] ? parseInt(query[key]) : query[key];
          query[key] = val;
        }
      }
      return query;
    },
    resetFilter() {
      this.filter = {
        page: 1,
        "filter[name]": null,
        "filter[project_id]": null,
        "filter[status]": null,
      };
    },
    fetchRecords() {
      this.loadingItems = true;
      this.picks = this.getPicks;
      this.serverItemsLength = this.picks.length;
      return this.$store
        .dispatch("getPicks")
        .then(({ data, meta }) => {
          this.picks = this.getPicks;
          this.serverItemsLength = this.picks.length;
          this.loadingItems = false;
        })
        .catch(() => {
          this.loadingItems = false;
        });
    },

    handleFormSuccess() {
      this.showDialog = false;
      this.fetchRecords();
    },
  },
};
</script>

<style scoped>
.card-right {
  padding: 20px !important;
}
</style>

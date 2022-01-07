<template>
  <v-container>
    <v-card tile class="card-content">
      <v-toolbar dense>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <div v-if="saveAs">
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn icon small v-bind="attrs" v-on="on">
                <v-icon>mdi-check</v-icon>
              </v-btn>
            </template>
            <span>Save View as</span>
          </v-tooltip>

          <v-btn icon small @click="saveAs = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>

        <v-spacer></v-spacer>
        <v-menu
          v-model="searchMenu"
          bottom
          left
          :close-on-content-click="false"
        >
          <template #activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-pen</v-icon>
            </v-btn>
          </template>

          <v-flex>
            <v-card class="search-card">
              <v-card-text>
                <v-list style="max-height: 400px" class="overflow-y-auto">
                  <P class="font-weight-bold title-search-group"
                    >Fixed columns</P
                  >
                  <v-list-item v-for="fixItem in fixItems" :key="fixItem.id">
                    <v-list-item-content>
                      <v-list-item-title class="list-item">{{
                        fixItem.name
                      }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider inset></v-divider>
                  <P class="title-search-group font-weight-bold"
                    >Columns you've added</P
                  >
                  <draggable
                    :list="searchItems"
                    class="list-group"
                    ghost-class="ghost"
                    :move="checkMove"
                    @start="dragging = true"
                    @end="dragging = false"
                  >
                    <v-list-item
                      v-for="element in searchItems"
                      :key="element.name"
                      class="list-group-item"
                    >
                      <v-list-item-content>
                        <v-list-item-title class="list-item">
                          <v-icon
                            color="indigo"
                            class="icon"
                            @click="MoveColumns(element)"
                          >
                            mdi-minus
                          </v-icon>
                          {{ element.name }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </draggable>
                  <v-divider inset></v-divider>
                  <p class="font-weight-bold title-search-group">
                    Columns you can added
                  </p>
                  <v-list-item v-for="addItem in addItems" :key="addItem.id">
                    <v-list-item-content>
                      <v-list-item-title class="list-item">
                        <v-icon
                          color="indigo"
                          class="icon"
                          @click="AddColumns(addItem)"
                        >
                          mdi-plus </v-icon
                        >{{ addItem.name }}</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-row>
                  <v-col cols="2"></v-col>
                  <v-col cols="5">
                    <v-btn @click="searchMenu = false">Cancel</v-btn>
                  </v-col>
                  <v-col cols="5">
                    <v-btn color="secondary" elevation="2" @click="ChangeTable"
                      >Apply</v-btn
                    >
                  </v-col>
                </v-row>

                <rawDisplayer class="col-3" :value="searchItems" title="List" />
              </v-card-text>
            </v-card>
          </v-flex>
        </v-menu>
      </v-toolbar>
      <v-navigation-drawer
        v-model="drawer"
        absolute
        bottom
        temporary
        class="search-drawer"
      >
        <v-list nav dense>
          <v-list-item-group
            v-model="group"
            class="search-drawer-list"
            active-class="deep-purple--text text--accent-4"
          >
            <div class="search-box">
              <v-text-field
                outlined
                dense
                prepend-inner-icon="mdi-magnify"
                placeholder="Search"
                loader-height="15"
                height="15"
                class="search-field"
              />
            </div>
            <v-card>
              <v-list-item>
                <v-list-item-title>Bar</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Fizz</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Buzz</v-list-item-title>
              </v-list-item>
            </v-card>
            <v-card>
              <v-list-item>
                <v-list-item-title>Bar</v-list-item-title>
                <v-checkbox
                  :input-value="active"
                  color="deep-purple accent-4"
                ></v-checkbox>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Fizz</v-list-item-title>
                <v-checkbox
                  :input-value="active"
                  color="deep-purple accent-4"
                ></v-checkbox>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Buzz</v-list-item-title>
                <v-checkbox
                  :input-value="active"
                  color="deep-purple accent-4"
                ></v-checkbox>
              </v-list-item>
            </v-card>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-card>
    <v-row>
      <v-col cols="9">
        <v-card tile>
          <v-divider />
          <v-card-text class="pa-0">
            <v-data-table
              :loading="loadingItems"
              :headers="headers"
              :items="items"
              :items-per-page-options="[15, 30, 50]"
              :server-items-length="serverItemsLength"
              :items-per-page="itemsPerPage"
              :page.sync="filter['page']"
              item-key="sales_order_number"
              show-select
              @update:page="handlePageChanged"
            >
              <template #[`item.lock_status`]="{ item }">
                <i
                  :class="[
                    item.lock_status == 1 ? 'fas fa-lock' : 'fas fa-lock-open',
                  ]"
                ></i>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card tile class="card-right">
          <v-row>
            <v-col cols="8">
              <v-card-title>Filters</v-card-title>
            </v-col>
            <v-col cols="4">
              <v-btn
                text
                small
                color="black"
                style="margin-top: 20px; border: 1px solid grey; padding: 0px"
              >
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-text-field
            outlined
            dense
            prepend-inner-icon="mdi-magnify"
            placeholder="Search Fields"
            loader-height="15"
            height="15"
            class="search-field"
          />
          <label class="font-weight-bold">Agents</label>
          <v-select
            v-model="agentModel"
            dense
            outlined
            placeholder="Any agents"
            :items="agents"
            required
          />
          <label class="font-weight-bold">Groups</label>
          <v-select
            v-model="groupModel"
            :items="groups"
            chips
            multiple
            outlined
            dense
          >
          </v-select>
          <label class="font-weight-bold">Created</label>
          <v-select
            v-model="createdModel"
            outlined
            dense
            placeholder="Created"
            :items="created"
            required
          />
          <label class="font-weight-bold">Resolution due by</label>
          <v-select
            v-model="dueModel"
            outlined
            dense
            placeholder="Resolution due by"
            :items="dues"
            required
          />
          <label class="font-weight-bold">First response due by</label>
          <v-select
            v-model="firstdueModel"
            outlined
            dense
            placeholder="First response due by"
            :items="firstdues"
            required
          />
          <label class="font-weight-bold">Skill</label>
          <v-select
            v-model="skillModel"
            outlined
            dense
            placeholder="Skill"
            :items="skills"
            required
          />
          <label class="font-weight-bold">Status</label>
          <v-select
            v-model="statusModel"
            :items="status"
            chips
            dense
            multiple
            outlined
          />
          <label class="font-weight-bold">Priority</label>
          <v-select
            v-model="priorityModel"
            outlined
            dense
            placeholder="Priority"
            :items="priorities"
            required
          />
          <label class="font-weight-bold">Type</label>
          <v-select
            v-model="typeModel"
            outlined
            dense
            placeholder="Type"
            :items="types"
            required
          />
          <label class="font-weight-bold">Source</label>
          <v-select
            v-model="sourceModel"
            outlined
            dense
            placeholder="Source"
            :items="sources"
            required
          />
          <v-row>
            <v-col cols="12" style="text-align: center">
              <v-btn
                color="blue-grey"
                class="ma-2 white--text"
                @click="saveView"
              >
                Apply
                <v-icon right dark> mdi-check </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TooltipMixin from "@/mixins/Tooltip";
import draggable from "vuedraggable";
import { mapGetters } from "vuex";
export default {
  name: "Opo",
  components: { draggable },
  mixins: [TooltipMixin],
  data() {
    return {
      active: false,
      drawer: false,
      group: null,
      saveAs: false,
      fixItems: [
        { id: 1, name: "invoice_number" },
        { id: 2, name: "pick_warehouse" },
      ],
      addItems: [
        { id: 301, name: "lock_status" },
        { id: 302, name: "full_stock" },
        { id: 303, name: "size_type" },
        { id: 304, name: "lock_reason" },
        { id: 305, name: "order_value_type" },
        { id: 306, name: "preferred_warehouse" },
        { id: 307, name: "items" },
      ],
      searchItems: [
        { id: 101, name: "sales_order_number" },
        { id: 102, name: "lock_type" },
        { id: 103, name: "delivery_type" },
      ],
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
      headers: [
        {
          text: "invoice_number",
          value: "invoice_number",
        },
        {
          text: "pick_warehouse",
          value: "pick_warehouse",
        },
        {
          text: "sales_order_number",
          value: "sales_order_number",
        },
        {
          text: "lock_type",
          value: "lock_type",
        },
        {
          text: "delivery_type",
          value: "delivery_type",
        },
      ],
      items: [],
      agents: ["agent1", "agent2", "agent3"],
      agentModel: "",
      groups: ["Customer Service", "group2", "group3"],
      groupModel: "Customer Service",
      created: ["Yesterday", "Today", "Tomorrow"],
      createdModel: "Yesterday",
      dues: ["due1", "due2", "due3"],
      dueModel: "",
      firstdues: ["firstdue1", "firstdue2", "firstdue3"],
      firstdueModel: "",
      skills: ["skill1", "skill2", "skill3"],
      skillModel: "",
      status: ["Closed", "status1", "status2"],
      statusModel: "Closed",
      priorities: ["priority1", "priority2", "priority3"],
      priorityModel: "",
      types: ["type1", "type2", "type3"],
      typeModel: "",
      sources: ["source1", "source2", "source3"],
      sourceModel: "",
      searchMenu: false,
    };
  },
  computed: {
    ...mapGetters(["getOrders"]),
  },
  watch: {
    "$route.query": {
      handler(query) {
        const filter = this.updateFilterQuery(query);
        this.fetchRecords(filter);
      },
      immediate: true,
    },
    group() {
      this.drawer = false;
    },
  },

  methods: {
    // new features
    saveView() {
      this.saveAs = true;
    },
    checkMove: function (e) {
      console.log(this.searchItems);
    },
    MoveColumns: function (element) {
      this.addItems.push(element);
      this.searchItems.splice(this.searchItems.indexOf(element), 1);
    },
    AddColumns: function (element) {
      this.searchItems.push(element);
      this.addItems.splice(this.addItems.indexOf(element), 1);
    },
    ChangeTable: function () {
      this.headers = [];
      for (let key in this.fixItems) {
        let hdr = {};
        hdr["text"] = this.fixItems[key].name;
        hdr["value"] = this.fixItems[key].name;
        this.headers.push(hdr);
      }
      for (let key in this.searchItems) {
        let hdr = {};
        hdr["text"] = this.searchItems[key].name;
        hdr["value"] = this.searchItems[key].name;
        this.headers.push(hdr);
      }
      this.searchMenu = false;
      console.log(this.headers);
    },
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
    fetchRecords(query) {
      this.loadingItems = true;
      this.items = this.getOrders;
      this.serverItemsLength = this.items.length;
      return this.$store
        .dispatch("getOrders", query)
        .then(({ data, meta }) => {
          this.items = this.getOrders;
          this.serverItemsLength = this.items.length;
          this.loadingItems = false;
        })
        .catch(() => {
          this.loadingItems = false;
        });
    },
    //action
    handleCreateItem() {
      this.selectedItem = null;
      this.showDialog = true;
    },
    handleEditItem(item) {
      this.selectedItem = item;
      this.showDialog = true;
    },
    handleDeleteItem({ id }) {
      if (window.confirm("Are you sure to delete this")) {
        this.$store.dispatch("deleteTask", id).then(() => {
          this.items = this.items.filter((item) => item.id != id);
        });
      }
    },
    handleUpdateStatus(item, status) {
      const payload = {
        id: item.id,
        data: {
          status: status,
        },
      };
      this.$store.dispatch("updateTask", payload);
    },
    handleRefreshItem() {
      this.fetchRecords(this.filter);
    },
    // filter
    handlePageChanged(page) {
      this.filter.page = page;
      this.filter.t = Date.now();
      this.$router.replace({
        path: this.$route.path,
        query: this.filter,
      });
    },
    handleResetFilter() {
      this.filter = {
        page: 1,
        "filter[name]": null,
        "filter[status]": null,
      };
      this.$router.replace({
        path: this.$route.path,
      });
    },
    handleApplyFilter() {
      this.filter.t = Date.now();
      this.$router.replace({
        path: this.$route.path,
        query: this.filter,
      });
    },
    handleClear() {
      this.resetFilter();
      this.filter.t = Date.now();
      this.$router.replace({
        path: this.$route.path,
        query: this.filter,
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
.card-content {
  position: unset;
}
.v-menu__content {
  box-shadow: none;
}
.search-card {
  border: 1px solid lightgray;
}
.title-search-group {
  font-size: 1rem;
}
.icon {
  font-size: small;
}
.list-item {
  font-size: 0.875rem;
}
.search-drawer {
  transform: translateX(0%) !important;
}
.search-drawer-list {
  transition: 0s;
}
</style>

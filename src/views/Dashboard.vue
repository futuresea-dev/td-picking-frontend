<template>
  <div class="page-dashboard">
    <v-container>
      <v-row>
        <!-- mini statistic start -->

        <v-col :cols="8" :sm="4" :lg="2">
          <mini-statistic-card
              title="Unresolved"
              sub-title="2240"
          />
        </v-col>
        <v-col :cols="8" :sm="4" :lg="2">
          <mini-statistic-card
              title="Overdue"
              sub-title="2034"
          />
        </v-col>
        <v-col :cols="8" :sm="4" :lg="2">
          <mini-statistic-card
              title="Due today"
              sub-title="199"
          />
        </v-col>
        <v-col :cols="8" :sm="4" :lg="2">
          <mini-statistic-card
              title="Open"
              sub-title="1896"
          />
        </v-col>
        <v-col :cols="8" :sm="4" :lg="2">
          <mini-statistic-card
              title="On hold"
              sub-title="0"
          />
        </v-col>
        <v-col :cols="8" :sm="4" :lg="2">
          <mini-statistic-card
              title="Unassigned"
              sub-title="271"
          />
        </v-col>
        <v-col :lg="16" :sm="12" :cols="12">
          <v-card tile>
            <v-toolbar flat>
              <v-toolbar-title>Site Traffic</v-toolbar-title>
              <v-btn slot="widget-header-action" icon>
                <v-icon class="text--secondary">mdi-refresh</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <e-chart
                  :path-option="[
                  ['dataset.source', siteTrafficData],
                  ['color', [color.lightBlue.base, color.green.lighten1]],
                  ['legend.show', true],
                  ['xAxis.axisLabel.show', true],
                  ['yAxis.axisLabel.show', true],
                  ['grid.left', '2%'],
                  ['grid.bottom', '5%'],
                  ['grid.right', '3%'],
                  ['series[0].type', 'bar'],
                  ['series[0].areaStyle', {}],
                  ['series[0].smooth', true],
                  ['series[1].smooth', true],
                  ['series[1].type', 'bar'],
                  ['series[1].areaStyle', {}]
                ]"
                  height="400px"
                  width="100%"
              />
            </v-card-text>
          </v-card>
        </v-col>
        <!-- Circle statistic -->
        <v-col
          v-for="(item, index) in trending"
          :key="'c-trending' + index"
          :lg="4"
          :sm="12"
          :cols="12"
        >
          <circle-statistic-card
            :title="item.subheading"
            :sub-title="item.headline"
            :caption="item.caption"
            :icon="item.icon.label"
            :color="item.linear.color"
            :value="item.linear.value"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import API from '@/api'
import Material from 'vuetify/es5/util/colors'
import EChart from '@/components/chart/echart'
import MiniStatisticCard from '@/components/card/MiniStatisticCard'
import CircleStatisticCard from '@/components/card/CircleStatisticCard'
export default {
  name: 'PageDashboard',
  components: {
    EChart,
    MiniStatisticCard,
    CircleStatisticCard
  },
  data: () => ({
    color: Material,
    selectedTab: 'tab-1',
    linearTrending: [
      {
        subheading: 'Sales',
        headline: '2,55',
        caption: 'increase',
        percent: 15,
        icon: {
          label: 'mdi-trending-up',
          color: 'success'
        },
        linear: {
          value: 15,
          color: 'success'
        }
      },
      {
        subheading: 'Revenue',
        headline: '6,553',
        caption: 'increase',
        percent: 10,
        icon: {
          label: 'mdi-trending-down',
          color: 'error'
        },
        linear: {
          value: 15,
          color: 'error'
        }
      },
      {
        subheading: 'Orders',
        headline: '5,00',
        caption: 'increase',
        percent: 50,
        icon: {
          label: 'mdi-arrow-up',
          color: 'info'
        },
        linear: {
          value: 50,
          color: 'info'
        }
      }
    ],
    trending: [
      {
        subheading: 'Email',
        headline: '15+',
        caption: 'email opens',
        percent: 15,
        icon: {
          label: 'mdi-email-open',
          color: 'info'
        },
        linear: {
          value: 15,
          color: 'info'
        }
      },
      {
        subheading: 'Tasks',
        headline: '90%',
        caption: 'tasks completed.',
        percent: 90,
        icon: {
          label: 'mdi-view-list',
          color: 'primary'
        },
        linear: {
          value: 90,
          color: 'success'
        }
      },
      {
        subheading: 'Issues',
        headline: '100%',
        caption: 'issues fixed.',
        percent: 100,
        icon: {
          label: 'mdi-bug',
          color: 'primary'
        },
        linear: {
          value: 100,
          color: 'error'
        }
      }
    ]
  }),
  computed: {
    activity() {
      return [
        {
          avatar:
            'https://s3.amazonaws.com/uifaces/faces/twitter/ludwiczakpawel/128.jpg',
          timeString: 'Just now',
          color: 'primary',
          text: 'Michael finished  one task just now.'
        },
        {
          avatar:
            'https://s3.amazonaws.com/uifaces/faces/twitter/suprb/128.jpg',
          timeString: '30 min ago',
          color: 'teal',
          text: 'Jim created a new  task.'
        },
        {
          avatar:
            'https://s3.amazonaws.com/uifaces/faces/twitter/suprb/128.jpg',
          timeString: '1 hour ago',
          color: 'indigo',
          text: 'Li completed the PSD to html convert.'
        },
        {
          avatar:
            'https://s3.amazonaws.com/uifaces/faces/twitter/suprb/128.jpg',
          timeString: '3 hour ago',
          color: 'pink',
          text: 'Michael upload a new pic.'
        },
        {
          avatar:
            'https://s3.amazonaws.com/uifaces/faces/twitter/suprb/128.jpg',
          timeString: '10 min ago',
          color: 'cyan',
          text: 'Li assigned a a task to Michael'
        }
      ]
    },
    siteTrafficData() {
      return API.getMonthVisit
    },
    locationData() {
      return API.getLocation
    }
  }
}
</script>

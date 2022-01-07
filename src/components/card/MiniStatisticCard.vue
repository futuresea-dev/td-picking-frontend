<template>
  <v-card tile>
    <v-card-text class="pa-0">
      <v-row no-gutters>
        <v-col class="pa-6">
          <div class="text-h5">{{ title }}</div>
          <span class="text-h4 font-weight-bold">{{ subTitle }}</span>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    icon: String,
    title: String,
    subTitle: String,
    color: String,
  },
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <label><small>New rule for:</small></label>
      </v-col>
    </v-row>
    <v-row style="margin-top: -30px">
      <v-col cols="12">
        <v-toolbar-title>
          <big>New Rule</big>
        </v-toolbar-title>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8">
        <v-row>
          <v-col cols="12">
            <v-toolbar-title>
              <b>Rule Name</b>
            </v-toolbar-title>
            <v-text-field label="Rule Name" outlined dense> </v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-toolbar-title>
              <b>On Orders with these:</b>
            </v-toolbar-title>
            <v-card title>
              <v-toolbar flat>
                <v-radio-group v-model="type" row style="padding-top: 20px">
                  <v-radio label="Match ANY of the below" value="any">
                  </v-radio>
                  <v-radio label="Match ALL of the below" value="all">
                  </v-radio>
                </v-radio-group>
              </v-toolbar>

              <v-divider />

              <v-card-text style="background-color: #f5f5f5">
                <v-row>
                  <v-col cols="4">
                    <label class="font-weight-bold">Ticket</label>
                    <v-select
                      v-model="ticketModel"
                      outlined
                      label="Tickets"
                      placeholder="Tickets"
                      :items="tickets"
                      required
                    />
                  </v-col>

                  <v-col cols="4">
                    <label class="font-weight-bold">Subject</label>
                    <v-select
                      v-model="subjectModel"
                      outlined
                      label="Subjects"
                      placeholder="Subjects"
                      :items="subjects"
                      required
                    />
                  </v-col>

                  <v-col cols="4">
                    <label class="font-weight-bold">Contain</label>
                    <v-select
                      v-model="containModel"
                      outlined
                      label="Contains"
                      placeholder="Contains"
                      :items="subjects"
                      required
                    />
                  </v-col>

                  <v-col cols="4">
                    <label class="font-weight-bold">Warehouse</label>
                    <v-select
                      v-model="warehouseModel"
                      outlined
                      label="Warehouses"
                      placeholder="Warehouses"
                      :items="warehouses"
                      required
                    />
                  </v-col>
                  <v-col cols="4">
                    <label class="font-weight-bold">Size</label>
                    <v-select
                      v-model="sizeModel"
                      outlined
                      label="Sizes"
                      placeholder="Sizes"
                      :items="sizes"
                      required
                    />
                  </v-col>
                  <v-col cols="4">
                    <label class="font-weight-bold">Color</label>
                    <v-select
                      v-model="colorModel"
                      outlined
                      label="Colors"
                      placeholder="Colors"
                      :items="colors"
                      required
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-select
                      v-model="typeModel"
                      :items="urltype"
                      chips
                      label="Url Type"
                      multiple
                      outlined
                    >
                    </v-select>
                  </v-col>
                </v-row>
                <v-row style="margin-top: -30px">
                  <v-col cols="12">
                    <v-switch v-model="matchcase" :label="`Match case`">
                    </v-switch>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-divider />

              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <v-btn class="ma-2" outlined color="indigo">
                      <v-icon
                        color="white"
                        style="background-color: #1867c0; border-radius: 50%"
                        >mdi-plus</v-icon
                      >
                      &nbsp;Add new condition
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <br />
        <br />
        <v-row>
          <v-col cols="12" style="text-align: center">
            <v-btn class="ma-2" outlined rounded color="indigo">
              <v-icon
                color="white"
                style="background-color: #1867c0; border-radius: 50%"
                >mdi-plus</v-icon
              >
              &nbsp;Add new Filter
            </v-btn>
          </v-col>
        </v-row>
        <br />
        <br />
        <v-row>
          <v-col cols="12">
            <v-toolbar-title>
              <b>Perform these actions:</b>
            </v-toolbar-title>
            <v-card title>
              <v-card-text style="background-color: #f5f5f5">
                <v-row>
                  <v-col cols="6">
                    <label class="font-weight-bold">Set Type</label>
                    <v-select
                      v-model="setType"
                      outlined
                      label="Set type as"
                      placeholder="Set type as"
                      :items="setTypes"
                      required
                    />
                  </v-col>

                  <v-col cols="4">
                    <label class="font-weight-bold">Tracking</label>
                    <v-select
                      v-model="trackModel"
                      outlined
                      label="tracking"
                      placeholder="tracking"
                      :items="tracking"
                      required
                    />
                  </v-col>
                </v-row>
              </v-card-text>

              <v-divider />

              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <v-btn class="ma-2" outlined color="indigo">
                      <v-icon
                        color="white"
                        style="background-color: #1867c0; border-radius: 50%"
                        >mdi-plus</v-icon
                      >
                      &nbsp;Add new action
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <br />
        <v-divider />
        <br />
        <v-row>
          <v-col cols="12">
            <v-btn small color="primary" dark> Preview and Save </v-btn>
            &nbsp;&nbsp;&nbsp;
            <v-btn small color="grey" dark> Cancel </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4" style="background-color: #edebeb">
        <v-toolbar-title style="text-align: center">
          <b>Rules that run on ticket creation</b>
        </v-toolbar-title>
        <br />
        Ticket creation rules allow you to setup your support workflows by
        performing a predefined set of actions on newly created tickets.
        <br /><br />
        <i>
          Example: for all related to refunds, you can
          <strong>automatically:</strong> <br /><br />
          <strong>-Route</strong> it to your Billing group <br /><br />
          <strong>-Notify</strong> your agent, and customer via email
          <br /><br />
          <strong>-Set ticket properties</strong> like Priority to Medium, and
          even <br /><br />
          <strong>-Trigger a webhook</strong> to update the details in your
          billing software.
        </i>
        <br /><br />
        Remember, the order of the 'Ticket Creation' rules are important. For
        each incoming ticket, the first matching rul will get executed, and
        stop. You can reorder the list of rules to have the most important rules
        on top.
        <br />
        <a href="#">Learn More</a>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Automation",
  data: () => ({
    type: "any",
    subjects: ["subject1", "subject2", "subject3"],
    subjectModel: "",
    tickets: ["ticket1", "ticket2", "ticket3"],
    ticketModel: "",
    contains: ["contain1", "contain2", "contain2"],
    containModel: "",
    urltype: [".com", ".org", ".co", ".nz"],
    typeModel: [".com", ".org"],
    matchcase: "",
    setTypes: ["type1", "type2", "type3"],
    setType: "",
    tracking: ["tracking1", "tracking2", "tracking3"],
    trackModel: "",
    warehouses: ["warehouse1", "warehouse2", "warehouse3"],
    warehouseModel: "",
    sizes: ["size1", "size2", "size3"],
    sizeModel: "",
    colors: ["color1", "color2", "color3"],
    colorModel: "",
  }),
};
</script>

<style scoped>
.card-right {
  background-color: rgb(245, 245, 245);
  padding: 10px;
}
</style>

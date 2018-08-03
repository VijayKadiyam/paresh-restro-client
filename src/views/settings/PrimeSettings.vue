<template>
  <div class="animated fadeIn">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
          <b-card
            header="<i class='fa fa-paper-plane'></i>&nbsp;&nbsp;Prime Settings"
          >
            <b-row class="mb-3">
              <b-col md="6">
                Select your outlet
              </b-col>
              <b-col md="6">
                <b-form-select
                  id="outlets"
                  :plain="true"
                  :options="outlets"
                  v-model="outletId"
                >
                </b-form-select>
              </b-col>
            </b-row>
            <b-button variant="primary" class="px-4" type="submit"
              @click="update"
            >Update Settings</b-button>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script type="text/javascript">
import Form from '@/helpers/Form.js'
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    form: new Form({}),
    outlets: [],
    outletId: ''
  }),

  computed: {
    ...mapGetters([
      'outlet'
    ])
  },

  mounted () {
    // To get all the outlets of a user
    this.form.get('/api/hotels')
      .then(data => {
        data.data.forEach(outlet => {
          this.outlets.push({
            value: outlet.id,
            text: outlet.name
          })
        })
      })
    // To initialize the outlet
    this.configInitialize()
    this.outletId = this.outlet.id
  },

  methods: {
    ...mapActions([
      'configSet', 'configInitialize'
    ]),

    update () {
      // To update company details in the config storage
      if (this.outletId) {
        this.form.get(`/api/hotels/${this.outletId}`)
          .then(data => {
            this.configSet({
              outlet: {
                id: data.data.id,
                name: data.data.name
              }
            })
            this.configInitialize()
            alert('Details Updated')
          })
        }
      else {
        alert('Please select the outlet')
        }
    }
  }
}
</script>

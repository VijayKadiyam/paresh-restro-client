<template>
  <div class="animated fadeIn">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card
            header="<i class='fa fa-paper-plane'></i>&nbsp;&nbsp;Add a New Table"
          >
            <!-- Update Table Form -->
            <b-form @submit.prevent="update"
              @keydown="form.errors.clear($event.target.name)"
            >
              <!-- Table Name -->
              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>
                    <i class="icon-home"></i>
                  </b-input-group-text>
                </b-input-group-prepend>
                <input type="text"
                  :class="`form-control ${form.errors.has('name') ? 'is-invalid' : ''}`"
                  placeholder="Table name"
                  name="name"
                  v-model="form.name"
                >
                <b-form-invalid-feedback
                  v-if="form.errors.has('name')"
                >
                  {{ form.errors.get('name') }}
                </b-form-invalid-feedback>
              </b-input-group>
              <!-- Table Description -->
              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>
                    <i class="icon-home"></i>
                  </b-input-group-text>
                </b-input-group-prepend>
                <input type="number"
                  :class="`form-control ${form.errors.has('capacity') ? 'is-invalid' : ''}`"
                  placeholder="Table capacity"
                  name="capacity"
                  v-model="form.capacity"
                >
                <b-form-invalid-feedback
                  v-if="form.errors.has('capacity')"
                >
                  {{ form.errors.get('capacity') }}
                </b-form-invalid-feedback>
              </b-input-group>
              <b-button variant="primary" class="px-4" type="submit">Update Table</b-button>
            </b-form>
            <!-- End Update Table form -->
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script type="text/javascript">
import Form from '@/helpers/Form.js'

export default {
  data: () => ({
    form: new Form({
      name: '',
      capacity: '',
      status_id: 2
    }),
    statuses: []
  }),

  mounted () {
    // To get all the statuses
    this.form.get('/api/statuses')
      .then(data => {
        data.data.forEach(status => {
          this.statuses.push({
            text: status.status,
            value: status.id
          })
        })
      })
    // To fetch the details of the current table id
    this.form.get(`/api/tables/${this.$route.params.tableId}`)
      .then(data => {
        this.form = new Form(data.data)
      })
  },

  methods: {
    // To update a table
    update () {
      this.form.patch(`/api/tables/${this.$route.params.tableId}`)
        .then(data => {
          this.$router.push('/tables')
        })
        .catch(errors => {
        })
    }
  }
}
</script>

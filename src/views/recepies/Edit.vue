<template>
  <div class="animated fadeIn">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card
            header="<i class='fa fa-paper-plane'></i>&nbsp;&nbsp;Edit Recepie"
          >
            <!-- Update Recepie Form -->
            <b-form @submit.prevent="update"
              @keydown="form.errors.clear($event.target.name)"
            >
              <!-- Recepie Name -->
              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>
                    <i class="icon-home"></i>
                  </b-input-group-text>
                </b-input-group-prepend>
                <input type="text"
                  :class="`form-control ${form.errors.has('name') ? 'is-invalid' : ''}`"
                  placeholder="Recepie name"
                  name="name"
                  v-model="form.name"
                >
                <b-form-invalid-feedback
                  v-if="form.errors.has('name')"
                >
                  {{ form.errors.get('name') }}
                </b-form-invalid-feedback>
              </b-input-group>
              <!-- Recepie Description -->
              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>
                    <i class="icon-home"></i>
                  </b-input-group-text>
                </b-input-group-prepend>
                <textarea
                  :class="`form-control ${form.errors.has('description') ? 'is-invalid' : ''}`"
                  placeholder="Recepie description"
                  name="description"
                  v-model="form.description"
                ></textarea>
                <b-form-invalid-feedback
                  v-if="form.errors.has('description')"
                >
                  {{ form.errors.get('description') }}
                </b-form-invalid-feedback>
              </b-input-group>
              <b-button variant="primary" class="px-4" type="submit">Update Recepie</b-button>
            </b-form>
            <!-- End update Recepie form -->
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
      description: ''
    })
  }),

  mounted () {
    this.form.get(`/api/recepies/${this.$route.params.recepieId}`)
      .then(data => {
        this.form = new Form(data.data)
      })
  },

  methods: {
    // To update a new recepie
    update () {
      this.form.patch(`/api/recepies/${this.$route.params.recepieId}`)
        .then(data => {
          this.$router.push('/recepies')
        })
        .catch(errors => {
        })
    }
  }
}
</script>

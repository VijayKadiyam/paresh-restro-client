<template>
  <div class="animated fadeIn">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card
            header="<i class='fa fa-paper-plane'></i>&nbsp;&nbsp;Add a New Recepie Addon"
          >
            <!-- Create Addon Form -->
            <b-form @submit.prevent="create"
              @keydown="form.errors.clear($event.target.name)"
            >
              <!-- Addon Name -->
              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>
                    <i class="icon-home"></i>
                  </b-input-group-text>
                </b-input-group-prepend>
                <input type="text"
                  :class="`form-control ${form.errors.has('name') ? 'is-invalid' : ''}`"
                  placeholder="Addon name"
                  name="name"
                  v-model="form.name"
                >
                <b-form-invalid-feedback
                  v-if="form.errors.has('name')"
                >
                  {{ form.errors.get('name') }}
                </b-form-invalid-feedback>
              </b-input-group>
              <!-- Addon Description -->
              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>
                    <i class="icon-home"></i>
                  </b-input-group-text>
                </b-input-group-prepend>
                <textarea
                  :class="`form-control ${form.errors.has('description') ? 'is-invalid' : ''}`"
                  placeholder="Addon description"
                  name="description"
                  v-model="form.description"
                ></textarea>
                <b-form-invalid-feedback
                  v-if="form.errors.has('description')"
                >
                  {{ form.errors.get('description') }}
                </b-form-invalid-feedback>
              </b-input-group>
              <b-button variant="primary" class="px-4" type="submit">Create Addon</b-button>
            </b-form>
            <!-- End Create Addon form -->
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

  methods: {
    // To create a new Addon
    create () {
      this.form.post('/api/addons')
        .then(data => {
          this.$router.push('/addons')
        })
        .catch(errors => {
        })
    }
  }
}
</script>

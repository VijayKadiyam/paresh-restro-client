<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              <h1>Register</h1>
              <p class="text-muted">Create your account</p>
              <!-- Register Form -->
              <b-form @submit.prevent="register"
                @keydown="form.errors.clear($event.target.name)"
              >
                <!-- Username -->
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="icon-user"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <input type="text"
                    :class="`form-control ${form.errors.has('name') ? 'is-invalid' : ''}`"
                    placeholder="Username"
                    name="name"
                    v-model="form.name"
                  >
                  <b-form-invalid-feedback
                    v-if="form.errors.has('name')"
                  >
                    {{ form.errors.get('name') }}
                  </b-form-invalid-feedback>
                </b-input-group>
                <!-- Phone no -->
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="icon-phone"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <input type="number"
                    :class="`form-control ${form.errors.has('phone') ? 'is-invalid' : ''}`"
                    placeholder="Phone no"
                    name="phone"
                    v-model="form.phone"
                  >
                  <b-form-invalid-feedback
                    v-if="form.errors.has('phone')"
                  >
                    {{ form.errors.get('phone') }}
                  </b-form-invalid-feedback>
                </b-input-group>
                <!-- Password -->
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="icon-lock"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <input type="password"
                    :class="`form-control ${form.errors.has('password') ? 'is-invalid' : ''}`"
                    placeholder="Password"
                    name="password"
                    v-model="form.password"
                  >
                  <b-form-invalid-feedback
                    v-if="form.errors.has('password')"
                  >
                    {{ form.errors.get('password') }}
                  </b-form-invalid-feedback>
                </b-input-group>
                <!-- Repeat Password -->
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="icon-lock"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <input type="password"
                    :class="`form-control ${form.errors.has('password_confirmation') ? 'is-invalid' : ''}`"
                    placeholder="Repeat password"
                    name="password_confirmation"
                    v-model="form.password_confirmation"
                  >
                  <b-form-invalid-feedback
                    v-if="form.errors.has('password_confirmation')"
                  >
                    {{ form.errors.get('password_confirmation') }}
                  </b-form-invalid-feedback>
                </b-input-group>
                <!-- End Register Form -->
                <b-button variant="success" block type="submit">Create Account</b-button>
              </b-form>
            </b-card-body>
            <b-card-footer class="p-4">
              <b-row>
                <b-col cols="6">
                  <b-button block class="btn btn-facebook"><span>facebook</span></b-button>
                </b-col>
                <b-col cols="6">
                  <b-button block class="btn btn-twitter" type="button"><span>twitter</span></b-button>
                </b-col>
              </b-row>
              <br>
              <b-button variant="link" class="px-0" to="/login">Already Have Account? Login Here</b-button>

            </b-card-footer>
          </b-card>
          <!-- End Register card -->
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import Form from '@/helpers/Form.js'

export default {
  name: 'Register',

  data: () => ({
    form: new Form({
      name: '',
      phone: '',
      password: '',
      password_confirmation: ''
    })
  }),

  methods: {
    register () {
      this.form.post('/api/register')
        .then(data => {
          // console.log(data.data)
        })
        .catch(errors => {
          console.log('Errors below: ')
          console.log(errors)
        })
    }
  }
}
</script>

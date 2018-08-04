<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <!-- Login card -->
            <b-card no-body class="p-4">
              <b-card-body>
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <!-- Login Form -->
                <b-form @submit.prevent="login"
                  @keydown="form.errors.clear($event.target.name)"
                >
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
                  <!-- Login and Forgot Password Button -->
                  <b-row>
                    <b-col cols="6">
                      <b-button variant="primary" class="px-4" type="submit">Login</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Forgot password?</b-button>
                    </b-col>
                  </b-row>
                </b-form>
                <!-- End login form -->
              </b-card-body>
            </b-card>
            <!-- End login card -->
            <!-- Sign up card -->
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>A complete restaurant management solution with beautiful interface. Register and Start using it.</p>
                  <b-button variant="primary" class="active mt-3" to="/register">Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card>
            <!-- End sign up card -->
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import Form from '@/helpers/Form.js'

import { mapActions } from 'vuex'

export default {
  name: 'Login',

  data: () => ({
    form: new Form({
      phone: '',
      password: ''
    })
  }),

  methods: {
    ...mapActions([
      'authRemove', 'authSet', 'authInitialize', 'configInitialize'
    ]),

    login () {
      this.form.post('/api/login')
        .then(data => {
          this.authRemove()
          this.authSet(data)
          this.authInitialize()

          this.$router.push('/table-orders')
        })
        .catch(errors => {
          console.log('Errors below: ')
          console.log(errors)
        })
    }
  }
}
</script>

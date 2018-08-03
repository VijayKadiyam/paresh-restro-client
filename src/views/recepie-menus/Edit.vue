<template>
  <div class="animated fadeIn">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card
            header="<i class='fa fa-paper-plane'></i>&nbsp;&nbsp;Create a Recepie Menu Item"
          >
            <!-- update a Recepie Menu Item -->
            <b-form @submit.prevent="update"
              @keydown="form.errors.clear($event.target.name)"
            >
              <!-- Recepie Type-->
              <b-row class="mb-3">
                <b-col md="6">
                  Select Recepie Type
                </b-col>
                <b-col md="6">
                  <b-form-select
                    id="types"
                    :plain="true"
                    :options="types"
                    v-model="form.type_id"
                  >
                  </b-form-select>
                  {{ form.errors.get('type_id') }}
                </b-col>
              </b-row>
              <!-- Recepie -->
              <b-row class="mb-3">
                <b-col md="6">
                  Select Recepie
                </b-col>
                <b-col md="6">
                  <b-form-select
                    id="recepies"
                    :plain="true"
                    :options="recepies"
                    v-model="form.recepie_id"
                  >
                  </b-form-select>
                  {{ form.errors.get('recepie_id') }}
                </b-col>
              </b-row>
              <!-- Currency -->
              <b-row class="mb-3">
                <b-col md="6">
                  Add Price
                </b-col>
                <b-col md="6">
                  <b-input-group class="mb-3">
                    <input type="number"
                      :class="`form-control ${form.errors.has('price') ? 'is-invalid' : ''}`"
                      placeholder="Recepie price"
                      name="price"
                      v-model="form.price.price"
                    >
                    <b-form-select
                      id="currencies"
                      :plain="true"
                      :options="currencies"
                      v-model="form.price.currency_id"
                    >
                    </b-form-select>
                  </b-input-group>
                  {{ form.errors.get('price') }}
                  <b>Previous prices:</b>
                  <br>
                  <span
                    v-for="(price, i) in prices"
                    :key="`price${i}`"
                  >
                    {{ price.price }} INR,
                  </span>
                </b-col>
              </b-row>
              <b-button variant="primary" class="px-4" type="submit">Update Menu Item</b-button>
            </b-form>
            <!-- End update a Recepie Menu Item -->
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
      recepie_id: '',
      type_id: '',
      price: {
        price: '',
        currency_id: 1
      }
    }),
    types: [],
    recepies: [],
    currencies: [],
    prices: []
  }),

  mounted () {
    // To get all the menu types
    this.form.get('/api/menu-types')
      .then(data => {
        data.data.forEach(type => {
          this.types.push({
            text: type.type,
            value: type.id
          })
        })
      })
    // To get all the recepies
    this.form.get('/api/recepies')
      .then(data => {
        data.data.forEach(recepie => {
          this.recepies.push({
            text: recepie.name,
            value: recepie.id
          })
        })
      })
    // To get all the currencies
    this.form.get('/api/currencies')
      .then(data => {
        data.data.forEach(currency => {
          this.currencies.push({
            text: currency.currency,
            value: currency.id
          })
        })
      })
    // To get the current recepie item
    this.form.get(`/api/recepie-menus/${this.$route.params.recepieMenuId}`)
      .then(data => {
        this.prices = data.data.prices
        this.form = new Form({
          recepie_id: parseInt(data.data.recepie_id),
          type_id: parseInt(data.data.type_id),
          price: {
            price: data.data.prices[0] ? data.data.prices[0].price : '',
            currency_id: 1
          }
        })
      })
  },

  methods: {
    // To update a new recepie
    update () {
      this.form.patch(`/api/recepie-menus/${this.$route.params.recepieMenuId}`)
        .then(data => {
          this.$router.push('/recepie-menus')
        })
        .catch(errors => {
        })
    }
  }
}
</script>

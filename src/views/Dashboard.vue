<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-primary">
          <b-card-body class="pb-0">
            <h4 class="mb-0">Rs. {{ orders[0] ? orders[0].total_amount : '' }}</h4>
            <p>Latest Order</p>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-danger">
          <b-card-body class="pb-0">
            <h4 class="mb-0">{{ orders.length }}</h4>
            <p>Total Order on {{ fromDate }}</p>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-info">
          <b-card-body class="pb-0">
            <h4 class="mb-0">Rs. {{ totalPrice }}</h4>
            <p>Total Order Price on {{ fromDate }}</p>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Form from '@/helpers/Form.js'
import moment from 'moment'

export default {
  name: 'dashboard',

  data: () => ({
    form: new Form(),
    orders: [],
    fromDate: '',
    toDate: '',
    totalPrice: 0
  }),

  mounted () {

    this.fromDate = moment().format("YYYY-MM-DD")
    this.toDate = moment().add(1, 'days').format("YYYY-MM-DD")
    // Get all the orders
    this.form.get(`/api/orders?fromDate=${this.fromDate}&toDate=${this.toDate}`)
        .then(data => {
          data.data.forEach(order => {
            this.orders.unshift(order)
            this.totalPrice += parseFloat(order.total_amount)
          })
        })

  }
}
</script>

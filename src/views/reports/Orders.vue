<template>
  <div class="animated fadeIn">

    <b-row>
      <b-col lg-4>
         <b-form-group
          label="From Date" label-for="date"
          :label-cols="3"
          :horizontal="true">
          <b-form-input type="date" id="date" v-model="fromDate"></b-form-input>
        </b-form-group>
      </b-col>
      <b-col lg-4>
        <b-form-group
          label="To Date" label-for="date"
          :label-cols="3"
          :horizontal="true">
          <b-form-input type="date" id="date" v-model="toDate"></b-form-input>
        </b-form-group>
      </b-col>
      <b-col lg-2>
        <b-button size="lg" variant='primary'
          @click="getFilteredOrders"
        ><i class='fa fa-paper-plane'></i>&nbsp; Get Search Results</b-button>
      </b-col>
    </b-row>

   

    <b-row>
      <b-col lg="12">
        <c-table striped small
          :caption="`
            Order Report
          `"
          addLink="/table-orders"
          :fields='fields'
          :items='items'
        ></c-table>
      </b-col>
    </b-row>

  </div>
</template>

<script type="text/javascript">
import Form from '@/helpers/Form.js'

import cTable from '@/components/Table.vue'

export default {
  name: 'orders',

  data: () => ({
    fields: [
      {key: 'order_id'},
      {key: 'table'},
      {key: 'order_details'},
      {key: 'total_amount'}
    ],
    items: [],
    form: new Form({}),
    orderItems: [],
    fromDate: '',
    toDate: ''
  }),

  components: {
    cTable
  },

  mounted () {
    this.getOrders()
    
  },

  methods: {
    // Update order list
    updateOrder(item) {
      let alreadyItem = this.orderItems.find(i => i.id == item.id)
      if (alreadyItem) {
        alreadyItem.quantity = alreadyItem.quantity + 1
        alreadyItem.amount = alreadyItem.quantity * item.prices[0].price
      } else {
        this.orderItems.push({
          no: this.orderItems.length + 1,
          id: item.id,
          name: item.recepie.name,
          quantity: 1,
          rate: item.prices[0].price,
          amount: 1 * item.prices[0].price
        })
      }
    },
    // get filtered orders
    getFilteredOrders () {
      if(!this.fromDate) {
        alert('Please enter From Date')
        return
      }
      if(!this.toDate) {
        alert('Please enter To Date')
        return
      }
      this.getOrders()
    },
    // Get Orders
    getOrders () {
      this.items = []
      this.form.get(`/api/orders?fromDate=${this.fromDate}&toDate=${this.toDate}`)
        .then(data => {
          console.log(data.data)

          data.data.forEach((item, j) => {
            this.orderItems = []
            item.tickets.forEach(ticket => {
              this.updateOrder(ticket.recepie_menu)
            })

            this.items.unshift({
              order_id: item.id,
              table: `
                ${item.tables.map(table => {
                  return `
                    ${table.name}
                  `
                })}
              `,
              order_details: `
                ${this.orderItems.map(item => {
                    return `
                        <br>  
                        ${item.no}. ${item.name} | Qty: ${item.quantity} | Amount: Rs. ${item.amount} /-
                      `
                  })
                }
              `,
              total_amount: 'Rs: ' + item.total_amount + ' /-',
              actions: '/tables/' + item.id + '/edit'
            })
          })
        })
    },
  }
}
</script>

<template>
  <div class="animated fadeIn">

    <b-row>
      <b-col lg="12">
        <c-table striped small
          :caption="`
            Today's Orders
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
    orderItems: []
  }),

  components: {
    cTable
  },

  mounted () {
    this.form.get('/api/orders')
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
  }
}
</script>

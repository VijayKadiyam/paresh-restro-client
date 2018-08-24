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
        <b-button size="lg" variant='primary'
          @click="print"
        ><i class='fa fa-paper-plane'></i>&nbsp; Print</b-button>
      </b-col>
    </b-row>

    <div id="printArea">
      <b-row>
        <b-col lg="12">
          <h5>Total Amount: {{ total }} /-</h5>
          <b-table class="table-bordered" id="orderTable" :hover="true" :striped="true" :small="true" :fixed="false" responsive="sm"
            :items="items"
            :fields="fields"
          >
            <template slot="order_details" slot-scope="data">
              <div v-html="data.item.order_details"></div>
            </template>
            <template slot="status" slot-scope="data">
              <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
            </template>
            <template slot="actions" slot-scope="data">
              <b-button size="sm" variant='success' :to="data.item.actions"><i class='icon-pencil'></i>&nbsp; Edit</b-button>
            </template>
            <template slot="total_amount" slot-scope="data">
              <div v-html="data.item.total_amount"></div>
            </template>
            <template slot="table" slot-scope="data">
              <div v-html="data.item.table"></div>
            </template>
          </b-table>
        </b-col>
      </b-row>  
    </div>

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
      {key: 'order_details'},
      {key: 'total_amount'}
    ],
    items: [],
    form: new Form({}),
    orderItems: [],
    fromDate: '',
    toDate: '',
    total: 0
  }),

  components: {
    cTable
  },

  mounted () {
    // this.getOrders()
    
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
      this.total = 0
      this.form.get(`/api/orders?fromDate=${this.fromDate}&toDate=${this.toDate}`)
        .then(data => {
          console.log(data.data)

          data.data.forEach((item, j) => {
            this.orderItems = []
            item.tickets.forEach(ticket => {
              this.updateOrder(ticket.recepie_menu)
            })

            this.total += parseFloat(item.total_amount - parseFloat(item.order_discounts.length ? item.order_discounts[0].amount : '0' ))

            this.items.unshift({
              order_id: item.id,
              table: `
                ${item.tables.map(table => {
                  return `
                    <br>
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
              total_amount: `
                Sub Total: ${'Rs: ' + item.total_amount}
                <br>
                Discount: ${'Rs: ' + (item.order_discounts.length ? item.order_discounts[0].amount : '0' )}
                <br>
                Total: ${parseFloat(item.total_amount - parseFloat(item.order_discounts.length ? item.order_discounts[0].amount : '0' )) + '/-'}
              `,
              actions: '/tables/' + item.id + '/edit'
            })
          })
        })
    },
    // Print the list
    print () 
    {
      var mywindow = window.open('', 'PRINT', 'height=400,width=600');

      mywindow.document.write('<html><head><title>' + document.title  + '</title>');
      mywindow.document.write('</head><body style="margin-left: 60px">');
      mywindow.document.write('<h4>Order Report [' + this.fromDate + '-' +  this.toDate  + ']</h4>');
      mywindow.document.write(document.getElementById('printArea').innerHTML);
      mywindow.document.write('</body></html>');

      mywindow.document.close(); // necessary for IE >= 10
      mywindow.focus(); // necessary for IE >= 10*/

      mywindow.print();
      mywindow.close();

      return true;
    }
  }
}
</script>

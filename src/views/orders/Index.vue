<template>
  <div class="animated fadeIn">
    <b-row>
      <!-- Menu Types and Items -->
      <b-col lg="8">
        <!-- To get the menu types -->
        <b-row>
          <b-col lg="3">
            <b-button :pressed="true" class="mb-3" size="sm" variant='success' @click="searchByType('All')"><i class='icon-arrow-right'></i>&nbsp; All</b-button>
          </b-col>
          <b-col lg="3"
            v-for="(type, i) in types"
            :key="`type${i}`"
          >
            <b-button class="mb-3" size="sm" variant='success' @click="searchByType(type.id)">
              <i class='icon-arrow-right'></i>&nbsp; {{ type.type }}
            </b-button>
          </b-col>
        </b-row>
        <!-- End To get the menu types -->
        <!-- Search -->
        <form @submit.prevent="searchItems">
          <b-form-group>
            <b-input-group>
              <b-form-input v-model="search" type="text" list="browsers" name="browser" placeholder="Search Item"></b-form-input>
              <!-- Attach Right button -->
              <b-input-group-append>
                <b-button variant="primary" type="submit">Search</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </form>
        <datalist id="browsers">
          <option v-for="(item, i) in searchDropdown" :key="`item${i}`" :value="item.recepie.name"></option>
        </datalist>
        <br>
        <!-- End Search -->
        <!-- Menu Items -->
        <b-row id="itemList">
          <b-col sm="6" md="4"
            v-for="(item, i) in items"
            :key="`table${i}`"
          >
            <b-card>
              <div slot="header">
                {{ item.recepie.name }} [Rs. {{ item.prices[0].price }}]
                <b-button size="sm" variant="warning" class="px-4 float-right"
                  @click="addItem(item)"
                >
                  <i class='icon-arrow-right-circle'></i>
                </b-button>
              </div>
              {{ item.recepie.description }}
              <br>
              <b>[{{ item.type.type }}]</b>
            </b-card>
          </b-col>
        </b-row>
        <!-- ENd Menu Items -->
      </b-col>
      <!-- End Menu Types and Items -->
      <b-col md="4"
      >
        <b>Table: {{ $route.query.table }} / Order: {{ order.id }}</b>
        <small>
          <button
            @click="goToTables"
          >Go To Tables</button>
          <button
            @click="cancelOrder"
          >Cancel Order</button>
        </small>
        <br>
        <br>
        <!-- Order Details -->
        <b-card
          header="<i class='fa fa-paper-plane'></i>&nbsp;&nbsp;Order Details"
          style="height: 370px;"
        >
          <b-table class="table-bordered" id="orderTable" :hover="true" :striped="true" :small="true" :fixed="false" responsive="sm"
            :items="orderItems"
            :fields="orderFields"
          >
            <template slot="quantity" slot-scope="data">
              <span @click="decreementItem(data.item.id)" style="color:red"><i class='icon-arrow-left-circle'></i></span>
              {{ data.item.quantity }}
              <span @click="increementItem(data.item.id)" style="color: green"><i class='icon-arrow-right-circle'></i></span>
            </template>
            <template slot="remove" slot-scope="data">
              <b-button size="sm" variant='danger' @click="removeItem(data.item.id)"><i class='icon-close'></i></b-button>
            </template>
          </b-table>
        </b-card>
        <!-- End Order Details -->
        <!-- Bill Details -->
        <b-card
          header="<i class='fa fa-paper-plane'></i>&nbsp;&nbsp;Bill Details"
          style="height: 230px;"
        >
          <b-row>
            <b-col lg="6">
              <b-form-select
                value=""
                :plain="true"
                :options="discount_types"
                v-model="order_discount.discount_type_id"
              >
              </b-form-select>
            </b-col>
            <b-col lg="6"
              v-if="order_discount.discount_type_id != 2"
            >
              <b-form-select
                value=""
                :plain="true"
                :options="discounts"
                v-model="order_discount.discount_id"
                @input="changeDiscount"
              >
              </b-form-select>
            </b-col>
            <b-col lg="6" v-else>
              <input type="number"
                :class="`form-control ${form.errors.has('name') ? 'is-invalid' : ''}`"
                placeholder="Discount Amount"
                name="name"
                v-model="order_discount.amount"
                @keypress="changeDiscountByAmount"
              >
            </b-col>
          </b-row>
          <br>
          <h6>Amount: {{ amount }} /-</h6>
          <h6>Discount: {{ discount }} /-</h6>
          <h5>Total Amount: {{ total_amount }} /-</h5>
          <b-row>
            <b-col lg="6">
              <b-button class="mb-3" size="sm" variant='success' @click="printBill">
                <i class='icon-arrow-right'></i>&nbsp;
                Print Bill
              </b-button>
            </b-col>
          </b-row>
        </b-card>
        <!-- End Bill Details -->
      </b-col>
    </b-row>
  </div>
</template>

<script type="text/javascript">
import Form from '@/helpers/Form.js'

import cTable from '@/components/Table.vue'
export default {
  data: () => ({
    form: new Form({
      description: '',
      source_id: ''
    }),
    items: [],
    types: [],
    orderFields: [
      {key: 'no'},
      {key: 'name'},
      {key: 'quantity'},
      {key: 'rate'},
      {key: 'amount'},
      {key: 'remove'}
    ],
    order: {},
    tickets: [],
    orderItems: [],
    table_id: '',
    amount: 0,
    search: '',
    searchDropdown: [],
    smallModal: false,
    discounts: [],
    discount_types: [],
    order_discount: {
      discount_type_id: '',
      discount_id: '',
      amount: 0
    }
  }),

  computed: {
    discount () {
      return this.order_discount.amount
    },

    total_amount () {
      return this.amount - this.discount
    }
  },

  components: {
    cTable
  },

  mounted () {
    this.table_id = this.$route.query.table

    document.body.classList.toggle('sidebar-hidden')
    // To get the menu types
    this.form.get('/api/menu-types')
      .then(data => {
        this.types = data.data
      })
    // To get all the recepie menus
    this.form.get('/api/recepie-menus')
      .then(data => {
        this.items = data.data
        this.searchDropdown = data.data
      })
    // To get all the discounts
    this.form.get('/api/discounts')
      .then(data => {
        this.discounts.push({
          'text': 'Select Discount Percent',
          'value': '',
          'percent': ''
        })
        data.data.forEach(discount => this.discounts.push({
          'text': discount.name,
          'value': discount.id,
          'percent': discount.percent
        }))
      })
    // To get all the discount types
    this.form.get('/api/discount-types')
      .then(data => {
        this.discount_types.push({
          'text': 'Select Discount Type',
          'value': ''
        })
        data.data.forEach(type => this.discount_types.push({
          'text': type.type,
          'value': type.id
        }))
      })
    // To get all the orders of a table
    this.form.get(`/api/tables/${this.table_id}`)
      .then(data => {
        this.order = data.data.orders[0]
        this.order.tickets.forEach(ticket => {
          this.tickets.unshift(ticket)
        })

        // To get the discount applied to this order
        this.form.get(`/api/orders/${this.order.id}/order-discounts`)
          .then(data => {
            if(data.data.length)
              this.order_discount = {
                discount_type_id: data.data[0].discount_type_id,
                discount_id: data.data[0].discount_id,
                amount: data.data[0].amount
              }
          })

        console.log('Mounted: Loaded tickets')
        console.log(this.tickets)

        this.tickets.forEach(ticket => {
          this.updateOrder(ticket.recepie_menu)
        })
      })
  },

  methods: {
    // Update order list
    updateOrder (item) {
      let alreadyItem = this.orderItems.find(i => i.id === item.id)
      if (alreadyItem) {
        alreadyItem.quantity = alreadyItem.quantity + 1
        alreadyItem.amount = alreadyItem.quantity * item.prices[0].price
        this.addAmount(item.prices[0].price)
      } else {
        this.orderItems.unshift({
          no: this.orderItems.length + 1,
          id: item.id,
          name: item.recepie.name,
          quantity: 1,
          rate: item.prices[0].price,
          amount: 1 * item.prices[0].price,
          remove: '/hi'
        })
        this.addAmount(item.prices[0].price)
      }
    },
    // To add an item to the orders
    addItem (item) {
      this.addTicket(item, 1)

      this.updateOrder(item)
    },
    // Increement an item
    increementItem (id) {
      let item = this.items.find(i => i.id === id)
      this.addItem(item)
    },
    // Remove an item from the orders list
    removeItem (id) {
      this.orderItems = this.orderItems.filter(item => item.id !== id)
      // TO renumber the list of orders
      let length = this.orderItems.length
      this.orderItems.forEach(item => {
        item.no = length
        length--
      })

      let tickets = this.tickets.filter(ticket => ticket.recepie_menu.id === id)
      console.log('Remove Item: All tickets')
      console.log(this.tickets)
      tickets.forEach(ticket => {
        this.removeTicket(ticket.recepie_menu.id)
      })
    },
    // Decreement an item
    decreementItem (id) {
      let alreadyItem = this.orderItems.find(i => i.id === id)
      let item = this.items.find(i => i.id === id)
      if (alreadyItem.quantity !== 1) {
        alreadyItem.quantity = alreadyItem.quantity - 1
        alreadyItem.amount = alreadyItem.quantity * item.prices[0].price

        // Delete a ticket
        this.removeTicket(id)
      }
    },
    // add ticket
    addTicket (item, qty) {
      let ticket = new Form({
        order_id: this.order.id,
        recepie_menu_id: item.id,
        qty: qty,
        description: '',
        status_id: 1,
        amount: qty * item.prices[0].price
      })

      ticket.post(`/api/orders/${ticket.order_id}/tickets`)
        .then(data => {
          console.log('Add Ticket: Total tickets while adding')
          this.tickets.unshift(data.data)
          console.log(this.tickets)
        })
    },
    // remove ticket
    removeTicket (id) {
      let ticket = this.tickets.find(ticket => ticket.recepie_menu.id === id)
      console.log('Remove Ticket: Total tickets')
      console.log(this.tickets)
      console.log(ticket.id + ' ' + ticket.recepie_menu_id)

      console.log('Remove Ticket: Tickets after deleting')
      this.tickets = this.tickets.filter(t => t.id !== ticket.id)
      console.log(this.tickets)

      this.form.delete(`/api/orders/${this.order.id}/tickets/${ticket.id}`)
        .then(() => {
          this.removeAmount(ticket.amount)
        })
        .catch(errors => {
          this.removeTicket(id)
        })
    },
    // Add to Total amount
    addAmount (amount) {
      this.amount += parseFloat(amount)
    },
    // Remove from Total amount
    removeAmount (amount) {
      this.amount -= parseFloat(amount)
    },
    // Cancel Order
    cancelOrder () {
      var confirm = window.confirm('Are you sure you want to cancel the order')
      if (confirm) {
        this.endOrder()
      }
    },
    // End the order 
    endOrder () {
      // Update the table status
      this.form = new Form({
        'id': this.table_id,
        'status_id': 2
      })
      this.form.patch(`/api/tables/${this.table_id}`)
        .then(data => {
          document.body.classList.toggle('sidebar-hidden')
          this.$router.push('/table-orders')
        })
    },
    // Go back to tables
    goToTables () {
      document.body.classList.toggle('sidebar-hidden')
      this.$router.push('/table-orders')
    },
    // print Bill
    printBill () {
      // window.print()
      // alert("Print will depend on the printer connected. Once configured it will start printing")
      this.form.get(`/api/print?order_id=${this.order.id}&hotel_id=${this.$store.getters.outlet.id}`)
        .then(d => this.endOrder())
        .catch(e => this.endOrder())
    },
    // Search items
    searchItems () {
      this.items = this.searchDropdown
      this.items = this.items.filter(i => i.recepie.name === this.search)
    },
    // All items
    searchByType (type) {
      this.items = this.searchDropdown
      if (type !== 'All') {
        this.items = this.items.filter(i => i.type.id === type)
      }
    },
    // Change the discount
    changeDiscount () {
      let discount = this.discounts.find(discount => discount.value == this.order_discount.discount_id)
      this.order_discount.amount = this.amount * discount.percent / 100
      console.log(discount.percent)
      this.saveDiscount();
    },
    // Change the dicount by amount 
    changeDiscountByAmount () {
      this.saveDiscount()
    },
    // Save the discount into the db
    saveDiscount () {
      this.form.get(`/api/orders/${this.order.id}/order-discounts`)
        .then(data => {
          let d = data.data[0]
          let form = new Form(this.order_discount)
          if (data.data.length == 0) {
            form.post(`/api/orders/${this.order.id}/order-discounts`)
          } else {
            form.patch(`/api/orders/${this.order.id}/order-discounts/${d.id}`)
          }
        })
    }
  }
}
</script>

<style>
  #orderTable {
    display: block;
    overflow-y: auto;
    overflow-x: hidden;
    height: 270px;
  }

  #itemList {
    height: 500px;
    overflow-y: auto;
  }

  @media print {
    body * {
      visibility: hidden;
    }
    #section-to-print, #section-to-print * {
      visibility: visible;
    }
    #section-to-print {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
</style>

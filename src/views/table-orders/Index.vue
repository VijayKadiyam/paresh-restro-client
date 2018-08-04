<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="6" md="3"
        v-for="(item, i) in items"
        :key="`table${i}`"
      >
        <b-card
          :class="item.status_id == 2 ? 'bg-success' : 'bg-danger'"
        >
          <div slot="header">
            {{ item.name }}
            <b-badge
              :variant="item.status_id == 2 ? 'success' : 'danger'"
              class="float-right"
            >
              {{ item.status_id == 2 ? 'Not Occupied' : 'Occupied'}}
            </b-badge>
          </div>
          Capacity: {{ item.capacity }}
          <b-button variant="warning" class="px-4 float-right" type="submit"
            v-if="item.status_id == 2"
            @click="createOrder(item.id)"
          >
            Take Order
          </b-button>
          <b-button variant="primary" class="px-4 float-right" type="submit"
            v-if="item.status_id == 1"
            :to="`orders?source_id=1&table=${item.id}`"
          >
            Update Order
          </b-button>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script type="text/javascript">
import Form from '@/helpers/Form.js'

export default {
  name: 'TableOrders',

  data: () => ({
    items: [],
    form: new Form({})
  }),

  mounted () {
    this.form.get('/api/tables')
      .then(data => {
        data.data.forEach(item => {
          this.items.push({
            id: item.id,
            name: item.name,
            capacity: item.capacity,
            status: item.status.status,
            status_id: parseInt(item.status_id),
            actions: '/tables/' + item.id + '/edit'
          })
        })
      })
  },

  methods: {
    createOrder (id) {
      this.form = new Form({
        'source_id': '1',
        'tables': [
          {
            'id': id
          }
        ]
      })
      // Create a new order
      this.form.post('/api/orders')
        .then(data => {
        })
      // Update the table status
      this.form = new Form({
        'id': id,
        'status_id': 1
      })
      this.form.patch(`/api/tables/${id}`)
        .then(data => {
          let item = this.items.find(i => i.id === id)
          item.status_id = data.data.status_id
          this.$router.push(`orders?source_id=1&table=${item.id}`)
        })
    }
  }
}
</script>

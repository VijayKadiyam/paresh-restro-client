<template>
  <div class="animated fadeIn">

    <b-row>
      <b-col lg="12">
          <c-table striped small
            :caption="`
              Recepie Menu Items
            `"
            addLink="/recepie-menus/create"
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
  name: 'hotels',

  data: () => ({
    fields: [
      {key: 'recepie_details'},
      {key: 'recepie_type'},
      {key: 'latest_price'},
      {key: 'actions'}
    ],
    items: [],
    form: new Form({})
  }),

  components: {
    cTable
  },

  mounted () {
    this.form.get('/api/recepie-menus')
      .then(data => {
        data.data.forEach(item => {
          this.items.push({
            recepie_details: `
              ${item.recepie.name}, ${item.recepie.description}
            `,
            recepie_type: item.type.type,
            latest_price: item.prices[0] ? item.prices[0].price + ' INR' : '',
            actions: '/recepie-menus/' + item.id + '/edit'
          })
        })
      })
  }
}
</script>

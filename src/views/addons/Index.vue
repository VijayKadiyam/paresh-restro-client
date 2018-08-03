<template>
  <div class="animated fadeIn">

    <b-row>
      <b-col lg="12">
          <c-table striped small
            :caption="`
              My Recepie Addons
            `"
            addLink="/addons/create"
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
      {key: 'name'},
      {key: 'description'},
      {key: 'actions'}
    ],
    items: [],
    form: new Form({})
  }),

  components: {
    cTable
  },

  mounted () {
    this.form.get('/api/addons')
      .then(data => {
        data.data.forEach(item => {
          this.items.push({
            name: item.name,
            description: item.description,
            actions: '/addons/' + item.id + '/edit'
          })
        })
      })
  }
}
</script>

<template>
  <div class="animated fadeIn">

    <b-row>
      <b-col lg="12">
        <c-table striped small
          :caption="`
            Tables
          `"
          addLink="/tables/create"
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
      {key: 'capacity'},
      {key: 'status'},
      {key: 'actions'}
    ],
    items: [],
    form: new Form({})
  }),

  components: {
    cTable
  },

  mounted () {
    this.form.get('/api/tables')
      .then(data => {
        data.data.forEach(item => {
          this.items.push({
            name: item.name,
            capacity: item.capacity,
            status: item.status.status,
            actions: '/tables/' + item.id + '/edit'
          })
        })
      })
  }
}
</script>

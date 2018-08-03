<template>
  <div class="animated fadeIn">

    <b-row>
      <b-col lg="12">
          <c-table striped small
            :caption="`
              My Outlets
            `"
            addLink="/outlets/create"
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
      {key: 'pan_no'},
      {key: 'gstn_no'},
      {key: 'phones'},
      {key: 'emails'},
      {key: 'actions'}
    ],
    items: [],
    form: new Form({})
  }),

  components: {
    cTable
  },

  mounted () {
    this.form.get('/api/hotels')
      .then(data => {
        data.data.forEach(item => {
          this.items.push({
            name: item.name,
            pan_no: item.pan_no,
            gstn_no: item.gstn_no,
            phones: `
              ${
                item.phones.map(phone => {
                  return `
                    ${phone.phone}
                  `
                })
              }
            `,
            emails: `
              ${
                item.emails.map(email => {
                  return `
                    ${email.email}
                  `
                })
              }
            `,
            actions: '/outlets/' + item.id + '/edit'
          })
        })
      })
  }
}
</script>

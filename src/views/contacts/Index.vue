<template>
  <div class="animated fadeIn">

    <b-row>
      <b-col lg="12">
          <c-table striped small
            :caption="`
              My Contacts
            `"
            addLink="/contacts/create"
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
      {key: 'company_name'},
      {key: 'pan_no'},
      {key: 'gstn_no'},
      {key: 'contact_type'},
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
    this.form.get('/api/contacts')
      .then(data => {
        data.data.forEach(item => {
          this.items.push({
            name: item.name,
            company_name: item.company_name,
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
            contact_type: `
              ${
                item.types.map(type => {
                  return `
                    ${type.type}
                  `
                })
              }
            `,
            actions: '/contacts/' + item.id + '/edit'
          })
        })
      })
  }
}
</script>

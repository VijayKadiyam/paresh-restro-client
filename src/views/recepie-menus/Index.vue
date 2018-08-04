<template>
  <div class="animated fadeIn">

    <!-- Search -->
    <form @submit.prevent="searchItem">
      <b-form-group>
        <b-input-group>
          <b-form-input v-model="search" type="text" list="browsers" name="browser" placeholder="Search Item"></b-form-input>
          <!-- Attach Right button -->
          <b-input-group-append>
            <b-button variant="primary" type="submit">Search</b-button>
            &nbsp;&nbsp;&nbsp;
            <b-button variant="primary" @click="getAllItems">Get all items</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </form>
    <datalist id="browsers">
      <option v-for="(item, i) in duplicateItems" :key="`item${i}`" :value="item.recepie_details"></option>
    </datalist>
    <!-- End Search -->

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
    duplicateItems: [],
    form: new Form({}),
    search: ''
  }),

  components: {
    cTable
  },

  mounted () {
    this.form.get('/api/recepie-menus')
      .then(data => {
        data.data.forEach(item => {
          this.items.push({
            recepie_details: item.recepie.name,
            recepie_type: item.type.type,
            latest_price: item.prices[0] ? item.prices[0].price + ' INR' : '',
            actions: '/recepie-menus/' + item.id + '/edit'
          })
        })
      })
      this.duplicateItems = this.items
  },

  methods: {
    // Search item
    searchItem () {
      this.items = [
        this.items.find(item => item.recepie_details === this.search)
      ]
    },
    // Get all items
    getAllItems () {
      this.items = this.duplicateItems
    }
  }
}
</script>

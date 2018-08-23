<template>
  <div class="animated fadeIn">

    <!-- Search -->
    <form @submit.prevent="searchRecepie">
      <b-form-group>
        <b-input-group>
          <b-form-input v-model="search" type="text" list="browsers" name="browser" placeholder="Search Recepie"></b-form-input>
          <!-- Attach Right button -->
          <b-input-group-append>
            <b-button variant="primary" type="submit">Search</b-button>
            &nbsp;&nbsp;&nbsp;
            <b-button variant="primary" @click="getAllRecepies">Get all recepies</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </form>
    <datalist id="browsers">
      <option v-for="(item, i) in duplicateItems" :key="`item${i}`" :value="'[' + item.id + '] ' + item.name"></option>
    </datalist>
    <!-- End Search -->

    <b-row>
      <b-col lg="12">
          <c-table striped small
            :caption="`
              My Recepies
            `"
            addLink="/recepies/create"
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
      {key: 'id'},
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
    this.form.get('/api/recepies')
      .then(data => {
        data.data.forEach(item => {
          this.items.push({
            name: item.name,
            id: item.description,
            actions: '/recepies/' + item.id + '/edit'
          })
        })
      })

      this.duplicateItems = this.items
  },

  methods: {
    // Search item
    searchRecepie () {
      this.items = [
        this.items.find(item => '[' + item.id + '] ' + item.name === this.search)
      ]
    },
    // Get all items
    getAllRecepies () {
      this.items = this.duplicateItems
    }
  }
}
</script>

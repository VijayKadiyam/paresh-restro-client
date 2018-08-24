<template>
  <b-card
    header-tag="header"
  >
    <div slot="header">
      <i class='fa fa-align-justify'></i>
      &nbsp;
      {{ caption }}
      &nbsp;
      <b-button size="sm" variant='primary'
        :to="addLink"
      ><i class='fa fa-paper-plane'></i>&nbsp; Add New</b-button>
    </div>
    <b-table :hover="hover" :striped="striped" :small="small" :fixed="fixed" responsive="sm"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
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
    <nav>
      <b-pagination :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
    </nav>
  </b-card>
</template>

<script type="text/javascript">
export default {
  name: 'c-table',

  data: () => ({
    currentPage: 1,
    perPage: 20
  }),

  props: {
    caption: {
      type: String,
      default: 'Table'
    },
    hover: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    addLink: {
      type: String
    },
    items: '',
    fields: ''
  },

  methods: {
    getBadge (status) {
      return status === 'Active' ? 'success'
        : status === 'Inactive' ? 'secondary'
          : status === 'Pending' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    },
    getRowCount (items) {
      return items.length
    }
  }
}
</script>

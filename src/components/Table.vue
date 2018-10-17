<template>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :totalRows="total"
      :isLoading="loading"
      :fixed-header="true"
      :pagination-options="{
        enabled: true,
        mode: 'records',
        perPage: length,
        setCurrentPage: currentPage,
        nextLabel: 'Next',
        prevLabel: 'Prev',
        rowsPerPageLabel: 'Rows per page',
        ofLabel: 'of',
        pageLabel: 'page', // for 'pages' mode
        allLabel: 'All',
      }"
      mode="remote"
      @on-page-change="(params) => loadData(params, 'page')"
      @on-sort-change="(params) => loadData(params, 'sort')"
      @on-column-filter="(params) => loadData(params, 'filter')"
      @on-per-page-change="(params) => loadData(params, 'page')"
    >
        <div slot="table-actions">
            <slot name="table-actions"></slot>
        </div>
        <div slot="table-actions-bottom">
        </div>
        <div slot="emptystate">
            {{noDataIndicator}}
        </div>
        <div slot="loadingContent">
            Loading...
        </div>
    </vue-good-table>
</template>

<script>
import { VueGoodTable } from 'vue-good-table'
export default {
  name: 'Table',
  components: { VueGoodTable },
  data: function () {
    return {
      currentPage: 1,
      length: 10,
      sortField: '_id',
      sortOrder: 1
    }
  },
  props: {
    rows: {
      required: true,
      type: Array
    },
    columns: {
      required: true,
      type: Array
    },
    total: {
      required: true,
      type: Number
    },
    onChange: {
      required: true,
      type: Function
    },
    noDataIndicator: {
      required: true,
      type: String
    },
    loading: {
      required: true,
      type: Boolean
    }
  },
  methods: {
    loadData: function (params, type) {
      if (type === 'page') {
        this.currentPage = params.currentPage
        this.length = params.currentPerPage
      } else if (type === 'sort') {
        this.sortField = this.columns[params.columnIndex].field
        this.sortOrder = params.sortType === 'asc' ? 1 : -1
      }
      this.onChange(this.currentPage, this.length, this.sortField, this.sortOrder)
    }
  }
}
</script>

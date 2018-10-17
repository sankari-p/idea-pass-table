<template>
    <div id="table-loader">
        <Table
           :columns="columns"
           :rows="rows"
           :total="total"
           :loading="loading"
           :noDataIndicator="noDataIndicator"
           :onChange="loadData"
        >
          <div slot="table-actions">
              <b-dropdown id="dropdown1" right v-if="colVisibility" text="DropDown">
                  <div slot="button-content">
                      <span class="glyphicon glyphicon-eye-open"></span>
                  </div>
                  <b-dropdown-item-button v-for="column in columns" v-bind:key="column.field" class="custom-dropdown-button">
                      <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="column.field"
                                 @change="hideColumn(column, $event)">
                          <label class="form-check-label" for="column.field">
                              {{column.label}}
                          </label>
                      </div>
                  </b-dropdown-item-button>
              </b-dropdown>
          </div>
        </Table>
    </div>
</template>

<script>
import FetchService from '../globals/service'
import Table from './Table.vue'
import './DynamicTable.scss'

export default {
  components: { Table },
  data: function () {
    return {
      columns: [],
      rows: [],
      noDataIndicator: '',
      total: 6,
      loading: true,
      colVisibility: false
    }
  },
  props: {
    id: {
      required: true,
      type: String
    },
    headerClassName: {
      required: false,
      type: String,
      default: 'custom-th-class'
    }
  },
  beforeMount: function () {
    this.columns = [
      {
        field: '_id',
        label: 'ID',
        thClass: this.headerClassName,
        hidden: false
      },
      {
        field: 'name',
        label: 'Name',
        thClass: this.headerClassName,
        hidden: false
      }
    ]
    this.noDataIndicator = 'No Data'
    this.colVisibility = true
    this.loadData(1, 10, '_id', 1)
  },
  methods: {
    loadData: function (currentPage, length, sortField, sortOrder) {
      ((component) => {
        /* fetch(`http://35.237.114.118:3030/formschema?$limit=${length}&$skip=${length * (currentPage - 1)}&$sort[${sortField}]=${sortOrder}`, {
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': localStorage.getItem('accessToken')
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VySWQiOiI1YmI3MmExNGEzMDRiZjdlNjJlOGRiZWIiLCJpYXQiOjE1Mzk2OTU2ODMsImV4cCI6MTUzOTc4MjA4MywiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiYW5vbnltb3VzIiwianRpIjoiMmNlMjVkZjYtMTMxMS00Zjk4LTk0NTktYzgyMWI2YmYzYjVkIn0.Xy2j7Ryoo53zrWBRFmD7XMxgeHWyaerQtu_znEZAXZI'
          }
        })
          .then((response) => response.json())
          .then(function (json) {
            component.rows = json.data
            component.total = json.total
            component.loading = false
          }) */
        FetchService(`formschema?$limit=${length}&$skip=${length * (currentPage - 1)}&$sort[${sortField}]=${sortOrder}`, function (json) {
          component.rows = json.data
          component.total = json.total
          component.loading = false
        })
      })(this)
    },
    hideColumn: function (column, e) {
      e.stopPropagation()
      this.columns = this.columns.map(col => {
        if (col.field === column.field) {
          return Object.assign({}, col, {
            hidden: !col.hidden
          })
        }
        return col
      })
    }
  }
}
</script>

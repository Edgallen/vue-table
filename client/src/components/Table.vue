<template>
  <section class="section__table">
    <div class="filters">
      <my-input
        class="filters__input"
        type="text"
        v-model="searchField"
        placeholder="Поиск"
      />
      <my-select
        class="filters__select"
        v-model:sortValue="rowSort"
        :options="tableKeys.filter((element) => element.value !== 'createdAt')"
      />
      <my-select
        class="filters__select"
        v-model:sortValue="currentCriteria"
        :options="criteriasSort"
      />
    </div>

    <table class="table" v-if="tableData">
      <tr class="table__row">
        <td 
          class="table__row__title"
          v-for="key in tableKeys"
          :key="key._id"
        >
          {{ key.name }}
        </td>
      </tr>

      <tr 
        class="data__card"
        v-for="data in sortedAndSearchedPosts"
        :key="data._id"
      >
        <td
          class="data__fields"
          v-for="key in tableKeys"
          :key="key._id"
        >
          {{ data[key.value] }}
        </td>
      </tr>
    </table>
    <div v-else>
      <h1>Идет загрузка...</h1>
    </div>
    
    <div class="page__wrapper" v-if="tableData && totalPages > 1">
      <div 
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="page"
        :class="{
          currentPage: currentPage === pageNumber
        }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div>

  </section>
</template>

<script>
  export default {
    data() {
      return {
        searchField: '',
        rowSort: '',
        currentCriteria: '',
        criteriasSort: [
          {
            name: 'равно',
          },
          {
            name: 'содержит',
          },
          {
            name: 'больше'
          },
          {
            name: 'меньше'
          },
        ],
        tableKeys: [
          {
            name: 'Дата',
            value: 'createdAt',
            _id: 1
          },
          {
            name: 'Название',
            value: 'name',
            _id: 2
          },
          {
            name: 'Количество',
            value: 'amount',
            _id: 3
          },
          {
            name: 'Расстояние',
            value: 'distance',
            _id: 4
          },
        ],
        tableData: [],
        totalPages: 1,
        currentPage: 1
      }
    },
    methods: {
      changePage(newPage) {
        this.fetchPosts(newPage);
        this.currentPage = newPage;
      },
      fetchPosts(page) {
        fetch(`http://localhost:5000/api/tableData?page=${page}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          if (res && res.ok) {
            return res.json();
          }
          return Promise.reject(`Что-то пошло не так, статус ответа: ${res.status}`);
        })
        .then((responseTable) => {
          this.tableData = responseTable.tableData;
          this.totalPages = responseTable.pagesCount;
        })
        .catch((e) => {
          console.log(`Что-то пошло не так ${e}`);
        });
      },
    },
    mounted() {
      this.fetchPosts(1);
    },
    computed: {
      sortedTableData() {
        if (this.currentCriteria !== '') {
          return [...this.tableData].sort((a,b) => {
            let modifier = 1;
            if(this.currentCriteria === 'меньше') modifier = - 1;
            if(a[this.rowSort] < b[this.rowSort]) return 1 * modifier;
            if(a[this.rowSort] > b[this.rowSort]) return - 1 * modifier;
            return 0;
          })
        }
        return [...this.tableData];
      },
      sortedAndSearchedPosts() {
        if (this.currentCriteria !== '' && this.searchField !== '') {
          return [...this.tableData].filter((element) => {
            const stringInput = this.searchField.toString().toLowerCase();
            const stringElement = element[this.rowSort].toString().toLowerCase();

            switch (this.currentCriteria) {
              case 'содержит': {
                return stringElement.includes(stringInput)
              }
              case 'равно': {
                return stringElement === stringInput
              }
              case 'больше': {
                if(this.rowSort === 'название') return stringElement > stringInput;
                return element[this.rowSort] > this.searchField;
              }
              case 'меньше': {
                if(this.rowSort === 'название') return stringElement < stringInput;
                return element[this.rowSort] < this.searchField;
              }
            }
          })
        }
        return this.sortedTableData;
      }
    },
    name: 'table-vue'
  }
</script>

<style scoped>
.filters {
  display: flex;
  height: 37px;
  gap: 10px;
  align-self: start;
}
.filters__select {
  padding: 10px 15px;
}
.section__table {
  width: 60%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
}
.table {
  width: 100%;
  border: 1px solid;
  border-collapse: collapse;
}
.table__row__title {
  text-align: center;
  border: 2px solid teal;
}
.data__fields {
  text-align: center;
  border: 1px solid;
}
.page__wrapper {
  display: flex;
  gap: 5px;
  margin-top: 15px;
  align-self: self-end;
}
.page {
  border: 1px solid black;
  padding: 10px;
  cursor: pointer;
}
.currentPage {
  border: 2px solid teal;
}
</style>
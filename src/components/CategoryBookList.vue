<template>
  <div id="rightCategory">
    <div id="gridContainer" class="grid-container">
      <template v-for="book in $store.state.selectedCategoryBooks">
        <category-book-list-item :key="book.bookId" :book="book">
        </category-book-list-item>
      </template>
    </div>
  </div>
</template>

<script>
import CategoryBookListItem from "./CategoryBookListItem";

export default {
  name: "CategoryBookList",
  components: {
    CategoryBookListItem
  }
};
</script>

<style scoped>
.grid-container {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
}
</style>

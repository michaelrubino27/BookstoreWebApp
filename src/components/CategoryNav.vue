<template>
  <div id="categoryButtons">
    <template v-for="category in $store.state.categories">
      <router-link
        class="categoryButton"
        :key="category.categoryId"
        :to="{ name: 'category', params: { name: category.name } }"
      >
        {{ category.name }}
      </router-link>
    </template>
  </div>
</template>

<script>
export default {
  name: "CategoryNav",
  created() {},
  methods: {}
};
</script>

<style scoped>
.categoryButton {
  background: #a8dadc;
  height: 45px;
  border-radius: 5px;
  border: 1px solid #000000;
  color: #000000;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  padding-top: 15px;
  font-size: 125%;
}

.router-link-exact-active {
  background: #457b9d;
  color: #ffffff;
}

.categoryButton:hover {
  cursor: pointer;
  border: 1px solid #e63946;
  color: #e63946;
}
</style>

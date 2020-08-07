<template>
  <div id="categoryDropdown">
    <div class="dropdown">
      <button class="dropbtn">Categories <span id="carretDown">▼</span></button>
      <div class="dropdown-content">
        <template v-for="category in $store.state.categories">
          <router-link
            :key="category.categoryId"
            :to="{ name: 'category', params: { name: category.name } }"
          >
            {{ category.name }}
          </router-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderCategoryDropdown",
  created() {},
  methods: {}
};
</script>

<style scoped>
#carretDown {
  color: #e63946;
  font-size: 10px;
}

.dropbtn {
  background-color: #d9d9d9;
  color: #000000;
  padding: 10px;
  font-size: 18px;
  border: none;
  cursor: pointer;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-left: 1px solid #000000;
  border-top: 1px solid #000000;
  border-bottom: 1px solid #000000;
  height: 44px;
  width: 125px;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #a8dadc;
  min-width: 125px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
  font-size: 16px;
}

.dropdown-content a {
  color: #000000;
  padding: 8px 12px;
  text-decoration: none;
  display: block;
  border: 1px solid #000000;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
  border: 1px solid #e63946;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #d9d9d9;
  color: #e63946;
  border: 1px solid #e63946;
}
</style>

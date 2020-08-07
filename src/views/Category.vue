<template>
  <div class="section">
    <category-nav></category-nav>

    <div id="homeDivider"></div>

    <template v-if="$store.state.loadingStatus">
      <div id="spinnerHolder">
        <div id="spinner"></div>
      </div>
    </template>

    <template v-else>
      <category-book-list> </category-book-list>
    </template>
  </div>
</template>

<script>
import CategoryNav from "@/components/CategoryNav";
import CategoryBookList from "@/components/CategoryBookList";

export default {
  name: "category",
  components: {
    CategoryNav,
    CategoryBookList
  },
  data: function() {
    return {
      loadingData: false
    };
  },
  created: function() {
    this.$store.dispatch("selectCategory", this.$route.params.name);
    this.$store.dispatch("fetchSelectedCategoryBooks");
  },
  methods: {}
};
</script>

<style scoped>
#categoryButtons {
  padding: 40px;
  width: 150px;
  max-width: 150px;
  min-width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

#homeDivider {
  border-left: 1px solid #d9d9d9;
  margin-top: 40px;
  margin-bottom: 40px;
}

#rightCategory {
  padding: 25px;
  width: calc(100% - 150px);
  overflow: hidden;
}

#spinnerHolder {
  padding: 40px;
  margin: auto;
  width: calc(100% - 250px);
}

category-book-list {
  width: calc(100% - 250px);
}

#spinner {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #e63946;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
  margin-left: 35%;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<template>
  <div id="listHolder">
    <div id="featuredCategories">
      Featured Categories
    </div>

    <div id="featuredCategoriesList">
      <div class="featuredCategoriesItem">
        <router-link to="/category/Adventure">
          <img
            class="catImage"
            src="../assets/images/categories/Adventure.png"
            alt="Adventure Category"
          />
        </router-link>
        <div class="catTitleInfo">
          Adventure
        </div>
      </div>
      <div class="featuredCategoriesItem">
        <router-link to="/category/Drama">
          <img
            class="catImage"
            src="../assets/images/categories/Drama.png"
            alt="Drama Category"
          />
        </router-link>
        <div class="catTitleInfo">
          Drama
        </div>
      </div>
      <div class="featuredCategoriesItem">
        <router-link to="/category/Horror">
          <img
            class="catImage"
            src="../assets/images/categories/Horror.png"
            alt="Horror Category"
          />
        </router-link>
        <div class="catTitleInfo">
          Horror
        </div>
      </div>
    </div>

    <div id="bestSellers">
      Featured Books
    </div>

    <div id="suggestedBookList">
      <template v-for="featuredBook in $store.state.featuredBooks">
        <div class="suggestedBookListItem" :key="featuredBook.bookId">
          <a class="bestImageHolder" href="#">
            <img
              class="bestImage"
              :src="
                require('@/assets/images/books/' +
                  bookImageFileName(featuredBook))
              "
              :alt="featuredBook.title"
            />
          </a>
          <div class="bestTitleInfo">
            {{ featuredBook.title }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeCategoryList",
  created() {
    this.$store.dispatch("fetchFeaturedBooks");
  },
  methods: {
    bookImageFileName: function(book) {
      let fullName = "";
      let name = book.title.replace(/ /g, "-").replace(/'/g, "");

      if (book.title == "War Horse") {
        fullName = name + ".gif";
      } else {
        fullName = name + ".jpg";
      }

      return fullName;
    }
  }
};
</script>

<style scoped>
#listHolder {
  height: 100%;
  width: 100%;
}

#suggestedBookList,
#featuredCategoriesList {
  width: 90%;
  display: flex;
  justify-content: space-between;
  height: 40%;
  margin: 10px auto auto;
}

.featuredCategoriesItem {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.suggestedBookListItem {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 10vw;
}

.catImage {
  height: 10vw;
}

.catTitleInfo {
  color: #000000;
  text-align: center;
  font-size: clamp(16px, 2.5vw, 26px);
}

.bestImage {
  height: 10vw;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.bestTitleInfo {
  color: #000000;
  text-align: center;
  font-size: clamp(12px, 2vw, 20px);
  width: 100%;
  margin: auto;
}

.bestImageHolder {
  margin: auto;
}

#featuredCategories,
#bestSellers {
  color: #e63946;
  font-size: 36px;
  height: 40px;
}

#bestSellers {
  padding-top: 10px;
}
</style>

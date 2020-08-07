<template>
  <div class="grid-item">
    <div class="bookImage">
      <a class="catImageHolder" href="#">
        <img
          class="bookImageActual"
          :src="require('@/assets/images/books/' + bookImageFileName(book))"
          :alt="book.title"
        />
      </a>
    </div>

    <div class="bookInfoHolder">
      <ul class="bookInfo">
        <li class="bookTitle">{{ book.title }}</li>
        <li class="bookAuthor">{{ book.author }}</li>
        <li class="bookPrice">{{ book.price | asDollarsAndCents }}</li>
      </ul>
      <ul class="bookButtons">
        <li>
          <button class="addToCartButton" @click="addToCart(book)">
            <a class="bookButtonLink">Add to Cart</a>
          </button>
        </li>
        <li>
          <button class="readNowButton" v-if="book.isPublic">
            <a class="bookButtonLink">Read Now</a>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "categoryBookListItem",
  props: {
    book: {
      type: Object,
      required: false
    }
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
    },
    addToCart(book) {
      this.$store.dispatch("addToCart", book);
    }
  }
};
</script>
<style scoped>
.grid-item {
  background-color: #f4fbf2;
  border: 1px solid #000000;
  border-radius: 5px;
  padding: 10px;
  font-size: 30px;
  text-align: center;
  display: flex;
  width: clamp(130px, calc((100% / 3) - 55px), calc(((100% / 3)) - 55px));
  margin: 15px;
}

a.catImageHolder {
  height: 100%;
  width: 100%;
}

.bookImage {
  height: 12vw;
  margin: auto;
  display: block;
}

.bookImageActual {
  height: 100%;
  border: 1px solid #d9d9d9;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.bookInfoHolder {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 50%;
}

.bookInfo {
  font-size: clamp(10px, 1.2vw, 14px);
}

.bookTitle {
  font-size: clamp(10px, 1.4vw, 20px);
  font-weight: bold;
  padding-bottom: 5px;
  width: 95%;
  text-align: center;
}

.bookAuthor {
  padding-bottom: 5px;
}

.addToCartButton,
.readNowButton {
  font-size: clamp(10px, 1.2vw, 12px);
  background: #4472c4;
  border: 1px solid #000000;
  border-radius: 5px;
  color: #ffffff;
  padding: 8px;
  margin-bottom: 5px;
}

.readNowButton {
  background: #103476 !important;
}

.addToCartButton:hover,
.readNowButton:hover {
  border: 1px solid #e63946;
  cursor: pointer;
  color: #ffffff;
}

.bookButtonLink:hover {
  color: #ffffff;
}
</style>

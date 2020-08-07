<template>
  <div>
    <div
      id="noItemsText"
      v-if="cart.numberOfItems == null || cart.numberOfItems === 0"
    >
      You have no items in your cart.
    </div>

    <div v-else>
      <table id="cartTable">
        <tr id="columnTitle">
          <td class="titleCell" id="blankBorder"></td>
          <td class="titleCell" id="titleBorder">Title</td>
          <td class="titleCell">Price</td>
          <td class="titleCell">Quantity</td>
          <td class="titleCell">Total</td>
          <td class="titleCell">
            <img
              id="clearCart"
              src="../assets/images/site/Clear.png"
              alt="Clear Cart"
              height="25"
              @click="clearCartButton()"
            />
          </td>
        </tr>

        <template v-for="book in cart.items">
          <tr class="bookRow" :key="book.book.bookId" :book="book">
            <td class="imageCell">
              <img
                class="cartBookImage"
                :src="
                  require('@/assets/images/books/' +
                    bookImageFileName(book.book))
                "
                :alt="book.book.title"
              />
            </td>
            <td id="rowTitle" class="cellText">{{ book.book.title }}</td>
            <td class="cellText alignRightDollar">
              {{ book.price | asDollarsAndCents }}
            </td>
            <td class="cellText">
              <input
                class="quantityInput"
                type="number"
                v-model.trim.number.lazy="book.quantity"
                :id="book.book.title + '_quantity'"
                name="bookQuantity"
                min="0"
                @change="quantityChange(book, book.quantity)"
              />
            </td>
            <td class="cellText alignRightDollar">
              {{ (book.price * book.quantity) | asDollarsAndCents }}
            </td>
            <td class="cellText">
              <img
                id="removeBook"
                src="../assets/images/site/Delete.png"
                alt="Remove Book"
                height="15"
                @click="removeBook(book)"
              />
            </td>
          </tr>
        </template>

        <tr id="columnSubtotal">
          <td class="subtotalCell"></td>
          <td class="subtotalCell"></td>
          <td class="subtotalCell"></td>
          <td class="subtotalCell">Subtotal:</td>
          <td id="totalCell" class="subtotalCell alignRightDollar">
            <span id="totalText">{{ cart.subtotal | asDollarsAndCents }}</span>
          </td>
          <td class="subtotalCell removeCell"></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "CartTable",
  created() {},
  methods: {
    ...mapActions(["updateCart", "clearCart"]),
    bookImageFileName: function(book) {
      let fullName;
      let name = book.title.replace(/ /g, "-").replace(/'/g, "");

      if (book.title === "War Horse") {
        fullName = name + ".gif";
      } else {
        fullName = name + ".jpg";
      }

      return fullName;
    },
    quantityChange(book, quantity) {
      this.updateCart({ book: book, quantity: quantity });
    },
    removeBook(book) {
      this.updateCart({ book: book, quantity: 0 });
    },
    clearCartButton() {
      this.clearCart();
    }
  },
  computed: {
    ...mapState(["cart"])
  }
};
</script>

<style scoped>
#cartTable {
  margin-left: 10vw;
  margin-right: 10vw;
  width: calc(100% - 20vw);
  border: 1px solid black;
}
#columnTitle {
  border: 1px solid black;
  background: #1d3557;
  color: white;
  font-size: 1.8vw;
  text-align: center;
}
.titleCell {
  padding: 10px;
  border: 1px solid black;
}
.bookRow {
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}
.cellText {
  text-align: center;
  font-size: 1.7vw;
}
#rowTitle {
  width: 60%;
}
.imageCell {
  padding: 10px;
  width: 5vw;
  margin: auto;
}
.cartBookImage {
  width: 5vw;
  margin: auto;
}
.quantityInput {
  width: 50px;
  text-align: center;
}
.subtotalCell {
  background: #a8dadc;
  padding: 10px;
}
#totalText {
  font-weight: bold;
}
#totalCell {
  font-size: 1.7vw;
  width: 15%;
  padding-right: 0;
}
.removeCell {
  width: 15px;
}
#clearCart {
  cursor: pointer;
}
#removeBook {
  cursor: pointer;
}
#noItemsText {
  width: 100%;
  text-align: center;
  padding-bottom: 20px;
  font-size: 2.5vw;
  font-weight: bold;
}
#blankBorder {
  border-right: 0 !important;
}
#titleBorder {
  border-left: 0 !important;
}
.alignRightDollar {
  text-align: right;
}
</style>

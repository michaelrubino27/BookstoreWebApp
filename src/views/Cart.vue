<template>
  <div class="cartHolder">
    <div id="cartNumberOfItems">
      You have
      <span id="numberOfItems"> {{ cart.numberOfItems }} </span>
      <span v-if="cart.numberOfItems === 1"> Item </span>
      <span v-else> Items </span>
      in your cart.
    </div>

    <cart-table></cart-table>

    <div id="continueButtonHolder">
      <button id="continueButton" @click="continueShopping">
        Continue Shopping
      </button>
    </div>

    <div
      id="checkoutButtonHolder"
      v-if="cart.numberOfItems != null && cart.numberOfItems !== 0"
    >
      <router-link to="/checkout">
        <button id="checkoutButton">
          Checkout
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import CartTable from "@/components/CartTable";
import { mapState } from "vuex";

export default {
  name: "Cart",
  components: {
    CartTable
  },
  created() {},
  methods: {
    continueShopping() {
      let lastCategory = this.$store.state.selectedCategoryName;
      if (lastCategory === "" || lastCategory === null) {
        this.$router.push("/category/Adventure");
      } else {
        this.$router.push("/category/" + lastCategory);
      }
      console.log(lastCategory);
    }
  },
  computed: {
    ...mapState(["cart"])
  }
};
</script>

<style scoped>
.cartHolder {
  padding: 40px;
}
#cartNumberOfItems {
  width: 100%;
  text-align: center;
  padding-bottom: 50px;
}
#numberOfItems {
  font-weight: bold;
}
#continueButtonHolder {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 25px;
}
#checkoutButtonHolder {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 25px;
}
#continueButton {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
  background: #4472c4;
  color: white;
}
#checkoutButton {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
  background: #103476;
  color: white;
}
#continueButton:hover,
#checkoutButton:hover {
  border: 1px solid #e63946;
  cursor: pointer;
  color: #e63946;
}
</style>

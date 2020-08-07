<template>
  <div>
    <div id="noItemsText" v-if="$store.state.orderDetail == null">
      You have no items in your order.
    </div>

    <div v-else>
      <table id="confTable">
        <tr id="columnTitle">
          <td class="titleCell" id="titleBorder">Title</td>
          <td class="titleCell">Price</td>
          <td class="titleCell">Quantity</td>
          <td class="titleCell">Total</td>
        </tr>

        <template v-for="(item, index) in $store.state.orderDetail.lineItems">
          <tr class="bookRow" :key="item.bookId" :item="item">
            <td id="rowTitle" class="cellText">
              {{ $store.state.orderDetail.books[index].title }}
            </td>
            <td class="cellText alignRightDollar">
              {{
                $store.state.orderDetail.books[index].price | asDollarsAndCents
              }}
            </td>
            <td class="cellText">
              {{ item.quantity }}
            </td>
            <td class="cellText alignRightDollar">
              {{
                ($store.state.orderDetail.books[index].price * item.quantity)
                  | asDollarsAndCents
              }}
            </td>
          </tr>
        </template>

        <tr id="columnSurcharge">
          <td class="surchargetotalCell"></td>
          <td class="surchargetotalCell"></td>
          <td class="surchargetotalCell">Taxes + Delivery:</td>
          <td id="surchargeCell" class="surchargetotalCell alignRightDollar">
            <span id="surchargeText">{{
              $store.state.cart.surcharge | asDollarsAndCents
            }}</span>
          </td>
        </tr>

        <tr id="columnSubtotal">
          <td class="subtotalCell"></td>
          <td class="subtotalCell"></td>
          <td class="subtotalCell">Subtotal:</td>
          <td id="totalCell" class="subtotalCell alignRightDollar">
            <span id="totalText">{{
              $store.state.orderDetail.order.amount | asDollarsAndCents
            }}</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmationTable"
};
</script>

<style scoped>
#confTable {
  width: calc(100%);
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
.subtotalCell {
  background: #a8dadc;
  padding: 10px;
}
.surchargetotalCell {
  background: #c3e9ea;
  padding: 10px;
  font-size: 1.7vw;
}
#totalText {
  font-weight: bold;
  padding-right: 10px;
}
#totalCell,
#surchargeCell {
  font-size: 1.7vw;
  width: 15%;
  padding-right: 0;
}
#noItemsText {
  width: 100%;
  text-align: center;
  padding-bottom: 20px;
  font-size: 2.5vw;
  font-weight: bold;
}
#titleBorder {
  border-left: 0 !important;
}
td {
  padding: 10px;
}
#columnSurcharge {
  border-bottom: 1px solid black;
}
.alignRightDollar {
  text-align: right;
}
#surchargeText {
  padding-right: 10px;
}
</style>

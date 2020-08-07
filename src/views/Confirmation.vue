<template>
  <div class="confirmationHolder">
    <section class="confirmationView" v-if="$store.state.orderDetail != null">
      <div>
        <div id="titleConf">Confirmation</div>
        <ul id="confDetialHolder">
          <li>
            Your confirmation number:
            <span id="confNum">
              {{ $store.state.orderDetail.order.confirmationNumber }}
            </span>
          </li>
          <li>{{ dispalyDate() }}</li>
        </ul>
        <confirmation-table> </confirmation-table>

        <div id="titleCust">Customer Information</div>
        <ul id="customerInfo">
          <li>{{ $store.state.orderDetail.customer.customerName }}</li>
          <li>{{ $store.state.orderDetail.customer.address }}</li>
          <li>{{ $store.state.orderDetail.customer.phone }}</li>
          <li>{{ getCCInfo() }}</li>
        </ul>
      </div>
    </section>

    <section v-else>
      <div class="confHolder">
        <div id="confEmpty">
          No transaction has occurred.
        </div>

        <div id="continueButtonHolder">
          <button id="continueButton" @click="continueShopping">
            Continue Shopping
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ConfirmationTable from "@/components/ConfirmationTable";

export default {
  name: "Confirmation",
  components: { ConfirmationTable },
  methods: {
    continueShopping() {
      let lastCategory = this.$store.state.selectedCategoryName;
      if (lastCategory === "" || lastCategory === null) {
        this.$router.push("/category/Adventure");
      } else {
        this.$router.push("/category/" + lastCategory);
      }
      console.log(lastCategory);
    },
    dispalyDate() {
      let dateInfo = this.$store.state.orderDetail.order.dateCreated;
      let day = dateInfo.dayOfWeek.toLowerCase();
      let month = dateInfo.month.toLowerCase();
      let year = dateInfo.year;
      let hour = dateInfo.hour;
      let minute = dateInfo.minute;
      let second = dateInfo.second;

      day = day.charAt(0).toUpperCase() + day.slice(1);
      month = month.charAt(0).toUpperCase() + month.slice(1);

      return (
        day +
        " " +
        month +
        " " +
        year +
        " " +
        this.singleDigitTime(hour) +
        ":" +
        this.singleDigitTime(minute) +
        ":" +
        this.singleDigitTime(second)
      );
    },
    singleDigitTime(time) {
      let newTime = time.toString().length;
      if (newTime <= 1) {
        return "0" + time;
      }
      return time.toString();
    },
    getCCInfo() {
      let ccInfo = this.$store.state.orderDetail.customer.ccNumber;
      let ccInfolength = ccInfo.length;
      let starCC = "";
      let ccExp = this.$store.state.orderDetail.customer.ccExpDate;
      let ccMonth = ccExp.monthValue;
      let ccYear = ccExp.year;

      for (let i = 0; i < ccInfo.length; i++) {
        if (i > ccInfolength - 5) {
          starCC += ccInfo[i];
        } else {
          starCC += "*";
        }
      }
      console.log(starCC.length);
      return starCC + " (" + this.singleDigitTime(ccMonth) + "-" + ccYear + ")";
    }
  }
};
</script>

<style scoped>
.confirmationView {
  margin-left: 18vw;
  margin-right: 18vw;
  width: calc(100% - 36vw);
}
.confirmationHolder {
  padding: 40px;
}
#titleConf {
  font-size: 3vw;
  font-weight: bold;
  text-align: center;
  padding-bottom: 10px;
}
#confDetialHolder {
  padding-bottom: 20px;
  text-align: center;
}
#confNum {
  font-weight: bold;
}
#titleCust {
  font-size: 3vw;
  font-weight: bold;
  text-align: center;
  padding-top: 20px;
}
#customerInfo {
  margin-top: 10px;
  border: 1px solid black;
  text-align: center;
  width: calc(100% - 20px);
  padding: 10px;
  font-size: 1.8vw;
  background: #d2d2d2;
}
li {
  padding-top: 5px;
}
/* Empty Confirmation */
#confEmpty {
  width: 100%;
  text-align: center;
  padding-bottom: 50px;
  font-weight: bold;
  font-size: 3vw;
}
#continueButtonHolder {
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
</style>

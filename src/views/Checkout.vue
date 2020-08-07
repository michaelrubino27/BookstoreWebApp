<template>
  <div class="checkoutHolder">
    <section class="checkoutView" v-if="!cart.empty">
      <div id="contactBillingTitle">
        Contact / Billing Information
      </div>

      <form @submit.prevent="submitOrder">
        <!----------------------------- Name ----------------------------->
        <div class="FormItem">
          <label class="subtitle" for="name">Name:</label>
          <input
            class="textField"
            type="text"
            size="35vw"
            maxlength="45"
            id="name"
            name="name"
            @blur="$v.name.$touch()"
            v-model.lazy="$v.name.$model"
          />
        </div>
        <template v-if="$v.name.$error">
          <div class="errorText" v-if="!$v.name.required">
            Name is required.
          </div>
          <div class="errorText" v-else-if="!$v.name.minLength">
            Name must have at least
            {{ $v.name.$params.minLength.min }} letters.
          </div>
          <div class="errorText" v-else-if="!$v.name.maxLength">
            Name can have at most
            {{ $v.name.$params.maxLength.max }} letters.
          </div>
          <div class="errorText" v-else>An unexpected error occurred.</div>
        </template>

        <!----------------------------- Address ----------------------------->
        <div class="FormItem">
          <label class="subtitle" for="address">Address:</label>
          <input
            class="textField"
            type="text"
            size="35vw"
            maxlength="45"
            id="address"
            name="address"
            @blur="$v.address.$touch()"
            v-model.lazy="$v.address.$model"
          />
        </div>
        <template v-if="$v.address.$error">
          <div class="errorText" v-if="!$v.address.required">
            Address is required.
          </div>
          <div class="errorText" v-else-if="!$v.address.minLength">
            Address must have at least
            {{ $v.address.$params.minLength.min }} letters.
          </div>
          <div class="errorText" v-else-if="!$v.address.maxLength">
            Address can have at most
            {{ $v.address.$params.maxLength.max }} letters.
          </div>
          <div class="errorText" v-else>An unexpected error occurred.</div>
        </template>

        <!----------------------------- Phone ----------------------------->
        <div class="FormItem">
          <label class="subtitle" for="phone">Phone:</label>
          <input
            class="textField"
            type="tel"
            size="35vw"
            id="phone"
            name="phone"
            @blur="$v.phone.$touch()"
            v-model.lazy="$v.phone.$model"
          />
        </div>
        <template v-if="$v.phone.$error">
          <div class="errorText" v-if="!$v.phone.required">
            Phone number is required.
          </div>
          <div class="errorText" v-else-if="$v.phone.$invalid">
            Please enter a valid phone number.
          </div>
          <div class="errorText" v-else>An unexpected error occurred.</div>
        </template>

        <!----------------------------- Email ----------------------------->
        <div class="FormItem">
          <label class="subtitle" for="email">Email:</label>
          <input
            class="textField"
            type="text"
            size="35vw"
            maxlength="45"
            id="email"
            name="email"
            @blur="$v.email.$touch()"
            v-model.lazy="$v.email.$model"
          />
        </div>
        <template v-if="$v.email.$error">
          <div class="errorText" v-if="!$v.email.required">
            Email is required.
          </div>
          <div class="errorText" v-else-if="!$v.email.maxLength">
            Emails can have at most
            {{ $v.email.$params.maxLength.max }} letters.
          </div>
          <div class="errorText" v-else-if="$v.email.$invalid">
            Please enter a valid email address.
          </div>
          <div class="errorText" v-else>An unexpected error occurred.</div>
        </template>

        <!----------------------------- CC Number ----------------------------->
        <div class="FormItem">
          <label class="subtitle" for="ccNumber">Credit Card:</label>
          <input
            class="textField"
            type="text"
            size="35vw"
            maxlength="45"
            id="ccNumber"
            name="ccNumber"
            @blur="$v.ccNumber.$touch()"
            v-model="$v.ccNumber.$model"
          />
        </div>
        <template v-if="$v.ccNumber.$error">
          <div class="errorText" v-if="!$v.ccNumber.required">
            Credit card is required.
          </div>
          <div class="errorText" v-else-if="$v.ccNumber.$invalid">
            Please enter a valid card number.
          </div>
          <div class="errorText" v-else>An unexpected error occurred.</div>
        </template>

        <div class="FormItem">
          <div class="subtitle">Expiration:</div>
          <div id="expirationDiv">
            <select id="expMonth" v-model="ccExpiryMonth">
              <option
                v-for="(month, index) in months"
                :key="index"
                :value="index + 1"
                >{{ month }} ({{ index + 1 }})</option
              >
            </select>
            <select id="expYear" v-model="ccExpiryYear">
              <option
                v-for="(year, index) in years"
                :key="index"
                :value="year"
                >{{ year }}</option
              >
            </select>
          </div>
        </div>

        <div id="checkoutTableHolder">
          <div id="checkoutTitle">
            Checkout
          </div>

          <table id="checkoutTable">
            <tr>
              <td class="cartTotalRow">Cart Total:</td>
              <td class="cartTotalRow checkoutPrice">
                {{ cart.subtotal | asDollarsAndCents }}
              </td>
            </tr>

            <tr>
              <td class="surchargeRow">Taxes + Delivery:</td>
              <td class="surchargeRow checkoutPrice">
                {{ cart.surcharge | asDollarsAndCents }}
              </td>
            </tr>

            <tr>
              <td class="totalRow">Total:</td>
              <td class="totalRow checkoutPrice">
                {{ (cart.subtotal + cart.surcharge) | asDollarsAndCents }}
              </td>
            </tr>
          </table>
        </div>

        <div id="completeCheckoutButtonHolder">
          <input
            id="completeCheckoutButton"
            type="submit"
            name="submit"
            :disabled="checkoutStatus === 'PENDING'"
            value="Complete Purchase"
          />
        </div>
      </form>

      <section v-show="checkoutStatus !== ''" class="checkoutStatusBox">
        <div class="checkoutError" v-if="checkoutStatus === 'ERROR'">
          Error: Please fix the problems above and try again.
        </div>

        <div class="currentStatus" v-else-if="checkoutStatus === 'PENDING'">
          Processing...
        </div>

        <div class="currentStatus" v-else-if="checkoutStatus === 'OK'">
          Order placed...
        </div>

        <div class="checkoutError" v-else>
          <!-- "checkoutStatus == 'SERVER_ERROR'" -->
          An unexpected error occurred, please try again.
        </div>
      </section>
    </section>

    <section v-else>
      <div class="cartHolder">
        <div id="cartNumberOfItems">
          You have no items in your cart.
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
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";
import isCreditCard from "validator/lib/isCreditCard";
import isMobilePhone from "validator/lib/isMobilePhone";

const phone = value => isMobilePhone(value, "en-US");
const creditCard = value => isCreditCard(value);

export default {
  data() {
    return {
      name: "",
      address: "",
      phone: "",
      email: "",
      ccNumber: "", // 4444333322221111
      ccExpiryMonth: new Date().getMonth() + 1,
      ccExpiryYear: new Date().getFullYear(),
      checkoutStatus: ""
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(45)
    },
    address: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(45)
    },
    phone: {
      required,
      phone: phone
    },
    email: {
      required,
      email: email,
      minLength: minLength(4),
      maxLength: maxLength(45)
    },
    ccNumber: {
      required,
      creditCard: creditCard
    }
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    months() {
      return [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
    },
    years() {
      return this.next15Years();
    }
  },
  methods: {
    submitOrder() {
      console.log("Submit order");
      this.$v.$touch(); // Ensures validators always run
      if (this.$v.$invalid) {
        this.checkoutStatus = "ERROR";
      } else {
        this.checkoutStatus = "PENDING";
        this.$store
          .dispatch("placeOrder", {
            name: this.name,
            address: this.address,
            phone: this.phone,
            email: this.email,
            ccNumber: this.ccNumber,
            ccExpiryMonth: this.ccExpiryMonth,
            ccExpiryYear: this.ccExpiryYear
          })
          .then(() => {
            this.checkoutStatus = "OK";
            this.$router.push({ name: "confirmation" });
          })
          .catch(reason => {
            this.checkoutStatus = "SERVER_ERROR";
            console.log("Error placing order", reason);
          });
      }
    },
    next15Years() {
      let next15Years = [];
      let currentYear = this.yearFrom(0);

      for (let i = 0; i <= 15; i++) {
        next15Years.push(currentYear + i);
      }

      return next15Years;
    },
    yearFrom(index) {
      return new Date().getFullYear() + index;
    },
    continueShopping() {
      let lastCategory = this.$store.state.selectedCategoryName;
      if (lastCategory === "" || lastCategory === null) {
        this.$router.push("/category/Adventure");
      } else {
        this.$router.push("/category/" + lastCategory);
      }
      console.log(lastCategory);
    }
  }
};
</script>

<style scoped>
.checkoutView {
  margin-left: 22vw;
  margin-right: 22vw;
  width: calc(100% - 44vw);
}
.FormItem {
  margin-bottom: 1px;
  font-size: 1.8vw;
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
}
.errorText {
  color: red;
  text-align: right;
  font-size: 12px;
  padding-bottom: 10px;
  font-style: italic;
}
.subtitle {
  padding-bottom: 2px;
  font-size: 1.9vw;
  color: #1d3557;
  display: block;
  padding-top: 5px;
}
#expirationDiv {
  width: calc(35vw - 16px);
  display: flex;
  justify-content: space-between;
}
#expMonth {
  width: calc((35vw - 16px - 20px) - 40%);
  padding-right: 10px;
}
#expYear {
  width: calc((35vw - 16px - 20px) - 60%);
}
input {
  padding: 5px;
}
select {
  padding: 5px;
  text-align: center;
}
/* Checkout Table */
.checkoutHolder {
  padding: 40px;
}
#checkoutTitle {
  font-size: 3vw;
  font-weight: bold;
  text-align: center;
  padding-bottom: 10px;
  padding-top: 30px;
}
#checkoutTable {
  width: 100%;
  font-size: 1.5vw;
}
.surchargeRow {
  padding-top: 5px;
  padding-bottom: 15px;
  border-bottom: 1px solid black;
}
.totalRow {
  padding-top: 10px;
}
.checkoutPrice {
  font-weight: bold;
  text-align: right;
  padding-right: 25px;
}
/* Checkout Button */
#completeCheckoutButtonHolder {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 25px;
}
#completeCheckoutButton {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
  background: #103476;
  color: white;
}
#completeCheckoutButton:hover {
  border: 1px solid #e63946;
  cursor: pointer;
  color: #e63946;
}
#contactBillingTitle {
  font-size: 2.8vw;
  font-weight: bold;
  text-align: center;
  padding-bottom: 10px;
}
/* Cart Empty */
#cartNumberOfItems {
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
#continueButton:hover {
  border: 1px solid #e63946;
  cursor: pointer;
  color: #e63946;
}
/* Checkout Status */
.checkoutStatusBox {
  margin-top: 20px;
  text-align: center;
}
.checkoutError {
  font-weight: bold;
  color: white;
  border: 2px solid black;
  border-radius: 5px;
  padding: 10px;
  background: red;
}
.currentStatus {
  border: 2px solid black;
  border-radius: 5px;
  padding: 10px;
  background: black;
  color: white;
  font-weight: bold;
}
</style>

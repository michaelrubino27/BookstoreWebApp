import Vue from "vue";
import Vuex from "vuex";
import ApiService from "@/services/ApiService";
import { ShoppingCart } from "@/models/ShoppingCart";

Vue.use(Vuex);

export const CART_STORAGE_KEY = "cart";
export const ORDER_DETAIL_STORAGE_KEY = "orderDetail";

export default new Vuex.Store({
  state: {
    categories: [],
    selectedCategoryName: "",
    selectedCategoryBooks: [],
    featuredBooks: [],
    loadingStatus: true,
    cart: new ShoppingCart(),
    orderDetail: null
  },
  mutations: {
    SET_CATEGORIES(state, newCategories) {
      state.categories = newCategories;
    },
    SELECT_CATEGORY(state, newSelectedCategoryName) {
      state.selectedCategoryName = newSelectedCategoryName;
    },
    SET_SELECTED_CATEGORY_BOOKS(state, newSelectedCategoryBooks) {
      state.selectedCategoryBooks = newSelectedCategoryBooks;
    },
    SET_FEATURED_BOOKS(state, newFeaturedBooks) {
      state.featuredBooks = newFeaturedBooks;
    },
    SET_LOADING_STATUS(state, newStatus) {
      state.loadingStatus = newStatus;
    },
    SET_CART(state, shoppingCart) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(shoppingCart));
      let newCart = new ShoppingCart();
      shoppingCart.items.forEach(item => {
        newCart.addItem(item.book, item.quantity);
      });
      state.cart = newCart;
    },
    ADD_TO_CART(state, bookAdded) {
      state.cart.addItem(bookAdded, 1);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.state.cart));
    },
    UPDATE_CART(state, { book, quantity }) {
      state.cart.update(book, quantity);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.state.cart));
    },
    CLEAR_CART(state) {
      localStorage.removeItem(CART_STORAGE_KEY);
      state.cart.clear();
    },
    SET_ORDER_DETAIL(state, orderDetail) {
      state.orderDetail = orderDetail;
      sessionStorage.setItem(
        ORDER_DETAIL_STORAGE_KEY,
        JSON.stringify(orderDetail)
      );
    },
    CLEAR_ORDER_DETAIL(state) {
      sessionStorage.removeItem(ORDER_DETAIL_STORAGE_KEY);
      state.orderDetail = null;
    }
  },
  actions: {
    fetchCategories(context) {
      ApiService.fetchCategories()
        .then(categories => {
          context.commit("SET_CATEGORIES", categories);
        })
        .catch(reason => {
          console.log("Error: " + reason);
        });
    },
    selectCategory(context, categoryName) {
      context.commit("SELECT_CATEGORY", categoryName);
    },
    fetchSelectedCategoryBooks(context) {
      context.commit("SET_LOADING_STATUS", true);
      ApiService.fetchSelectedCategoryBooks(context.state.selectedCategoryName)
        .then(categoryBooks => {
          context.commit("SET_SELECTED_CATEGORY_BOOKS", categoryBooks);
          context.commit("SET_LOADING_STATUS", false);
        })
        .catch(reason => {
          console.log("Error: " + reason);
        });
    },
    fetchFeaturedBooks(context) {
      ApiService.fetchFeaturedBooks()
        .then(featuredBooks => {
          context.commit("SET_FEATURED_BOOKS", featuredBooks);
        })
        .catch(reason => {
          console.log("Error: " + reason);
        });
    },
    addToCart(context, bookAdded) {
      context.commit("ADD_TO_CART", bookAdded);
    },
    updateCart({ commit }, updateDetails) {
      commit("UPDATE_CART", updateDetails);
    },
    clearCart({ commit }) {
      commit("CLEAR_CART");
    },
    placeOrder({ commit, state }, customerForm) {
      return ApiService.placeOrder({
        cart: state.cart,
        customerForm: customerForm
      }).then(orderDetail => {
        commit("CLEAR_CART");
        commit("SET_ORDER_DETAIL", orderDetail);
      });
    }
  },
  getters: {
    surcharge(state) {
      return state.surcharge;
    }
  }
});

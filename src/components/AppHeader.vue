<template>
  <header>
    <div id="leftHeader">
      <div id="logo">
        <router-link to="/">
          <img
            src="../assets/images/site/BookVault_Logo.png"
            height="80"
            alt="The Book Vault Logo"
          />
        </router-link>
      </div>

      <div id="logoText">
        <router-link to="/" id="theTitle" class="textTitle" href="#">
          <p>The</p>
        </router-link>
        <router-link to="/" id="vaultTitle" class="textTitle" href="#">
          <p id="vaultTitleP">Book Vault</p>
        </router-link>
      </div>
    </div>

    <div id="midHeader">
      <form id="searchForm">
        <header-category-dropdown></header-category-dropdown>

        <header-search-bar></header-search-bar>
      </form>
    </div>

    <div id="rightHeader">
      <div id="cartAndLogin">
        <div id="loginButton">
          <div id="welcomeText">
            Welcome Michael!
          </div>
          <button id="buttonLogin">
            Log Out
          </button>
        </div>
        <div id="cartButton">
          <router-link to="/cart">
            <img src="../assets/images/site/Cart_Icon.png" alt="Cart Icon" />
          </router-link>
          <router-link to="/cart">
            <div id="cartCount">{{ $store.state.cart.numberOfItems }}</div>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import HeaderSearchBar from "@/components/HeaderSearchBar";
import HeaderCategoryDropdown from "@/components/HeaderCategoryDropdown";
export default {
  name: "AppHeader",
  components: { HeaderSearchBar, HeaderCategoryDropdown },
  component: {
    HeaderSearchBar,
    HeaderCategoryDropdown
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Proza+Libre");

header {
  background: #1d3557;
  height: 100px;
  display: flex;
  justify-content: space-between;
  color: #ffffff;
}

hr {
  width: 80%;
  border: 1px solid #000000;
}

#leftHeader {
  width: 350px;
  display: flex;
  justify-content: left;
}

#logo {
  padding: 10px;
}

#logoText {
  display: flex;
  flex-direction: column;
}

.textTitle {
  color: #e63946 !important;
  overflow: hidden;
}

#theTitle {
  font-size: clamp(14px, 2.2vw, 30px);
  overflow: visible;
  padding-top: 10px;
}

#vaultTitle {
  font-size: clamp(20px, 3.5vw, 46px);
  height: 100%;
  overflow: hidden;
}

#vaultTitleP {
  height: 100%;
  vertical-align: top;
  display: inline-block;
}

#midHeader {
  width: 450px;
  margin: auto;
}

#rightHeader {
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px;
  overflow: hidden;
}

#cartAndLogin {
  display: flex;
  justify-content: space-around;
  padding-left: 100px;
}

#cartButton {
  position: relative;
  cursor: pointer;
  margin-top: 30px;
}

#cartCount {
  position: absolute;
  color: yellow;
  font-weight: bold;
  font-size: 16px;
  top: -20px;
  left: 8px;
}

#welcomeText {
  padding-bottom: 10px;
  font-size: clamp(12px, 2.2vw, 18px);
  text-align: center;
}

#buttonLogin {
  border: 1px solid #000000;
  border-radius: 5px;
  background: #a8dadc;
  width: 100%;
  padding: 5px;
  color: #000000;
  font-size: clamp(12px, 2vw, 16px);
}

#buttonLogin:hover {
  color: #e63946;
  border: 1px solid #e63946;
  cursor: pointer;
}

#searchForm {
  display: flex;
  justify-content: center;
}
</style>

<template>
  <div class="section">
    <div id="leftHome">
      <div id="welcomeMessageContainer">
        <p id="welcomeMessage_1">
          Welcome to my Client Server Application! This web application will be
          built using Vue.JS alongside many other important tools. The main goal
          of this application is to act as an online bookstore. Users can
          perform various tasks such as browse the numerous categories of books
          and then add it to their cart and check out. Users will even be
          allowed to log on and be authenticated.
        </p>

        <br />

        <p id="welcomeMessage_2">
          My bookstore is called The Book Vault, and while we are the largest in
          person bookstore in the US, we have decided to enter the digital age
          and create a website for online orders!
        </p>
      </div>
    </div>

    <div id="homeDivider"></div>

    <div id="rightHome">
      <home-category-list></home-category-list>
    </div>
  </div>
</template>

<script>
import HomeCategoryList from "@/components/HomeCategoryList";
export default {
  name: "Home",
  components: {
    HomeCategoryList
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Proza+Libre");

#leftHome {
  padding: 40px;
  width: 400px;
}

#welcomeMessageContainer {
  vertical-align: auto;
  height: 100%;
  margin: auto;
}

#welcomeMessage_1,
#welcomeMessage_2 {
  text-indent: 50px;
  font-size: clamp(10px, 2.8vh, 24px);
  overflow: hidden;
}

#homeDivider {
  border-left: 1px solid #d9d9d9;
  margin-top: 40px;
  margin-bottom: 40px;
}

#rightHome {
  padding: 40px;
  width: calc(100% - 400px);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: hidden;
}
</style>

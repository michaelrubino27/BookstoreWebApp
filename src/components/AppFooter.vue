<template>
  <footer>
    <div id="leftFooter">
      <ul>
        <li id="facebookLogo">
          <a href="#">
            <img src="../assets/images/site/Facebook_Logo.png" alt="Facebook" />
            Facebook
          </a>
        </li>
        <li id="twitterLogo">
          <a href="#">
            <img src="../assets/images/site/Twitter_Logo.png" alt="Twitter" />
            Twitter
          </a>
        </li>
      </ul>
    </div>

    <div id="midFooter">
      <div id="footerLogoText">
        <router-link id="footerVaultTitle" class="textTitle" to="/">
          <p>The Book Vault</p>
        </router-link>
      </div>
      <div id="copyrightInfo">
        Copyright &copy; 2020 My Bookstore
      </div>
    </div>

    <div id="rightFooter">
      <ul>
        <li id="linksTitle">
          Links
        </li>
        <li>
          <a href="#">
            About Us
          </a>
        </li>
        <li>
          <a href="#">
            Contact Us
          </a>
        </li>
        <li>
          <a href="#">
            Directions
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter"
};
</script>

<style scoped>
footer {
  background: #1d3557;
  height: 80px;
  display: flex;
  justify-content: space-between;
  color: #ffffff;
  padding-top: 10px;
}

#leftFooter {
  width: 150px;
  padding-top: 15px;
  padding-left: 20px;
  font-size: 18px;
}

#midFooter {
  width: 450px;
}

#footerLogoText {
  text-align: center;
  font-size: 40px;
  padding-top: 5px;
}

#footerVaultTitle {
  color: #e63946;
}

#copyrightInfo {
  text-align: center;
  font-size: 10px;
}

#rightFooter {
  width: 150px;
  font-size: 12px;
  padding: 5px;
}

#linksTitle {
  font-size: 18px;
}

#facebookLogo {
  padding-bottom: 5px;
}
</style>

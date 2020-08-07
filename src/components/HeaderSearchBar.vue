<template>
  <div id="searchHolder">
    <input id="searchBar" type="text" placeholder="Search The Book Vault" />
    <input
      id="searchIcon"
      type="image"
      :src="require('../assets/images/site/Search_Icon.png')"
      alt="Search Icon"
    />
  </div>
</template>

<script>
export default {
  name: "HeaderSearchBar"
};
</script>

<style scoped>
#searchHolder {
  display: flex;
}
#searchBar {
  width: clamp(150px, 15vw, 250px);
  /* width: 250px; */
  border: 1px solid #000000;
  height: 40px;
  color: #000000;
}

#searchBar:placeholder-shown {
  text-align: center;
  font-size: 12px;
}

#searchIcon {
  background: #a8dadc;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-right: 1px solid #000000;
  border-top: 1px solid #000000;
  border-bottom: 1px solid #000000;
  padding: 6px;
  height: 30px;
}

#searchIcon:hover {
  border: 1px solid #e63946;
}
</style>

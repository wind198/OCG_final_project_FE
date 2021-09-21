<template>
  <section class="collections">
    <div class="group1"><a href="#"></a></div>
    <div class="group2">
      <ul class="slides" :style="{ left: sliderLeftPosition }">
        <li>
          <a href="#">
            <img
              src="//cdn.shopify.com/s/files/1/1089/1214/t/288/assets/slide11.jpg?v=10109798114861210865"
              alt="Shop Lighting"
              draggable="false"
          /></a>
        </li>
        <li>
          <a href="#">
            <img
              src="//cdn.shopify.com/s/files/1/1089/1214/t/288/assets/slide3.jpg?v=4189319934854920825"
              alt="shop sofas and lounges"
              draggable="false"
          /></a>
        </li>
        <li>
          <a href="#">
            <img
              src="//cdn.shopify.com/s/files/1/1089/1214/t/288/assets/slide4.jpg?v=3999859680269009106"
              alt="Shop Home Décor"
              draggable="false"
          /></a>
        </li>
        <li>
          <a href="#">
            <img
              src="//cdn.shopify.com/s/files/1/1089/1214/t/288/assets/slide5.jpg?v=1924652791825061514"
              alt="Shop Console Tables"
              draggable="false"
          /></a>
        </li>
        <li>
          <a href="#">
            <img
              src="//cdn.shopify.com/s/files/1/1089/1214/t/288/assets/slide6.jpg?v=2500567913449848211"
              alt="Shop Decorative Mirrors"
              draggable="false"
          /></a>
        </li>
        <li>
          <a href="#">
            <img
              src="//cdn.shopify.com/s/files/1/1089/1214/t/288/assets/slide7.jpg?v=5762248559185310076"
              alt="Shop Coffee Tables"
              draggable="false"
          /></a>
        </li>
        <li>
          <a href="#">
            <img
              src="//cdn.shopify.com/s/files/1/1089/1214/t/288/assets/slide8.jpg?v=12329981892814460742"
              alt="Shop Outdoor Furniture"
              draggable="false"
          /></a>
        </li>
        <li>
          <a href="#">
            <img
              src="//cdn.shopify.com/s/files/1/1089/1214/t/288/assets/slide9.jpg?v=15181316312449314216"
              alt="Shop Cabinets"
              draggable="false"
          /></a>
        </li>
        <li>
          <a href="#">
            <img
              src="//cdn.shopify.com/s/files/1/1089/1214/t/288/assets/slide10.jpg?v=2947097797438884224"
              alt="Shop Cushions"
              draggable="false"
          /></a>
        </li>
        <li>
          <a href="#">
            <img
              src="//cdn.shopify.com/s/files/1/1089/1214/t/288/assets/slide11.jpg?v=10109798114861210865"
              alt="Shop Lighting"
              draggable="false"
          /></a>
        </li>
        <li>
          <a href="#">
            <img
              src="//cdn.shopify.com/s/files/1/1089/1214/t/288/assets/slide3.jpg?v=4189319934854920825"
              alt="shop sofas and lounges"
              draggable="false"
          /></a>
        </li>
      </ul>
      <option-selector-comp
        :size="'size-1'"
        :amount="11"
        @click="handleSlide"
        id="collectionsBrowse"
      />
    </div>
    <div class="group3"><a href="#"></a></div>
  </section>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import { optionSlider, reAssignActive } from "../common/helper";
import OptionSelectorComp from "./OptionSelectorComp.vue";
export default {
  components: { OptionSelectorComp },
  //collection slider - slider 1

  setup() {
    const sliderLeftPosition = ref("0px");

    const optionArray = computed(() => {
      let arr= Array.prototype.slice.call(
        document.getElementById("collectionsBrowse").childNodes
      );
      arr=arr.filter((e)=>e.nodeName!=="#text");
      return arr;
    });
    const dinstanceIncrement = computed(() => {
      return document.getElementById("collectionsBrowse").offsetWidth;
    });
    watch(sliderLeftPosition, (value) => {
      reAssignActive(value, optionArray.value,dinstanceIncrement.value);
    });
    const handleSlide = (event) => {
      const target = event.target;
      optionSlider(target,optionArray.value, sliderLeftPosition, dinstanceIncrement.value);
    };
    onMounted(()=>{
      optionArray.value[0].classList.add("active");
    })
    return {
      handleSlide,
      sliderLeftPosition,optionArray
    };
  },
};
</script>

<style lang="scss" scoped>
section.collections {
  margin-bottom: 60px;
  &::after {
    content: "";
    display: block;
    clear: both;
  }
  height: calc(100vh - 120px - 30px);
  width: 100%;
  padding: 0;
  margin-bottom: 40px;
  .group1 {
    margin: 10px 5px 10px 10px;
    width: calc(75% - 15px);
    height: calc(100% - 20px);
    float: left;
    a {
      display: block;
      width: 100%;
      height: 100%;
      background-image: url(https://cdn.shopify.com/s/files/1/1089/1214/t/288/assets/home-banner-1.jpg?v=13866788855361289786);
      background-repeat: no-repeat;
      background-size: cover;
      background-position: right bottom;
    }
  }
  .group2 {
    height: calc(25vw - 15px);
    width: calc(25% - 15px);
    float: right;
    margin: 10px 10px 5px 5px;
    position: relative;
    overflow: hidden;
    ul {
      height: 90%;
      width: 100%;
      white-space: nowrap;
      overflow: visible;
      position: relative;
      transition: left 0.25s ease-out;
      margin-bottom: 10px;
      li {
        height: 100%;
        width: 100%;
        display: inline-block;
        overflow: hidden;
        a {
          display: block;
          height: 100%;
          &::after {
            content: "";
            display: block;
            clear: both;
          }
          img {
            height: 100%;
            width: auto;
            float: right;
          }
        }
      }
    }
  }

  .group3 {
    height: calc(100% - 25vw - 15px);
    width: calc(25% - 15px);
    float: right;
    margin: 5px 10px 10px 5px;
    a {
      display: block;
      width: 100%;
      height: 100%;
      background-image: url(https://cdn.shopify.com/s/files/1/1089/1214/t/288/assets/promotional.jpg?v=9683628569455305190);
      background-repeat: no-repeat;
      background-size: cover;
      background-position: right top;
    }
  }
}
</style>
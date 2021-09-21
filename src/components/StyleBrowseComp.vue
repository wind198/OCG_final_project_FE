<template>
  <section class="styles">
    <div class="heading">
      <h1><a href="#">Shop by style</a></h1>
      <span><a href="#">View all styles</a></span>
    </div>
    <div class="slides-container">
      <ul :style="{ left: sliderLeftPosition }">
        <li>
          <a href="#">
            <img
              src="https://cdn.shopify.com/s/files/1/1089/1214/t/201/assets/shopbystyle_6.jpg?v=598842867653137093"
            />
            <p>contemporary</p>
          </a>
        </li>
        <li>
          <a href="#">
            <img
              src="https://cdn.shopify.com/s/files/1/1089/1214/t/201/assets/shopbystyle_5.jpg?v=9580815749613382425"
            />
            <p>asian furniture</p>
          </a>
        </li>
        <li>
          <a href="#">
            <img
              src="https://cdn.shopify.com/s/files/1/1089/1214/t/201/assets/shopbystyle_12.jpg?v=10208921673544678931"
            />
            <p>industrial</p>
          </a>
        </li>
        <li>
          <a href="#">
            <img
              src="https://cdn.shopify.com/s/files/1/1089/1214/t/201/assets/shopbystyle_11.jpg?v=7640285914709837151"
            />
            <p>scandinavian</p>
          </a>
        </li>
        <li>
          <a href="#">
            <img
              src="https://cdn.shopify.com/s/files/1/1089/1214/t/201/assets/shopbystyle_7.jpg?v=11352743517171955784"
            />
            <p>french country</p>
          </a>
        </li>
        <li>
          <a href="#">
            <img
              src="https://cdn.shopify.com/s/files/1/1089/1214/t/201/assets/shopbystyle_3.jpg?v=10440262124796998400"
            />
            <p>bone inlay</p>
          </a>
        </li>
        <li>
          <a href="#">
            <img
              src="https://cdn.shopify.com/s/files/1/1089/1214/t/201/assets/shopbystyle_4.jpg?v=8670332924462891152"
            />
            <p>manhattan apartment</p>
          </a>
        </li>
        <li>
          <a href="#">
            <img
              src="https://cdn.shopify.com/s/files/1/1089/1214/t/201/assets/shopbystyle_9.jpg?v=10591110285108766557"
            />
            <p>moroccan furniture</p>
          </a>
        </li>
        <li>
          <a href="#">
            <img
              src="https://cdn.shopify.com/s/files/1/1089/1214/t/201/assets/shopbystyle_10.jpg?v=7705105422859374672"
            />
            <p>island resort</p>
          </a>
        </li>
        <li>
          <a href="#">
            <img
              src="https://cdn.shopify.com/s/files/1/1089/1214/t/201/assets/shopbystyle_2.jpg?v=2961105302883083415"
            />
            <p>rattan & bamboo</p>
          </a>
        </li>
        <li>
          <a href="#">
            <img
              src="https://cdn.shopify.com/s/files/1/1089/1214/t/201/assets/shopbystyle_6.jpg?v=598842867653137093"
            />
            <p>contemporary</p>
          </a>
        </li>
        <li>
          <a href="#">
            <img
              src="https://cdn.shopify.com/s/files/1/1089/1214/t/201/assets/shopbystyle_5.jpg?v=9580815749613382425"
            />
            <p>asian furniture</p>
          </a>
        </li>
        <li>
          <a href="#">
            <img
              src="https://cdn.shopify.com/s/files/1/1089/1214/t/201/assets/shopbystyle_12.jpg?v=10208921673544678931"
            />
            <p>industrial</p>
          </a>
        </li>
        <li>
          <a href="#">
            <img
              src="https://cdn.shopify.com/s/files/1/1089/1214/t/201/assets/shopbystyle_11.jpg?v=7640285914709837151"
            />
            <p>scandinavian</p>
          </a>
        </li>
        <li>
          <a href="#">
            <img
              src="https://cdn.shopify.com/s/files/1/1089/1214/t/201/assets/shopbystyle_7.jpg?v=11352743517171955784"
            />
            <p>french country</p>
          </a>
        </li>
        <li>
          <a href="#">
            <img
              src="https://cdn.shopify.com/s/files/1/1089/1214/t/201/assets/shopbystyle_3.jpg?v=10440262124796998400"
            />
            <p>bone inlay</p>
          </a>
        </li>
        <li>
          <a href="#">
            <img
              src="https://cdn.shopify.com/s/files/1/1089/1214/t/201/assets/shopbystyle_4.jpg?v=8670332924462891152"
            />
            <p>manhattan apartment</p>
          </a>
        </li>
        <li>
          <a href="#">
            <img
              src="https://cdn.shopify.com/s/files/1/1089/1214/t/201/assets/shopbystyle_9.jpg?v=10591110285108766557"
            />
            <p>moroccan furniture</p>
          </a>
        </li>
        <li>
          <a href="#">
            <img
              src="https://cdn.shopify.com/s/files/1/1089/1214/t/201/assets/shopbystyle_10.jpg?v=7705105422859374672"
            />
            <p>island resort</p>
          </a>
        </li>
      </ul>
      <wiper-slider-comp @click="handleSlide" />
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { wipeFunction } from "../common/helper";
import WiperSliderComp from "./WiperSliderComp.vue";

export default {
  components: {
    WiperSliderComp,
  },
  setup() {
    const sliderLeftPosition = ref("0px");
    const handleSlide = (e) => {
      const target = e.target;
      const direction = target.id;
      const slideIncrement =
        target.parentNode.previousSibling.firstChild.offsetWidth;
        wipeFunction(sliderLeftPosition,direction,slideIncrement,5,5);
    };

    return {
      sliderLeftPosition,
      handleSlide,
    };
  },
};
</script>

<style lang = "scss" scoped>
section {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  margin: 0 0 60px 0;
  position: relative;
  overflow: hidden;
  .heading {
    width: 75%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(75, 75, 75, 0.5);
    h1 {
      font-size: 1.5rem;
      font-family: "Playfair Display", serif;
      text-transform: uppercase;
    }
    span {
      font-size: 1rem;
      text-transform: uppercase;
      font-weight: 400;
      &::after {
        content: "\f0de";
        font-family: "Font Awesome 5 Free";
        font-weight: 900;
        margin-left: 0.5rem;
        transform: rotate(90deg);
        display: inline-block;
      }
    }
    a:hover {
      text-decoration: none;
      color: $color1;
    }
    margin-bottom: 20px;
  }
  .slides-container {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    ul {
      position: relative;
      overflow-x: visible;
      height: 100%;
      width: 100%;
      white-space: nowrap;
      margin: 0;
      transition: left 0.25s ease-out;
      display: flex;
      justify-content: center;
      align-items: center;
      li {
        display: inline-block;
        height: 100%;
        padding: 0 5px;
        a {
          display: block;
          height: 100%;
          position: relative;
          img {
            height: auto;
            width: calc(29vw - 10px);
          }
          p {
            position: absolute;
            bottom: 0;
            padding: 1rem 0;
            width: 100%;
            text-align: center;
            background-color: rgba(0, 0, 0, 0.4);
            color: white;
            text-transform: uppercase;
            font-size: 1.2rem;
            margin-bottom: 0;
            &:hover {
              background-color: rgba(0, 0, 0, 0.6);
              font-weight: 600;
            }
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="product-info">
    <img
      class="product-image"
      src="https://cdn.shopify.com/s/files/1/1089/1214/products/shopify_c11a5d759f6f6b06534ff8ccd68c7383_elliot-oak-dining-table-black-300cm_x480.jpg?v=1632111314"
      alt=""
    />
    <div class="info">
      <p class="name">SAG HARBOUR INDOOR/OUTDOOR 2 SEAT LOUNGE</p>
      <p class="price">Our price 55$</p>
      <div class="action">
        <div class="image-holder">
          <img
            src="https://cdn.shopify.com/s/files/1/1089/1214/t/190/assets/Wishlist-icon.svg?v=4240177695643401995"
            alt=""
          />
        </div>
        <div class="image-holder">
          <img
            src="https://cdn.shopify.com/s/files/1/1089/1214/t/190/assets/shopping-cart-icon.svg?v=3445795434587133615"
            alt=""
          />
          <span class="plus">+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { FETCH_SINGLE_PRODUCT } from "../store/actions.type";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const productID = route.params.productID;
    const fetchProductInfo =()=>store.dispatch(FETCH_SINGLE_PRODUCT, {
      id: productID,
    });
    fetchProductInfo();
  },
};
</script>

<style lang="scss" scoped>
.product-info {
  width: 100%;
  img.product-image {
    width: 100%;
    height: auto;
  }
  .info {
    .name {
      font-family: "Playfair Display", serif;
      font-size: 1.1rem;
      text-transform: uppercase;
    }
    .price {
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.08rem;
    }
    .action {
      display: flex;
      justify-content: flex-end;
      .image-holder {
        cursor: pointer;
        margin-left: 10px;
        position: relative;
        img {
          display: block;
          height: 30px;
          width: auto;
          filter: brightness(0.3);
        }
        span.plus {
          position: absolute;
          left: 55%;
          top: 43%;
          transform: translate(-50%, -50%);
          font-weight: 800;
          color: rgba(60, 60, 60, 0.8);
        }
      }
    }
  }
}
</style>
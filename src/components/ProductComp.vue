<template>
  <div class="product-info">
    <div class="image-container">
      <img class="product-image" :src="image" alt="" />
    </div>
    <div class="info">
      <p class="name">
        <router-link :to="{ name: 'product', params: { productID: id } }">{{
          name
        }}</router-link>
      </p>
      <p class="price">Our price {{ priceRange }}$</p>
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
import { computed } from "@vue/reactivity";
import { getMinPrice, getMaxPrice } from "../common/helper";
export default {
  props: {
    id: Number,
    name: String,
    description: String,
    variances: Array,
    image: String,
  },
  setup(props) {
    const priceRange = computed(() => {
      const minPrice = getMinPrice(props.variances);
      const maxPrice = getMaxPrice(props.variances);
      if (maxPrice > minPrice) {
        return minPrice + " - " + maxPrice;
      } else {
        return maxPrice;
      }
    });
    return { priceRange };
  },
};
</script>

<style lang="scss" scoped>
.product-info {
  padding: 10px 25px;
  border-radius: 20px;
  background-color: #fff;
  width: 100%;
  .image-container {
    background-color: #fff;

    img.product-image {
      max-width: 100%;
      max-height: 200px;
      display: block;
      margin: auto;
    }
  }
  .info {
    --font-size: 0.9rem;
    background-color: $color2;
    padding: 1rem 1rem 1rem 1rem;
    .name {
      a {
        font-family: "Playfair Display", serif;
        font-size: calc(var(--font-size));
        text-transform: uppercase;
        color: $color1;
        &:hover {
          color: $color1;
          text-decoration: none;
        }
      }
    }
    .price {
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.08rem;
      font-size: calc(var(--font-size) * 0.9);
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
<template>
  <main>
    <h2>HAMPTONS OUTDOOR FURNITURE / SAG HARBOUR FLYNN BENCH SEAT</h2>
    <div class="product-detailed-info">
      <div class="image">
        <img
          src="https://cdn.shopify.com/s/files/1/1089/1214/products/shopify_18e2f37d8880239535afa369670c88cf_sag-harbour-umpire-s-chair_large.jpg?v=1617925292"
          alt=""
        />
      </div>
      <div class="information">
        <h1>SAG HARBOUR FLYNN BENCH SEAT</h1>
        <p class="price">our price $699.00</p>
        <div class="add-to-cart">
          <div class="quantity-selection-container"><quantity-selector-comp /></div>
          <button class="add-to-cart">Add to cart</button>
        </div>
        <div class="add-to-favorite">
          <img
            src="https://cdn.shopify.com/s/files/1/1089/1214/t/190/assets/Wishlist-icon.svg?v=4240177695643401995"
            alt=""
          /><span>Save to wishlist</span>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import QuantitySelectorComp from "../components/QuantitySelectorComp.vue";

export default {
  components: {
    QuantitySelectorComp,
  },
};
</script>

<style lang="scss" scoped>
main {
  &::after {
    content: "";
    display: block;
    clear: both;
  }
  h2 {
    font-size: 1.2rem;
    font-weight: 100;
    font-family: "Playfair Display", serif;
    text-transform: uppercase;
    padding: 1rem 0;
    border-bottom: 1px solid $color1;
    text-align: center;
  }
  .image {
    float: left;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .information {
    width: 50%;
    float: right;
    h1 {
      font-size: 1.5rem;
      font-weight: 100;
      font-family: "Playfair Display", serif;
      text-transform: uppercase;
      margin: 10px 0 30px 0;
    }
    p.price {
      font-weight: 1.1rem;
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 0.02rem;
      margin-bottom: 30px;
    }
    .add-to-cart {
      margin-bottom: 15px;
      .quantity-selection-container {
        display: inline-block;
        vertical-align: top;
      }
      button.add-to-cart {
        height: 44px;
        background-color: #f26f21;
        border: none;
        margin-left: 10%;
        color: $color2;
        font-weight: 500;
        text-transform: uppercase;
        font-size: 1rem;
        letter-spacing: 0.08rem;
        width: 45%;
      }
    }
    .add-to-favorite {
      > * {
        display: inline-block;
      }
      img {
        filter: brightness(0.3);
        height: 40px;
        width: auto;
        margin-right: 0.25rem;
        margin-left: calc(10% + 104px);
      }
      span {
          height: 20px;
        line-height: 20px;
        font-size: 1rem;
        letter-spacing: 0.03rem;
        vertical-align: bottom;
        text-transform: uppercase;
        color: rgba(75,75,75,0.7)
      }
    }
  }
}
</style>
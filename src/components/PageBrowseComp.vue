<template>
  <section>
    <h1>AUSTRALIA’S EXCLUSIVE ONLINE FURNITURE STORE</h1>
    <div class="pages-container">
      <div class="page" id="furniture">
        <div class="image-holder"></div>
        <div class="detailed-info">
          <h2>
            <a href="#">Furniture</a>
          </h2>
          <p>
            We have some of the world's most unique collections to fit your
            style.
          </p>
          <a href="#">Shop now </a>
        </div>
      </div>
      <div class="page" id="decor">
        <div class="image-holder"></div>
        <div class="detailed-info">
          <h2>
            <a href="#">Furniture</a>
          </h2>
          <p>
            We have some of the world's most unique collections to fit your
            style.
          </p>
          <a href="#">Shop now </a>
        </div>
      </div>
      <div class="page" id="lighting">
        <div class="image-holder"></div>
        <div class="detailed-info">
          <h2>
            <a href="#">Furniture</a>
          </h2>
          <p>
            We have some of the world's most unique collections to fit your
            style.
          </p>
          <a href="#">Shop now </a>
        </div>
      </div>
      <div class="page" id="outdoor-furniture">
        <div class="image-holder"></div>
        <div class="detailed-info">
          <h2>
            <a href="#">Furniture</a>
          </h2>
          <p>
            We have some of the world's most unique collections to fit your
            style.
          </p>
          <a href="#">Shop now </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang = "scss" scoped>
section {
  margin-bottom: 60px;
  h1 {
    font-family: "Playfair Display", serif;
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  .pages-container {
    .page {
      display: grid;
      grid-template-columns: 50% 50%;
      .image-holder {
        display: block;
        width: 100%;
        height: calc(50vw * 0.662);
        background-size: cover;
        background-position: left bottom;
      }
      .detailed-info {
        padding: 2rem 40% 2rem 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        a:hover {
          text-decoration: none;
          color: $color2;
        }
        > h2 {
          font-family: "Playfair Display", serif;
          font-size: 2.1rem;
        }
        * {
          text-transform: uppercase;
          color: $color2;
          font-weight: 600;
        }
        > p {
          font-size: 1.2rem;
        }
        > a {
          font-size: 1rem;
          &::after {
            content: "\f0de";
            font-family: "Font Awesome 5 Free";
            font-weight: 900;
            margin-left: 0.2rem;
            transform: rotate(90deg);
            display: inline-block;
          }
        }
      }
    }
    .page:nth-child(2n + 1) {
      .detailed-info {
        background-color: $color6;
      }
    }
    .page:nth-child(2n) {
      .detailed-info {
        background-color: $color1;
        order: 1;
      }
      .image-holder {
        order: 2;
      }
    }
    .page:nth-child(1) .image-holder {
      background-image: url(https://cdn.shopify.com/s/files/1/1089/1214/t/288/assets/promotion_image_1.jpg?v=17164168338663449320);
    }
    .page:nth-child(2) .image-holder {
      background-image: url(https://cdn.shopify.com/s/files/1/1089/1214/t/288/assets/promotion_image_2.jpg?v=1014794189812297464);
    }
    .page:nth-child(3) .image-holder {
      background-image: url(https://cdn.shopify.com/s/files/1/1089/1214/t/288/assets/promotion_image_3.jpg?v=16204446214856512384);
    }
    .page:nth-child(4) .image-holder {
      background-image: url(https://cdn.shopify.com/s/files/1/1089/1214/t/288/assets/promotion_image_4.jpg?v=5143068015468210831);
    }
  }
}
</style>
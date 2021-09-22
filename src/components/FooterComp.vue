<template>
  <footer>
    <div class="banner">
      <p class="formal-text">FREE SHIPPING ON OVER 3,500 PRODUCTS!</p>
      <span class="shop-now">Shop now</span>
      <span class="be-inspired formal-text">be inspired</span>
    </div>
    <div class="info">
      <div class="additional-info-1">
        <div class="badge">
          <p class="score">2,062</p>
          <div class="star">★★★★</div>
          <p class="certified">CERTIFIED REVIEWS</p>
          <p class="powered">powered by YOTPO</p>
        </div>
        <div class="about-us">
          <ul>
            <li><a href="#" title="">Contact us</a></li>
            <li><a href="#" title="">ABOUT US</a></li>
            <li><a href="#" title="">FAQs</a></li>
            <li>
              <a href="#" title="">Delivery Information</a>
            </li>
            <li>
              <a href="#" data-title="Home Rewards">Home Rewards</a>
            </li>
            <li>
              <a href="#" data-title="Reviews">Reviews</a>
            </li>
            <li><a href="#" title="">Afterpay</a></li>
          </ul>
        </div>
        <div class="for-user">
          <ul>
            <li>
              <a href="#" data-title="Gift Cards">Gift Cards</a>
            </li>
            <li>
              <a href="#" data-title="Order Status">Order Status</a>
            </li>
            <li>
              <a href="#" title="">Claims &amp; Damages</a>
            </li>
            <li>
              <a href="#" title="">Terms &amp; Conditions</a>
            </li>
            <li><a href="#" title="">Privacy Policy</a></li>

            <li><a href="#" title="">Sitemap</a></li>
          </ul>
        </div>
      </div>
      <div class="additional-info-2">
        <div class="address">
          <p>
            Head Office<br />
            level 1, 188 Fullarton Rd,<br />
            Dulwich SA 5065<br />Australia
            <br />
            ABN: 60 989 238 024 <br />
            <a href="#">sales@interiorsonline.com.au</a>
          </p>
        </div>
        <div class="payment-method">
          <ul>
            <li style="display: inline-block">
              <img
                class="payment-img"
                src="//cdn.shopify.com/shopifycloud/shopify/assets/payment_icons/visa-319d545c6fd255c9aad5eeaad21fd6f7f7b4fdbdb1a35ce83b89cca12a187f00.svg"
              />
            </li>

            <li style="display: inline-block">
              <img
                class="payment-img"
                src="//cdn.shopify.com/shopifycloud/shopify/assets/payment_icons/master-173035bc8124581983d4efa50cf8626e8553c2b311353fbf67485f9c1a2b88d1.svg"
              />
            </li>

            <li style="display: inline-block">
              <img
                class="payment-img"
                src="//cdn.shopify.com/shopifycloud/shopify/assets/payment_icons/paypal-49e4c1e03244b6d2de0d270ca0d22dd15da6e92cc7266e93eb43762df5aa355d.svg"
              />
            </li>

            <li style="display: inline-block">
              <img
                style="height: 30px"
                class="payment-img"
                src="//cdn.shopify.com/shopifycloud/shopify/assets/payment_icons/american_express-2264c9b8b57b23b0b0831827e90cd7bcda2836adc42a912ebedf545dead35b20.svg"
              />
            </li>

            <li style="display: inline-block">
              <img
                class="payment-img"
                style="height: 30px"
                alt="Afterpay"
                src="//cdn.shopify.com/s/files/1/1089/1214/t/288/assets/afterpay_new.svg?v=2796092757877777498"
              />
            </li>

            <li style="display: inline-block">
              <img
                class="payment-img"
                alt="Zip Pay"
                src="https://static.zipmoney.com.au/assets/default/footer-tile/footer-tile-new.png"
              />
            </li>

            <li style="display: inline-block">
              <img
                height="30px"
                class="payment-img"
                src="//cdn.shopify.com/s/files/1/1089/1214/t/288/assets/humm_payment.png?v=16238892409232528964"
              />
            </li>
          </ul>
        </div>
      </div>
      <div class="logo">
        <p>
          <a href="/"
            ><img
              src="//cdn.shopify.com/s/files/1/1089/1214/t/288/assets/IO-footer-logo.svg?v=5915696648764541703"
              alt="INTERIORS ONLINE"
          /></a>
          <span class="copy-right">Copyright © 2021</span>
          <span class="company-name"
            ><a href="#" title="">INTERIORS ONLINE</a></span
          >
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
footer {
  .banner {
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    background-color: $color1;
    color: $color2;
    height: 200px;
    > * {
      text-align: center;
    }
    p {
      text-transform: uppercase;
      font-size: 1.6rem;
      margin-top: 10px;
    }
    span.shop-now {
      &::after {
        content: "\f0de";
        font-family: "Font Awesome 5 Free";
        font-weight: 900;
        margin-left: 0.3rem;
        transform: rotate(90deg);
        display: inline-block;
      }
    }
    span.be-inspired{
      font-size: 1.6rem;
      text-transform: uppercase;position: relative;width: max-content;
      margin:0 auto 10px;
        &::after {
        content: "";
        display: block;
        width: 90px;
        border: 1px solid $color2;
        position: absolute;
        top: 50%;
        left: 110%;
      }
      &::before {
        content: "";
        display: block;
        width: 90px;
        border: 1px solid $color2;
        position: absolute;
        top: 50%;
        right: 110%;
      }
    }
  }
  .info {
    padding: 40px 10% 25px;
    > div + div {
      margin-top: 40px;
    }
    .additional-info-1 {
      align-items: center;
      display: flex;
      justify-content: space-between;
      .badge {
        display: block;
        --side: 150px;
        width: var(--side);
        height: var(--side);
        padding: 0;
        background-image: url(https://staticw2.yotpo.com/assets/badge.png);
        background-repeat: no-repeat;
        background-size: contain;
        position: relative;
        font-size: 1rem;
        color: $color1;
        > * {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }
        .score {
          color: $color2;
          font-size: 1.5rem;
          font-weight: 200;
          top: 20%;
        }
        .star {
          color: #ecc525;
          font-size: 18px;
          bottom: 45%;
        }
        .certified {
          bottom: 20.5%;
          font-size: 0.8rem;
        }
        .powered {
          margin-bottom: 0;
          font-size: 0.8rem;
          bottom: 0;
        }
      }

      .about-us {
        ul {
          li {
            text-align: center;
            font-size: 1.1rem;
          }
        }
      }
      .for-user {
        ul {
          li {
            font-size: 1.1rem;
            text-align: center;
          }
        }
      }
    }
    .additional-info-2 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .address {
        p {
          text-align: center;
        }
      }
      .payment-method {
        ul {
          li {
            img {
              filter: grayscale(100%);
              height: 25px;
              width: auto;
            }
            margin-right: 0.5rem;
          }
        }
      }
    }
    .logo {
      p {
        width: max-content;
        margin: auto;
        > * {
          text-align: center;
          display: block;
          margin-bottom: 5px;
        }
        span.company-name {
          font-size: 110%;
        }
      }
    }
  }
}
</style>
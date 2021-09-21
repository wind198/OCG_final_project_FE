<template>
  <header>
    <div class="event-annoucement">
      <a href="#">
        Up to 40% off RRP for our Downtown Manhattan Sale! Use code CITY for
        additional 10% off the collection</a
      >
    </div>
    <div class="logo-toolbar">
      <div class="customer-care">
        <p>
          Customer care
          <img
            src="https://cdn.shopify.com/s/files/1/1089/1214/t/288/assets/speech-bubble.svg?v=7602910567544498002"
            alt=""
          />
        </p>
      </div>
      <div class="logo">
        <router-link :to="{name:'home',}"
          ><img
            src="https://cdn.shopify.com/s/files/1/1089/1214/t/190/assets/IO_logo-RGB.svg?v=9399816925637489965"
            alt="Interior Online"
        /></router-link>
      </div>
      <div class="toolbar">
        <div class="search">
          <a href="#">
            <img
              src="https://cdn.shopify.com/s/files/1/1089/1214/t/288/assets/Search-icon-dark.svg?v=759841059697203097"
              alt=""
          /></a>
        </div>
        <div class="user-profile">
          <a href="#"
            ><img
              src="https://cdn.shopify.com/s/files/1/1089/1214/t/190/assets/login-signup-icon.svg?v=1653701591792278690"
              alt=""
          /></a>
        </div>
        <div class="favourite">
          <a href="#"
            ><img
              src="https://cdn.shopify.com/s/files/1/1089/1214/t/190/assets/Wishlist-icon.svg?v=4240177695643401995"
              alt=""
          /></a>
        </div>
        <div class="cart">
          <a href="#"
            ><img
              src="https://cdn.shopify.com/s/files/1/1089/1214/t/190/assets/shopping-cart-icon.svg?v=3445795434587133615"
              alt=""
          /></a>
        </div>
      </div>
    </div>
    <nav>
      <ul id="nav-main">
        <li class="nav-main-item" v-for="page in pageList" :key="page.ID">
          <router-link
            :to="{name:'page',params:{pageID:page.ID}}"
            @mouseenter="mouseEnterShowSubList"
            @mouseleave="mouseLeaveHideSubList"
            >{{ generatePageAlias(page.page_name) }}
            <nav-sub-menu-comp :collectionList="page.Collections" />
          </router-link>
        </li>
        <li class="nav-main-item"><a href="#">decor style</a></li>
        <li class="nav-main-item"><a href="#">inspiration</a></li>
        <li class="nav-main-item"><a href="#">trade/decoration</a></li>
        <li class="nav-main-item"><a href="#">brands</a></li>
        <li id="sale" class="nav-main-item"><a href="#">sale</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { computed } from "@vue/reactivity";
import NavSubMenuComp from "./NavSubMenuComp.vue";
import {generatePageAlias} from "../common/helper"
import { useStore } from "vuex";
import { FETCH_ALL_PAGE } from "../store/actions.type";
export default {
  components: { NavSubMenuComp },
  name: "HeaderComp",
  setup() {
    const store = useStore();

    const fetchNavBar = () => store.dispatch(`home/${FETCH_ALL_PAGE}`);

    fetchNavBar();

    const pageList = computed(() => store.state.home.pages);

   

    const mouseEnterShowSubList = (event) => {
      const currentNode = event.target;
      currentNode.childNodes[1].classList.remove("hiding");
    };
    const mouseLeaveHideSubList = (event) => {
      console.log("hello");
      const currentNode = event.target;
      currentNode.childNodes[1].classList.add("hiding");
    };

    return {
      pageList,
      generatePageAlias,
      mouseEnterShowSubList,
      mouseLeaveHideSubList,
    };
  },
};
</script>

<style lang="scss" scoped>
header {
  background-color: $color3;
  position: relative;
  z-index: 1000;
  .event-annoucement {
    background-color: black;
    a {
      color: $color2;
      display: block;
      margin: auto;
      padding: 1rem 0;
      width: fit-content;
    }
  }
  .logo-toolbar {
    padding: 0 5%;
    display: flex;
    justify-content: space-between;
    height: 60px;
    border-bottom: 1px solid $color2;
    .customer-care {
      p {
        margin: 0;
        padding: 15px 0 20px;
        font-weight: 500;
        text-transform: uppercase;
        width: 100%;
        height: 100%;
        text-align: center;
        color: $color2;

        font-size: 110%;
        img {
          height: 100%;
          width: auto;
          display: inline-block;
          padding-bottom: 5px;
          margin-left: 0.5rem;
          filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(53deg)
            brightness(108%) contrast(102%);
        }
      }
    }
    .logo {
      a {
        display: block;
        text-align: center;
        height: 100%;
        img {
          height: 100%;
          width: auto;
          padding: 7.5px 0 10px;
        }
      }
    }
    .toolbar {
      > div {
        display: inline-block;
        margin-right: 1rem;
        height: 100%;
        a {
          display: block;
          margin-top: 14px;
          img {
            height: 25px;
            width: auto;
          }
        }
      }
    }
  }
  nav {
    background-color: $color3;
    border-bottom: 1px solid $color2;
    height: 60px;
    padding: 0 5%;
    ul#nav-main {
      height: 100%;
      display: flex;
      justify-content: space-between;
      li#sale {
        a {
          color: #ff556a;
          &:hover{
            color: #f8344b;

          }
        }
      }
      li.nav-main-item {
        text-transform: uppercase;
        font-size: 0.9rem;
        font-weight: 500;
        position: relative;

        a {
          color: $color2;
          text-decoration: none;
          display: inline-block;
          width: max-content;
          height: 100%;
          padding: 20px 15px;
          transition: color 0.5s ease-in;
          &:hover {
            background: $color2;
            color: black;
          }
        }
      }
    }
  }
}
</style>
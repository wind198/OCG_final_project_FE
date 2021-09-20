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
        <a href="#"
          ><img
            src="https://cdn.shopify.com/s/files/1/1089/1214/t/190/assets/IO_logo-RGB.svg?v=9399816925637489965"
            alt="Interior Online"
        /></a>
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
        <li class="nav-main-item" v-for="page in pageList" :key="page.id">
          <a href="#" @mouseenter="mouseEnterShowSubList" @mouseleave="mouseLeaveHideSubList"
            >{{ generatePageAlias(page.name) }}
            <nav-sub-menu-comp :collectionList="page.collections" />
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { computed } from "@vue/reactivity";
import NavSubMenuComp from "./NavSubMenuComp.vue";
export default {
  components: { NavSubMenuComp },
  name: "HeaderComp",
  setup() {
    const pageList = computed(() => {
      return [
        {
          id: 1,
          name: "furniture",
          collections: [
            { id: 1, name: "chairs-and-seating" },
            { id: 2, name: "table" },
            { id: 3, name: "storage" },
            { id: 4, name: "micellaneous" },
            { id: 5, name: "bedroom-funiture" },
          ],
        },
        {
          id: 2,
          name: "home-decor",
          collections: [
            { id: 6, name: "artificial-flowers-and-trees" },
            { id: 7, name: "wall-clocks" },
            { id: 8, name: "cushions-throws-and-quilts" },
            { id: 9, name: "decorator-pieces" },
            { id: 10, name: "designer-doormats" },
            { id: 11, name: "room-dividers" },
            { id: 12, name: "water-features" },
            { id: 13, name: "designer-rugs" },
            { id: 14, name: "decorative-mirrors" },
            { id: 15, name: "lighting" },
            { id: 16, name: "outdoor-accessories" },
            { id: 17, name: "round-mirrors" },
            { id: 18, name: "paintings" },
            { id: 19, name: "benches" },
          ],
        },
        {
          id: 3,
          name: "lighting",
          collections: [
            { id: 20, name: "table-lamps" },
            { id: 21, name: "hurricane-lamps-and-candelabras" },
            { id: 22, name: "ceiling-lights" },
            { id: 23, name: "chandeliers" },
            { id: 24, name: "floor-lamps" },
            { id: 25, name: "wall-lights" },
          ],
        },
        {
          id: 4,
          name: "outdoor-garden",
          collections: [
            { id: 21, name: "outdoor-accessories" },
            { id: 22, name: "outdoor-seating" },
            { id: 23, name: "outdoor-tables" },
          ],
        },
        { id: 5, name: "inspiration" },
        { id: 6, name: "trade/decoration" },
        { id: 7, name: "brands" },
        { id: 6, name: "sale" },
      ];
    });

    const generatePageAlias = (name) => {
      if (name == "home-decor") {
        return "decor";
      } else if (name == "outdoor-garden") {
        return "outdoor & garden";
      } else return name.replaceAll("-", " ");
    };

    const mouseEnterShowSubList = (event) => {
      console.log("hello");
      const currentNode = event.target;
      currentNode.childNodes[1].classList.remove("hiding");
    };
    const mouseLeaveHideSubList = (event) => {
      console.log("hello");
      const currentNode = event.target;
      currentNode.childNodes[1].classList.add("hiding");
    };

    return { pageList, generatePageAlias, mouseEnterShowSubList,mouseLeaveHideSubList };
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
    height: 60px;
    padding: 0 5%;
    ul#nav-main {
      height: 100%;
      display: flex;
      justify-content: space-between;

      li.nav-main-item {
        text-transform: uppercase;
        font-size: 1rem;
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
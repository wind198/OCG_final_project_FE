<template>
  <section>
    <div class="comment-container">
      <ul :style="{ left: sliderLeftPosition }">
        <li class="comment" id="comment1">
          <img
            src="//cdn.shopify.com/s/files/1/1089/1214/files/Adrianna_Doueihy_-_A_Designers_Life_2x_2736df2b-03c6-4f27-bb85-4e3d254d92f8.png?v=1502082240"
          />
        </li>
        <li class="comment" id="comment2">
          <img
            src="//cdn.shopify.com/s/files/1/1089/1214/files/Donna_Driver_2x_11994e93-3355-4d83-80dd-c3db44c8cb07.png?v=1502082190"
          />
        </li>
        <li class="comment" id="comment3">
          <img
            src="//cdn.shopify.com/s/files/1/1089/1214/files/Josephine_Harrison_2x_a9e235be-6a47-4f7f-b460-459b1008660c.png?v=1502082204"
          />
        </li>
        <li class="comment" id="comment4">
          <img
            src="//cdn.shopify.com/s/files/1/1089/1214/files/Patricia_Dunn_2x_9d2bc730-4029-4159-96e3-e720f237d718.png?v=1502082216"
          />
        </li>
        <li class="comment" id="comment5">
          <img
            src="//cdn.shopify.com/s/files/1/1089/1214/files/Danyelle_Kelson_2x_0ded74e2-7352-493e-8d6b-a5042aecb3f8.png?v=1502082223"
          />
        </li>
        <li class="comment" id="comment6">
          <img
            src="//cdn.shopify.com/s/files/1/1089/1214/files/Kim_2x_c1f68d50-9c03-4980-a619-eb418224a11e.png?v=1502082227"
          />
        </li>
        <li class="comment" id="comment7">
          <img
            src="//cdn.shopify.com/s/files/1/1089/1214/files/Angela_Lazidis_2x_7482043a-97a1-43c3-bb4a-144a22bf6a4f.png?v=1502082236"
          />
        </li>
      </ul>
      <wiper-slider-comp @click="handleWipe" :containerColor="'rgba(0,0,0,0)'" :handlerColor="'rgba(97,97,97,0.5)'"/>
    <option-selector-comp
      @click="handleSlide"
      :size="'size-2'"
      :amount="7"
      id="customerExperience"
    />
    </div>
    
  </section>
</template>

<script>
import OptionSelectorComp from "./OptionSelectorComp.vue";
import { optionSlider, reAssignActive ,wipeFunction} from "../common/helper";
import { computed, ref, watch, onMounted } from "vue";
import WiperSliderComp from "./WiperSliderComp.vue";

export default {
  components: { OptionSelectorComp, WiperSliderComp },
  setup() {
    const sliderLeftPosition = ref("0px");
    const optionArray = computed(() => {
      let arr = Array.prototype.slice.call(
        document.getElementById("customerExperience").childNodes
      );
      arr = arr.filter((e) => e.nodeName !== "#text");
      return arr;
    });
    const distanceIncrement = computed(() => {
      return document.getElementById("customerExperience").offsetWidth;
    });
    watch(sliderLeftPosition, (value) => {
      reAssignActive(value, optionArray.value, distanceIncrement.value);
    });
    const handleSlide = (event) => {
      const target = event.target;
      optionSlider(
        target,
        optionArray.value,
        sliderLeftPosition,
        distanceIncrement.value
      );
    };
    const handleWipe = (e) => {
      const target = e.target;
      const direction = target.id;
      const slideIncrement =
        target.parentNode.previousSibling.firstChild.offsetWidth;
      wipeFunction(sliderLeftPosition, direction, slideIncrement,0 ,6);
    };

    onMounted(() => {
      optionArray.value[0].classList.add("active");
    });

    return {
      handleSlide,
      handleWipe,
      sliderLeftPosition,
    };
  },
};
</script>

<style lang= "scss" scoped>
section {
  margin-bottom: 60px;
  .comment-container {
    width: 100%;
    overflow: hidden;
    position: relative;

    ul {
      width: 100%;
      overflow: visible;
      white-space: nowrap;
      position: relative;
      transition: left 0.25s ease-out;
      li {
        display: inline-block;
        width: 100%;
        padding: 5% 0 3% 0;
        background-color: $color2;
        img {
          display: block;
          width: 60%;
          height: auto;
          margin: auto;
        }
      }
    }
  }
}
</style>
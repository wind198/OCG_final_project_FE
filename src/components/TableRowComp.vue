<template>
  <tr  :id="data.ID">
    <td v-for="(value, name) in rowData" :key="name" :class="name">
      {{ value }}
    </td>
     
  </tr>
</template>

<script>
import { computed, toRefs } from "@vue/reactivity";
// import { useStore } from "vuex";
export default {
  props: {
    data: Object,
  },
  setup(props) {
    const { data } = toRefs(props);
    // const store = useStore();
    const rowData = computed(() => {
      const ouput1 = { ...data.value };
      delete ouput1.OrderDetails;
      delete ouput1.Email;
      delete ouput1.Phone;
      delete ouput1.CustomerName;
      delete ouput1.Address;
      for (const key in ouput1) {
        if (key == `CreatedAt` || key == `UpdatedAt` || key == "FulfilledAt") {
          if (ouput1[key] == "0001-01-01T00:00:00Z") {
            ouput1[key] = "No info";
          } else {
            ouput1[key] = new Date(ouput1[key]).toLocaleString();
          }
        }
        if (key == "TotalPrice") {
          ouput1[key] = "$ " + ouput1[key];
        }
      }

      return ouput1;
    });
 
     
    return { rowData,  };
  },
};
</script>

<style lang="scss" scoped>
tr {
  td {
    font-size: 0.7rem;
    text-align: center;
    padding: 0.1rem 0.2rem;
    color: $color1;
    border: 1px solid rgba(169, 169, 169, 0.5);
    cursor: pointer;
  }
}
tr:nth-child(2n) {
  background-color: rgb(252, 252, 252);
}
tr:nth-child(2n + 1) {
  background-color: rgb(187, 185, 185);
}
</style>
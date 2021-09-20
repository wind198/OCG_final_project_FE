<template>
  <main>
    <collection-browse-comp />
    <style-browse-comp />
    <page-browse-comp />
    <customer-experience-comp/>
  </main>
</template>

<script>
import CollectionBrowseComp from "../components/CollectionBrowseComp.vue";
import StyleBrowseComp from "../components/StyleBrowseComp.vue";
import PageBrowseComp from "../components/PageBrowseComp.vue";
import CustomerExperienceComp from "../components/CustomerExperienceComp.vue";
export default {
  components: {
    CollectionBrowseComp,
    StyleBrowseComp,
    PageBrowseComp,
    CustomerExperienceComp,
  },
};
</script>

<style>
</style>
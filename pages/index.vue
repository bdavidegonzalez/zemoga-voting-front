<template>
<div>
  <Header />
 <div class="max-centered">
    <Banner />
    <Aside />
    <voting />
    <Footer />
  </div>
</div>
</template>

<script lang="ts">
import voting from '~/components/voting.vue';


export default {
  name: 'home',
  data: () => ({
    //
  }),
  mounted() {},
};
</script>

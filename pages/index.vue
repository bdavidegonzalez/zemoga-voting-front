<template>
<div>
  <Header />
 <div class="max-centered">
    <Banner />
    <Aside />
    <Mobile-votes />
    <Desktop-votes />
    <Footer />
  </div>
</div>
</template>

<script lang="ts">
import mobileVotes from '~/components/mobile-votes.vue';
import voting from '~/components/mobile-votes.vue';


export default {
  components: { mobileVotes },
  name: 'home',
  data: () => ({
    //
  }),
  mounted() {},
};
</script>

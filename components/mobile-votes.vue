<template>
  <main role="main">
    <v-carousel v-model="model" :show-arrows="false" class="d-sm-none" hide-delimiters>
    <v-carousel-item v-for="(item, index) in categories" :key="index">
       <div class="votes">
     <div class="votes-img" :style="{ '--img-background': 'url('+ item.picture.toString() + ')' }">
       <div>
        <div class="votes__description">
            <h2 class="votes__title">{{item.category}}</h2>
            <p class="votes__desc">
              {{item.description}}
            </p>
            <div class="votes__date">
              <strong>{{$moment(item.lastUpdated).format('LLLL')}}</strong>
            </div>
          </div>
          <div class="votes__featured-card">
            <button  class="icon-button-votes" aria-label="thumbs up" @click="thumbsUp(index, item.votes)">
              <img class="votes__featured-img" src="../assets/img/thumbs-up.svg" alt="thumbs up" />
            </button>
            <button class="icon-button-votes" aria-label="thumbs down" @click="thumbsDown(index, item.votes)">
              <img class="votes__featured-img" src="../assets/img/thumbs-down.svg" alt="thumbs down" />
            </button>
            <button class="votes__featured-buttom">
              Vote Now
            </button>
          </div>
        </div>
        <div class="progress"> 
            <div class="progress-bar bg-positive color-width" :style="{'--progress-votes': item.votes.positive * 100 / (item.votes.positive + item.votes.negative) + '%'}"> 
              <div class="progress-bar--div-left">
                <img src="../assets/img/thumbs-up.svg" alt="thumbs up" />
                <p class="progress__bar-texto-left"> {{item.votes.positive * 100 / (item.votes.positive + item.votes.negative) | limit }} % </p>
              </div>
            </div>
            <div class="progress-bar bg-negative color-width" :style="{'--progress-votes': item.votes.negative * 100 / (item.votes.positive + item.votes.negative)  + '%'}">
              <div class="progress-bar--div-right">
                <img src="../assets/img/thumbs-down.svg" alt="thumbs down" /> 
                <p class="progress__bar-texto-right">{{item.votes.negative * 100 / (item.votes.positive + item.votes.negative) | limit }} %</p>
              </div>
            </div>
          </div>

     </div>
    </div>
    </v-carousel-item>
  </v-carousel>
  </main>
</template>

<script>
export default {
  name: 'Voting',
  data() {
    return {
      model: 0,
      categories: [],
    };
  },
  created() {
    this.readFromRealtimeDb();
  },
  methods: {
    async readFromRealtimeDb() {
      const messageRef = this.$fire.database.ref('data');
      try {
        const data = await messageRef.once('value');
        this.categories = data.val();
      } catch (e) {
        alert(e);
        return;
      }
    },
    async thumbsUp(index, votes) {
      const messageRef = this.$fire.database.ref('data/' + index);
      try {
        await messageRef.update({
          votes: {
            positive: (votes.positive += 1),
            negative: votes.negative,
          },
        });
        this.$store.commit('toast/setToastImg', '/ic_good.svg');
        this.$store.commit('toast/setToastText', 'Thank You for Voting');
        this.$store.commit('toast/setToastVariant', 'toast--success');
      } catch (e) {
        alert(e);
        return;
      }
    },
    async thumbsDown(index, votes) {
      const messageRef = this.$fire.database.ref('data/' + index);
      try {
        await messageRef.update({
          votes: {
            positive: votes.positive,
            negative: (votes.negative += 1),
          },
        });
        this.$store.commit('toast/setToastImg', '/ic_incorrect.svg');
        this.$store.commit('toast/setToastText', 'Thank You for Voting');
        this.$store.commit('toast/setToastVariant', 'toast--success');
      } catch (e) {
        alert(e);
        return;
      }
    },
  },
  filters: {
    limit: function (value) {
      if (!value) return '';
      value = value.toString();
      return value.substr(0, 4);
    },
  },
};
</script>
<template>
  <main role="main">
    <v-container fluid>
        <v-row align="center">
                <v-col class="d-flex" cols="12" sm="6">
                    <h1>Previous Rulings</h1>
                </v-col>
                <v-col class="d-flex" cols="12" sm="6"></v-col>
        </v-row>
    </v-container>
    <div class="votes d-sm-flex" v-for="(item, index) in categories" :key="index">
     <div class="votes-img" :style="{ '--img-background': 'url('+ item.picture.toString() + ')' }">
        <div class="votes__container-desktop">
            <div class="votes__title-desktop">
                <h2>{{item.category}}</h2>
                <p>
                {{item.description}}
                </p>
            </div>
            <div class="votes__featured-card-desktop">
                 <strong>{{$moment(item.lastUpdated).format('LLLL')}}</strong>
               <div class="votes__buttom-card-desktop">
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
            
        </div>
        <div>
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
    </div>
  </main>
</template>

<script>
import mobileVotes from './mobile-votes.vue';
export default {
  components: { mobileVotes },
  name: 'Voting',
  data() {
    return {
      model: 0,
      categories: [],
      column:[],
    items: [
      { text: 'List' },
      { text: 'Grid' }
    ]
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
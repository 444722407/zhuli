<template>
  <div class="main">
    <div class="title">
      <img :src="$t('title')" alt="" />
    </div>
    <div class="panel_top">
      <img src="./assets/images/panel_top.png" alt="" />
    </div>
    <div class="panel">
      <i18n-t keypath="play" tag="div" class="game_numbs">
        <template v-slot:play>
          <span class="number">{{ game_play }}</span>
        </template>
      </i18n-t>

      <div class="box">
        <div
          class="ball"
          v-for="(item, index) in balls"
          :key="index"
          :class="item.classname"
        >
          <div class="ball_type" :class="'ball_type' + item.type">
            <p class="tag" :class="'tag' + item.type">{{ item.award }}</p>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="result">
          <div
            class="ball_type result_ball"
            :class="'ball_type' + result.type"
            v-if="result.type && result.award"
          >
            <p class="tag" :class="'tag' + result.type">{{ result.award }}</p>
          </div>
        </div>
        <!-- add class disable -->
        <div
          class="btn start"
          :class="{ disable: is_fulling }"
          @click="start"
        >
          <i class="icon_guanggao" v-if="game_play > 0 && free_count <= 0"></i>
          {{ $t("start") }}
        </div>
      </div>
    </div>
    <div class="record_btn" @click="rewardRecord">
      <i class="icon_record"></i>{{ $t("record") }}
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      getResult:{},
      balls:[],
      game_play: 0,
      free_count: 0,
      is_fulling: false,
      result: {},
      timer: null,
      dateLine: 0,
    };
  },
  mounted() {
    window.init = this.init;
    window.getAward = this.getAward;
    // document.addEventListener("visibilitychange",()=>{
    //   if (!document.hidden) {
    //     if(+new Date() - this.dateLine >=3000){
    //       console.log('end_animite')
    //        Array.from(document.querySelectorAll(".ball")).map((item) => {
    //           item.className = "ball";
    //       });
    //     }
    //   }});
     if (this.isAndroid()) {
        console.log('loadIndex')
        window.android.loadIndex();
      }
  },
  watch:{
    getResult:function(data){
        const result = data;
        console.log('监听result',result)
        this.game_play--;

        this.is_fulling = true;

        const balls = [...this.balls].sort(() => {
          return Math.random() - 0.5;
        });

        const randomIndex = [];
        for (let i = 0; i < this.balls.length; i++) {
          randomIndex[i] = i + 1;
        }

        randomIndex.sort(() => Math.random() - 0.5);

        balls.map((item, index) => {
          return (item.classname = `around${randomIndex[index]}`);
        });

        Array.from(document.querySelectorAll(".ball")).map((item) => {
          item.style.animationPlayState = "running";
        });

        this.balls = [...balls];

        const removeIndex = balls.findIndex((item) => {
          return item.type == result.award_type && item.award == result.award;
        });

     
        this.timer = setTimeout(() => {
          if (this.game_play <= 0) {
            this.is_fulling = true;
          } else {
            this.is_fulling = false;
          }

          this.result = this.balls.splice(removeIndex, 1)[0];

          Array.from(document.querySelectorAll(".ball")).map((item) => {
            item.style.animationPlayState = "paused";
          });

          if (this.isAndroid()) {
            window.android.onComplete();
          }
        }, 3000);
    }
  },
  unmounted() {
    clearTimeout(this.timer);
  },
  methods: {
    getAward: function (params) {
      console.log("app----messages----onAward");
      console.log("getAward",params);
      this.getResult = {...params};
    },
    isAndroid: function () {
      return window.android != null && typeof window.android != "undefined";
    },
    rewardRecord: function () {
      console.log("rewardRecord");
      if (this.isAndroid()) {
        window.android.rewardRecord();
      }
    },

    init: function (params) {
      console.log("app----messages----init");
      console.log(params);

      this.$root.$i18n.locale = (params && params.language) || "en";

     

      this.game_play = params.total_count;

      this.free_count = params.free_count;

      if (params.default_area) {
        const arr = params.step_ball.map((item) => {
          item = { type: 4, award: item };
          return item;
        });
        this.balls = arr.sort(() => {
          return Math.random() - 0.5;
        });
      } else {
        this.balls = params.award_ball.sort(() => {
          return Math.random() - 0.5;
        });
      }
    },
    start: function () {
  
      this.result = {};
      if (this.game_play <= 0 && this.free_count <= 0) {
        this.is_fulling = true;
        return;
      }
   
      if (this.game_play > 0 && this.free_count <= 0) {
        console.log("loadVideo");
        if (this.isAndroid()) {
          window.android.loadVideo();
        }
        return;
      }

       if (!this.is_fulling) {
        this.dateLine = +new Date();
      
        // 获得奖励
        if (this.isAndroid()) {
          console.log('onAward')
          window.android.onAward();
        }
     }
    },
  },
};
</script>


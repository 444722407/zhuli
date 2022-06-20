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
          v-for="item in balls"
          :key="item.id"
          :class="item.classname"
        >
          <img :src="item.img" alt="" />
        </div>
      </div>
      <div class="footer">
        <div class="result">
          <img
            :src="result.img"
            alt=""
            class="result_ball"
            v-if="result && result.img"
          />
        </div>
        <!-- add class disable -->
        <div class="btn start" :class="{ disable: is_fulling }" @click="start(3000)">
          {{$t("start")}}
        </div>
      </div>
    </div>
    <div class="record_btn" @click="rewardRecord"><i class="icon_record"></i>{{$t("record")}}</div>
  </div>
</template>

<script>

// init ball
var arr = [
  {
    name: "绿色球",
    level: "四等奖",
    img: require("./assets/images/ball1.png"),
    id: 1,
  },
  {
    name: "绿色球",
    level: "四等奖",
    img: require("./assets/images/ball1.png"),
    id: 2,
  },
  {
    name: "红色球",
    level: "三等奖",
    img: require("./assets/images/ball2.png"),
    id: 3,
  },
  {
    name: "红色球",
    level: "三等奖",
    img: require("./assets/images/ball3.png"),
    id: 4,
  },
  {
    name: "黄色球",
    level: "二等奖",
    img: require("./assets/images/ball4.png"),
    id: 5,
  },
  {
    name: "黄色球",
    level: "二等奖",
    img: require("./assets/images/ball5.png"),
    id: 6,
  },
  {
    name: "蓝色球",
    level: "一等奖",
    img: require("./assets/images/ball6.png"),
    id: 7,
  },
  {
    name: "蓝色球",
    level: "一等奖",
    img: require("./assets/images/ball7.png"),
    id: 8,
  },
];
export default {
  name: "App",
  data() {
    return {
      balls: [],
      game_play: 1,
      is_fulling: false,
      result: {},
      timer:null,
      dateLine:0
    };
  },
  created(){
    window.init = this.init;
    // document.addEventListener("visibilitychange",()=>{
    //   if (!document.hidden) {
    //     if(+new Date() - this.dateLine >=3000){
    //       console.log('end_animite')
    //        Array.from(document.querySelectorAll(".ball")).map((item) => {
    //           item.className = "ball";
    //       });
    //     }
    //   }});
  },  
  mounted() {
    console.log("vconsole");
    this.balls = arr.sort(() => {
      return Math.random() - 0.5;
    }); 
   
  },
  unmounted(){
    clearTimeout(this.timer)
  },  
  methods: {
    isAndroid:function(){
      return window.android!=null && typeof(window.android)!="undefined";
    },
    rewardRecord:function(){
      if(this.isAndroid()){
        window.android.rewardRecord()
      }
    },
    init: function (params) {
      console.log("app----messages");
      console.log(params);
      this.$root.$i18n.locale = params.lang || "en";
     
    },
    start: function (delay) {
      
      if (this.game_play <= 0) {
        // this.is_fulling = true;
          if(this.isAndroid()){
            window.android.loadVideo()
          }
        return;
      }
      if (!this.is_fulling) {
        this.dateLine = + new Date()
        this.game_play--;
        this.is_fulling = true;
        this.result = "";
        const balls = arr.sort(() => {
          return Math.random() - 0.5;
        });

        const randomIndex = [1, 2, 3, 4, 5, 6, 7, 8].sort(
          () => Math.random() - 0.5
        );

        balls.map((item, index) => {
          return (item.classname = `around${randomIndex[index]}`);
        });

        Array.from(document.querySelectorAll(".ball")).map((item) => {
          item.style.animationPlayState = "running";
        });

        this.balls = [...balls];

       this.timer =  setTimeout(() => {
          // if (this.game_play <= 0) {
           this.is_fulling = false;
          // } else {
          //   this.is_fulling = false;
          // }
          this.result = this.balls[0];
          this.balls.splice(0, 1);
          Array.from(document.querySelectorAll(".ball")).map((item) => {
            item.style.animationPlayState = "paused";
          });

          if(this.isAndroid()){
            window.android.onComplete()
          }

        }, delay);
      }
    },
  },
};
</script>


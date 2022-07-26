<template>
  <div class="main">
    <div class="page">
      <div class="page_head" v-if="selfData.user_info">
        <img :src="selfData.user_info.img" alt="" class="avatar" />

        <i18n-t keypath="tips" tag="p">
          <template v-slot:user_name>
            <span class="nickname">{{ selfData.user_info.name }}</span>
          </template>
        </i18n-t>
      </div>
      <div class="page_scale">
        <i class="icon icon_gold" v-if="reward_type == 1"></i>
        <i class="icon icon_zuanshi" v-if="reward_type == 2"></i>
        15000 
        <span v-if="reward_type == 1">{{ selfData.reward_coins_currency }}</span> 
        <span v-if="reward_type == 2">({{ $t('cash') }})</span> 
      </div>
      <div class="page_line"><img src="../assets/images/line.png" alt="" /></div>

  
      <div class="page_tips" v-if="!is_success">{{ $t("entry") }}</div>

      <div class="page_money" v-if="is_success">
        <p class="t" style="opacity: 0">xxxxxxxx</p>
        <p class="number" style="font-size: 0.8rem">{{ $t('gongxi')}}</p>
      </div>

      <div class="page_money" v-else>
        <p class="t">{{ $t("surplus") }}</p>
        <p class="number">{{ animatedNumber }}</p>
      </div>

      <div class="page_box">
        <canvas class="canvas" id="pmd"></canvas>
        <div class="panel_box">
          <div
            class="panel"
            :style="{
              width: listLength * listWidth + 'rem',
              marginLeft: x + 'rem',
            }"
          >
            <template v-if="reward_type == 1">
              <div class="list">
                <div class="item">
                  <p class="item_name">{{ $t("libao") }}</p>
                  <img
                    src="../assets/images/item1.png"
                    alt=""
                    class="item_img"
                  />
                </div>
                <div class="item">
                  <p class="item_name">{{ $t("jingbi") }}</p>
                  <img
                    src="../assets/images/item2.png"
                    alt=""
                    class="item_img"
                  />
                </div>
                <div class="item">
                  <p class="item_name">{{ $t("ruzhang") }}</p>
                  <img
                    src="../assets/images/item3.png"
                    alt=""
                    class="item_img"
                  />
                </div>
              </div>

              <div class="list">
                <div class="item">
                  <p class="item_name">{{ $t("jingbi") }}</p>
                  <img
                    src="../assets/images/item2.png"
                    alt=""
                    class="item_img"
                  />
                </div>
                <div class="item">
                  <p class="item_name">{{ $t("libao") }}</p>
                  <img
                    src="../assets/images/item1.png"
                    alt=""
                    class="item_img"
                  />
                </div>
                <div class="item">
                  <p class="item_name">{{ $t("ruzhang") }}</p>
                  <img
                    src="../assets/images/item3.png"
                    alt=""
                    class="item_img"
                  />
                </div>
              </div>
            </template>

               <template v-if="reward_type == 2">
              <div class="list">
                <div class="item">
                  <p class="item_name">{{ $t("libao") }}</p>
                  <img
                    src="../assets/images/item1.png"
                    alt=""
                    class="item_img"
                  />
                </div>
                <div class="item">
                  <p class="item_name">{{ $t("zuanshi") }}</p>
                  <img
                    src="../assets/images/item4.png"
                    alt=""
                    class="item_img"
                  />
                </div>
                <div class="item">
                  <p class="item_name">{{ $t("ruzhang") }}</p>
                  <img
                    src="../assets/images/item3.png"
                    alt=""
                    class="item_img"
                  />
                </div>
              </div>

              <div class="list">
                <div class="item">
                  <p class="item_name">{{ $t("zuanshi") }}</p>
                  <img
                    src="../assets/images/item4.png"
                    alt=""
                    class="item_img"
                  />
                </div>
                <div class="item">
                  <p class="item_name">{{ $t("libao") }}</p>
                  <img
                    src="../assets/images/item1.png"
                    alt=""
                    class="item_img"
                  />
                </div>
                <div class="item">
                  <p class="item_name">{{ $t("ruzhang") }}</p>
                  <img
                    src="../assets/images/item3.png"
                    alt=""
                    class="item_img"
                  />
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <div class="page_btn" v-if="play_nums <= 0">
        <p class="btn_text">{{ $t("success") }}</p>
      </div>

      <div class="page_btn" v-else @click="start">
        <p class="btn_text">{{ $t("play") }}({{ play_nums }})</p>
      </div>

      <div class="page_time">
        <span class="time" :class="{ disabled: is_time_disabled }"
          >{{ h }} </span
        >:
        <span class="time" :class="{ disabled: is_time_disabled }">{{ m }}</span
        >:
        <span class="time" :class="{ disabled: is_time_disabled }">{{
          s
        }}</span>
        <span class="text" v-if="is_time_disabled">{{ $t("timeOver") }}</span>
        <span class="text" v-else>{{ $t("timeStar") }}</span>
      </div>
    </div>

    <div class="bottom"><img src="../assets/images/bottom.png" alt="" /></div>

    <div class="share_box" @click="share">
      <canvas id="share" class="share"></canvas>
      <p class="share_text">{{ btn_text }}</p>
    </div>

    <div class="rules">
      <div class="rule_head">
        <p class="t" :class="{ active: rule_id == 1 }" @click="rule_id = 1">
          {{ $t("panelId1") }}
        </p>
        <p class="t" :class="{ active: rule_id == 2 }" @click="rule_id = 2">
          {{ $t("panelId2") }}
        </p>
      </div>

      <div class="rule_body swiper" v-show="rule_id == 1">
        <div class="list swiper-wrapper">
          <template
            v-for="item in selfData.total_finished"
            :key="item.nickname"
          >
            <div class="item swiper-slide">
              <img :src="item.avatar" alt="" class="avatar" />
              <div class="aside">
                <div class="nickname">
                  {{ item.nickname }}

                  <i18n-t keypath="desc" tag="p" class="status">
                    <template v-slot:coin>
                      <span>{{ item.reward_amount }}</span>
                    </template>
                  </i18n-t>
                </div>
                <p class="time">{{ item.create_time }}</p>
              </div>
            </div>
          </template>
        </div>
      </div>

      <div class="rule_body" v-show="rule_id == 2">
        <div class="rule_desc">
          <p class="rule_cont">
            {{ $t("p1") }}
          </p>
          <p class="rule_cont">
            {{ $t("p2") }}
          </p>
          <p class="rule_cont">
            {{ $t("p3") }}
          </p>
          <p class="rule_cont">
            {{ $t("p4") }}
          </p>
          <p class="rule_cont">
            {{ $t("p5") }}
          </p>
          <p class="rule_cont">
            {{ $t("p6") }}
          </p>
          <p class="rule_cont">
            {{ $t("p7") }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PAGInit } from "libpag";
import gsap from "gsap";
import selfData from "../data.json";
export default {
  name: "",
  data() {
    return {
      selfData: {},
      btn_text:"",
      reward_type: -1,
      reward_index:0,
      is_start:-1,
      amount:0,
      is_finished :false,
      is_success: false,
      is_cash: true,
      is_time_disabled: false,
      is_anmite: false,
      rule_id: 1,
      play_nums: 0,
      time: 0,
      number: 0,
      tweenedNumber: 0,
      x: 0,
      speed: 0.75,
      slowSpeed: 0.3,
      circle: 0,
      circledefault: 4,
      listLength: 2,
      listWidth: 7.4,
      globalInterval: null,
    };
  },

  mounted() {
    window.init = this.init;
    window.getAward = this.getAward;

   init();

    if(this.time>0){
         this.time--;
          var timeInterval = setInterval(() => {
            this.time--;
            if (this.time <= 0) {
              this.is_time_disabled = true;
              clearInterval(timeInterval);
              timeInterval = null;
            }
          }, 1000);
    }

    PAGInit().then((PAG) => {
      const url = "./pmd.pag";
      fetch(url)
        .then((response) => response.blob())
        .then(async (blob) => {
          const file = new window.File(
            [blob],
            url.replace(/(.*\/)*([^.]+)/i, "$2")
          );
          const pagFile = await PAG.PAGFile.load(file);
          document.getElementById("pmd").width = pagFile.width();
          document.getElementById("pmd").height = pagFile.height();
          const pagView = await PAG.PAGView.init(pagFile, "#pmd");
          pagView.setRepeatCount(0);
          await pagView.play();
        });
    });

    PAGInit().then((PAG) => {
      const url = "./share.pag";
      fetch(url)
        .then((response) => response.blob())
        .then(async (blob) => {
          const file = new window.File(
            [blob],
            url.replace(/(.*\/)*([^.]+)/i, "$2")
          );
          const pagFile = await PAG.PAGFile.load(file);
          document.getElementById("share").width = pagFile.width();
          document.getElementById("share").height = pagFile.height();
          const pagView = await PAG.PAGView.init(pagFile, "#share");
          pagView.setRepeatCount(0);
          await pagView.play();
        });
    });

    var swiper = new Swiper(".swiper", {
      direction: "vertical",
      loop: true,
      autoplay: {
        disableOnInteraction: false,
      },
      slidesPerView: 4,
    });
  },
  watch: {

    number(newValue) {
      gsap.to(this.$data, { duration: 0.5, tweenedNumber: newValue });
    },
    is_start(){
      // 当监听到有数据后开始动画
      this.play(this.reward_index)
    },
  },
  computed: {
    animatedNumber() {
      return this.tweenedNumber.toFixed(2);
    },
    h() {
      return Math.floor(this.time / 3600)
        .toString()
        .padStart(2, "0");
    },
    m() {
      return Math.floor(this.time / (24 * 60))
        .toString()
        .padStart(2, "0");
    },
    s() {
      return (this.time % 60).toString().padStart(2, "0");
    },
  },
  methods: {
    isAndroid: function () {
      return window.android != null && typeof window.android != "undefined";
    },
    init(data) {
      console.log("app----messages----init");
      console.log(data);
      data = selfData;
      this.$root.$i18n.locale = (data && data.language) || "en";
      this.selfData = data;
      this.time = data.curr_invite_assist.countdown;
      this.play_nums = data.lottery_count;
      this.number = data.difference_amount;
      this.reward_type = data.curr_invite_assist.type;
      this.btn_text = data.invite_btn_value;
    },
    share() {
      if (this.isAndroid()) {
        window.android.onInviteAssistStart();
      }
    },
    getAward(data) {
      console.log("app----messages----getAward");
      console.log(data);
      data  = {
        finished:true,
        amount:10.12,
        reward_type:1
      }
      this.is_start= this.is_start * -1;
      this.is_finished = data.finished;
      this.amount = data.amount;
      this.reward_index = data.reward_type == 1?0:1;
    },  

    reset() {
      clearInterval(this.globalInterval);
      this.globalInterval = null;
      this.circle = 0;
    },
    result() {
      this.number -= this.amount;
      this.is_success = this.is_finished;
      this.is_anmite = false;
      if (this.onEndLottery) {
        window.android.onEndLottery();
      }
    },
    start(){
        if (!this.is_anmite) {
          if (this.isAndroid()) {
            window.android.onStartLottery();
          }
          this.is_anmite = true;
          this.reset();
          getAward();
        }  
    },
    play(index) {
      if (this.play_nums <= 0) {
        return;
      }
      this.play_nums--;
      this.globalInterval = setInterval(() => {
        const w_index = index * this.listWidth;
        // 总宽度
        const listTotalWidth = this.listLength * this.listWidth;
        //  控制前面8圈的速度
        if (this.circle < 6) {
          this.x -= 0.8;
          // 当超过了一圈后 数值就要+1圈的量 不然就滚动出去了
          if (Math.abs(this.x) >= listTotalWidth) {
            this.x += listTotalWidth;
            this.circle++;
          }
        } else if (this.circle >= 6 && this.circle < 8) {
          this.x -= 0.4;
          if (Math.abs(this.x) >= listTotalWidth) {
            this.x += listTotalWidth;
            this.circle++;
          }
        } else {
          //  8圈过后 然后慢慢的走到终点
          if (Math.abs(this.x) < w_index) {
            this.x -= 0.1;
          } else {
            this.x = -w_index;
            clearInterval(this.globalInterval);
            this.result();
          }
        }
      }, 5);
    }

  },
};
</script>

<style scoped>
#pmd {
  display: block;
  margin: 0.4rem auto 0;
  width: 8.8rem;
}
#share {
  display: block;
  width: 8.6133rem;
  margin: 0 auto;
}
.swiper {
  height: 7.4667rem;
}
</style>

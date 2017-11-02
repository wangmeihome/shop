<template>
    <div class="home">
      <!-- 精确查询 -->
      <div class="inquire">
        <el-input placeholder="请输入查询内容" v-model="queryInfo" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </div>
      <!-- banner图 -->
      <div class="banner">
        <div class="bg" ref="bg" @mouseover="bgOver($refs.bg)" @mousemove="bgMove($refs.bg,$event)" @mouseout="bgOut($refs.bg)"></div>
      </div>
      <!-- 热卖商品 -->
      <div class="hot_wrapper">
        <div class="hot">
          <h1 class="hot_title">热卖商品</h1>
        </div>
        <div class="hot_list" style="overflow: hidden">

          <!-- 替代无数据 -->
          <div v-for="item in 3" class="hot_list_item">
            <!--<router-link :to="'goodsDetails?productId='+msg.productId">-->
            <router-link :to="'goodDetails?productId='+msg">
              <img src="../../assets/products/product.jpg">
              <h3>风向仪</h3>
              <p>￥ 2799</p>
            </router-link>
          </div>


        </div>
      </div>
      <!-- 官方精选商品组件 -->
      <choiceness :usingImg="choicenessImg"></choiceness>
      <!-- 品牌精选商品组件 -->
      <choiceness :usingImg="brandImg"></choiceness>
      <!-- 合作伙伴 -->
      <div class="partner">
        <h1>合作伙伴</h1>
        <div><img src="../../assets/partnerImgs/atlas.jpg"></div>
        <div><img src="../../assets/partnerImgs/bussmann.jpg"></div>
        <div><img src="../../assets/partnerImgs/fag.jpg"></div>
        <div><img src="../../assets/partnerImgs/ft.jpg"></div>
        <div><img src="../../assets/partnerImgs/shine.jpg"></div>
        <div><img src="../../assets/partnerImgs/skf.jpg"></div>
      </div>
    </div>
</template>

<script>
  import choiceness from '../../components/choiceness/choiceness.vue'
  export default {
    components:{
      choiceness
    },
    data () {
      return {
        choicenessImg:[
          {
            src:require('../../assets/others/choiceness.jpg'),
            des:"官方精选"
          }
        ],
        brandImg:[
          {
            src:require('../../assets/others/choiceness.jpg'),
            des:"品牌精选"
          }
        ],
        queryInfo:'',
        msg:123456,
        bgOpt: {
          px: 0,
          py: 0,
          w: 0,
          h: 0
        },
      }
    },
    methods: {
      //精确查询商品
      search(){
        console.log(this.queryInfo);
      },
      bgOver (e) {
        this.bgOpt.px = e.offsetLeft
        this.bgOpt.py = e.offsetTop
        this.bgOpt.w = e.offsetWidth
        this.bgOpt.h = e.offsetHeight
      },
      bgMove (dom, eve) {
        let bgOpt = this.bgOpt
        let X, Y
        let mouseX = eve.pageX - bgOpt.px
        let mouseY = eve.pageY - bgOpt.py
        if (mouseX > bgOpt.w / 2) {
          X = mouseX - (bgOpt.w / 2)
        } else {
          X = mouseX - (bgOpt.w / 2)
        }
        if (mouseY > bgOpt.h / 2) {
          Y = bgOpt.h / 2 - mouseY
        } else {
          Y = bgOpt.h / 2 - mouseY
        }
        dom.style['-webkit-transform'] = `rotateY(${X / 50}deg) rotateX(${Y / 50}deg)`
        dom.style.transform = `rotateY(${X / 50}deg) rotateX(${Y / 50}deg)`
      },
      bgOut (dom) {
        dom.style['-webkit-transform'] = 'rotateY(0deg) rotateX(0deg)'
        dom.style.transform = 'rotateY(0deg) rotateX(0deg)'
      }
    }
  }
</script>

<style scoped>
  .home{
    padding-top: 50px;
    padding-bottom: 100px;
    width: 100%;
  }
  .inquire{
    width: 700px;
    margin: 0 auto;
  }
  .banner, .banner div {
    font-family: "Microsoft YaHei";
    transition: all .3s;
    -webkit-transition: all .3s;
    transition-timing-function: linear;
    -webkit-transition-timing-function: linear;
  }
  .banner {
    perspective: 3000px;
    position: relative;
    z-index: 19;
  }
  .bg {
    position: relative;
    width: 1220px;
    height: 500px;
    margin: 20px auto;
    background: url("../../assets/banner/banner.png") center no-repeat;
    background-size: 100% 100%;
    border-radius: 10px;
    transform-style: preserve-3d;
    -webkit-transform-origin: 50% 50%;
    -webkit-transform: rotateY(0deg) rotateX(0deg);
  }
  .hot_wrapper{
    overflow: hidden;
    width: 1218px;
    margin: 0 auto;
    background: white;
    border: 1px solid #dcdcdc;
    border-radius: 8px;
  }
  .hot{
    padding-left: 30px;
    width: 1218px;
    height: 60px;
    border-bottom: 1px solid #d4d4d4;
    border-radius:8px 8px 0 0;
    line-height: 60px;
    background:linear-gradient(#fbfbfb, #ececec);
  }
  .hot_list_item{
    float: left;
    width: 406px;
    height: 430px;
    transition: all .5s;
  }
  .hot_list_item:hover{
    transform: translateY(-3px);
    box-shadow: 1px 1px 20px #999;
  }
  .hot_list_item img{
    display: block;
    margin: 50px auto 10px;
    width: 206px;
    height: 206px;
  }
  .hot_list_item h3{
    margin: 0 auto;
    padding: 20px 14px;
    overflow: hidden;
    line-height: 1.2;
    font-size: 16px;
    color: #424242;
    text-align: center;
  }
  .hot_list_item p{
    margin: 0 auto;
    margin-top: 20px;
    text-align: center;
    color: red;
  }
  .partner{
    margin: 0 auto;
    margin-top: 50px;
    border-top: 1px solid #d4d4d4;
    position: relative;
    width: 1220px;
    height: 100px;
  }
  .partner h1{
    position: absolute;
    top: -25px;
    left: 0;
  }
  .partner div{
    float: left;
    margin-top: 10px;
    padding-right: 22.5px;
    width: 180px;
    height: 80px;
    border-right: 1px solid #ccc;
  }
  .partner div:last-child{
    border-right: none;
  }
  .partner div img{
    width: 100%;
    height: 100%;
  }
</style>





















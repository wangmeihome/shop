<template>
  <div class="choice_wrapper">
    <div class="choice">
      <h1 class="choice_title">{{usingImg[0].des}}</h1>
    </div>
    <div class="choice_list" style="overflow: hidden">
      <div class="imgBanner">
        <img :src="usingImg[0].src">
      </div>
      <div v-for="item in 6" class="choice_list_item">
        <a href="#">
          <img src="../../assets/products/product.jpg">
          <h3>风向仪</h3>
          <p>￥ 2799</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    usingImg:{
      type:Array,
      default:[]
    }
  }
}
</script>

<style>
  .choice_wrapper{
    width: 1218px;
    margin: 0 auto;
    background: white;
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    overflow: hidden;
    margin-top: 30px;
  }
  .choice{
    width: 1218px;
    height: 60px;
    border-bottom: 1px solid #d4d4d4;
    border-radius:8px 8px 0 0;
    line-height: 60px;
    background:linear-gradient(#fbfbfb, #ececec);
    padding-left: 30px;
  }
  .imgBanner{
    float: left;
    width: 50%;
    height: 430px;
  }
  .imgBanner img{
    width: 609px;
    height: 430px;
    display: block;
  }
  .choice_list_item{
    width: 25%;
    height: 430px;
    float: left;
    transition: all .5s;
  }
  .choice_list_item:hover{
    transform: translateY(-3px);
    box-shadow: 1px 1px 20px #999;
  }
  .choice_list_item img{
    width: 206px;
    height: 206px;
    display: block;
    margin: 50px auto 10px;
  }
  .choice_list_item h3{
    line-height: 1.2;
    font-size: 16px;
    color: #424242;
    margin: 0 auto;
    padding: 20px 14px;
    text-align: center;
    overflow: hidden;
  }
  .choice_list_item p{
    margin: 0 auto;
    text-align: center;
    color: red;
    margin-top: 20px;
  }
</style>

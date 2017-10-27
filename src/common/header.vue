<template>
    <div class="header_wrapper">
      <div class="left_wrapper">
        <h1>
          <router-link to="/" title="爱风商城官网">
            <img src="../assets/logo/logo.png">
          </router-link>
        </h1>
      </div>
      <div class="right_wrapper">
        <div class="login">
          <router-link to="/login"><img src="../assets/logo/login_logo.png"></router-link>
        </div>
        <div class="shop_cart">
          <div class="shop_cart_logo">
            <a href="#"><img src="../assets/logo/asd.png"></a>
          </div>
          <div class="shop_cart_num">
            <div :class="totalNum === 0 ? 'putItAsh':'putItRed'">{{totalNum}}</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data(){
    return {
      numBgc:""
    }
  },
  computed:{
    totalNum(){
      let num = 1;
      return num
    }
  }
}
</script>

<style scoped>
  .header_wrapper{
    background: #1a1a1a;
    width: 100%;
    overflow: hidden;
  }
  .left_wrapper{
    float: left;
    width: 200px;
    height: 80px;
    margin-left: 20%;
  }
  .left_wrapper img{
    width: 100%;
  }
  .right_wrapper{
    float: left;
    margin-left: 37%;
  }
  .login{
    float: left;
    width: 36px;
    height: 36px;
    margin-top: 22px;
    margin-right: 30px;
  }
  .login a{
    width: 36px;
    height: 36px;
  }
  .login a img{
    width: 100%;
    height: 100%;
  }
  .shop_cart{
    float: left;
    overflow: hidden;
    margin-top: 22px;
  }
  .shop_cart_logo{
    float: left;
    width: 36px;
    height: 36px;
  }
  .shop_cart_logo a{
    width: 36px;
    height: 36px;
  }
  .shop_cart_logo a img{
    width: 100%;
    height: 100%;
  }
  .shop_cart_num{
    float: left;
    width: 25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    margin-top: 6px;
  }
  .shop_cart_num div{
    color: white;
    font-size: 14px;
  }
  .putItAsh{
    background: #ccc;
    border-radius: 25px;
  }
  .putItRed{
    background: red;
    border-radius: 25px;
  }
</style>






























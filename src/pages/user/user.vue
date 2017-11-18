<template>
  <div>
    <myHeader></myHeader>
    <div class="user_wrapper">
      <div class="user_asideMenu">
        <div class="menu_wrapper">
          <div class="personalCenter">用户皮皮虾的个人中心</div>
          <ul v-for="item in nav">
            <li><router-link @click="tag(item)" :to="{path:item.path}" :class="{menu_a_Active:item.name === title}">{{ item.name }}</router-link></li>
          </ul>
        </div>
      </div>
      <div class="user_right">
        <router-view></router-view>
      </div>
    </div>
    <myFooter></myFooter>
  </div>

</template>

<script>
  import myHeader from '../../common/header.vue'
  import myFooter from '../../common/footer.vue'

  export default {
    components:{
      myHeader,
      myFooter
    },
    data(){
      return {
        title: '我的订单',
        nav: [
          {name: '我的订单', path: 'order'},
          {name: '账户资料', path: 'accountData'},
          {name: '品牌管理', path: 'brandManagement'},
          {name: '店铺管理', path: 'storeManagement'},
          {name: '账户管理', path: 'accountMag'},
          {name: '以旧换新', path: 'oldForNew'}
        ],
      }
    },
//    初始化，结合:class 对锚点的样式进行对应
    created(){
      let path = this.$route.path.split('/')[2];
      this.nav.forEach(item => {
        if (item.path === path){
          this.title = item.name;
        }
      })
    },
//    点击方法切换路由
    methods: {
      tag(e){
        this.$router.push({path:'/user/' + e.path})
      }
    },
//    观察$route的变化  传进去的to参数指的是将要跳转页面的信息  其中包含path
//    例如将要跳转到 127.0.0.1:8080/user/coupon  to.path指的就是/user/coupon
    watch:{
      $route(to){
//        console.log(to);
        let path = to.path.split('/')[2];
        this.nav.forEach(item => {
          if (item.path === path) {
            this.title = item.name
          }
        })
      }
    }
  }
</script>

<style>
  .user_wrapper{
    padding-top: 120px;
    padding-bottom: 92px;
    overflow: hidden;
    margin: 0 auto;
    width: 1220px;
  }
  .user_asideMenu,.user_right{
    float: left;
  }
  .user_asideMenu{
    width: 208px;
    border: 1px solid #dcdcdc;
    border-radius: 6px;
  }
  .menu_wrapper{
    padding-top: 20px;
    width: 210px;
    height: 538px;
  }
  .user_right{
    margin-left: 10px;
  }
  .menu_wrapper ul{
    border-radius: 6px;
  }
  .menu_wrapper li{
    width: 208px;
    height: 48px;
    text-align: center;
    background: white;
    line-height: 48px
  }
  .menu_wrapper li a{
    display: block;
    width: 208px;
    height: 48px;
    color: #5079d9;
  }
  .menu_a_Active{
    background: #98AFEE;
    color: white;
  }
  .menu_wrapper .personalCenter{
    overflow: hidden;
    width: 208px;
    height: 120px;
    text-align: center;
    line-height: 120px;
  }
</style>










































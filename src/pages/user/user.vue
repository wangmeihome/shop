<template>
  <div>
    <myHeader></myHeader>
    <div class="user_wrapper">
      <div class="user_asideMenu">
        <el-row class="tac">
          <el-col :span="12">
            <el-menu default-active="2" active-text-color="#ffffff" text-color="#5079d9" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
              <el-submenu index="1">
                  <span slot="title">皮皮虾用户</span>
              </el-submenu>
              <el-menu-item :key="item.name" :index=item.index v-for="(item,index) in nav">
                <span slot="title"><span :key="item.name" @click="tag(item)">{{ item.name }}</span></span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
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
          {name: '我的订单', path: 'order',index:"2"},
          {name: '账户资料', path: 'accountData',index:"3"},
          {name: '收货地址', path: 'shipAddress',index:"4"},
          {name: '我的优惠', path: 'coupon',index:"5"},
          {name: '售后服务', path: 'saleService',index:"6"},
          {name: '以旧换新', path: 'oldForNew',index:"7"}
        ],
      }
    },
//    vue实例创建完成后调用的事件
    created(){
      let path = this.$route.path;
      this.nav.forEach(item => {
        if (item.path === path){
          this.title = item.name;
        }
      })
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
//      指定a标签的精确跳转事件
      tag(e){
        this.$router.push({path:'/user/' + e.path})
      }
    }
  }
</script>

<style>
  .user_wrapper{
    padding-top: 120px;
    padding-bottom: 92px;
    overflow: hidden;
    width: 1220px;
    margin: 0 auto;
  }
  .user_asideMenu,.user_right{
    float: left;
  }
  .el-submenu__title i{
    display: none;
  }
  .user_right{
    margin-left: 10px;
  }
  .el-menu{
    width: 249px;
    text-align: center;
    border: 1px solid #e6e6e6;
    border-radius: 10px;
  }
  .el-menu .el-menu-item{
    padding-left: 0;
  }
  .el-menu-item.is-active{
    background: #98AFEE;
    color: white;
  }
  .el-submenu__title{
    height: 200px;
    line-height: 200px;
  }
  .el-menu-item span{
    display: inline-block;
    width: 209px;
    height: 56px;
  }
</style>










































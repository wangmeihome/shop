<template>
    <div class="wrapper">
      <!-- 登录 -->
      <div class="login_main" v-show="!loginOrReg">
        <div class="login_top">
          <div class="login_logo">
            <img src="../../assets/logo/logo.png">
          </div>
          <h1>欢迎登录爱风商城</h1>
        </div>
        <div class="login_bottom">
          <div class="login_err">
            <p>
              <i class="el-icon-warning"></i><span>显示的错误信息</span>
            </p>
          </div>
          <div class="login_info">
            <div class="login_info_item">
              <el-input v-model="loginUsername" placeholder="请输入用户名"></el-input>
              <el-input v-model="loginPassword" placeholder="请输入密码"></el-input>
              <div class="vertifyInfo">
                <el-input v-model="vertify" placeholder="请输入验证码"></el-input>
                <div class="vertifyImg">
                  <img src="../../assets/others/vertify.png">
                </div>
              </div>
              <div class="register_enter"><span @click="reg" style="color: #169BD5;font-size: 14px;cursor: pointer">注册爱风商城</span></div>
              <el-button type="primary">登录</el-button>
            </div>
          </div>
        </div>
      </div>
      <!-- 注册 -->
      <div class="reg_main" v-show="loginOrReg">
        <div class="reg_top">
          <h1>欢迎注册爱风商城</h1>
        </div>
        <div class="reg_bottom">
          <div class="regInfo">
            <div class="regInfoItem">
              <div style="text-align: center;margin: 15px 0 5px 0">
                <el-radio v-model="role" label="采购商">采购商</el-radio>
                <el-radio v-model="role" label="供应商">供应商</el-radio>
              </div>
              <div>
                <p>
                  <i class="el-icon-warning"></i><span>显示的错误信息</span>
                </p>
                <el-input v-model="companyName" placeholder="请输入公司名称"></el-input>
              </div>
              <div>
                <p>
                  <i class="el-icon-warning"></i><span>显示的错误信息</span>
                </p>
                <el-input v-model="creditCode" placeholder="请输入社会统一信用代码"></el-input>
              </div>
              <div>
                <p>
                  <i class="el-icon-warning"></i><span>显示的错误信息</span>
                </p>
                <el-input v-model="regUsername" placeholder="请输入用户名"></el-input>
              </div>
              <div>
                <p>
                  <i class="el-icon-warning"></i><span>显示的错误信息</span>
                </p>
                <el-input v-model="regPassword" placeholder="请输入密码"></el-input>
              </div>
              <div>
                <p>
                  <i class="el-icon-warning"></i><span>显示的错误信息</span>
                </p>
                <el-input v-model="confirmPassword" placeholder="确认密码"></el-input>
              </div>
              <div class="tel_wrapper">
                <p>
                  <i class="el-icon-warning"></i><span>显示的错误信息</span>
                </p>
                <el-input v-model="tel" placeholder="请输入手机号码"></el-input>
                <el-button>60秒后可重新获取密码</el-button>
              </div>
              <div>
                <p>
                  <i class="el-icon-warning"></i><span>显示的错误信息</span>
                </p>
                <el-input v-model="telVertify" placeholder="请输入手机验证码"></el-input>
              </div>
              <div style="text-align: center;margin: 5px 0">
                <el-checkbox v-model="checked">爱风用户注册协议和隐私政策</el-checkbox>
              </div>
              <div class="regBtn">
                <div style="margin-right: 10px"><router-link to="/completeInfo">注册</router-link></div>
                <div><router-link to="/">取消</router-link></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data(){
    return {
//      登录所需参数
      loginUsername:'',
      loginPassword:'',
      vertify:'',
//      注册所需参数
      role:'采购商',
      companyName:'',
      creditCode:'',
      regUsername:'',
      regPassword:'',
      confirmPassword:'',
      tel:'',
      telVertify:'',
      checked: true,
//      其他参数
      loginOrReg:false
    }
  },
  methods:{
    login(){
      console.log(this.loginUsername);
      console.log(this.loginPassword);
      console.log(this.vertify);
    },
    reg(){
      this.loginOrReg = true;
    }
  }
}
</script>

<style scoped>
  html, body {
    width: 100%;
    height: 100%;
  }
  body {
    overflow: hidden;
    position: relative;
  }
  .wrapper{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
    overflow: hidden;
    width:100%;
    height:100%;
    background:url("../../assets/others/login_bg.png") repeat center center fixed;
  }
  .login_main,.reg_main{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -225px;
    margin-top: -370px;
    padding: 80px 10px;
    display:block;
    width: 450px;
    border: 1px solid #DADADA;
    border-radius:10px;
    box-sizing:border-box;
    box-shadow:0px 3px 0px 3px #DADADA;
    box-shadow:0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
    background:linear-gradient(to bottom ,#FFFFFF,#F0F0EF);
  }
  .reg_main{
    margin-left: -225px;
    margin-top: -351px;
    padding: 20px 10px;
  }
  .login_top h1,.reg_top h1{
    margin-top: 20px;
    text-align: center;
    color:#333;
    font-size:20px;
    font-weight:400;
    font-family:'Microsoft Yahei';
  }
  .login_err{
    margin-top: 30px;
    text-align: center;
  }
  .login_logo{
    margin: 0 auto;
    width: 200px;
    height: 75px;
  }
  .login_logo img{
    width: 100%;
    height: 100%;
  }
  .login_info_item{
    overflow: hidden;
    margin: 0 auto;
    width: 300px;
    line-height: 40px;
  }
  .login_info_item .el-input{
    padding-bottom: 5px;
  }
  .vertifyInfo{
    overflow: hidden;
  }
  .vertifyInfo .el-input{
    float: left;
    width: 226px;
  }
  .vertifyImg{
    float: left;
    width: 73px;
    height: 38px;
  }
  .vertifyImg img{
    width: 100%;
    height: 100%;
  }
  .register_enter{
    text-align: right;
  }
  .el-button{
    width: 300px;
  }
  .tel_wrapper{
    overflow: hidden;
  }
  .tel_wrapper .el-input{
    float: left;
    width: 245px;
  }
  .tel_wrapper .el-button{
    float: left;
    width: 183px;
  }
  .regBtn{
    overflow: hidden;
    width: 220px;
    margin: 0 auto;
  }
  .regBtn div{
    float: left;
    width: 100px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background: #409eff;
    border-radius: 10px;
  }
  .regBtn div a{
    display: block;
    width: 100px;
    height: 40px;
    color: white;
  }
</style>






































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
              <div class="register_enter"><span @click="showReg" style="color: #169BD5;font-size: 14px;cursor: pointer">注册爱风商城</span></div>
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
                <el-radio v-model="role" label="1">采购商</el-radio>
                <el-radio v-model="role" label="2">供应商</el-radio>
              </div>
              <div>
                <p style="color: red;height: 16px"><span v-show="companyTip"><i class="el-icon-warning"></i><span>{{ companyTip }}</span></span></p>
                <el-input @blur="comNameCheck" v-model="companyName" placeholder="请输入公司名称"></el-input>
              </div>
              <div>
                <p style="color:red;height: 16px"><span v-show="creditCodeTip"><i class="el-icon-warning"></i><span>{{ creditCodeTip }}</span></span></p>
                <el-input @blur="creditCodeCheck" v-model="creditCode" placeholder="请输入社会统一信用代码"></el-input>
              </div>
              <div>
                <p style="color:red;height: 16px"><span v-show="usernameTip"><i class="el-icon-warning"></i><span>{{ usernameTip }}</span></span></p>
                <el-input @blur="usernameCheck" v-model="regUsername" placeholder="请输入用户名"></el-input>
              </div>
              <div>
                <p style="color:red;height: 16px"><span v-show="pwdTip"><i class="el-icon-warning"></i><span>{{ pwdTip }}</span></span></p>
                <el-input @blur="pwdCheck" type="password" v-model="regPassword" placeholder="请输入密码"></el-input>
              </div>
              <div>
                <p style="color:red;height: 16px"><span v-show="confirmPwdTip"><i class="el-icon-warning"></i><span>{{ confirmPwdTip }}</span></span></p>
                <el-input @blur="confirmPwdCheck" type="password" v-model="confirmPassword" placeholder="确认密码"></el-input>
              </div>
              <div class="tel_wrapper">
                <p style="color:red;height: 16px"><span v-show="telTip"><i class="el-icon-warning"></i><span>{{ telTip }}</span></span></p>
                <el-input @blur="telCheck" v-model="tel" placeholder="请输入手机号码"></el-input>
                <el-button @click="getTelCode" :disabled="getOrNot">
                  <span v-show="isShowVertify">{{ second }}秒后可重新获取</span><span v-show="!isShowVertify">获取验证码</span></el-button>
              </div>
              <div>
                <p style="color:red;height: 16px"><span v-show="telVertifyTip"><i class="el-icon-warning"></i><span>{{ telVertifyTip }}</span></span></p>
                <el-input @blur="telvertifyCheck" v-model="telVertify" placeholder="请输入手机验证码"></el-input>
              </div>
              <div style="text-align: center;margin: 5px 0">
                <!--<el-checkbox v-model="checked">爱风用户注册协议和隐私政策</el-checkbox>-->
                <protocol @regstatus="editstatus"></protocol>
              </div>
              <div class="regBtn">
                <el-button type="primary" @click="register" :disabled="companyStatus===false&&creditCodeStatus===false&&usernameStatus===false&&pwdStatus===false&&confirmPwdStatus===false&&telStatus===false&&telVertifyStatus===false&&regdisable===false?false:true">注册</el-button>
                <!--<a href="#" @click="register">注册</a>-->
                <el-button type="primary" @click="register">取消</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import protocol from '../../components/protocol.vue'
export default {
    components:{
      protocol
    },
  data(){
    return {
//      登录所需参数
      loginUsername:'',
      loginPassword:'',
      vertify:'',
//      注册所需参数
      role:'1',
      companyName:'',
      creditCode:'',
      regUsername:'',
      regPassword:'',
      confirmPassword:'',
      tel:'',
      telVertify:'',
      checked: true,
//      其他参数
      loginOrReg:true,
      second:10,
      isShowVertify:false,
      getOrNot:false,
      regdisable:false,
//      注册验证提示
      companyTip:'',
      companyStatus:true,
      creditCodeTip:'',
      creditCodeStatus:true,
      usernameTip:'',
      usernameStatus:true,
      pwdTip:'',
      pwdStatus:true,
      confirmPwdTip:'',
      confirmPwdStatus:true,
      telTip:'',
      telStatus:true,
      telVertifyTip:'',
      telVertifyStatus:true
    }
  },
  methods:{
    login(){
      console.log(this.loginUsername);
      console.log(this.loginPassword);
      console.log(this.vertify);
    },
    showReg(){
      this.loginOrReg = true;
    },
    editstatus(){
      this.regdisable = !this.regdisable;
    },
//    点击按钮获取手机验证码   并且判断手机号是否被注册或为空
    getTelCode(){
      this.isShowVertify = true;
      this.getOrNot = true;
      this.inv = setInterval(() => {
        this.second --;
        if (this.second === 0){
          clearInterval(this.inv);
          this.isShowVertify = false;
          this.getOrNot = false;
          this.second = 10;
        }
      },1000);
      this.$axios.get('/regist/tostortmessage.ajax',{
        params:{
          mobile:this.tel
        }
      }).then((res) => {
        let errCode = res.data.data.error_code;
        console.log(res.data.data)
      }).catch((err) => {
        console.log("请求失败")
      })
    },
//    注册
    register(){
      let reqParams = {
        typei:this.role,
        afwindEnterprise:{
          enterpriseName:this.companyName,
          creditCode:this.creditCode
        },
        userName:this.regUsername,
        userPassword:this.regPassword,
        mobile:this.tel,
        validateCode:this.telVertify,
      };
      this.$axios.post('/regist/saveregist.ajax',reqParams)
        .then( (res) => {
          console.log(res);
        }).catch(() => {
          console.log('请求失败')
      })
    },
//    验证公司名称是否被注册或是否为空
    comNameCheck(){
      this.$axios.get('/regist/countenterprisename.ajax',{
        params:{
          enterpriseName:this.companyName
        }
      }).then((res) => {
        let status;
        if (!res.data.data){
          status = false;
          this.companyTip = "此公司名称已被注册";
          this.companyStatus = true;
        }
        if (!this.companyName){
          status = false;
          this.companyTip = "您输入的公司名称不能为空";
          this.companyStatus = true;
        }
        if (res.data.data&&this.companyName){
          status = true;
          this.companyTip = '';
          this.companyStatus = false;
        }else{
          this.companyStatus = true;
        }
      }).catch(() => {
        console.log("请求失败");
      })
    },
//    验证社会统一信用代码是否被注册或是否为空
    creditCodeCheck(){
      this.$axios.get('/regist/countcreditcode.ajax',{
        params:{
          creditCode:this.creditCode
        }
      }).then((res) => {
        let status;
        if (!res.data.data){
          status = false;
          this.creditCodeTip = "此社会统一信用代码已被注册";
          this.creditCodeStatus = true;
        }
        if (!/^\d{18}$/.test(this.creditCode)){
          status = false;
          this.creditCodeTip = "社会统一信用代码不能为空";
          this.creditCodeStatus = true;
        }
        if (res.data.data&&/^\d{18}$/.test(this.creditCode)){
          status = true;
          this.creditCodeTip = '';
          this.creditCodeStatus = false;
        }else{
          this.creditCodeStatus = true;
        }
      }).catch(() => {
        console.log("请求失败");
      })
    },
//    验证用户名是否被注册或是否为空
    usernameCheck(){
      this.$axios.get('/regist/countusename.ajax',{
        params:{
          userName:this.regUsername
        }
      }).then((res) => {
        let status;
        if (!res.data.data){
          status = false;
          this.usernameTip = "此用户名已被注册";
          this.usernameStatus = true;
        }
        if (!/^[a-zA-z][a-zA-Z0-9_]{5,11}$/.test(this.regUsername)){
          status = false;
          this.usernameTip = "您输入的用户名格式不正确";
          this.usernameStatus = true;
        }
        if (res.data.data&&/^[a-zA-z][a-zA-Z0-9_]{5,11}$/.test(this.regUsername)){
          status = true;
          this.usernameTip = '';
          this.usernameStatus = false;
        }else{
          this.usernameStatus = true;
        }
      })
    },
//    验证用户密码是否符合规则
    pwdCheck(){
      let status;
      if (!/^\w{6,12}$/g.test(this.regPassword)){
        status = false;
        this.pwdTip = '请至少输入六位密码';
        this.pwdStatus = true;
      }
      if (/^\w{6,12}$/g.test(this.regPassword)){
        status = true;
        this.pwdTip = '';
        this.pwdStatus = false;
      }else{
        this.pwdStatus = true;
      }
    },
//    用户确认密码
    confirmPwdCheck(){
      let status;
      if (this.regPassword !== this.confirmPassword){
        status = false;
        this.confirmPwdTip = '密码与上述密码不符';
        this.confirmPwdStatus = true;
      }else if(!this.confirmPassword){
        status = false;
        this.confirmPwdTip = '密码不能为空';
        this.confirmPwdStatus = true;
      }else{
        status = true;
        this.confirmPwdTip = '';
        this.confirmPwdStatus = false;
      }
    },





//    验证用户输入的手机号是否被注册或是否为空            !!!!!!!!!!!应该把电话号码的检测放置点击获取验证码的时候
    telCheck(){
      let status;
      this.$axios.get('/regist/countmobile.ajax',{
        params:{
          mobile:this.tel
        }
      }).then((res) => {
        if (!res.data.data){
          status = false;
          this.telTip = "此手机号码已被注册";
          this.telStatus = true
        }
        if (!/^1[34578]\d{9}$/.test(this.tel)){
          status = false;
          this.telTip = "您输入的手机号码格式不正确";
          this.telStatus = true;
        }
        if(!this.tel){
          status = false;
          this.telTip = "手机号不能为空";
          this.telStatus = true;
        }
        if (res.data.data&&/^1[34578]\d{9}$/.test(this.tel)){
          status = true;
          this.telTip = "";
          this.telStatus = false
        }else{
          this.telStatus = true
        }
        console.log(this.telStatus)
      }).catch(() => {
        console.log("请求失败")
      })
    },





//    验证用户输入的验证码是否符合规则
    telvertifyCheck(){
      let status;
      if (!/^[A-Za-z0-9]{4}$/.test(this.telVertify)){
        status = false;
        this.telVertifyTip = "您输入的验证码格式不正确";
        this.telVertifyStatus = true;
      }
      if (!this.telVertify){
        status = false;
        this.telVertifyTip = "验证码不能为空";
        this.telVertifyStatus = true;
      }
      if (/^[A-Za-z0-9]{4}$/.test(this.telVertify)){
        status = true;
        this.telVertifyTip = "";
        this.telVertifyStatus = false;
      }else{
        this.telVertifyStatus = true;
      }
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
  .regBtn .el-button{
    width: 100px;
    height: 40px;
  }
</style>






































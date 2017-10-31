<template>
    <div class="big_box">
      <div class="center">
      <div class="wrapper_box" v-show="isHidden">
      	<div class="box">
          <div class="logo_box">
            <img src="../../assets/logo/logo.png" id="im">
          </div>
      	</div>
      	<div class="text_box">
      		<p>欢迎登录爱风商城</p>
      	</div>
      	<div class="input_box">
      		<input type="text" placeholder="用户名">
      	</div>
      	<div class="input_boxx">
      		<input type="text" placeholder="密码">
      	</div>
      	<ul class="input_boxy">
      	  <li><input type="text" placeholder="验证码"></li>
      	  <li><img src="../../assets/others/vertify.png"></li>
      	</ul>
      	<div class="character">
      	  <a @click="register">注册爱风商城</a>
      	</div>
      	<div class="bottom_box">
      	  <el-button type="info" class="button" disabled >登录</el-button>
      	</div>
      </div>

    <!--注册-->
     <div class="resign_box" v-show="isShow">
      <p class="welcome">欢迎注册爱风商城</p>
      <div class="radio_box">
      	<div><el-radio v-model="role" label="采购商"></el-radio></div>
      	<div><el-radio v-model="role" label="供应商"></el-radio></div>
      </div>
      <div class="container_box">
        <ul>
      	  <li>
      	  	<p class="el-icon-warning picture">提示的错误信息</p>
      	  	<input type="text" placeholder="请输入公司名称"></li>
      	  <li>
      	  	<p class="el-icon-warning picture">提示的错误信息</p>
      	  	<input type="text" placeholder="请输入社会统一信用代码">
      	  </li>
      	  <li>
      	  	<p class="el-icon-warning picture">提示的错误信息</p>
      	  	<input type="text" placeholder="请输入用户名">
      	  </li>
      	  <li>
      	  	<p class="el-icon-warning picture">提示的错误信息</p>
      	  	<input type="text" placeholder="请输入密码">
      	  </li>
      	  <li>
      	  	<p class="el-icon-warning picture">提示的错误信息</p>
      	  	<input type="text" placeholder="确认密码">
      	  </li>
      	  <li>
      	  	<dl class="getter">
      	  	  <dd><p class="el-icon-warning picture">提示的错误信息</p></dd>
      	  	  <dd><input type="text" placeholder="请输入手机号码" style="width:210px;"></dd>
      	  	  <dd><button style="width:90px;height:34px;border-radius:6px;background:none;color:#333333;text-align:center;font-family:'Microsoft Yahei'">获取验证码</button></dd>
      	  	</dl>
      	  </li>
      	 </ul>
    </div>
    <div class="footer_box">
      <p class="radio">
      	<el-checkbox v-model="checked" style="color:cornflowerblue">爱风用户注册协议和隐私政策</el-checkbox>
      </p>
      <ul class="btn">
      	<li><router-link :to="{path:'/completeInfo'}">注册</router-link></li>
      	<li><a href="#">取消</a></li>
      </ul>
    </div>
   </div>
  </div>
 </div>


</template>

<script>
export default{
	//初始化
	 data(){
	 	return{
	 		isHidden:true,
	 		isShow:false,
      role:'',
      xieyi:'',
      checked:''
	 	}

	},
	//方法
	methods:{
	 register:function(){
	 this.isHidden=!this.isHidden;
	 this.isShow = !this.isShow;

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
  .big_box{
 	  width:100%;
 	  height:100%;
    background:url("../../assets/others/login_bg.png") repeat center center fixed;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
    overflow: hidden;
  }
  .wrapper_box{
   	width:379px;
   	height:464px;
   	border:1px solid #DADADA;
   	margin:0 auto;
   	margin-top:100px;
    display:block;
    border-radius:10px;
    box-sizing:border-box;
    box-shadow:0px 3px 0px 3px #DADADA;
    box-shadow:0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
    background:linear-gradient(to bottom ,#FFFFFF,#F0F0EF);
    vertical-align:middle;
  }
  .logo_box{
      width:200px;
      height:75px;
      box-sizing:border-box;
      margin:0 auto;
  }
  #im{
   	  width:100%;
   	}
.text_box>p{
     text-align:center;
     color:#333;
     font-size:20px;
     margin-top:15px;
     box-sizing:border-box;
     font-weight:400;
     font-family:'Microsoft Yahei';
}
.input_box>input{
  width:301px;
  height:32px;
  border:1px solid #A9A9A9;
  color:#000000;
  margin-top:40px;
  box-sizing:border-box;
  margin-left:42px;
  border-radius:4px;
  font-size:16px;
  padding:10px 15px;
}
.input_boxx>input{
  width:301px;
  height:32px;
  border:1px solid #A9A9A9;
  color:#000000;
  margin-top:15px;
  box-sizing:border-box;
  margin-left:42px;
  border-radius:4px;
  font-size:16px;
  padding:10px 15px;
}
.input_boxy{
	overflow:hidden;
}
.input_boxy>li{
	float:left;
}
.input_boxy>li:nth-of-type(1)>input{
  width:200px;
  height:32px;
  border:1px solid #A9A9A9;
  margin-top:15px;
  box-sizing:border-box;
  margin-left:42px;
  border-radius:4px;
  font-size:16px;
  padding:10px 15px;
}
.input_boxy>li:nth-of-type(2)>img{
  width:100%;
  margin-top:15px;
  margin-left:8px;
}
.character{
 box-sizing:border-box;
 margin-top:21px;
 overflow:hidden;
}
.character a{
   color:#169BD5;
   text-decoration: none;
   margin-right:35px;
   font-size:12px;
   float:right;
   cursor:pointer;
}
.bottom_box .button{
   width:300px;
   height:45px;
   margin-left:43px;
   margin-top:20px;
}
 /*注册*/
 .resign_box{
 	width:379px;
   	height:464px;
   	border:1px solid #DADADA;
   	margin:0 auto;
    display:block;
    margin-top: 100px;
    border-radius:10px;
    box-sizing:border-box;
    box-shadow:0px 3px 0px 3px #DADADA;
    box-shadow:0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
    background:linear-gradient(to bottom ,#FFFFFF,#F0F0EF);
}
 .welcome{
 	color:#333333;
 	font-family:'Microsoft Yahei';
 	font-size:20px;
 	text-align:center;
 	margin-top:30px;
 }
 .radio_box{
 	overflow:hidden;
 	margin-left:100px;
 	display:inline-block;
 	margin-top:15px;
}
 .radio_box div{
 	float:left;
 	padding:0px 15px;
}
 .container_box{
 	margin-top:-5px;
 }
 .el-icon-warning{
   margin-left:8px;
 }
 .container_box ul li .picture{
 	font-size:10px;
 	font-family:"microsoft yahei";
 }
 .container_box ul li{
 	padding:0px 22px;
}
 .container_box ul li input{
 	width:301px;
 	height:32px;
 	border:1px solid #A9A9A9;
 	border-radius:4px;
 	padding:0px 15px;
}
.getter{
   overflow:hidden;
 }
 .getter dd{
 	float:left;
 }
 .radio{
    font-size:14px;
   font-family:'Microsoft Yahei' ;
    text-align:center;
    line-height:25px;
    margin:5px 0px;
}
 .btn{
 	display:flex;
 	justify-content:center;
 	margin-top:-10px;
 }
 .btn>li{
 	padding:10px;
 }
 .btn>li a{
   display: inline-block;
   width:93px;
   height:31px;
   line-height: 31px;
   background:#169BD5;
   text-align:center;
   color:#FFFFFF;
   font-family:'Microsoft Yahei';
   border-radius:6px;
   border:0px;
 }

</style>








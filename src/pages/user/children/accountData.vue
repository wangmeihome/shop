<template>
  <div class="account_wrapper">
    <div class="account_name">
      <h1>我的账户</h1>
    </div>
    <!--企业信息-->
    <div class="account_detail">
      <ul class="account_list">
        <li v-for="item in comInfo">
          <div class="com_account_title">{{item.title}}</div>
          <div>
            <p>{{item.content}}</p>
            <img v-if="item.content === ''" :src="item.photo" style="width:380px;height:202px;">
          </div>
        </li>
      </ul>
      <div style="width: 126px;height: 40px;margin-left: 160px">
        <el-button @click="editComInfo" type="primary">修改企业信息</el-button>
      </div>
      <!--个人信息-->
      <ul class="personal_list">
        <li v-for="item in perInfo">
          <div class="per_account_title">{{item.title}}</div>
          <div>
            <p>{{item.content}}</p>
            <div v-for="photoDetails in item.photo">
              <img v-if="item.content ===''" :src="photoDetails.url" style="width:90px;height:150px;">
            </div>
          </div>
        </li>
      </ul>
      <div style="width: 126px;height: 40px;margin-left: 160px">
        <el-button @click="editComInfo" type="primary">修改个人信息</el-button>
      </div>
    </div>


  </div>
</template>

<script>
  export default{
    data(){
      return{
        comInfo:[
          {"title":'企业名称:',"content":'北京凯金卓越科技发展有限公司'},
          {"title":"统一社会信用代码:","content":"18位社会统一信用代码"},
          {"title":"法人:","content":"某法人"},
          {"title":"公司固定电话:","content":"010-88137916"},
          {"title":"公司传真:","content":"010-88155997"},
          {"title":"所属行业:","content":"科技"},
          {"title":"公司注册地址:","content":"北京市海淀区玲珑琨御府9号楼2单元1002室"},
          {"title":"办公地址:","content":"北京市海淀区玲珑琨御府9号楼2单元1002室"},
          {"title":"公司营业执照:","content":"","photo":require("../../../assets/others/add.png")},
          {"title":"供货范围:","content":"全宇宙"},
          {"title":"开户行名称:","content":"中国建设银行北京恩济支行"},
          {"title":"开户行账号:","content":"6217000000000000000"},
          {"title":"开户行信息:","content":"开户行行号等"}
        ],
        perInfo:[
          {"title":"联系人姓名:","content":"张三"},
          {"title":"性别:","content":"男"},
          {"title":"职务:","content":"医生"},
          {"title":"手机号:","content":"123456"},
          {"title":"办公电话:","content":"123456789"},
          {"title":"邮箱:","content":"123456@.com"},
          {"title":"QQ号码:","content":"1232"},
          {"title":"微信:","content":"123455"},
          {
            "title":"其他附件:",
            "content":"",
            "photo":[
              {
                id:1,
                url:require('../../../assets/others/add.png')
              },
              {
                id:2,
                url:require('../../../assets/others/add.png')
              },
              {
                id:3,
                url:require('../../../assets/others/add.png')
              },
              {
                id:4,
                url:require('../../../assets/others/add.png')
              },
              {
                id:5,
                url:require('../../../assets/others/add.png')
              },
            ]
          }
        ]
      }
    },
    methods:{
      editComInfo(){
        alert("修改企业信息")
      },
      editPerInfoBtn(){
        alert("修改个人信息")
      }
    }
  }
</script>
<style scoped>
  .account_wrapper{
    overflow: hidden;
    padding-bottom: 30px;
    width: 954px;
    background: white;
    border: 1px solid #dcdcdc;
    border-radius:8px;
  }
  .account_name{
    padding-left:80px;
    width: 874px;
    height: 60px;
    border-bottom: 1px solid #d4d4d4;
    border-radius:8px 8px 0 0;
    line-height:60px;
    background:linear-gradient(#fbfbfb, #ececec);
    font-family:"microsoft yahei" ;
  }
  .account_list,.personal_list{
    margin:20px 0;
  }
  .account_list>li,.personal_list>li{
    width:100%;
    padding:6px 0px;
    overflow:hidden;
  }
  .account_list li div,.personal_list li div{
    float:left;
    font-family:"microsoft yahei";
    padding:0px 5px;
  }
  .com_account_title,.per_account_title{
    width:150px;
    text-align-last:right;
    display:inline-block;
    font-family:"microsoft yahei";
  }
</style>

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
            <img v-if="item.content  === ''" :src="item.photo" class="picture">
            <div v-for="photoDetails in item.phot">
              <img v-if="item.content ===''" :src="photoDetails.url" style="width:100px;height:100px;">
            </div>
          </div>
        </li>
      </ul>
      <div style="width: 126px;height: 40px;margin-left:160px">
        <el-button @click="editComInfo=true" type="primary">修改企业信息</el-button>
      </div>
      <!-- 修改企业信息弹框 -->
      <el-dialog :visible.sync="editComInfo" size="full" :before-close="handleClose">
        <ul class="factory_list">
          <li>
            <div class="com_account_tit">企业名称:</div>
            <el-input style="width:300px" disabled :value="conpanyName" v-model="conpanyName"></el-input>
          </li>
          <li>
            <div class="com_account_tit" >统一社会信用代码:</div>
            <el-input style="width:300px" disabled :value="creditCode" v-model="creditCode"></el-input>
          </li>
          <li>
            <div class="com_account_tit">法人:</div>
            <el-input style="width:300px" :value="legalPerson" v-model="legalPerson"></el-input>
          </li>
          <li>
            <div class="com_account_tit">公司固定电话:</div>
            <el-input style="width:300px" :value="fixedLine" v-model="fixedLine"></el-input>
          </li>
          <li>
            <div class="com_account_tit">公司传真:</div>
            <el-input style="width:300px" :value="fax" v-model="fax"></el-input>
          </li>
          <li>
            <div class="com_account_tit">所属行业:</div>
            <el-input style="width:300px" :value="industry" v-model="industry"></el-input>
          </li>
          <li>
            <ul class="select_collen">
              <li>
                <div class="com_account_tit">公司注册地址:</div>
                <linkage @getAreaId="getRegAddr"></linkage>
              </li>
              <el-input class="regRoad" :value="comRegAddrDetail" v-model="comRegAddrDetail" style="width:605px;margin-left:155px;"></el-input>
            </ul>
          </li>
          <li>
            <ul class="select_collen">
              <li>
                <div class="com_account_tit">办公地址:</div>
                <linkage @getAreaId="getWorkAddr"></linkage>
              </li>
              <!-- 结束 -->
              <el-input class="regRoad" :value="workAddrDetail" v-model="workAddrDetail" style="width:605px;margin-left:155px;"></el-input>
            </ul>
          </li>
          <li>
            <div class="com_account_tit" style="vertical-align:top">公司营业执照:</div>
            <img :src="license" style="width:200px;height:200px">
            <div style="margin-left: 150px">
              <p>更换公司营业执照：</p>
              <el-upload class="upload-demo" list-type="picture" ref="licenseUpload" action="/entanduser/upload.ajax" :on-success="licenseSuccess" :on-change="licenseOnChange" :on-preview="licenseHandlePreview" :on-remove="licenseHandleRemove" :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="licenseSubmitUpload" :disabled="licenseBtn">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
              </el-upload>
            </div>
          </li>
          <li>
            <div class="com_account_tit" style="vertical-align:top">其他附件:</div>
            <img v-for="item in others" :src="item.src" class="groundphoto">
            <div style="margin-left: 150px">
              <p>更换其他附件：</p>
              <el-upload multiple class="upload-demo" list-type="picture" ref="otherUpload" action="/entanduser/upload.ajax" :on-success="otherSuccess" :on-change="otherOnChange" :on-preview="otherHandlePreview" :on-remove="otherHandleRemove" :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="otherSubmitUpload" :disabled="otherBtn">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
              </el-upload>
            </div>
          </li>
          <li>
            <div class="com_account_tit">供货范围:</div>
            <el-input style="width:300px" :value="supplyScope" v-model="supplyScope"></el-input>
          </li>
          <li>
            <div class="com_account_tit">开户行名称:</div>
            <el-input style="width:300px" :value="bankName" v-model="bankName"></el-input>
          </li>
          <li>
            <div class="com_account_tit">开户行账号:</div>
            <el-input style="width:300px" :value="bankAccount" v-model="bankAccount"></el-input>
          </li>
          <li>
            <div class="com_account_tit">开户行信息:</div>
            <el-input style="width:300px" :value="bankInfo" v-model="bankInfo"></el-input>
          </li>
        </ul>
        <div class="el-dialog__footer">
           <span slot="footer" class="dialog-footer">
             <el-button @click="editComInfo = false" style="text-align:center !important" class="cancel">取 消</el-button>
             <el-tooltip placement="top">
                <div slot="content" style="font-size:16px;">您所修改的信息<br/>需要审核三天</div>
                <el-button type="primary" @click="editComInfo = false" class="ensure">确定</el-button>
             </el-tooltip>
           </span>
        </div>
      </el-dialog>
      <!--个人信息-->
      <ul class="personal_list">
        <li v-for="item in perInfo">
          <div class="per_account_title">{{item.title}}</div>
          <div>
            <p>{{item.content}}</p>
          </div>
        </li>
      </ul>
      <div style="width: 126px;height: 40px;margin-left: 160px">
        <el-button @click="editPerInfoBtn=true" type="primary">修改个人信息</el-button>
        <el-dialog class="box" :visible.sync="editPerInfoBtn" size="tiny" :before-close="handleClose">
          <ul class="connent_list">
            <li>
              <div class="com_account_tit">联系人姓名:</div>
              <el-input style="width:300px" :value="linkMan" v-model="linkMan"></el-input>
            </li>
            <li>
              <div class="com_account_tit" >性别:</div>
              <el-input style="width:300px" :value="gender" v-model="gender"></el-input>
            </li>
            <li>
              <div class="com_account_tit">职务:</div>
              <el-input style="width:300px" :value="duty" v-model="duty"></el-input>
            </li>
            <li>
              <div class="com_account_tit">手机号:</div>
              <el-input style="width:300px" :value="personalTel" v-model="personalTel"></el-input>
            </li>
            <li>
              <div class="com_account_tit">办公电话:</div>
              <el-input style="width:300px" :value="tel" v-model="tel"></el-input>
            </li>
            <li>
              <div class="com_account_tit">邮箱:</div>
              <el-input style="width:300px" :value="email" v-model="email"></el-input>
            </li>
            <li>
              <div class="com_account_tit">QQ号码:</div>
              <el-input style="width:300px" :value="qq"></el-input>
            </li>
            <li>
              <div class="com_account_tit">微信:</div>
              <el-input style="width:300px" value="123455"></el-input>
            </li>
          </ul>
          <div class="el-dialog__footer">
             <span slot="footer" class="dialog-footer">
              <el-button @click="editPerInfoBtn = false" class="cancel">取 消</el-button>
              <el-button type="primary" @click="editPerInfoBtn = false" class="ensure">确 定</el-button>
             </span>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
  import linkage from '../.././../components/linkage/linkage.vue'
  export default{
    components:{
      linkage
    },
    data(){
      return{
        //企业信息展示数据
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
          {
            "title":"其他附件:",
            "content":"",
            "phot":[
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
          },
          {"title":"供货范围:","content":"全宇宙"},
          {"title":"开户行名称:","content":"中国建设银行北京恩济支行"},
          {"title":"开户行账号:","content":"6217000000000000000"},
          {"title":"开户行信息:","content":"开户行行号等"}

        ],
        //个人信息展示数据
        perInfo:[
          {"title":"联系人姓名:","content":"张三"},
          {"title":"性别:","content":"男"},
          {"title":"职务:","content":"董事长"},
          {"title":"手机号:","content":"123456"},
          {"title":"办公电话:","content":"123456789"},
          {"title":"邮箱:","content":"123456@.com"},
          {"title":"QQ号码:","content":"1232"},
          {"title":"微信:","content":"123455"},
        ],
        //企业信息修改参数
        conpanyName:'公司名称',
        creditCode:111111111111111111,
        legalPerson:'某法人',
        fixedLine:222222222,
        fax:333333333,
        industry:'某行业',
        comRegAddrDetail:'注册地址',
        workAddrDetail:'工作地址',
        license:require("../../../assets/others/add.png"),
        others:[
          {
            id:1,
            src:require("../../../assets/others/add.png")
          },
          {
            id:2,
            src:require("../../../assets/others/add.png")
          },
          {
            id:3,
            src:require("../../../assets/others/add.png")
          },
          {
            id:4,
            src:require("../../../assets/others/add.png")
          },
          {
            id:5,
            src:require("../../../assets/others/add.png")
          },
        ],
//    公司营业执照的路径
        licenseUrlArr:[],
//    判断上传营业执照图片大小的文字提示框
        licenseDialogVisible: false,
//    判断上传营业执照大小的按钮
        licenseBtn: true,
//    其他附件的路径
        otherUrlArr:[],
//    判断上传其他附件图片大小的文字提示框
        otherDialogVisible: false,
//    判断上传其他附件大小的按钮
        otherBtn: true,

        supplyScope:'供货范围',
        bankName:'银行名称',
        bankAccount:621700,
        bankInfo:'银行具体信息',
        regAreaValue:'',
        workAreaValue:'',
        //个人信息修改参数
        linkMan:'某联系人',
        gender:'1',
        duty:'职位信息',
        personalTel:13111111111,
        tel:444444444,
        email:'wangmei_@163.com',
        qq:'123456789',
        //弹框控制参数
        editComInfo:false,
        editPerInfoBtn:false,
      }
    },
    methods:{
//      获取公司注册地址
      getRegAddr(AreaValue){
        this.regAreaValue = this.AreaValue;
        console.log(AreaValue);
      },
      getWorkAddr(AreaValue){
        this.workAreaValue = this.AreaValue;
        console.log(AreaValue);
      },
      //    当选取的文件大小超过2M的时候的钩子函数
      licenseOnChange(file, fileList) {
        if(file.size >= 2097152) {
          this.licenseDialogVisible = true;
          this.licenseBtn = true;
          fileList.pop();
          if(fileList.length === 0){
            this.licenseBtn = true;
          }else{
            this.licenseBtn = false;
          }
        } else {
          this.licenseBtn = false;
        }
      },
//    上传公司营业执照
      licenseSubmitUpload() {
        this.$refs.licenseUpload.submit();
      },
//    上传营业执照成功后的钩子函数
      licenseSuccess(response, file, fileList) {
        this.licenseUrlArr.push(response.data);
        console.log(this.licenseUrlArr);
      },
//    移除列表文件时的钩子函数
      licenseHandleRemove(file, fileList) {
//      console.log(file, fileList);
        this.licenseBtn = true;
      },
//    点击已上传文件的钩子函数
      licenseHandlePreview(file) {
//      目前无逻辑
      },
      //    当选取的文件大小超过2M的时候的钩子函数
      otherOnChange(file, fileList) {
        if(file.size >= 2097152) {
          this.otherDialogVisible = true;
          this.otherBtn = true;
          fileList.pop();
          if(fileList.length === 0){
            this.otherBtn = true;
          }else{
            this.otherBtn = false;
          }
        } else {
          this.otherBtn = false;
        }
      },
//    上传其他附件
      otherSubmitUpload() {
        this.$refs.otherUpload.submit();
      },
      otherSuccess(response, file, fileList) {
        this.otherUrlArr.push(response.data);
        console.log(this.otherUrlArr);
      },
//    移除列表文件时的钩子函数
      otherHandleRemove(file, fileList) {
//      console.log(file, fileList);
        this.otherBtn = true;
      },
//    点击已上传文件的钩子函数
      otherHandlePreview(file) {

      },
//    点击营业执照大于2M的文字提示框的关闭按钮的钩子函数
      licenseHandleClose() {
        this.licenseDialogVisible = false;
      },
//    点击其他附件大于2M的文字提示框的关闭按钮的钩子函数
      otherHandleClose() {
        this.otherDialogVisible = false;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  }
</script>
<style>
  .account_wrapper{
    overflow: hidden;
    padding-bottom: 30px;
    width: 954px;
    background: white;
    border: 1px solid #dcdcdc;
    border-radius:8px;
  }
  .account_wrapper .account_name{
    padding-left:80px;
    width: 874px;
    height: 60px;
    border-bottom: 1px solid #d4d4d4;
    border-radius:8px 8px 0 0;
    line-height:60px;
    background:linear-gradient(#fbfbfb, #ececec);
    font-family:"microsoft yahei" ;
  }
  .account_wrapper .account_list,.account_wrapper .personal_list{
    margin:20px 0px;
  }
  .account_wrapper .account_list>li,.account_wrapper .personal_list>li{
    width:80%;
    padding:6px 0px;
    overflow:hidden;
  }
  .account_wrapper .account_list li div,.account_wrapper .personal_list li div{
    float:left;
    font-family:"microsoft yahei";
    padding:0px 5px;
  }
  .account_wrapper .com_account_title,.account_wrapper .per_account_title{
    width:150px;
    text-align-last:right;
    display:inline-block;
    font-family:"microsoft yahei";
  }
  .factory_list,.connent_list{
    overflow:hidden;
  }
  .factory_list li .groundphoto{
    width:100px;
    height:100px;
  }
  .account_wrapper .factory_list li,.account_wrapper .connent_list li{
    float:left;
    width:100%;
    padding:2px 3px;
  }
  .com_account_tit{
    width:150px;
    text-align-last:right;
    display:inline-block;
    font-family:"microsoft yahei";
    margin-top:10px;
  }
  .account_wrapper .el-dialog__footer{
    text-align:center;
  }
  .account_wrapper .el-select{
    width:300px;
    margin-left:3px;
  }
  .select_collen li{
    overflow:hidden;
  }
  .account_wrapper .select_collen li div,.account_wrapper .el-select{
    float:left;
  }
  .account_wrapper .cancel,.account_wrapper .ensure{
    margin-top:15px!important;
  }
  .account_wrapper .el-dialog__wrapper .el-dialog{
    width: 85%;
  }
  .el-dialog,.box{
    width:50%;
    margin:0 auto;
  }
</style>

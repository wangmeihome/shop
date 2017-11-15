<template>
  <div class="account_wrapper">
    <div class="myAccount">
      <h1>我的账户</h1>
    </div>
    <!--企业信息-->
    <div class="account_detail">
      <ul class="account_list">
        <li v-for="item in comInfo">
          <div class="com_account_title">{{item.title}}</div>
          <div>
            <p v-if="item.content">{{item.content}}</p>
            <img v-if="item.photo" :src="item.photo" style="width: 200px;height: 200px">
            <div v-for="photoDetails in item.picture">
              <img v-if="photoDetails" :src="photoDetails" style="width:100px;height:100px;">
            </div>
          </div>
        </li>
      </ul>
      <div style="width: 126px;height: 40px;margin-left:160px">
        <el-button @click="editComInfo=true" type="primary">修改企业信息</el-button>
      </div>
      <!-- 修改企业信息弹框 -->
      <el-dialog :visible.sync="editComInfo" size="full" :before-close="handleClose">
        <div class="editComInfoList">
          <div class="editComInfoList_item">
            <p>企业名称：</p>
            <el-input disabled :value="conpanyName" v-model="conpanyName"></el-input>
          </div>
          <div class="editComInfoList_item">
            <p>社会统一信用代码：</p>
            <el-input disabled :value="creditCode" v-model="creditCode"></el-input>
          </div>
          <div class="editComInfoList_item">
            <p>法人：</p>
            <el-input :value="legalPerson" v-model="legalPerson"></el-input>
          </div>
          <div class="editComInfoList_item">
            <p>公司固定电话：</p>
            <el-input :value="fixedLine" v-model="fixedLine"></el-input>
          </div>
          <div class="editComInfoList_item">
            <p>公司传真：</p>
            <el-input :value="fax" v-model="fax"></el-input>
          </div>
          <div class="editComInfoList_item">
            <p>所属行业：</p>
            <el-select v-model="industry">
              <el-option v-for="item in industries" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
          <div class="editComInfoList_item">
            <p>公司注册地址：</p>
            <linkage @getAreaId="getRegAddr"></linkage>
            <el-input :value="comRegAddrDetail" v-model="comRegAddrDetail"></el-input>
          </div>
          <div class="editComInfoList_item">
            <p>公司办公地址：</p>
            <linkage @getAreaId="getWorkAddr"></linkage>
            <el-input :value="workAddrDetail" v-model="workAddrDetail"></el-input>
          </div>
          <div class="editComInfoList_item">
            <p>公司营业执照：</p>
            <div>
              <img :src="license" style="width:200px;height:200px">
            </div>
            <div style="margin-left: 130px">
              <div>更换公司营业执照：</div>
              <el-upload class="upload-demo" list-type="picture" ref="licenseUpload" action="/entanduser/upload.ajax" :on-success="licenseSuccess" :on-change="licenseOnChange" :on-preview="licenseHandlePreview" :on-remove="licenseHandleRemove" :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="licenseSubmitUpload" :disabled="licenseBtn">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
              </el-upload>
            </div>
          </div>
          <div class="editComInfoList_item">
            <p>供货范围：</p>
            <el-select v-model="supplyScope">
              <el-option v-for="item in supplyScopes" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
          <div class="editComInfoList_item">
            <p>开户行名称：</p>
            <el-input :value="bankName" v-model="bankName"></el-input>
          </div>
          <div class="editComInfoList_item">
            <p>开户行账号：</p>
            <el-input :value="bankAccount" v-model="bankAccount"></el-input>
          </div>
          <div class="editComInfoList_item">
            <p>开户行信息：</p>
            <el-input :value="bankInfo" v-model="bankInfo"></el-input>
          </div>
          <div class="editComInfoList_item">
            <p>其他附件：</p>
            <div>
              <img v-for="item in others" :src="item" style="width: 100px;height: 100px;">
            </div>
            <div style="margin-left: 130px">
              <div>更换其他附件：</div>
              <el-upload multiple class="upload-demo" list-type="picture" ref="otherUpload" action="/entanduser/upload.ajax" :on-success="otherSuccess" :on-change="otherOnChange" :on-preview="otherHandlePreview" :on-remove="otherHandleRemove" :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="otherSubmitUpload" :disabled="otherBtn">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
              </el-upload>
            </div>
          </div>
        </div>
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
      </div>
      <!-- 修改个人信息弹框 -->
      <el-dialog class="personalDialog" :visible.sync="editPerInfoBtn" size="tiny" :before-close="handleClose">
        <div class="editPerInfoList">
          <div class="editPerInfoList_item">
            <p>联系人姓名：</p>
            <el-input :value="linkMan" v-model="linkMan"></el-input>
          </div>
          <div style="line-height: 40px" class="editPerInfoList_item">
            <p>性别：</p>
            <el-radio v-model="gender" label="1">男</el-radio>
            <el-radio v-model="gender" label="2">女</el-radio>
          </div>
          <div class="editPerInfoList_item">
            <p>职务：</p>
            <el-input :value="duty" v-model="duty"></el-input>
          </div>
          <div class="editPerInfoList_item">
            <p>手机号：</p>
            <el-input disabled :value="personalTel" v-model="personalTel"></el-input>
          </div>
          <div class="editPerInfoList_item">
            <p>办公电话：</p>
            <el-input :value="tel" v-model="tel"></el-input>
          </div>
          <div class="editPerInfoList_item">
            <p>邮箱：</p>
            <el-input :value="email" v-model="email"></el-input>
          </div>
          <div class="editPerInfoList_item">
            <p>QQ号码：</p>
            <el-input :value="qq" v-model="qq"></el-input>
          </div>
        </div>
        <div class="el-dialog__footer">
             <span slot="footer" class="dialog-footer">
              <el-button @click="editPerInfoBtn = false" class="cancel">取 消</el-button>
              <el-button type="primary" @click="editPerInfoBtn = false" class="ensure">确 定</el-button>
             </span>
        </div>
      </el-dialog>
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
        //企业信息数据
        comInfo:[
          {"title":'企业名称:',"content":''},
          {"title":"统一社会信用代码:","content":""},
          {"title":"法人:","content":""},
          {"title":"公司固定电话:","content":""},
          {"title":"公司传真:","content":""},
          {"title":"所属行业:","content":""},
          {"title":"公司注册地址:","content":""},
          {"title":"办公地址:","content":""},
          {"title":"公司营业执照:","photo":''},
          {"title":"其他附件:","picture":[]},
          {"title":"供货范围:","content":""},
          {"title":"开户行名称:","content":""},
          {"title":"开户行账号:","content":""},
          {"title":"开户行信息:","content":""}
        ],
        //个人信息数据
        perInfo:[
          {"title":"联系人姓名:","content":""},
          {"title":"性别:","content":""},
          {"title":"职务:","content":""},
          {"title":"手机号:","content":""},
          {"title":"办公电话:","content":""},
          {"title":"邮箱:","content":""},
          {"title":"QQ号码:","content":""}
        ],
        //企业信息修改参数
        conpanyName:'',
        creditCode:'',
        legalPerson:'',
        fixedLine:'',
        fax:'',
        industries: [
          {value: '', label: ''},
          {value: '', label: ''},
          {value: '', label: ''},
          {value: '', label: ''}],
        industry: '',
        supplyScopes: [
          {value: '', label: ''},
          {value: '', label: ''},
          {value: '', label: ''}],
        supplyScope: '',
        comRegAddrDetail:'',
        workAddrDetail:'',
        license:'',
        bankName:'',
        bankAccount:'',
        bankInfo:'',
        regAreaValue:'',
        workAreaValue:'',
        others:[],
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
        //个人信息修改参数
        linkMan:'',
        gender:'',
        duty:'',
        personalTel:'',
        tel:'',
        email:'',
        qq:'',
        //弹框控制参数
        editComInfo:false,
        editPerInfoBtn:false,
      }
    },
    created(){
//      console.log(this.comInfo)
      this.$axios.get('/entanduser/getEntAndUser.ajax')
        .then((res) => {
          let myData = JSON.parse(res.data.data);
          console.log(myData);
          /* 企业信息的获取 */
          this.comInfo[0].content = myData.afwindEnterprise.enterpriseName;
          this.conpanyName = myData.afwindEnterprise.enterpriseName;
          this.comInfo[1].content = myData.afwindEnterprise.creditCode;
          this.creditCode = myData.afwindEnterprise.creditCode;
          this.comInfo[2].content = myData.afwindEnterprise.owner;
          this.legalPerson = myData.afwindEnterprise.owner;
          this.comInfo[3].content = myData.afwindEnterprise.phone;
          this.fixedLine = myData.afwindEnterprise.phone;
          this.comInfo[4].content = myData.afwindEnterprise.fax;
          this.fax = myData.afwindEnterprise.fax;
          this.comInfo[5].content = myData.afwindEnterprise.config.valuei;
          this.industry = myData.afwindEnterprise.config.valuei;
          for (let i = 0;i<myData.afwindEnterprise.addresseList.length;i++){
            if (myData.afwindEnterprise.addresseList[i].typei === '1'){
              this.comInfo[6].content = myData.afwindEnterprise.addresseList[i].address;
              this.comRegAddrDetail = myData.afwindEnterprise.addresseList[i].address;
            }else if(myData.afwindEnterprise.addresseList[i].typei === '2'){
              this.comInfo[7].content = myData.afwindEnterprise.addresseList[i].address;
              this.workAddrDetail = myData.afwindEnterprise.addresseList[i].address;
            }
          }
          for (let i =0;i<myData.afwindEnterprise.enterprisePicsList.length;i++){
            if (myData.afwindEnterprise.enterprisePicsList[i].typei === '1'){
              this.comInfo[8].photo = myData.afwindEnterprise.enterprisePicsList[i].url;
              this.license = myData.afwindEnterprise.enterprisePicsList[i].url;
            }else if(myData.afwindEnterprise.enterprisePicsList[i].typei === '2'){
              this.comInfo[9].picture.push(myData.afwindEnterprise.enterprisePicsList[i].url);
              this.others.push(myData.afwindEnterprise.enterprisePicsList[i].url);
            }
          }
          this.comInfo[10].content = myData.afwindEnterprise.categorie.name;
          this.supplyScope = myData.afwindEnterprise.categorie.name;
          this.comInfo[11].content = myData.afwindEnterprise.accountList[0].account;
          this.bankAccount =  myData.afwindEnterprise.accountList[0].account;
          this.comInfo[12].content = myData.afwindEnterprise.accountList[0].bankName;
          this.bankName = myData.afwindEnterprise.accountList[0].bankName;
          this.comInfo[13].content = myData.afwindEnterprise.accountList[0].bankRemark;
          this.bankInfo = myData.afwindEnterprise.accountList[0].bankRemark;
//          个人信息的获取
          this.perInfo[0].content = myData.realname;
          this.linkMan = myData.realname;
          if (myData.sex === '1'){
            this.perInfo[1].content = '男';
            this.gender = '1';
          }else if(myData.sex === '2'){
            this.perInfo[1].content = '女';
            this.gender = '2';
          }
          this.perInfo[2].content = myData.userPost;
          this.duty = myData.userPost;
          this.perInfo[3].content = myData.mobile;
          this.personalTel = myData.mobile;
          this.perInfo[4].content = myData.telphone;
          this.tel = myData.telphone;
          this.perInfo[5].content = myData.email;
          this.email = myData.email;
          this.perInfo[6].content = myData.qqCode;
          this.qq = myData.qqCode;
        }).catch(() => {
          console.log("数据请求失败");
      });
      //    请求所属行业下拉列表数据
      this.$axios.get('/entanduser/gettypei.ajax')
        .then((res) => {
          let INDUSTRY = JSON.parse(res.data.data);
          for (let i = 0;i<INDUSTRY.length;i++){
            this.industries[i].value = INDUSTRY[i].id;
            this.industries[i].label = INDUSTRY[i].valuei;
          }
//        console.log(INDUSTRY);
        }).catch(() => {
        console.log("请求失败")
      });
//    请求供货范围下拉列表数据
      this.$axios.get('/entanduser/getEntityIndustryList.ajax')
        .then((res) => {
          let INDUSTRY = JSON.parse(res.data.data);
          for (let i = 0;i<INDUSTRY.length;i++){
            this.supplyScopes[i].value = INDUSTRY[i].id;
            this.supplyScopes[i].label = INDUSTRY[i].name;
          }
//        console.log(INDUSTRY);
        }).catch(() => {
        console.log("请求失败")
      });
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
  .account_wrapper .myAccount{
    padding-left:80px;
    width: 874px;
    height: 60px;
    border-bottom: 1px solid #d4d4d4;
    border-radius:8px 8px 0 0;
    line-height:60px;
    background:linear-gradient(#fbfbfb, #ececec);
    font-family: "Microsoft YaHei UI";
  }
  .account_wrapper .account_list,
  .account_wrapper .personal_list{
    margin:20px 0;
  }
  .account_wrapper .account_list>li,
  .account_wrapper .personal_list>li{
    width:80%;
    padding:6px 0;
    overflow:hidden;
  }
  .account_wrapper .account_list li div,
  .account_wrapper .personal_list li div{
    float:left;
    font-family: "Microsoft YaHei UI";
    padding:0 5px;
  }
  .account_wrapper .com_account_title,.account_wrapper .per_account_title{
    width:150px;
    text-align-last:right;
    display:inline-block;
    font-family: "Microsoft YaHei UI";
  }
  .editComInfoList_item,
  .editPerInfoList_item{
    overflow: hidden;
  }
  .editComInfoList_item p,
  .editPerInfoList_item p{
    float: left;
    width: 130px;
    height: 40px;
    line-height: 40px;
    text-align: right;
  }
  .editComInfoList_item .el-input,
  .editPerInfoList_item .el-input{
    float: left;
    width: 300px;
  }
  .editComInfoList_item .el-select{
    float: left;
  }
  .account_detail .el-dialog{
    width: 72%;
  }
  .account_detail .personalDialog .el-dialog{
    width: 30%;
  }
  .account_detail .el-dialog__footer{
    text-align: center;
  }
</style>

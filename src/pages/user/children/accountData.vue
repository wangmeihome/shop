<template>
  <div class="account_wrapper">
    <div class="myAccount">
      <h1>我的账户</h1>
    </div>
    <el-tabs v-model="editComInfoTab" type="card" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="basicInfo">
        <!--企业信息-->
        <div class="account_detail">
          <ul class="account_list">
            <li v-for="item in comInfo">
              <div class="com_account_title">{{item.title}}</div>
              <div>
                <p v-if="item.content">{{item.content}}</p>
                <img v-if="item.photo" :src="item.photo" style="width: 200px;height: 200px">
                <div v-for="(photoDetails,index) in item.picture">
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
                <p>纳税人识别号：</p>
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
                <linkage :PRO="regpro" :CITY="regcity" :AREA="regarea" :REC="1" @getAreaId="getRegAddr"></linkage>
                <el-input :value="comRegAddrDetail" v-model="comRegAddrDetail"></el-input>
              </div>
              <div class="editComInfoList_item">
                <p>公司办公地址：</p>
                <linkage :PRO="workpro" :CITY="workcity" :AREA="workarea" :REC="2" @getAreaId="getWorkAddr"></linkage>
                <el-input :value="workAddrDetail" v-model="workAddrDetail"></el-input>
              </div>
              <div class="editComInfoList_item">
                <p>公司营业执照：</p>
                <div>
                  <img :src="license" style="width:200px;height:200px;">
                </div>
                <div style="margin-left: 130px">
                  <div>更换公司营业执照：</div>
                  <businessLicense @getOnePic="getLicense"></businessLicense>
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
                <div style="float: left" v-for="(item,index) in others">
                  <img :src="item" style="width: 100px;height: 100px;margin-right: 10px">
                </div>
                <div style="margin-left: 130px;float: left;width: 540px">
                  <div>更换其他附件：</div>
                  <others @getMorePics="getOthers"></others>
                </div>
              </div>
            </div>
            <div class="el-dialog__footer">
           <span slot="footer" class="dialog-footer">
             <el-button @click="cancelEditcominfo" style="text-align:center !important" class="cancel">取消</el-button>
             <el-tooltip placement="top">
                <div slot="content" style="font-size:16px;">您所修改的信息<br/>需要审核三天</div>
                <el-button type="primary" @click="editcominfo" class="ensure">提交</el-button>
             </el-tooltip>
           </span>
            </div>
          </el-dialog>
        </div>
        <!--个人信息-->
        <div class="account_detail">

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
               <el-tooltip placement="top">
                <div slot="content" style="font-size:16px;">您所修改的信息<br/>需要审核三天</div>
                <el-button type="primary" @click="editperinfo" class="ensure">提交</el-button>
             </el-tooltip>
             </span>
            </div>
          </el-dialog>
        </div>
      </el-tab-pane>
      <el-tab-pane label="审理信息" name="hearInfo">
        <!--企业信息-->
        <div class="account_detail">
          <ul class="account_list">
            <li v-for="item in aftercomInfo">
              <div class="com_account_title">{{item.title}}</div>
              <div>
                <p v-if="item.content">{{item.content}}</p>
                <img v-if="item.photo" :src="item.photo" style="width: 200px;height: 200px">
                <div v-for="(photoDetails,index) in item.picture">
                  <img v-if="photoDetails" :src="photoDetails" style="width:100px;height:100px;">
                </div>
              </div>
            </li>
          </ul>
          <div style="width: 126px;height: 40px;margin-left:160px">
            <el-button @click="aftereditComInfo=true" type="primary">修改企业信息</el-button>
          </div>
          <!-- 修改企业信息弹框 -->
          <el-dialog :visible.sync="aftereditComInfo" size="full" :before-close="handleClose">
            <div class="editComInfoList">
              <div class="editComInfoList_item">
                <p>企业名称：</p>
                <el-input disabled :value="afterconpanyName" v-model="afterconpanyName"></el-input>
              </div>
              <div class="editComInfoList_item">
                <p>纳税人识别号：</p>
                <el-input disabled :value="aftercreditCode" v-model="aftercreditCode"></el-input>
              </div>
              <div class="editComInfoList_item">
                <p>法人：</p>
                <el-input :value="afterlegalPerson" v-model="afterlegalPerson"></el-input>
              </div>
              <div class="editComInfoList_item">
                <p>公司固定电话：</p>
                <el-input :value="afterfixedLine" v-model="afterfixedLine"></el-input>
              </div>
              <div class="editComInfoList_item">
                <p>公司传真：</p>
                <el-input :value="afterfax" v-model="afterfax"></el-input>
              </div>
              <div class="editComInfoList_item">
                <p>所属行业：</p>
                <el-select v-model="afterindustry">
                  <el-option v-for="item in afterindustries" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </div>
              <div class="editComInfoList_item">
                <p>公司注册地址：</p>
                <linkage :PRO="afterregpro" :CITY="afterregcity" :AREA="afterregarea" :REC="1" @getAreaId="aftergetRegAddr"></linkage>
                <el-input :value="aftercomRegAddrDetail" v-model="aftercomRegAddrDetail"></el-input>
              </div>
              <div class="editComInfoList_item">
                <p>公司办公地址：</p>
                <linkage :PRO="afterworkpro" :CITY="afterworkcity" :AREA="afterworkarea" :REC="2" @getAreaId="aftergetWorkAddr"></linkage>
                <el-input :value="afterworkAddrDetail" v-model="afterworkAddrDetail"></el-input>
              </div>
              <div class="editComInfoList_item">
                <p>公司营业执照：</p>
                <div>
                  <img :src="afterlicense" style="width:200px;height:200px;">
                </div>
                <div style="margin-left: 130px">
                  <div>更换公司营业执照：</div>
                  <businessLicense @getOnePic="aftergetLicense"></businessLicense>
                </div>
              </div>
              <div class="editComInfoList_item">
                <p>供货范围：</p>
                <el-select v-model="aftersupplyScope">
                  <el-option v-for="item in aftersupplyScopes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </div>
              <div class="editComInfoList_item">
                <p>开户行名称：</p>
                <el-input :value="afterbankName" v-model="afterbankName"></el-input>
              </div>
              <div class="editComInfoList_item">
                <p>开户行账号：</p>
                <el-input :value="afterbankAccount" v-model="afterbankAccount"></el-input>
              </div>
              <div class="editComInfoList_item">
                <p>开户行信息：</p>
                <el-input :value="afterbankInfo" v-model="afterbankInfo"></el-input>
              </div>
              <div class="editComInfoList_item">
                <p>其他附件：</p>
                <div style="float: left" v-for="(item,index) in afterothers">
                  <img :src="item" style="width: 100px;height: 100px;margin-right: 10px">
                </div>
                <div style="margin-left: 130px;float: left;width: 540px">
                  <div>更换其他附件：</div>
                  <others @getMorePics="aftergetOthers"></others>
                </div>
              </div>
            </div>
            <div class="el-dialog__footer">
           <span slot="footer" class="dialog-footer">
             <el-button @click="aftercancelEditcominfo" style="text-align:center !important" class="cancel">取消</el-button>
             <el-tooltip placement="top">
                <div slot="content" style="font-size:16px;">您所修改的信息<br/>需要审核三天</div>
                <el-button type="primary" @click="aftereditcominfo" class="ensure">提交</el-button>
             </el-tooltip>
           </span>
            </div>
          </el-dialog>
        </div>
        <!--个人信息-->
        <div class="account_detail">

          <ul class="personal_list">
            <li v-for="item in afterperInfo">
              <div class="per_account_title">{{item.title}}</div>
              <div>
                <p>{{item.content}}</p>
              </div>
            </li>
          </ul>
          <div style="width: 126px;height: 40px;margin-left: 160px">
            <el-button @click="aftereditPerInfoBtn=true" type="primary">修改个人信息</el-button>
          </div>
          <!-- 修改个人信息弹框 -->
          <el-dialog class="personalDialog" :visible.sync="aftereditPerInfoBtn" size="tiny" :before-close="handleClose">
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
               <el-tooltip placement="top">
                <div slot="content" style="font-size:16px;">您所修改的信息<br/>需要审核三天</div>
                <el-button type="primary" @click="editperinfo" class="ensure">提交</el-button>
             </el-tooltip>
             </span>
            </div>
          </el-dialog>
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
  import linkage from '../../../components/linkage/linkage.vue'
  import businessLicense from '../../../components/upload/uploadOnePic.vue'
  import others from '../../../components/upload/uploadMorePics.vue'
  export default{
    components:{
      linkage,
      businessLicense,
      others
    },
    data(){
      return{
        editComInfoTab: 'basicInfo',
//        省市区父组件传子组件默认参数
        regpro:'',
        regcity:'',
        regarea:'',
        workpro:'',
        workcity:'',
        workarea:'',
        //企业信息数据
        comInfo:[
          {"title":'企业名称:',"content":''},
          {"title":"纳税人识别号:","content":""},
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
        licenseUrlArr:[],
        otherUrlArr:[],
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
//        第二大部分！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
        afterregpro:'',
        afterregcity:'',
        afterregarea:'',
        afterworkpro:'',
        afterworkcity:'',
        afterworkarea:'',
        //企业信息数据
        aftercomInfo:[
          {"title":'企业名称:',"content":''},
          {"title":"纳税人识别号:","content":""},
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
        afterperInfo:[
          {"title":"联系人姓名:","content":""},
          {"title":"性别:","content":""},
          {"title":"职务:","content":""},
          {"title":"手机号:","content":""},
          {"title":"办公电话:","content":""},
          {"title":"邮箱:","content":""},
          {"title":"QQ号码:","content":""}
        ],
        //企业信息修改参数
        afterconpanyName:'',
        aftercreditCode:'',
        afterlegalPerson:'',
        afterfixedLine:'',
        afterfax:'',
        afterindustries: [
          {value: '', label: ''},
          {value: '', label: ''},
          {value: '', label: ''},
          {value: '', label: ''}],
        afterindustry: '',
        aftersupplyScopes: [
          {value: '', label: ''},
          {value: '', label: ''},
          {value: '', label: ''}],
        aftersupplyScope: '',
        aftercomRegAddrDetail:'',
        afterworkAddrDetail:'',
        afterlicense:'',
        afterbankName:'',
        afterbankAccount:'',
        afterbankInfo:'',
        afterregAreaValue:'',
        afterworkAreaValue:'',
        afterothers:[],
        afterlicenseUrlArr:[],
        afterotherUrlArr:[],
        //个人信息修改参数
        afterlinkMan:'',
        aftergender:'',
        afterduty:'',
        afterpersonalTel:'',
        aftertel:'',
        afteremail:'',
        afterqq:'',
        //弹框控制参数
        aftereditComInfo:false,
        aftereditPerInfoBtn:false,
      }
    },
    created(){
//      console.log(this.comInfo)
      this.$axios.get('/entanduser/getEntAndUser.ajax')
        .then((res) => {
          let myData = JSON.parse(res.data.data);
//          console.log(myData)
          if (myData.afwindEnterprise === null){
            this.aftercomInfo[0].content = myData.afwindEnterpriseAlter.enterpriseName;
            this.afterconpanyName = myData.afwindEnterpriseAlter.enterpriseName;
            this.aftercomInfo[1].content = myData.afwindEnterpriseAlter.creditCode;
            this.aftercreditCode = myData.afwindEnterpriseAlter.creditCode;
            this.aftercomInfo[2].content = myData.afwindEnterpriseAlter.owner;
            this.afterlegalPerson = myData.afwindEnterpriseAlter.owner;
            this.aftercomInfo[3].content = myData.afwindEnterpriseAlter.phone;
            this.afterfixedLine = myData.afwindEnterpriseAlter.phone;
            this.aftercomInfo[4].content = myData.afwindEnterpriseAlter.fax;
            this.afterfax = myData.afwindEnterpriseAlter.fax;
            this.aftercomInfo[5].content = myData.afwindEnterpriseAlter.config.valuei;
            this.afterindustry = myData.afwindEnterpriseAlter.config.valuei;
            for (let i = 0;i<myData.afwindEnterpriseAlter.addresseList.length;i++){
              if (myData.afwindEnterpriseAlter.addresseList[i].typei === '1'){
                this.aftercomInfo[6].content = myData.afwindEnterpriseAlter.addresseList[i].address;
                this.aftercomRegAddrDetail = myData.afwindEnterpriseAlter.addresseList[i].address;
              }else if(myData.afwindEnterpriseAlter.addresseList[i].typei === '2'){
                this.aftercomInfo[7].content = myData.afwindEnterpriseAlter.addresseList[i].address;
                this.afterworkAddrDetail = myData.afwindEnterpriseAlter.addresseList[i].address;
              }
            }
            for (let i =0;i<myData.afwindEnterpriseAlter.enterprisePicsList.length;i++){
              if (myData.afwindEnterpriseAlter.enterprisePicsList[i].typei === '1'){
                this.aftercomInfo[8].photo = myData.afwindEnterpriseAlter.enterprisePicsList[i].url;
                this.afterlicense = myData.afwindEnterpriseAlter.enterprisePicsList[i].url;
              }else if(myData.afwindEnterpriseAlter.enterprisePicsList[i].typei === '2'){
                this.aftercomInfo[9].picture.push(myData.afwindEnterpriseAlter.enterprisePicsList[i].url);
                this.afterothers.push(myData.afwindEnterpriseAlter.enterprisePicsList[i].url);
              }
            }
            this.aftercomInfo[10].content = myData.afwindEnterpriseAlter.categorie.name;
            this.aftersupplyScope = myData.afwindEnterpriseAlter.categorie.name;
            this.aftercomInfo[11].content = myData.afwindEnterpriseAlter.accountList[0].account;
            this.afterbankAccount =  myData.afwindEnterpriseAlter.accountList[0].account;
            this.aftercomInfo[12].content = myData.afwindEnterpriseAlter.accountList[0].bankName;
            this.afterbankName = myData.afwindEnterpriseAlter.accountList[0].bankName;
            this.aftercomInfo[13].content = myData.afwindEnterpriseAlter.accountList[0].bankRemark;
            this.afterbankInfo = myData.afwindEnterpriseAlter.accountList[0].bankRemark;
//          个人信息的获取
            this.afterperInfo[0].content = myData.realname;
            this.afterlinkMan = myData.realname;
            if (myData.sex === '1'){
              this.afterperInfo[1].content = '男';
              this.aftergender = '1';
            }else if(myData.sex === '2'){
              this.afterperInfo[1].content = '女';
              this.aftergender = '2';
            }
            this.afterperInfo[2].content = myData.userPost;
            this.afterduty = myData.userPost;
            this.afterperInfo[3].content = myData.mobile;
            this.afterpersonalTel = myData.mobile;
            this.afterperInfo[4].content = myData.telphone;
            this.aftertel = myData.telphone;
            this.afterperInfo[5].content = myData.email;
            this.afteremail = myData.email;
            this.afterperInfo[6].content = myData.qqCode;
            this.afterqq = myData.qqCode;
          }else if(myData.afwindEnterpriseAlter === null){
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
          }
        }).catch(() => {
        console.log("数据请求失败");
      });
      //    请求所属行业下拉列表数据
      this.$axios.get('/entanduser/gettypei.ajax')
        .then((res) => {
          let INDUSTRY = JSON.parse(res.data.data);
//          console.log(INDUSTRY)
          for (let i = 0;i<INDUSTRY.length;i++){
            this.industries[i].value = INDUSTRY[i].id;
            this.industries[i].label = INDUSTRY[i].valuei;
            this.afterindustries[i].value = INDUSTRY[i].id;
            this.afterindustries[i].label = INDUSTRY[i].valuei;
          }
//        console.log(INDUSTRY);
        }).catch(() => {
        console.log("请求行业数据失败")
      });
//    请求供货范围下拉列表数据
      this.$axios.get('/entanduser/getEntityIndustryList.ajax')
        .then((res) => {
          let INDUSTRY = JSON.parse(res.data.data);
          for (let i = 0;i<INDUSTRY.length;i++){
            this.supplyScopes[i].value = INDUSTRY[i].id;
            this.supplyScopes[i].label = INDUSTRY[i].name;
            this.aftersupplyScopes[i].value = INDUSTRY[i].id;
            this.aftersupplyScopes[i].label = INDUSTRY[i].name;
          }
//        console.log(INDUSTRY);
        }).catch(() => {
        console.log("请求失败")
      });
    },
    methods:{
//      切换nav
      handleClick(tab, event) {
//        console.log(tab, event);
      },
//      获取公司注册地址
      getRegAddr(regarea){
        this.regAreaValue = regarea;
//        console.log(regarea);
      },
//      获取公司工作地址
      getWorkAddr(workarea){
        this.workAreaValue = workarea;
//        console.log(workarea);
      },
//    获取公司营业执照
      getLicense(licenseUrlArr){
        this.licenseUrlArr = licenseUrlArr;
      },
//    获取附件
      getOthers(otherUrlArr){
        this.otherUrlArr = otherUrlArr;
      },
//      修改企业信息
      editcominfo(){
        this.editComInfo = false;
        let reqParams = {
          afwindEnterprise:{
            owner:this.legalPerson,//法人
            phone:this.fixedLine,//公司固定电话
            fax:this.fax,//传真
            typei:this.industry,//所属行业
            addresseList:[
              {
                regionId:this.regAreaValue,//公司注册地址省市区的区id
                address:this.comRegAddrDetail,//公司详细的注册地址
                typei:'1'
              },
              {
                regionId:this.workAreaValue,//公司办公地址省市区的区id
                address:this.workAddrDetail,//公司详细的办公地址
                typei:'2'
              }
            ],
            enterprisePicsList:[
              {
                urlList:this.licenseUrlArr.reverse().slice(0,1),//公司营业执照
                typei:'1'
              },
              {
                urlList:this.otherUrlArr.reverse().slice(0,5),//公司附件
                typei:'2'
              }
            ],
            entityIndustry:this.supplyScope,//供货范围
            accountList:[
              {
                bankName:this.bankName,//银行名称
                account:this.bankAccount,//银行账号
                bankNemark:this.bankInfo//银行信息
              }
            ],
          }
        }
        this.$axios.post('/entanduser/updateEnt.ajax',reqParams)
          .then((res) => {
            console.log(res)
//            this.$router.go(0);
          }).catch(() => {
            console.log("更改企业信息失败")
        })
      },
      //取消修改企业信息
      cancelEditcominfo(){
        this.editComInfo = false;
        this.$router.go(0);
      },
//      修改个人信息
      editperinfo(){
        this.editPerInfoBtn = false;
        let reqParams = {
          realname:this.linkMan,//联系人姓名
          sex:this.gender,//性别
          userPost:this.duty,//职务
          telphone:this.tel,//办公电话
          email:this.email,//右键
          qqCode:this.qq//qq号码
        }
        this.$axios.post('/entanduser/updateUser.ajax',reqParams)
          .then((res) => {
            console.log(res)
          }).catch(() => {
            console.log("修改个人信息失败")
        })
      },
//      取消修改个人信息
      cancelEditperinfo(){
        this.editPerInfoBtn = false;
        this.$router.go(0);
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },






































      //      获取公司注册地址
      aftergetRegAddr(regarea){
        this.regAreaValue = regarea;
//        console.log(regarea);
      },
//      获取公司工作地址
      aftergetWorkAddr(workarea){
        this.workAreaValue = workarea;
//        console.log(workarea);
      },
//    获取公司营业执照
      aftergetLicense(licenseUrlArr){
        this.licenseUrlArr = licenseUrlArr;
      },
//    获取附件
      aftergetOthers(otherUrlArr){
        this.otherUrlArr = otherUrlArr;
      },
//      修改企业信息
      aftereditcominfo(){
        this.editComInfo = false;
        let reqParams = {
          afwindEnterprise:{
            owner:this.legalPerson,//法人
            phone:this.fixedLine,//公司固定电话
            fax:this.fax,//传真
            typei:this.industry,//所属行业
            addresseList:[
              {
                regionId:this.regAreaValue,//公司注册地址省市区的区id
                address:this.comRegAddrDetail,//公司详细的注册地址
                typei:'1'
              },
              {
                regionId:this.workAreaValue,//公司办公地址省市区的区id
                address:this.workAddrDetail,//公司详细的办公地址
                typei:'2'
              }
            ],
            enterprisePicsList:[
              {
                urlList:this.licenseUrlArr.reverse().slice(0,1),//公司营业执照
                typei:'1'
              },
              {
                urlList:this.otherUrlArr.reverse().slice(0,5),//公司附件
                typei:'2'
              }
            ],
            entityIndustry:this.supplyScope,//供货范围
            accountList:[
              {
                bankName:this.bankName,//银行名称
                account:this.bankAccount,//银行账号
                bankNemark:this.bankInfo//银行信息
              }
            ],
          }
        }
        this.$axios.post('/entanduser/updateEnt.ajax',reqParams)
          .then((res) => {
            console.log(res)
//            this.$router.go(0);
          }).catch(() => {
          console.log("更改企业信息失败")
        })
      },
      //取消修改企业信息
      aftercancelEditcominfo(){
        this.editComInfo = false;
        this.$router.go(0);
      },
//      修改个人信息
      aftereditperinfo(){
        this.editPerInfoBtn = false;
        let reqParams = {
          realname:this.linkMan,//联系人姓名
          sex:this.gender,//性别
          userPost:this.duty,//职务
          telphone:this.tel,//办公电话
          email:this.email,//右键
          qqCode:this.qq//qq号码
        }
        this.$axios.post('/entanduser/updateUser.ajax',reqParams)
          .then((res) => {
            console.log(res)
          }).catch(() => {
          console.log("修改个人信息失败")
        })
      },
//      取消修改个人信息
      aftercancelEditperinfo(){
        this.editPerInfoBtn = false;
        this.$router.go(0);
      },
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

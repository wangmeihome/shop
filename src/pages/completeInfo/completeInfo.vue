<template>
    <div class="completeInfo_wrapper">
      <div class="companyInfo">
        <h1>①请您完善企业信息</h1>
        <div class="companyInfo_item">
          <p>企业名称：</p>
          <el-input value="凯金卓越科技发展有限公司" :disabled="true"></el-input>
        </div>
        <div class="companyInfo_item">
          <p>社会统一信用代码：</p>
          <el-input value="18位社会统一信用代码" :disabled="true"></el-input>
        </div>
        <div class="companyInfo_item">
          <p>法人：</p>
          <el-input placeholder="请输入法人姓名" v-model="legalPerson"></el-input>
        </div>
        <div class="companyInfo_item">
          <p>公司固定电话：</p>
          <el-input placeholder="请输入公司固定电话" v-model="fixedLine"></el-input>
        </div>
        <div class="companyInfo_item">
          <p>公司传真：</p>
          <el-input placeholder="请输入公司传真" v-model="fax"></el-input>
        </div>
        <div class="companyInfo_item">
          <p>所属行业：</p>
          <el-select v-model="industry" placeholder="请选择行业">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="companyInfo_item">
          <p>公司注册地址：</p>


          <!-- 将此段代码写成一个组件 -->
          <el-select @change="chooseRegPro(regProValue)" v-model="regProValue" placeholder="省">
            <el-option v-for="item in regProvinceOptions" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
          </el-select>
          <el-select @change="chooseRegCity(regCityValue)" v-model="regCityValue" placeholder="市">
            <el-option v-for="item in regCityOptions" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
          </el-select>
          <el-select @change="chooseRegArea(regAreaValue)" v-model="regAreaValue" placeholder="区">
            <el-option v-for="item in regAreaOptions" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
          </el-select>
          <!-- 结束 -->



          <el-input class="regRoad" placeholder="请输入街道地址" v-model="comRegAddrDetail"></el-input>
        </div>
        <div class="companyInfo_item">
          <p>办公地址：</p>



          <el-select @change="chooseWorkPro(workProValue)" v-model="workProValue" placeholder="省">
            <el-option v-for="item in workProvinceOptions" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
          </el-select>
          <el-select @change="chooseWorkCity(workCityValue)" v-model="workCityValue" placeholder="市">
            <el-option v-for="item in workCityOptions" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
          </el-select>
          <el-select @change="chooseWorkArea(workAreaValue)" v-model="workAreaValue" placeholder="区">
            <el-option v-for="item in workAreaOptions" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
          </el-select>



          <el-input class="workRoad" placeholder="请输入街道地址" v-model="workAddrDetail"></el-input>
        </div>
        <div class="companyInfo_item">
          <p>公司营业执照：</p>
          <el-upload class="upload-demo" list-type="picture" ref="licenseUpload" action="/test/upload.ajax" :on-success="licenseSuccess" :on-change="licenseOnChange" :on-preview="licenseHandlePreview" :on-remove="licenseHandleRemove" :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="licenseSubmitUpload" :disabled="licenseBtn">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
          </el-upload>
        </div>
        <div class="companyInfo_item">
          <p>供货范围：</p>
          <el-select v-model="supplyScope" placeholder="请选择供货范围">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="companyInfo_item">
          <p>开户行名称：</p>
          <el-input placeholder="请输入开户行名称" v-model="bankName"></el-input>
        </div>
        <div class="companyInfo_item">
          <p>开户行账号：</p>
          <el-input placeholder="请输入开户行账号" v-model="bankAccount"></el-input>
        </div>
        <div class="companyInfo_item">
          <p>开户行信息：</p>
          <el-input placeholder="请输入开户行信息" v-model="bankInfo"></el-input>
        </div>
        <div class="personalInfo_item">
          <p>其他附件：</p>
          <el-upload multiple class="upload-demo" list-type="picture" ref="otherUpload" action="/test/upload.ajax" :on-success="otherSuccess" :on-change="otherOnChange" :on-preview="otherHandlePreview" :on-remove="otherHandleRemove" :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="otherSubmitUpload" :disabled="otherBtn">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
          </el-upload>
        </div>
      </div>
      <div class="personalInfo">
        <h1>②请您完善个人信息</h1>
        <div class="personalInfo_item">
          <p>联系人姓名：</p>
          <el-input placeholder="请输入联系人姓名" v-model="linkMan"></el-input>
        </div>
        <div class="personalInfo_item" style="line-height: 42px">
          <p>性别：</p>
          <!--<el-input placeholder="请输入性别" v-model="gender"></el-input>-->
          <el-radio v-model="gender" label="1">男</el-radio>
          <el-radio v-model="gender" label="2">女</el-radio>
        </div>
        <div class="personalInfo_item">
          <p>职务：</p>
          <el-input placeholder="请输入职务" v-model="duty"></el-input>
        </div>
        <div class="personalInfo_item">
          <p>手机号：</p>
          <el-input value="18888888888" :disabled="true"></el-input>
        </div>
        <div class="personalInfo_item">
          <p>办公电话：</p>
          <el-input placeholder="请输入办公电话" v-model="tel"></el-input>
        </div>
        <div class="personalInfo_item">
          <p>邮箱：</p>
          <el-input placeholder="请输入邮箱" v-model="email"></el-input>
        </div>
        <div class="personalInfo_item">
          <p>QQ号码：</p>
          <el-input placeholder="请输入QQ号码" v-model="qq"></el-input>
        </div>
        <!--<div class="personalInfo_item">-->
          <!--<p>微信：</p>-->
          <!--<el-input placeholder="请输入微信号码" v-model="wc"></el-input>-->
        <!--</div>-->
      </div>
      <div class="control">
        <div><a href="#" @click="submitInfo">提交</a></div>
        <div><a href="#">取消</a></div>
      </div>
      <!-- 营业执照文字提示框 -->
      <el-dialog title="对不起" :visible.sync="licenseDialogVisible" width="30%" :before-close="licenseHandleClose">
        <span>您所上传的图片大小超出2MB，请您更换图片。</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="licenseDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="licenseDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 其他附件文字提示框 -->
      <el-dialog title="对不起" :visible.sync="otherDialogVisible" width="30%" :before-close="otherHandleClose">
        <span>您所上传的图片中有大小超出2MB的图片，请您更换图片。</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="otherDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="otherDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
export default {
  data(){
    return {
      legalPerson:'',
      fixedLine:'',
      fax:'',
      comRegAddrDetail:'',
      workAddrDetail:'',
      bankName:'',
      bankAccount:'',
      bankInfo:'',
      linkMan:'',
      gender:'1',
      duty:'',
      tel:'',
      email:'',
      qq:'',
      wc:'',
      options: [
          {value: '1', label: '1'},
          {value: '2', label: '2'},
          {value: '3', label: '3'},
        ],
//      所属行业
      industry: '',
//      供货范围
      supplyScope:'',
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
//      注册地址所需信息
      regProValue:'',
      regCityValue:'',
      regAreaValue:'',
      regProvinceOptions:{},
      regCityOptions:{},
      regAreaOptions:{},
//      办公地址所需信息
      workProValue:'',
      workCityValue:'',
      workAreaValue:'',
      workProvinceOptions:{},
      workCityOptions:{},
      workAreaOptions:{},
    }
  },
  created(){
    this.$axios.get('/region/region.ajax?provinceId=0&typei=PROVINCE')
      .then((res) => {
        this.regProvinceOptions = JSON.parse(res.data.data);
      }).catch(() => {
      console.log("请求失败");
    });
    this.$axios.get('/region/region.ajax?provinceId=0&typei=PROVINCE')
      .then((res) => {
        this.workProvinceOptions = JSON.parse(res.data.data);
      }).catch(() => {
      console.log("请求失败");
    });
  },
  methods:{



//    公司注册地址   需要独立出来一个组件
    chooseRegPro(){
      this.$axios.get('/region/region.ajax?typei=CITY&provinceId='+this.regProValue)
        .then((res) => {
//          console.log(res);
          this.regCityOptions = JSON.parse(res.data.data);
        }).catch(() => {
        console.log("请求失败");
      })
    },
    chooseRegCity(){
      this.$axios.get('/region/region.ajax?typei=AREA&provinceId='+this.regCityValue)
        .then((res) => {
//          console.log(res);
          this.regAreaOptions = JSON.parse(res.data.data);
        }).catch(() => {
        console.log("请求失败");
      })
    },
    chooseRegArea(){
//      console.log(this.regAreaValue);
    },
//    结束
//    公司办公地址
    chooseWorkPro(){
      this.$axios.get('/region/region.ajax?typei=CITY&provinceId='+this.workProValue)
        .then((res) => {
//          console.log(res);
          this.workCityOptions = JSON.parse(res.data.data);
        }).catch(() => {
        console.log("请求失败");
      })
    },
    chooseWorkCity(){
      this.$axios.get('/region/region.ajax?typei=AREA&provinceId='+this.workCityValue)
        .then((res) => {
//          console.log(res);
          this.workAreaOptions = JSON.parse(res.data.data);
        }).catch(() => {
        console.log("请求失败");
      })
    },
    chooseWorkArea(){
//      console.log(this.workAreaValue);
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
//      console.log(this.licenseUrlArr);
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
//      console.log(this.licenseUrlArr);
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
//    提交完善信息按钮
    submitInfo(){
//      法人
      console.log(this.legalPerson);
//      公司固定电话
      console.log(this.fixedLine);
//      公司传真
      console.log(this.fax);
//      所属行业
      console.log(this.industry);
//      公司注册地址
      console.log(this.regAreaValue);
      console.log(this.comRegAddrDetail);
//      公司办公地址
      console.log(this.workAreaValue);
      console.log(this.workAddrDetail);
//      公司营业执照
      console.log(this.licenseUrlArr.pop(this.licenseUrlArr.length - 1));
//      供货范围
      console.log(this.supplyScope);
//      开户行名称
      console.log(this.bankName);
//      开户行账号
      console.log(this.bankAccount);
//      开户行信息
      console.log(this.bankInfo);
//      其他附件
      console.log(this.otherUrlArr.reverse().slice(0,5));
//      联系人姓名
      console.log(this.linkMan);
//      性别
      console.log(this.gender);
//      职务
      console.log(this.duty);
//      办公电话
      console.log(this.tel);
//      邮箱
      console.log(this.email);
//      qq号码
      console.log(this.qq);
      let reqParams = {
        afwindEnterprise:{
          owner:this.legalPerson,
          phone:this.fixedLine,
          fax:this.fax,
          typei:this.industry,
          addresseList:[
            {
              regionId:this.regAreaValue,
              address:this.comRegAddrDetail,
              typei:'REGISTERADD'
            },
            {
              regionId:this.workAreaValue,
              address:this.workAddrDetail,
              typei:'WORKADD'
            }
          ],
          enterprisePicsList:[
            {
              url:this.licenseUrlArr.pop(this.licenseUrlArr.length - 1),
              typei:1
            }
          ],
          entityIndustry:this.supplyScope,
          accountList:[
            {
              bank_name:this.bankName,
              account:this.bankAccount,
              bank_remark:this.bankInfo
            }
          ],
          enterprisePicsList:[
            {
              url:this.otherUrlArr.reverse().slice(0,5),
              typei:1
            }
          ],
          realname:this.linkMan,
          sex:this.gender,
          user_post:this.duty,
          telphone:this.tel,
          email:this.email,
          qq_code:this.qq
        }
      }
      this.$axios.post('/entanduser/updateEntAndUser.html',reqParams)
        .then((res) => {
          console.log(res)
        }).catch(() => {

      })
    }
  }
}
</script>

<style>
  .completeInfo_wrapper{
    padding-bottom: 30px;
    background: #ededed;
  }
  .companyInfo,.personalInfo{
    margin: 0 auto;
    padding-top: 30px;
    width: 1300px;
  }
  .companyInfo h1,.personalInfo h1{
    text-align: center;
    font-size: 18px;
    font-weight: bolder;
  }
  .companyInfo_item,.personalInfo_item{
    overflow: hidden;
    padding: 1px 0;
    margin-left: 110px;
  }
  .companyInfo_item p,.personalInfo_item p{
    float: left;
    width: 150px;
    height: 40px;
    line-height: 40px;
    text-align: right;
  }
  .companyInfo_item .el-input,.personalInfo_item .el-input{
    float: left;
    width: 300px;
  }
  .companyInfo_item .el-input .el-input__inner,.personalInfo_item .el-input .el-input__inner{
    text-align: center;
  }
  .regRoad input,.workRoad input{
    margin-left: 150px;
    width: 604px;
  }
  .el-upload__tip{
    height: 15px;
  }
  .el-upload-list__item{
    margin-left: 150px;
    width: 500px;
  }
  .control{
    margin: 0 auto;
    overflow: hidden;
    margin-top: 30px;
    width: 250px;
    height: 40px;
  }
  .control div a{
    float: left;
    display: inline-block;
    margin: 0 10px;
    border-radius: 10px;
    color: white;
    text-align: center;
    line-height: 40px;
    width: 100px;
    height: 40px;
    background: dodgerblue;
  }
</style>




























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
          <v-distpicker @selected="comRegAddr"></v-distpicker>
          <el-input class="regRoad" placeholder="请输入街道地址" v-model="comRegAddrDetail"></el-input>
        </div>
        <div class="companyInfo_item">
          <p>办公地址：</p>
          <v-distpicker @selected="workAddr"></v-distpicker>
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
          <el-select v-model="industry" placeholder="请选择供货范围">
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
      </div>
      <div class="personalInfo">
        <h1>②请您完善个人信息</h1>
        <div class="personalInfo_item">
          <p>联系人姓名：</p>
          <el-input placeholder="请输入联系人姓名" v-model="linkMan"></el-input>
        </div>
        <div class="personalInfo_item">
          <p>性别：</p>
          <el-input placeholder="请输入性别" v-model="gender"></el-input>
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
        <div class="personalInfo_item">
          <p>微信：</p>
          <el-input placeholder="请输入微信号码" v-model="wc"></el-input>
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
  import VDistpicker from 'v-distpicker'
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
      gender:'',
      duty:'',
      tel:'',
      email:'',
      qq:'',
      wc:'',
      options: [
          {value: '选项1', label: '黄金糕'},
          {value: '选项2', label: '双皮奶'},
          {value: '选项3', label: '蚵仔煎'},
          {value: '选项4', label: '龙须面'},
          {value: '选项5', label: '北京烤鸭'}
        ],
//      所属行业
      industry: '',
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
    }
  },
  methods:{
//    公司注册地址
    comRegAddr(data){
      console.log(data)
    },
//    公司办公地址
    workAddr(data){
      console.log(data)
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
      console.log(file, fileList);
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
      console.log(this.licenseUrlArr);
    },
//    移除列表文件时的钩子函数
    otherHandleRemove(file, fileList) {
      console.log(file, fileList);
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
      console.log(this.licenseUrlArr.pop(this.licenseUrlArr.length - 1));
      console.log(this.otherUrlArr.reverse().slice(0,5));
    }
  },
  components:{
    VDistpicker
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
  .address{
    float: left;
    margin-top: -1px;
    width: 650px;
  }
  .regRoad input,.workRoad input{
    margin-left: -7px;
    margin-top: -1px;
  }
  .address select:first-child{
    width: 300px;
  }
  .address select:nth-child(2){
    margin-left: -6px;
    width: 230px;
  }
  .address select:nth-child(3){
    margin-left: -5px;
    width: 115px;
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




























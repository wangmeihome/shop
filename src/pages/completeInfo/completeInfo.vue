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
          <el-select v-model="value" placeholder="请选择行业">
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
          <el-upload class="upload-demo" list-type="picture" ref="licenseUpload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="licenseHandlePreview" :on-remove="licenseHandleRemove" :file-list="fileList" :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="licenseSubmitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
        <div class="companyInfo_item">
          <p>供货范围：</p>
          <el-select v-model="value" placeholder="请选择供货范围">
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
          <el-upload multiple class="upload-demo" list-type="picture" ref="otherUpload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="otherHandlePreview" :on-remove="otherHandleRemove" :file-list="fileList" :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="otherSubmitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
      </div>
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
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      fileList: [
          {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          },
          {
            name: 'food2.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }
        ]
    }
  },
  methods:{
    comRegAddr(data){
      console.log(data)
    },
    workAddr(data){
      console.log(data)
    },
//    上传公司营业执照
    licenseSubmitUpload() {
      this.$refs.licenseUpload.submit();
    },
    licenseHandleRemove(file, fileList) {
      console.log(file, fileList);
    },
    licenseHandlePreview(file) {
      console.log(file);
    },
//    上传其他附件
    otherSubmitUpload() {
      this.$refs.licenseUpload.submit();
    },
    otherHandleRemove(file, fileList) {
      console.log(file, fileList);
    },
    otherHandlePreview(file) {
      console.log(file);
    }
  },
  components:{
    VDistpicker
  }
}
</script>

<style>
  .completeInfo_wrapper{
    background: #ededed;
    padding-bottom: 30px;
  }
  .companyInfo,.personalInfo{
    width: 1300px;
    margin: 0 auto;
    padding-top: 30px;
  }
  .companyInfo h1,.personalInfo h1{
    text-align: center;
    font-size: 18px;
    font-weight: bolder;
  }
  .companyInfo_item,.personalInfo_item{
    overflow: hidden;
    padding: 1px 0;
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
    width: 650px;
     margin-top: -1px;
  }
  .regRoad input,.workRoad input{
    margin-left: -7px;
    margin-top: -1px;
  }
  .address select:first-child{
    width: 300px;
  }
  .address select:nth-child(2){
    width: 230px;
    margin-left: -6px;
  }
  .address select:nth-child(3){
    width: 115px;
    margin-left: -5px
  }
  .el-upload-list__item{
    width: 500px;
    margin-left: 150px;
  }
</style>




























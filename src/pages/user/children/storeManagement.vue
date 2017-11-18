<template>
    <div class="store_wrapper">
      <div class="myStore">
        <h1>店铺管理</h1>
      </div>
      <div class="store_nav">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="店铺详情" name="storeDetails">店铺详情</el-tab-pane>
          <el-tab-pane label="店铺设置" name="storeSet">
            <div class="setStore_wrapper">
              <div class="store_wrapper_item">
                <p>店铺名称：</p>
                <el-input v-model="storeName" placeholder="请输入店铺名称"></el-input>
              </div>
              <div class="store_wrapper_item">
                <p class="banner">店铺banner：</p>
                <el-upload multiple class="upload-demo" list-type="picture" ref="bannerUpload" action="" :on-success="bannerSuccess" :on-change="bannerOnChange" :on-preview="bannerHandlePreview" :on-remove="bannerHandleRemove" :auto-upload="false">
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  <el-button style="margin-left: 10px;" size="small" type="success" @click="bannerSubmitUpload" :disabled="bannerBtn">上传到服务器</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
                </el-upload>
              </div>
              <div class="store_wrapper_item">
                <p class="logo">店铺logo：</p>
                <el-upload class="upload-demo" list-type="picture" ref="logoUpload" action="" :on-success="logoSuccess" :on-change="logoOnChange" :on-preview="logoHandlePreview" :on-remove="logoHandleRemove" :auto-upload="false">
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  <el-button style="margin-left: 10px;" size="small" type="success" @click="logoSubmitUpload" :disabled="logoBtn">上传到服务器</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
                </el-upload>
              </div>
              <div class="store_wrapper_item">
                <p class="storeInfo">店铺简介：</p>
                <el-input resize="none" type="textarea" :rows="3" placeholder="请输入店铺简介" v-model="aboutStore"></el-input>
              </div>
              <div>
                <p style="float: left;width: 110px;text-align: right">店铺详情：</p>
                <div style="float: left;width: 800px">
                  <quill-editor @blur="onEditorBlur($event)" v-model="content"></quill-editor>
                </div>
              </div>

              <div style="text-align: center;margin-top: 120px">
                <div>
                  <el-button @click="submitStoreInfo" type="primary">提交</el-button>
                  <el-button type="primary">取消</el-button>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'storeDetails',
        storeName:'',
//    公司营业执照的路径
        logoUrlArr:[],
//    判断上传营业执照图片大小的文字提示框
        logoDialogVisible: false,
//    判断上传营业执照大小的按钮
        logoBtn: true,
//    其他附件的路径
        bannerUrlArr:[],
//    判断上传其他附件图片大小的文字提示框
        bannerDialogVisible: false,
//    判断上传其他附件大小的按钮
        bannerBtn: true,
        aboutStore:'',
        content:''
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
//    当选取的文件大小超过2M的时候的钩子函数
      bannerOnChange(file, fileList) {
        if(file.size >= 2097152) {
          this.bannerDialogVisible = true;
          this.bannerBtn = true;
          fileList.pop();
          if(fileList.length === 0){
            this.bannerBtn = true;
          }else{
            this.bannerBtn = false;
          }
        } else {
          this.bannerBtn = false;
        }
      },
//    上传banner
      bannerSubmitUpload() {
        this.$refs.bannerUpload.submit();
      },
      bannerSuccess(response, file, fileList) {
        this.otherUrlArr.push(response.data);
        console.log(this.otherUrlArr);
      },
//    移除列表文件时的钩子函数
      bannerHandleRemove(file, fileList) {
//      console.log(file, fileList);
        this.bannerBtn = true;
      },
//    点击已上传文件的钩子函数
      bannerHandlePreview(file) {

      },
//    点击banner大于2M的文字提示框的关闭按钮的钩子函数
      logoHandleClose() {
        this.licenseDialogVisible = false;
      },
//    点击logo大于2M的文字提示框的关闭按钮的钩子函数
      bannerHandleClose() {
        this.bannerDialogVisible = false;
      },
//    当选取的文件大小超过2M的时候的钩子函数
      logoOnChange(file, fileList) {
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
//    上传logo
      logoSubmitUpload() {
        this.$refs.logoUpload.submit();
      },
//    上传营业执照成功后的钩子函数
      logoSuccess(response, file, fileList) {
        this.logoUrlArr.push(response.data);
        console.log(this.logoUrlArr);
      },
//    移除列表文件时的钩子函数
      logoHandleRemove(file, fileList) {
//      console.log(file, fileList);
        this.logoBtn = true;
      },
//    点击已上传文件的钩子函数
      logoHandlePreview(file) {
//      目前无逻辑
      },
//      填写完店铺详情后失去焦点的钩子函数
      onEditorBlur(editor) {
        console.log(this.content);
      },
      submitStoreInfo(){
        alert("提交店铺信息");
      }
    }
  };
</script>

<style>
  .store_wrapper{
    overflow: hidden;
    padding-bottom: 30px;
    width: 954px;
    background: white;
    border: 1px solid #dcdcdc;
    border-radius:8px;
  }
  .myStore{
    padding-left:80px;
    width: 874px;
    height: 60px;
    border-bottom: 1px solid #d4d4d4;
    border-radius:8px 8px 0 0;
    line-height:60px;
    background:linear-gradient(#fbfbfb, #ececec);
    font-family: "Microsoft YaHei UI";
  }
  .store_wrapper_item{
    overflow: hidden;
    padding: 5px 0;
  }
  .store_wrapper_item .el-upload__tip{
    height: 15px;
    margin-left: 102px;
  }
  .store_wrapper_item p{
    float: left;
    width: 110px;
    height: 40px;
    line-height: 40px;
    text-align: right;
  }
  .store_wrapper_item .banner,
  .store_wrapper_item .logo{
    height: 32px;
    line-height: 32px;
  }
  .store_wrapper_item .storeInfo,
  .store_wrapper_item .storeDetails{
    vertical-align: top;
    line-height: normal;
  }
  .store_wrapper_item .el-input{
    float: left;
    width: 300px;
  }
  .store_wrapper_item .el-textarea{
    float: left;
    width: 666px;
  }
</style>
























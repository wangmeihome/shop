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
              <storePic :theAction="storeAction" @getOnePic="getBannerUrl"></storePic>
            </div>
            <div class="store_wrapper_item">
              <p class="logo">店铺logo：</p>
              <storePic :theAction="storeAction" @getOnePic="getLogoUrl"></storePic>
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
  import storePic from '../../../components/upload/uploadOnePic.vue'
  export default {
    components:{
      storePic
    },
    data() {
      return {
        storeAction:'/store/upload.ajax',
        activeName: 'storeSet',
        storeName:'',
        aboutStore:'',
        content:'',
        bannerUrlArr:[],
        logoUrlArr:[]
      };
    },
    methods: {
      handleClick(tab, event) {
//        console.log(tab, event);
      },
//      填写完店铺详情后失去焦点的钩子函数
      onEditorBlur(editor) {
        console.log(this.content);
      },
      getBannerUrl(theUrl){
        this.bannerUrlArr = theUrl;
      },
      getLogoUrl(theUrl){
        this.logoUrlArr = theUrl;
      },
      submitStoreInfo(){
        let reqParams = {
          storeName:this.storeName,
          title:this.content,
          storeList:[
            {
              urlList:this.bannerUrlArr.reverse().slice(0,1),
              typei:'1'
            },
            {
              urlList:this.logoUrlArr.reverse().slice(0,1),
              typei:'2'
            }
          ],
          instruct:this.aboutStore
        }
        this.$axios.post('/store/insertstore',reqParams)
          .then((res) => {
            console.log(res);
            console.log('店铺信息提交成功');
          }).catch(() => {
            console.log("店铺信息提交失败");
        })
//        console.log(this.storeName);
//        console.log(this.bannerUrl);
//        console.log(this.logoUrl);
//        console.log(this.aboutStore);
//        console.log(this.content);
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
    margin-left: 110px;
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
  .store_wrapper_item .el-upload-list--picture{
    width:300px;
    margin-left:110px;
  }
</style>
























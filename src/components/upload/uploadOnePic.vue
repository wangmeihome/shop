<template>
  <div>
    <el-upload class="upload-demo" list-type="picture" ref="licenseUpload" action="/entanduser/upload.ajax" :on-success="licenseSuccess" :on-change="licenseOnChange" :on-preview="licenseHandlePreview" :on-remove="licenseHandleRemove" :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="licenseSubmitUpload" :disabled="licenseBtn">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
    </el-upload>
    <el-dialog title="对不起" :visible.sync="licenseDialogVisible" width="30%" :before-close="licenseHandleClose">
      <span>您所上传的图片大小超出2MB，请您更换图片。</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="licenseDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="licenseDialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    data(){
      return {
//    上传图片的路径
        licenseUrlArr:[],
//    判断上传图片大小的文字提示框
        licenseDialogVisible: false,
//    判断上传图片大小的按钮
        licenseBtn: true,
      }
    },
    methods:{
//    当选取的文件大小超过2M的时候的钩子函数
      licenseOnChange(file, fileList) {
//        此次控制台打印的为后缀名
//        console.log(file.name.substring(file.name.length - 3));
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
//    上传图片
      licenseSubmitUpload() {
        this.$refs.licenseUpload.submit();
      },
//    上传图片成功后的钩子函数
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
//    点击图片大于2M的文字提示框的关闭按钮的钩子函数
      licenseHandleClose() {
        this.licenseDialogVisible = false;
      }
    }
  }
</script>

<style>

</style>

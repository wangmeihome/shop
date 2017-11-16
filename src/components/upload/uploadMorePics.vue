<template>
    <div>
      <el-upload multiple :limit="5" class="upload-demo" list-type="picture" ref="otherUpload" action="/entanduser/upload.ajax" :on-success="otherSuccess" :on-change="otherOnChange" :on-preview="otherHandlePreview" :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="otherSubmitUpload" :disabled="otherBtn">点我上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传5张jpg/png文件，且不超过2MB</div>
      </el-upload>
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
//    上传图片的路径
      otherUrlArr:[],
//    判断上传图片大小的文字提示框
      otherDialogVisible: false,
//    判断上传图片大小的按钮
      otherBtn: true,
    }
  },
  methods:{
    //    当选取的文件大小超过2M的时候的钩子函数
    otherOnChange(file, fileList) {

//      console.log(file);
      console.log(fileList);


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
//    上传图片
    otherSubmitUpload() {
      this.$refs.otherUpload.submit();
    },
    otherSuccess(response, file, fileList) {
      this.otherUrlArr.push(response.data);
      this.$emit("getMorePics",this.otherUrlArr);
      console.log(this.otherUrlArr);
    },
//    移除列表文件时的钩子函数
//    otherHandleRemove(file, fileList) {
////      console.log(file, fileList);
//      this.otherBtn = true;
////      console.log(fileList)
//    },
//    点击已上传文件的钩子函数
    otherHandlePreview(file) {

    },
//    点击图片大于2M的文字提示框的关闭按钮的钩子函数
    otherHandleClose() {
      this.otherDialogVisible = false;
    },
  }
}
</script>

<style>

</style>

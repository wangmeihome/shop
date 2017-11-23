<template>
    <div class="brand_wrapper">
      <div class="myBrand">
        <h1>品牌管理</h1>
      </div>
      <div class="brand_nav">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="品牌列表" name="brandList">
            <div class="setBrand_wrapper">
              <div class="setBrand_wrapper_item">
                <el-input placeholder="请输入品牌名称" v-model="brandSearch" class="input-with-select">
                  <el-select @change="editStatus" v-model="selectStatus" slot="prepend" placeholder="审核状态">
                    <el-option label="重置" value="3"></el-option>
                    <el-option label="审核未通过" value="0"></el-option>
                    <el-option label="已审核" value="1"></el-option>
                    <el-option label="审核中" value="2"></el-option>
                  </el-select>
                  <el-button @click="searchBrandName" slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
            </div>
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="id" label="序号" width="55"></el-table-column>
              <el-table-column prop="brandName" label="品牌名称" width="120"></el-table-column>
              <!--<el-table-column label="品牌LOGO" width="120">-->
                <!--<template slot-scope="scope">-->
                  <!--<img :src="scope.row.logo" style="width: 120px;height: 50px">-->
                <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column label="审核状态" width="200">
                <template slot-scope="scope">
                  <p>
                    <span v-if="scope.row.status === 0">审核未通过</span>
                    <span v-if="scope.row.status === 1">已审核</span>
                    <span v-if="scope.row.status === 2">审核中</span>
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <div v-if="scope.row.status === 1">
                    <el-button @click="examine(scope.$index, scope.row)" type="primary" size="mini">查看</el-button>
                  </div>
                  <div v-if="scope.row.status === 2">
                    <el-button @click="cancel(scope.$index, scope.row)" type="danger" size="mini">取消</el-button>
                  </div>
                  <div v-if="scope.row.status === 0">
                    <el-button @click="reapply(scope.$index, scope.row)" type="warning" size="mini">重新申请</el-button>
                    <el-button @click="cancelApply(scope.$index, scope.row)" type="danger" size="mini">取消</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="delAllBtn">
              <el-button v-show="showCheckBox" @click="deleteAll" type="danger">全部取消</el-button>
            </div>

            <div class="pagination">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="parseInt(pageSize)" layout="total, prev, pager, next, jumper" :total="parseInt(total)"></el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="新增品牌" name="newBrand">
            <div class="newBrand">
              <div class="newBrand_item">
                <p>品牌名称：</p>
                <el-input v-model="brandName" placeholder="请输入内容"></el-input>
              </div>
              <div class="newBrand_item">
                <p>品牌LOGO：</p>
                <brandLogo :theAction="brandAction" @getOnePic="getLogo"></brandLogo>
              </div>
              <div class="newBrand_item">
                <p>品牌简介：</p>
                <el-input resize="none" type="textarea" :rows="3" placeholder="请输入品牌简介" v-model="aboutBrand"></el-input>
              </div>
              <div class="newBrand_btn">
                <el-button @click="submitBrand" type="primary">提交</el-button>
                <el-button type="primary">重置</el-button>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>

<script>
  import brandLogo from '../../../components/upload/uploadOnePic.vue'
export default {
    components:{
      brandLogo
    },
  data(){
    return {
      brandAction:'/store/upload.ajax',
      activeName: 'brandList',
      tableData: [],
      multipleSelection: [],
      brandName:'',
      logoUrl:'',
      aboutBrand:'',
      brandSearch:'',
      selectStatus:'',
      currentPage:1,//当前页
      pageSize:'',//每页条数
      total:'',//共有多少条数据
      brandID:[],
      showCheckBox:false
    }
  },
  created(){
    this.filter('','','');
  },
  methods:{
//    全删除
    deleteAll(){
      this.$axios.get('/brandrequest/deleteByExample?ids=' + this.brandID)
        .then((res) => {
          this.$router.go(0);
        }).catch(() => {
        console.log("取消审核操作失败");
      })
    },
//    nav导航切换
    handleClick(tab, event) {
//      console.log(tab.name);
//      console.log(event);
    },
//    品牌列表CheckBox选取
    handleSelectionChange(val) {
//      console.log(this.multipleSelection);
      val.forEach((currentValue) => {
//        console.log(currentValue.status)
        if (currentValue.status !== 1){
//          console.log(currentValue.status)
//          this.multipleSelection = val;
//          this.brandID.push(currentValue.id);
        }
      })

    },
//    查看操作
    examine(index, row){
      this.searchBrandDet(row.id);
    },
//    取消审核操作
    cancel(index,row){
      this.cancelBrand(row.id);
    },
//    重新审核操作
    reapply(index,row){
      this.reAudit(row.id);
    },
//    取消重新申请
    cancelApply(index,row){
      this.cancelBrand(row.id);
    },
//    获取logo的url地址
    getLogo(picUrl){
      this.logoUrl = picUrl;
//      console.log(picUrl)
    },
//    提交品牌信息
    submitBrand(){
      let reqParams = {
        brandName:this.brandName,
        logo:this.logoUrl,
        information:this.aboutBrand,
        eng_name:'',
        first_eng:'',
        remark:''
      }
      this.$axios.post('/brand/savebrand.ajax',reqParams)
        .then((res) => {
          console.log(res)
          this.$router.go(0)
        }).catch(() => {
          console.log("品牌数据添加失败")
      })
    },
//    根据品牌名称进行筛选
    searchBrandName(){
      if (this.brandSearch === ''){
        this.filter('','','');
      }else{
        this.filter('','',this.brandSearch);
      }

    },
//    切换审核状态
    editStatus(){
      if (this.selectStatus === '3'){
        this.showCheckBox = false;
        this.filter('','','');
      }else if(this.selectStatus === '1'){
        this.showCheckBox = false;
        this.filter('',this.selectStatus,'');
      }else{
        this.showCheckBox = true;
        this.filter('',this.selectStatus,'');
      }
    },
//    点击前往某页
    handleSizeChange(val) {
      this.filter(val,this.selectStatus,'');
//      console.log(`每页 ${val} 条`);
    },
//    直接前往某页
    handleCurrentChange(val) {
      this.filter(val,this.selectStatus,'');
//      console.log(`当前页: ${val}`);
    },
//    筛选函数  第一个参数当前页  当二个参数审核状态  第三个参数  品牌名称
    filter(current_page,the_status,the_brandName){
      this.$axios.get('/brandrequest/selectByExample?pageNum=' + current_page + '&status=' + the_status + '&brandName=' + the_brandName)
        .then((res) => {
          let brandData = JSON.parse(res.data.data);
          this.tableData = brandData.rows;
          this.total = brandData.total;
          this.pageSize = brandData.pageSize;
        }).catch(() => {
        console.log("请求品牌列表失败");
      })
    },
//    查看品牌详情函数
    searchBrandDet(brandID){
      this.$axios.get('/brandrequest/selectByPrimaryKeyadmin.ajax?id=' + brandID)
        .then((res) => {
          console.log(res)
        }).catch(() => {
        console.log("查看操作失败");
      })
    },
//    重新审核品牌函数
    reAudit(brandID){
      this.$axios.get('/brandrequest/updateStatus?type=ALREADYAUDIT&id=' + brandID)
        .then((res) => {
//          console.log(res)
          this.$router.go(0)
        }).catch(() => {
        console.log("重新申请操作失败");
      })
    },
//    取消审核品牌函数
    cancelBrand(brandID){
      this.$axios.get('/brand/deletebrand?id=' + brandID)
        .then((res) => {
//          console.log(res)
          this.$router.go(0)
        }).catch(() => {
        console.log("取消审核操作失败");
      })
    }
  }
}
</script>

<style>
  .brand_wrapper{
    overflow: hidden;
    padding-bottom: 30px;
    width: 954px;
    background: white;
    border: 1px solid #dcdcdc;
    border-radius:8px;
  }
  .myBrand{
    padding-left:80px;
    width: 874px;
    height: 60px;
    border-bottom: 1px solid #d4d4d4;
    border-radius:8px 8px 0 0;
    line-height:60px;
    background:linear-gradient(#fbfbfb, #ececec);
    font-family: "Microsoft YaHei UI";
  }
  .brand_nav .el-table{
    text-align: center;
  }
  .brand_nav .has-gutter tr th{
    text-align: center;
  }
  .newBrand_item{
    overflow: hidden;
    padding: 5px 0;
  }
  .newBrand_btn{
    overflow: hidden;
    padding: 5px 0;
    width: 160px;
    margin: 0 auto;
  }
  .newBrand_item p{
    float: left;
    width: 120px;
    line-height: 40px;
    text-align: right;
  }
  .newBrand_item .el-input{
    float: left;
    width: 300px;
  }
  .newBrand_item .el-textarea{
    float: left;
    width: 666px;
  }
  .newBrand_item .el-upload__tip{
    height: 15px;
  }
  .newBrand_item .el-upload-list--picture{
    width:300px;
    margin-left:120px;
  }
  .setBrand_wrapper_item{
    text-align: center;
  }
  .setBrand_wrapper_item .el-input-group__prepend{
    width: 80px;
  }
  .setBrand_wrapper_item .input-with-select{
    width: 500px;
  }
  .delAllBtn{
    text-align: right;
    margin: 10px 210px 0 0;
  }
  .pagination{
    margin-top: 10px;
    text-align: center;
  }
</style>























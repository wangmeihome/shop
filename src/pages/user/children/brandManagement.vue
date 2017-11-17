<template>
    <div class="brand_wrapper">
      <div class="myBrand">
        <h1>品牌管理</h1>
      </div>
      <div class="brand_nav">

        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="品牌列表" name="brandList">
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="num" label="序号" width="55"></el-table-column>
              <el-table-column prop="brandName" label="品牌名称" width="120"></el-table-column>
              <el-table-column label="品牌LOGO" width="120">
                <template slot-scope="scope">
                  <img :src="scope.row.brandImg" style="width: 120px;height: 50px">
                </template>
              </el-table-column>
              <el-table-column label="审核状态" width="200">
                <template slot-scope="scope">
                  <p>
                    <span v-if="scope.row.auditStatus === 0">审核未通过</span>
                    <span v-if="scope.row.auditStatus === 1">已审核</span>
                    <span v-if="scope.row.auditStatus === 2">审核中</span>
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <div v-if="scope.row.auditStatus === 1">
                    <el-button @click="examine(scope.$index, scope.row)" type="primary" size="mini">查看</el-button>
                  </div>
                  <div v-if="scope.row.auditStatus === 2">
                    <el-button @click="cancel(scope.$index, scope.row)" type="danger" size="mini">取消</el-button>
                  </div>
                  <div v-if="scope.row.auditStatus === 0">
                    <el-button @click="reapply(scope.$index, scope.row)" type="warning" size="mini">重新申请</el-button>
                    <el-button @click="cancelApply(scope.$index, scope.row)" type="danger" size="mini">取消</el-button>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="info" label="状态" width="120"
                               :filters="[{ text: '审核未通过', value: '审核未通过' }, { text: '已审核', value: '已审核' },{ text: '审核中', value: '审核中' }]"
                               :filter-method="filterTag"
                               filter-placement="bottom-end">
                <template slot-scope="scope">
                  <el-tag :type="scope.row.info === '审核未通过' ? 'danger' : scope.row.info === '已审核' ? 'success' : 'warning'" close-transition>{{scope.row.info}}</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="新增品牌" name="addBrand">新增品牌</el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>

<script>
export default {
  data(){
    return {
      activeName: 'brandList',
      tableData: [
        {
        num: 1,
        brandName: '品牌1',
        brandImg: require('../../../assets/partnerImgs/atlas.jpg'),
        auditStatus:0,
        info:'审核未通过'
      }, {
        num: 2,
        brandName: '品牌2',
        brandImg: require('../../../assets/partnerImgs/atlas.jpg'),
        auditStatus:1,
        info:'已审核'
      }, {
        num: 3,
        brandName: '品牌3',
        brandImg: require('../../../assets/partnerImgs/atlas.jpg'),
        auditStatus:2,
        info:'审核中'
      }, {
        num: 4,
        brandName: '品牌4',
        brandImg: require('../../../assets/partnerImgs/atlas.jpg'),
        auditStatus:2,
        info:'审核中'
      }, {
        num: 5,
        brandName: '品牌5',
        brandImg: require('../../../assets/partnerImgs/atlas.jpg'),
        auditStatus:1,
        info:'已审核'
      }, {
        num: 6,
        brandName: '品牌6',
        brandImg: require('../../../assets/partnerImgs/atlas.jpg'),
        auditStatus:0,
        info:'审核未通过'
      }],
      multipleSelection: [],
    }
  },
  methods:{
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val)
    },
//    查看操作
    examine(index, row){
      console.log(index, row);
    },
//    取消审核操作
    cancel(index,row){
      console.log(index, row);
    },
//    重新审核操作
    reapply(index,row){
      console.log(index, row);
    },
//    取消重新申请
    cancelApply(index,row){
      console.log(index, row);
    },
    filterTag(value, row) {
      return row.info === value;
    },
//    选择品牌审核状态
    getStatus(){
      console.log(this.selectValue)
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
</style>























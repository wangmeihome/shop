<template>
    <div class="accountMag_wrapper">
      <div class="myAccountMag">
        <h1>账户管理</h1>
      </div>
      <div class="condition">
        <div class="condition_item">
          <p>用户名：</p>
          <el-input v-model="username" placeholder="请输入内容"></el-input>
        </div>
        <div class="condition_item">
          <p>公司名称：</p>
          <el-input v-model="companyName" placeholder="请输入内容"></el-input>
        </div>
        <div class="condition_item">
          <p>纳税人识别号：</p>
          <el-input v-model="creditCode" placeholder="请输入内容"></el-input>
        </div>
        <div class="condition_item">
          <p>联系方式：</p>
          <el-input v-model="contactWay" placeholder="请输入内容"></el-input>
        </div>
        <div class="condition_item">
          <p>账户状态：</p>
          <el-select v-model="accountStateValue" placeholder="请选择">
            <el-option v-for="item in accountState" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="condition_item">
          <p>账户类型：</p>
          <el-select v-model="accountTypeValue" placeholder="请选择">
            <el-option v-for="item in accountType" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="condition_item">
          <p>创建时间：</p>
          <el-date-picker @change="getTheTime()" v-model="timeValue" type="datetimerange" :picker-options="timePickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right"></el-date-picker>
        </div>
        <div class="submitInfo">
          <el-button @click="submitSelectInfo" type="primary">搜索</el-button>
        </div>
      </div>
      <div class="accountMag_nav">
        <el-table :data="tableData" border style="margin-top: 20px">
          <el-table-column fixed type="selection" width="49"></el-table-column>
          <el-table-column fixed prop="id" label="序号" width="49"></el-table-column>
          <el-table-column prop="username" label="用户名" width="100"></el-table-column>
          <el-table-column prop="companyName" label="公司名称" width="200"></el-table-column>
          <el-table-column prop="accountType" label="账户类型" width="77"></el-table-column>
          <el-table-column prop="creditCode" label="纳税人识别号" width="169"></el-table-column>
          <el-table-column prop="legalPerson" label="法人代表" width="80"></el-table-column>
          <el-table-column prop="adminName" label="管理员姓名" width="95"></el-table-column>
          <el-table-column prop="adminContactInfo" label="联系方式" width="120"></el-table-column>
          <el-table-column prop="subAccountNum" label="子账户数" width="100"></el-table-column>
          <el-table-column prop="userLevel" label="用户等级" width="100"></el-table-column>
          <el-table-column prop="createTime" label="账号创建时间" width="100"></el-table-column>
          <el-table-column label="账户状态" width="100">
            <template slot-scope="scope">
              <p>
                <span v-if="scope.row.accountStatus === '0'">未通过审核</span>
                <span v-if="scope.row.accountStatus === '1'">通过审核</span>
                <span v-if="scope.row.accountStatus === '2'">审核中</span>
                <span v-if="scope.row.accountStatus === '3'">未提交审核</span>
                <span v-if="scope.row.accountStatus === '4'">已停用</span>
              </p>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <div v-if="scope.row.accountStatus === '0'">
                <el-button @click="examine(scope.$index, scope.row)" type="primary" size="mini">查看</el-button>
                <el-button @click="stop(scope.$index, scope.row)" type="danger" size="mini">停用</el-button>
              </div>
              <div v-if="scope.row.accountStatus === '1'">
                <el-button @click="examine(scope.$index, scope.row)" type="primary" size="mini">查看</el-button>
                <el-button @click="stop(scope.$index, scope.row)" type="danger" size="mini">停用</el-button>
              </div>
              <div v-if="scope.row.accountStatus === '2'">
                <el-button @click="examine(scope.$index, scope.row)" type="primary" size="mini">查看</el-button>
                <el-button @click="pass(scope.$index, scope.row)" type="danger" size="mini">通过</el-button>
                <el-button @click="turnDown(scope.$index, scope.row)" type="warning" size="mini">驳回</el-button>
                <el-button @click="stop(scope.$index, scope.row)" type="danger" size="mini">停用</el-button>
              </div>
              <div v-if="scope.row.accountStatus === '3'">
                <el-button @click="examine(scope.$index, scope.row)" type="primary" size="mini">查看</el-button>
                <el-button @click="stop(scope.$index, scope.row)" type="danger" size="mini">停用</el-button>
              </div>
              <div v-if="scope.row.accountStatus === '4'">
                <el-button @click="examine(scope.$index, scope.row)" type="primary" size="mini">查看</el-button>
                <el-button @click="start(scope.$index, scope.row)" type="success" size="mini">启用</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
export default {
  data(){
    return {
      username:'',
      companyName:'',
      creditCode:'',
      contactWay:'',
      accountState: [{
        value: '通过审核',
        label: '通过审核'
      }, {
        value: '已停用',
        label: '已停用'
      }, {
        value: '审核中',
        label: '审核中 '
      }, {
        value: '未提交审核',
        label: '未提交审核'
      }, {
        value: '未通过审核',
        label: '未通过审核'
      }],
      accountStateValue: '',
      accountType: [{
        value: '供应商',
        label: '供应商'
      }, {
        value: '采购商',
        label: '采购商'
      }],
      accountTypeValue: '',
      timePickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      timeValue: '',
      tableData: [
        {
          id: '1',
          username: 'username1',
          companyName: '公司名1',
          accountType: '供应商',
          creditCode: '111111111111111111',
          legalPerson: '法人1',
          adminName:'admin1',
          adminContactInfo:'13111111111',
          subAccountNum:'1',
          userLevel:'1',
          createTime:'2017-01-01',
          accountStatus:'0',
          accountInfo:'未通过审核'
        },
        {
          id: '2',
          username: 'username2',
          companyName: '公司名2',
          accountType: '采购商',
          creditCode: '222222222222222222',
          legalPerson: '法人2',
          adminName:'admin2',
          adminContactInfo:'13222222222',
          subAccountNum:'2',
          userLevel:'2',
          createTime:'2017-02-02',
          accountStatus:'1',
          accountInfo:'通过审核'
        },
        {
          id: '3',
          username: 'username3',
          companyName: '公司名3',
          accountType: '供应商',
          creditCode: '333333333333333333',
          legalPerson: '法人3',
          adminName:'admin3',
          adminContactInfo:'13333333333',
          subAccountNum:'3',
          userLevel:'3',
          createTime:'2017-03-03',
          accountStatus:'2',
          accountInfo:'审核中'
        },
        {
          id: '4',
          username: 'username4',
          companyName: '公司名4',
          accountType: '采购商',
          creditCode: '444444444444444444',
          legalPerson: '法人4',
          adminName:'admin4',
          adminContactInfo:'13444444444',
          subAccountNum:'4',
          userLevel:'4',
          createTime:'2017-04-04',
          accountStatus:'3',
          accountInfo:'未提交审核'
        },
        {
          id: '5',
          username: 'username5',
          companyName: '公司名5',
          accountType: '采购商',
          creditCode: '555555555555555555',
          legalPerson: '法人5',
          adminName:'admin5',
          adminContactInfo:'13555555555',
          subAccountNum:'5',
          userLevel:'5',
          createTime:'2017-05-05',
          accountStatus:'4',
          accountInfo:'已停用'
        },
      ]
    }
  },
  methods:{
    getTheTime(){
      console.log(this.timeValue)
    },
//    提交筛选信息
    submitSelectInfo(){
      alert("筛选");
    },
    handleClick(row) {
      console.log(row);
    },
//    查看操作
    examine(index, row){
      console.log(index, row);
    },
    start(index, row){
      console.log(index, row);
    },
    stop(index, row){
      console.log(index, row);
    },
    pass(index, row){
      console.log(index, row);
    },
    turnDowm(index, row){
      console.log(index, row);
    },
  }
}
</script>

<style>
  .accountMag_wrapper{
    overflow: hidden;
    padding-bottom: 30px;
    width: 954px;
    background: white;
    border: 1px solid #dcdcdc;
    border-radius:8px;
  }
  .accountMag_wrapper .myAccountMag{
    padding-left:80px;
    width: 874px;
    height: 60px;
    border-bottom: 1px solid #d4d4d4;
    border-radius:8px 8px 0 0;
    line-height:60px;
    background:linear-gradient(#fbfbfb, #ececec);
    font-family: "Microsoft YaHei UI";
  }
  .condition{
    overflow: hidden;
  }
  .condition_item{
    float: left;
  }
  .condition_item .el-date-editor{
    width: 430px;
  }
  .condition_item p{
    float: left;
    width: 130px;
    line-height: 40px;
    text-align: right;
  }
  .condition .el-input{
    float: left;
    width: 150px;
  }
  .submitInfo{
    float: left;
    margin-left: 130px;
  }
  .submitInfo .el-button{
    width: 150px;
  }
  .accountMag_nav .cell{
    text-align: center;
  }
  .accountMag_nav .has-gutter tr th{
    text-align: center;
  }
</style>

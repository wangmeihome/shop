<template>
  <div>
    <el-select @change="choosePro(ProValue)" v-model="ProValue" placeholder="省">
      <el-option v-for="item in ProvinceOptions" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
    </el-select>
    <el-select @change="chooseCity(CityValue)" v-model="CityValue" placeholder="市">
      <el-option v-for="item in CityOptions" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
    </el-select>
    <el-select @change="chooseArea(AreaValue)" v-model="AreaValue" placeholder="区">
      <el-option v-for="item in AreaOptions" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        ProValue:'',
        CityValue:'',
        AreaValue:'',
        ProvinceOptions:{},
        CityOptions:{},
        AreaOptions:{}
      }
    },
    methods:{
      choosePro(){
        this.$axios.get('/region/region.ajax?typei=CITY&provinceId='+this.ProValue)
          .then((res) => {
            this.CityOptions = JSON.parse(res.data.data);
          }).catch(() => {
          console.log("请求失败");
        })
      },
      chooseCity(){
        this.$axios.get('/region/region.ajax?typei=AREA&provinceId='+this.CityValue)
          .then((res) => {
            this.AreaOptions = JSON.parse(res.data.data);
          }).catch(() => {
          console.log("请求失败");
        })
      },
      chooseArea(){
//        console.log(this.AreaValue);
        this.$emit("getAreaId",this.AreaValue);
      }
    },
    created(){
      this.$axios.get('/region/region.ajax?provinceId=0&typei=PROVINCE')
        .then((res) => {
          this.ProvinceOptions = JSON.parse(res.data.data);
        }).catch(() => {
        console.log("请求失败");
      });
    }
  }
</script>

<style>

</style>

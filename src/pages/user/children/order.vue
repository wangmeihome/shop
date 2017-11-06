<template>
  <div class="order_wrapper">
    <div class="order_title_name">
      <h1>购物清单</h1>
    </div>
    <div class="order_title_details">
      <div class="basicInfo">
        <span style="width: 128px">时间</span>
        <span style="width: 189px">订单号：<span style="color: #5079d9">6184201708121559080</span></span>
        <span style="width: 122px">单价</span>
        <span style="width: 122px">数量</span>
      </div>
      <div class="otherInfo">
        <span style="width: 125px">实付金额</span>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
  .order_wrapper{
    overflow: hidden;
    width: 954px;
    background: white;
    border: 1px solid #dcdcdc;
    border-radius: 8px;
  }
  .order_title_details{
    padding-left: 30px;
    overflow: hidden;
    width: 954px;
    height: 36px;
    border-bottom: 1px solid #d4d4d4;
    border-radius:8px 8px 0 0;
    line-height: 36px;
    background:linear-gradient(#fbfbfb, #ececec);
  }
  .basicInfo{
    float: left;
    width: 576px;
    height: 36px;
  }
  .otherInfo{
    float: right;
    width: 230px;
    height: 36px;
  }
  .basicInfo span,.otherInfo span{
    display: inline-block;
    font-size: 12px;
    text-align: center;
  }
  .order_title_name{
    padding-left: 80px;
    width: 874px;
    height: 60px;
    border-bottom: 1px solid #d4d4d4;
    border-radius:8px 8px 0 0;
    line-height: 60px;
    background:linear-gradient(#fbfbfb, #ececec);
  }
</style>

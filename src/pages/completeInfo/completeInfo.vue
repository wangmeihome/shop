<template>
    <div class="completeInfo_wrapper">
      <div class="companyInfo">
        <h1>①请您完善企业信息</h1>
      </div>
      <div class="personalInfo"></div>
    </div>
</template>

<script>

</script>

<style scoped>
  html, body {
    width: 100%;
    height: 100%;
  }
  body {
    overflow: hidden;
    position: relative;
  }
  .completeInfo_wrapper{
    width:100%;
    height:100%;
    background:url("../../assets/others/login_bg.png") repeat center center fixed;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
    overflow: hidden;
  }
  .companyInfo{
    width: 1300px;
    height: 1000px;
    margin: 0 auto;
    background: lightpink;
    padding-top: 30px;
  }
  .companyInfo h1{
    text-align: center;
    font-size: 18px;
    font-weight: bolder;
  }
</style>




























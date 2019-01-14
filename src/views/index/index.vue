<style scoped>
@import "../../config/index.less";
#main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
}

#main h5 {
  margin-top: 20px;
}
</style>

<template>
    <div id="main">
        <h1>
            欢迎光临AI管理后台
        </h1>
    </div>
</template>

<script>
export default {
  name: "index",
  created() {
    // console.log(this.$store.state.app.pageOpenedList);
  }
};
</script>


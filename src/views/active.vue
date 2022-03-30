<template id="index">
  <div>
    <img id="img" :src="require('../assets/'+imgUrl)" alt="" />
    <p id="text" v-text="tips"></p>
  </div>
</template>

<style>
#img {
  width: 400px;
  height: 400px;
  margin: 100px 500px;
}
#text {
  margin: 0px 650px;
}
</style>

<script>
export default {
  data() {
    return {
      imgUrl: "ok.png",
      tips: "",
    };
  },
  created() {
    let id = this.$route.query.uuid;
    this.activeUser(id);
  },
  methods: {

    activeUser(id) {
      this.$http
        .post("http://localhost:8081/user/activeUser/" + id)
        .then((res) => {
          if (res.data.code == 200) {
            this.imgUrl = "ok.png";
            this.tips = "恭喜您，账号激活成功!";
          } else if (res.data.code == 500) {
            this.imgUrl = "error.png";
            this.tips = "账号激活失败，请重新注册!";
          }
        })
        .catch((err) => {
          this.$message({
            message: "连接超时",
            type: "warning",
          });
        });
    },
  },
};
</script>


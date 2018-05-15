<template>
  <div class="main">
    <div class="btn" @click="login">需要登录</div>
    <div>{{'服务token:'+serverAccessToken}}</div>
    <div>{{'用户token:'+userAccessToken}}</div>
    <div>{{'sessionKey:'+sessionKey}}</div>
    <div>{{'用户ID:'+userId}}</div>
    <div class="btn" @click="showTopLoading">显示头部loading</div>
    <div class="btn" @click="showPup('success')">成功提示</div>
    <div class="btn" @click="showPup('wraning')">警告提示</div>
    <div class="btn" @click="showPup('error')">错误提示</div>
    <div class="btn" @click="showPup('info')">信息提示</div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'serverAccessToken',
      'userAccessToken',
      'sessionKey',
      'userId'
    ])
  },
  methods: {
    ...mapActions(['showPopupAction']),
    login() {
      this.$tools.oauth()
    },
    showTopLoading() {
      const _this = this
      _this.$store.commit('setTopLoading', true)
      setTimeout(() => {
        _this.$store.commit('setTopLoading', false)
      }, 1000)
    },
    showPup(type) {
      this.showPopupAction({
        type: type,
        msg: '这是一条' + type + '提示！',
        time: 3000 //默认1500毫秒
      })
    }
  }
}
</script>
<style lang="less" scoped>
.main {
  position: relative;
  padding: 10px;
  height: 100%;
  width: 100%;
  background-color: white;
  div {
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  .btn {
    padding: 10px;
    margin: 10px 0;
    color: white;
    background-color: #000000;
    border: 1px solid #f5f5f5;
    border-radius: 5px;
  }
}
</style>



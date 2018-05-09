<template>
  <div id="app">
    <load-more v-show="topLoading" :show-loading="true" tip="正在加载"></load-more>
    <div v-transfer-dom>
      <loading v-show="loading" text="请稍等"></loading>
    </div>
    <!-- <keep-alive> -->
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
    <!-- </keep-alive> -->
    <div v-transfer-dom>
      <popup :value="showPopup" position="top" :show-mask="false">
        <div class="popup-msg" :class="popupType?'popup-msg-success':'popup-msg-error'">
          <i class="iconfont msg-icon" :class="popupType?'icon-queding1':'icon-xinxiyouwu1'"></i>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import {
  Popup,
  LoadMore,
  Loading,
  TransferDomDirective as TransferDom
} from 'vux'
import { mapGetters, mapState, mapMutations } from 'vuex'

import * as Net from '@/network/index'
import * as Utils from '@/utils/index'

export default {
  directives: {
    TransferDom
  },
  name: 'app',
  data() {
    return {
      transitionName: ''
    }
  },
  watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = 'slide-right'
      }
    }
  },
  computed: {
    ...mapGetters([
      'serverAccessToken',
      'userAccessToken',
      'sessionKey',
      'loading',
      'topLoading',
      'showPopup',
      'popupType',
      'popupMsg'
    ])
  },
  async created() {
    const _this = this
    //如果没有服务token则获取服务token
    if (Utils.isEmpty(_this.serverAccessToken)) {
      await _this._initToken()
    }
    // await Utils.initOauth()
    // await _this._initUserId()
  },
  components: { Popup, LoadMore, Loading },
  methods: {
    ...mapMutations(['setServerAccessToken', 'setUserId']),
    async _initToken() {
      // 获取token
      const _this = this
      await Net.getServerToken().then(res => {
        //将获取的token和code放到store中去管理状态
        _this.setServerAccessToken({
          token: res.data.access_token,
          expires: res.data.expires_in
        })
      })
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #f5f5f5 !important;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

html {
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}
html::-webkit-scrollbar {
  width: 0px;
}

.popup-msg {
  background-color: white;
  font-size: 14px;
  padding: 12px;
  border-bottom: 1px solid #f8f8f8;
  .msg-icon {
    margin-right: 5px;
  }
}
.popup-msg-error {
  color: red;
}
.popup-msg-success {
  color: green;
}

slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 300ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>

<template>
  <div v-transfer-dom>
    <popup :value="show" position="top" :show-mask="false" :should-scroll-top-on-show='true'>
      <div class="popup-msg" :class="color">
        <i class="iconfont msg-icon" :class="icon"></i>
        <span v-html="info"></span>
      </div>
    </popup>
  </div>
</template>
<script>
import { Popup, TransferDomDirective as TransferDom } from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    Popup
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'info'
    },
    info: {
      type: String
    }
  },
  computed: {
    color: function() {
      let type = this.type
      if (type == 'success') {
        return 'popup-msg-success'
      } else if (type == 'info') {
        return 'popup-msg-info'
      } else if (type == 'error') {
        return 'popup-msg-error'
      } else if (type == 'wraning') {
        return 'popup-msg-wraning'
      }
    },
    icon: function() {
      let type = this.type
      if (type == 'success') {
        return 'icon-queding1'
      } else if (type == 'info') {
        return 'icon-jingshi'
      } else if (type == 'error') {
        return 'icon-shibai'
      } else if (type == 'wraning') {
        return 'icon-xinxiyouwu1'
      }
    }
  }
}
</script>
<style lang="less" scoped>
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
  color: #ed3f14;
}
.popup-msg-success {
  color: #19be6b;
}
.popup-msg-info {
  color: #2d8cf0;
}
.popup-msg-wraning {
  color: #ff9900;
}
</style>




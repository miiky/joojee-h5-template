export default (sockKey) => {
  //注册并建立webSocket通信
  let sock = new SockJS('https://websocket.joojee.cn/push')
  sock.onopen = () => {
    console.log('open connection of key: ' + sockKey)
    let jsonobj = {
      accessToken: sockKey,
    }
    let jsonStr = JSON.stringify(jsonobj)
    sock.send(jsonStr)
  }
  //监听webSocket消息
  sock.onmessage = (e) => {
    let data = typeof e.data == 'string' ? e.data : JSON.parse(e.data)
    console.log('message', data)
    if (data == '收到') {
      return
    }
    bus.$emit('handleSockMsg', data)
  }
}

import React, { Component } from 'react'


const Camera = () => (
  <div>
    <HelloMessage></HelloMessage>
  </div>
)
class HelloMessage extends Component {
  constructor(props) {
    super(props);
    this.state = { liked: false, textvalue: "11111111111" ,text:"1"};
  }
  componentDidMount() {
    this.handlePhoto()
  }
  handlePhoto() {
    var r=window.confirm("是否允许界面访问个人信息！");
    if(r){
      alert(123)
    }
    if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
      this.getUserMedia({ video: { facingMode: "user" } }, this.success.bind(this), error);
    } else {
      alert('不支持访问用户媒体');
    }
    if (!navigator.mediaDevices) {
      alert("不支持访问用户媒体")
      return
    }
    function error(error) {
      console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
    }
  }
  success(stream) {
    let video = document.getElementById('video');
    
    //兼容webkit核心浏览器
    // let CompatibleURL = window.URL || window.webkitURL;
    //将视频流设置为video元素的源
    // video.src = CompatibleURL.createObjectURL(stream);
    // video.srcObject = window.webkitURL.createObjectURL(stream);
    video.srcObject = stream;
    this.setState({
      textvalue:this.state.textvalue+"2"
    })
    video.oncanplaythrough = function(e) {
      // video.load();
      // alert(1)
      // video.play();
    };
    this.saveImage();
    
    // if (video.paused)
    //   video.play();
    // else
    //   video.pause();
  }
  getUserMedia(constraints, success, error) {
    if (navigator.mediaDevices.getUserMedia) {
      //最新的标准API
      navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
    } else if (navigator.webkitGetUserMedia) {
      //webkit核心浏览器
      navigator.webkitGetUserMedia(constraints, success, error)
    } else if (navigator.mozGetUserMedia) {
      //firfox浏览器
      navigator.mozGetUserMedia(constraints, success, error);
    } else if (navigator.getUserMedia) {
      //旧版API
      navigator.getUserMedia(constraints, success, error);
    }
  }
  saveImage(){
    let video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, 320, 240);  // 将video中的数据绘制到canvas里
  }
  render() {
    return (
      <div className='identify' >
        <video style={{opacity:0,position:'absolute',zIndex:1}} id="video" muted  controls width="320px" height="240px"></video>
        <div>
          <img style={{width:'320px',height:'240px'}} alt='截图' src='http://dev-pdu.dt.com/img/hailiang.8e76a476.png'/>
        </div>
        <canvas id="canvas" width={'320px'} height={'240px'}></canvas>
        <div><button onClick={this.saveImage}>拍照</button></div>
      </div>
    )
  }
}

export default Camera
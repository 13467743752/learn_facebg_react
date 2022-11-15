import React, { Component } from 'react'
import { AxiosUtil } from '../utils/AxiosUtil';
import html2canvas from 'html2canvas';
import {
  Menu,
  Button,
  Radio
} from "element-react";
import '../css/style.css'
const Home = () => (
  <div>
    <h1>我是主页</h1>
    <HelloMessage></HelloMessage>
  </div>
)
class HelloMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      textvalue: false,
      image_src: '',
      image_up_src: '',
      image_bg: 'transparent',
      image_size: 'two',
      image_style: {},
      image_content_style: {
        width: '413px',
        height: '579px'
      },
    };
    this.myRef = React.createRef();
  }
  componentDidMount() {
    // this.videoCamera()
  }
  videoCamera() {
    // 老的浏览器可能根本没有实现 mediaDevices，所以我们可以先设置一个空的对象
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
    }
    // 一些浏览器部分支持 mediaDevices。我们不能直接给对象设置 getUserMedia
    // 因为这样可能会覆盖已有的属性。这里我们只会在没有getUserMedia属性的时候添加它。
    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
        // 首先，如果有getUserMedia的话，就获得它
        var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        // 一些浏览器根本没实现它 - 那么就返回一个error到promise的reject来保持一个统一的接口
        if (!getUserMedia) {
          return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }
        // 否则，为老的navigator.getUserMedia方法包裹一个Promise
        return new Promise(function (resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      }
    }
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then(function (stream) {
        var video = document.querySelector('video');
        // 旧的浏览器可能没有srcObject
        if ("srcObject" in video) {
          video.srcObject = stream;
        } else {
          // 防止在新的浏览器里使用它，应为它已经不再支持了
          video.src = window.URL.createObjectURL(stream);
        }
        video.onloadedmetadata = function (e) {
          video.play();
        };
      })
      .catch(function (err) {
        alert(err.name + ": " + err.message);
      });
    // var constraints = { audio: true, video: true }
    // navigator.mediaDevices.getUserMedia(constraints)
    //   .then(function (stream) {
    //     /* 使用这个stream stream */
    //     video.src = window.webkitURL.createObjectURL(stream);
    //   })
    //   .catch(function (err) {
    //     /* 处理error */
    //     alert(err)
    //   });
    // window.navigator.getUserMedia = window.navigator.getUserMedia || window.navigator.webkitGetUserMedia;
    // if (window.navigator.getUserMedia) {
    //   if (window.navigator.webkitURL) {
    //     window.navigator.getUserMedia("video", function (stream) {
    //       video.src = window.webkitURL.createObjectURL(stream);
    //     }, function (error) { alert(error); });
    //   }
    //   else {
    //     window.navigator.getUserMedia("video", function (stream) {
    //       video.src = window.webkitURL.createObjectURL(stream);
    //     }, function (error) { alert(error); });
    //   }
    // }
    // else {
    //   alert("navigator.getUserMedia  Error");
    // }
  }
  scamera() {
    var videoElement = document.getElementById('video');
    var canvasObj = document.getElementById('canvas1');
    var context1 = canvasObj.getContext('2d');
    context1.fillStyle = "#ffffff";
    context1.fillRect(0, 0, 320, 240);
    context1.drawImage(videoElement, 0, 0, 320, 240);
  }

  async getinfo() {
    let files = this.myRef.current.files
    if (files.length > 0) {
      let reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = () => {
        let formdata = new FormData()
        formdata.append('img', files[0])
        AxiosUtil.put('convert', formdata).then((res) => {
          let result = res['data']
          console.log(res)
          console.log(result)
          if (result['flag']) {
            this.setState({
              image_src: result['msg']
            })
          }
          else {
            alert(result['msg'])
          }
        }).catch((error) => {
          alert('Invalid account or password!');
        })
      }

    }
  }
  onImageBgChange(value) {
    this.setState({
      image_bg: value,
      image_style: {
        backgroundColor: value
      }
    });
  }
  onImageSizeChange(value) {
    let info = {}
    switch (value) {
      case "one":
        info = {
          width: '295px',
          height: '413px'
        }
        break;
      case "two":
        info = {
          width: '413px',
          height: '579px'
        }
        break;
      default:
        break;
    }
    this.setState({
      image_size: value,
      image_content_style: info
    });
  }
  onImgUpChange(value) {
    console.log(value)
    let files = this.myRef.current.files
    if (files.length > 0) {
      let reader = new FileReader()
      reader.readAsDataURL(files[0])
      let that = this
      reader.onloadend = function (oFRevent) {
        var src = oFRevent.target.result;
        that.setState({
          image_up_src: src
        })
      }
    }
  }
  onClickSave(e) {
    html2canvas(document.getElementById('aphoto'), { // aphoto为被截图节点id
      allowTaint: false,
      useCORS: true, // 支持跨域图片的截取，不然图片截取不出来
      // 图片服务器配置 Access-Control-Allow-Origin: *
    }).then(canvas => {
      const link = document.createElement('a'); // 建立一个超连接对象实例
      const event = new MouseEvent('click'); // 建立一个鼠标事件的实例
      link.download = 'img.png'; // 设置要下载的图片的名称
      link.href = canvas.toDataURL(); // 将图片的URL设置到超连接的href中
      link.dispatchEvent(event); // 触发超连接的点击事件
    })
  }
  render() {
    const text = this.state.liked ? this.state.textvalue : 'haven\'t liked';
    const image_src = this.state.image_src ? "data:;base64," + this.state.image_src : ''
    return (
      <div>
        <p onClick={this.getinfo.bind(this)}>
          You {text} this. Click to toggle.
        </p>

        {/* <video id="video" autoPlay="" width="320px" height="240px"></video>

        <canvas id="canvas1" width="320" height="240"></canvas>

        <div><input type="text" id="testInput" placeholder="截屏后粘贴到输入框中" size="30" /></div>

        <input type="file" accept="image/*" capture="camera" />安卓和IOS都为：拍照

        <input type="file" accept="video/*" capture="camcorder" />安卓和IOS都为：录像

        <input type="file" accept="audio/*" capture="microphone" />安卓为录音（ios视频或照片）

        <input type="file" accept="image/*" />安卓为相机或照片（ios为拍照或图库2）

        <input type="file" accept="video/*" />安卓为录像或视频录--（ios为录像或照片图库【照片图库已做筛选，全是视频】）

        <input type="file" accept="audio/*" />安卓为录音机音乐之类的（ios为拍照或录像【包含视频和照片】） */}
        <input ref={this.myRef} type="file" accept="image/*" onChange={this.onImgUpChange.bind(this)} />
        <div>
          <div className='faceDelContent'>
            <div className='faceDelImg' style={this.state.image_content_style}><img src={this.state.image_up_src} /></div>
            <div className='faceDelImg' style={this.state.image_content_style}><img id='aphoto' src={image_src} style={this.state.image_style} /></div>
          </div>
          <div>
            <span>背景颜色选择：</span>
            <Radio.Group value={this.state.image_bg} onChange={this.onImageBgChange.bind(this)}>
              <Radio value="red">红色</Radio>
              <Radio value="blue">蓝色</Radio>
              <Radio value="white">白色</Radio>
              <Radio value="transparent">透明</Radio>
            </Radio.Group>
          </div>
          <div>
            <span>图片尺寸选择：</span>
            <Radio.Group value={this.state.image_size} onChange={this.onImageSizeChange.bind(this)}>
              <Radio value="one">一寸</Radio>
              <Radio value="two">两寸</Radio>
            </Radio.Group>
          </div>
          <div>
            <Button onClick={this.onClickSave.bind(this)}>按下</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Home

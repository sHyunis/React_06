import React, { useRef, useState } from 'react'
import myVideo from '../assets/plane.mp4'
import tempImg from '../assets/plane.png'

// 준비된 영상의 포멧이 여러개 있어야 한다.

/// localhost:3000/video 라우트 만들 것임
const VideoPlayer = () => {
    const [toggle, setToggle] = useState(false);
    const videoRef = useRef(); // const video =  document.querySelector('video')
    console.log(videoRef); // { current : video } 객체가 생긴다.
    
    const onPlay = () => {
        videoRef.current.play() // 비디오 플레이 시작
    }
    const onStop = () => {
        videoRef.current.pause() // 비디오 정지
    }

    const onToggle = () => {
        setToggle(!toggle); // 기존의 값을 반전시켜 저장
        toggle ? onPlay() : onStop();
        // if(toggle){
        //     onPlay();
        // }else{
        //     onStop();
        // }
    }
  return (
    <div>
        <h1>VideoPlayer</h1>
        {/* autoPlay라도 muted 옵션이 없으면 autoPlay가 안된다, controls가 들어가야 제어가능, 비디오가 표시되지 않는 상황이 벌어졌을때 poster이미지가 나온다. */}
        {/* <audio></audio> 랑 거의 똑같다. */}
        <video 
            ref={videoRef}
            onMouseOver={onToggle}
            onMouseOut={onToggle}
            autoPlay muted={true} width="500px" controls poster={tempImg}
        >
            {/* 브라우저마다 video를 보여줄 수 있는 타입이 다르기 때문에 여러개를 사용한다. */}
            {/* 영상 3개 뜨는게 아니라 format을 맞추기위한 코드 (아무거나 하나가 뜬다) */}
            <source src={myVideo} type='video/mp4' />
            {/* <source src={myVideoOgg} type='video/ogg' />
            <source src={myVideoWebm} type='video/webm' /> */}
        </video>

        <button onClick={onPlay}>play</button>
        <button onClick={onStop}>stop</button>

    </div>
  )
}

export default VideoPlayer
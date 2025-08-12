import React,{ useRef, useEffect } from "react";
 import {HandLandmarker,
  FilesetResolver,
  DrawingUtils
} from "@mediapipe/tasks-vision";

function CameraComponent(){
  const videoref=useRef(null);
  const canvasref=useRef(null);
  const HandLandmarkeref=useRef(null);

  useEffect(() => {
     let camerastream;
     async function init(){
       const vision= await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
       );
     HandLandmarkeref.current =await HandLandmarker.createFromOptions(
      vision,
      {
        baseOptions:{
          modelAssetPath: "https://storage.googleapis.com/mediapipe-assets/hand_landmarker.task"
        },
        runningMode:"VIDEO",
        numHands:2
      }
     );
     camerastream= await navigator.mediaDevices.getUserMedia({video:true});
     videoref.current.srcObject=camerastream;
     videoref.current.play();
     requestAnimationFrame(predict);}

     const predict=async ()=>{
      if(
        videoref.current &&
        HandLandmarkeref.current &&
        videoref.current.readyState === 4
      ){
        const results = HandLandmarkeref.current.detectForVideo(videoref.current,
          performance.now()
        );

      const ctx = canvasref.current.getContext("2d");
      ctx.clearRect(0, 0, canvasref.current.width, canvasref.current.height);
      ctx.drawImage(videoref.current, 0, 0, canvasref.current.width, canvasref.current.height);
      
      const drawingUtils =new DrawingUtils(ctx);
      let allHands = [];
      if (results.landmarks){
        results.landmarks.forEach((landmarks,handIndex) => {
          drawingUtils.drawConnectors(
              landmarks,
              HandLandmarker.HAND_CONNECTIONS,
              { color: "#00FF00", lineWidth: 2 }
            );
            drawingUtils.drawLandmarks(landmarks, { color: "#FF0000", lineWidth: 1 });
      
            allHands.push(
              landmarks.map(lm=>({
                 x: lm.x,
            y: lm.y,
            z: lm.z
              }))
            )
          });
      }
       console.log(allHands);
     }
  requestAnimationFrame(predict);
    };
  init();
  return () => {
      if (camerastream) {
        camerastream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return(
       <div>
      <video ref={videoref} style={{  display: "none" }} />
      <canvas
        ref={canvasref}
        width={640}
        height={480}
        style={{ width: "100%", maxWidth: "500px" }}
      />
      </div>
)
}

export default CameraComponent;
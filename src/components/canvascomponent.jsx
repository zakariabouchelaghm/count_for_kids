import React, { useRef, useState, useEffect } from "react";
import "../pages/activities.css";

export default function CameraComponent() {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [label, setLabel] = useState(null);
  const [round, setRound] = useState(0);
  const [sequence, setSequence] = useState([]);
  const [results, setResults] = useState([]);
  const [currentSound, setCurrentSound] = useState(null);
  const totalRounds = 7;
  // Ensure background is white on first render
  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }, []);

  const getPos = (clientX, clientY) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const start = (x, y) => {
    setDrawing(true);
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const drawLine = (x, y) => {
    if (!drawing) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(x, y);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 20;
    ctx.lineCap = "round";
    ctx.stroke();
  };

  const stop = () => setDrawing(false);

  const clear = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };
  const startquiz = () =>{
    if (canvasRef.current) {
    const ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }
    const seq=Array.from({length:totalRounds},()=>Math.floor(Math.random() * 9)+1);
    setSequence(seq);
    setRound(0);
    setResults([]);
    playsound(seq[0]);
    clear();
  }  
  const playsound=(digit)=>{  
    const audio = new Audio(`/count_for_kids/sounds/${digit}.wav`);
    audio.play();
  }
  const correct=()=>{
    const audio = new Audio(`/count_for_kids/sounds/correct.wav`);
    audio.play();
  }

  const incorrect=()=>{
    const audio = new Audio(`/count_for_kids/sounds/incorrect.wav`);
    audio.play();
  }
  
  const check = async() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    await new Promise((resolve) => requestAnimationFrame(resolve));
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const ctx = tempCanvas.getContext("2d");
 
  // Fill white background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

  // Draw original canvas on top
    ctx.drawImage(canvas, 0, 0);
    ctx.closePath();
    const blob = await new Promise((resolve) => tempCanvas.toBlob(resolve, "image/jpeg", 1));
    
    const formData = new FormData();
    formData.append("file", blob, "drawing.jpeg");
    const response = await fetch("https://app-deploy-1.onrender.com/predict", {
    method: "POST",
    body: formData,
    });
    const result = await response.json();
    const predicted = result.predicted_class;
    console.log(predicted);
    setLabel(predicted);
    console.log(predicted);
    if (predicted==currentSound){
      correct();
    }else{
      incorrect();
    }
    
    if (round + 1 < totalRounds) {
       const nextRound = round + 1;
        setRound(nextRound);
        const nextSound = sequence[nextRound];
        setCurrentSound(nextSound);
        playsound(nextSound);
        clear();
      } else {
        
        console.log("Predicted results:", [...results, { round: round + 1, predicted, correct, sound: currentSound }]);
        alert("Quiz finished!");
      }
  };

  // Mouse handlers
  const onMouseDown = (e) => {
    const { x, y } = getPos(e.clientX, e.clientY);
    start(x, y);
  };

  const onMouseMove = (e) => {
    const { x, y } = getPos(e.clientX, e.clientY);
    drawLine(x, y);
  };

  // Touch handlers
  const onTouchStart = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const { x, y } = getPos(touch.clientX, touch.clientY);
    start(x, y);
  };

  const onTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const { x, y } = getPos(touch.clientX, touch.clientY);
    drawLine(x, y);
  };

  return (
    <div className="p-4">
      {sequence.length === 0 ? (
        <button onClick={startquiz} className="px-4 py-2 border rounded">ابدأ التمرين</button>
      ) : (
        <>
          <canvas
            ref={canvasRef}
            width={300}
            height={300}
            className="border bg-white touch-none"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={stop}
           
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={stop}
          />
          <div className="mt-2 flex gap-2 items-center">
            <button onClick={clear} className="px-3 py-1 border rounded">مسح</button>
            <button onClick={check} className="px-3 py-1 border rounded">تحقق</button>
            {label !== null && <h2>النتيجة: {label}</h2>}
          </div>

        
        </>
      )}
    </div>
  );

}

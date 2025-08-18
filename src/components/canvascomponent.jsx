import React, { useRef, useState, useEffect } from "react";
import "../pages/activities.css";

export default function CameraComponent() {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  // Ensure background is white on first render
  useEffect(() => {
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
    const ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const check = async() => {
    const canvas = canvasRef.current;
    const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/jpeg"));
    const formData = new FormData();
    formData.append("file", blob, "drawing.jpeg");
    const response = await fetch("https://app-deploy-1.onrender.com/predict", {
    method: "POST",
    body: formData,
    });
    const result = await response.json();
    console.log("Predicted:", result.predicted_class);
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
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="border bg-white touch-none"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stop}
        onMouseLeave={stop}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={stop}
      />
      <div className="mt-2 flex gap-2">
        <button onClick={clear} className="px-3 py-1 border rounded">مسح</button>
        <button onClick={check} className="px-3 py-1 border rounded">تحقق</button>
      </div>
    </div>
  );
}

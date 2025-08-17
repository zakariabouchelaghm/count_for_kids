import React, { useRef, useState, useEffect } from "react";


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

  const save = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = `drawing-${Date.now()}.jpeg`;

    // Force white background for JPEG
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const ctx = tempCanvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    ctx.drawImage(canvas, 0, 0);
    link.href = tempCanvas.toDataURL("image/jpeg");

    link.click();
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
        <button onClick={clear} className="px-3 py-1 border rounded">Clear</button>
        <button onClick={save} className="px-3 py-1 border rounded">Save JPEG</button>
      </div>
    </div>
  );
}

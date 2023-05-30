import { useEffect, useRef, useState } from "react";
import Toolbar from "./components/Toolbar";

function App() {
  const [mouseData, setMouseData] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const [canvasCTX, setCanvasCTX] = useState(null);
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(10);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setCanvasCTX(ctx);
  }, [canvasRef]);

  const SetPos = (e) => {
    setMouseData({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const Draw = (e) => {
    if (e.buttons !== 1) return;
    const ctx = canvasCTX;
    ctx.beginPath();
    ctx.moveTo(mouseData.x, mouseData.y);
    setMouseData({
      x: e.clientX,
      y: e.clientY,
    });
    ctx.lineTo(e.clientX, e.clientY);
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    // Set the line cap to round
    ctx.lineCap = "round";
    ctx.stroke();
  };

  return (
    <div>
      <canvas
        className=''
        ref={canvasRef}
        onMouseEnter={(e) => SetPos(e)}
        onMouseMove={(e) => {
          SetPos(e);
          Draw(e);
        }}
        onMouseDown={(e) => SetPos(e)}
      ></canvas>

      <div
        className='controlpanel py-2 flex items-center justify-center gap-3'
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
        }}
      >
        <input
          type='range'
          value={size}
          max={40}
          onChange={(e) => {
            setSize(e.target.value);
          }}
        />
        <input
          className='rounded'
          type='color'
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
          }}
        />
        <button
          className='px-3 text-sm py-1 bg-blue-600 text-white rounded'
          onClick={() => {
            const ctx = canvasCTX;
            ctx.clearRect(
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default App;

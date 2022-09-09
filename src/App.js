import { useState, useRef } from 'react';
import './App.css';
import Canvas from './Canvas';
import Grid from './Grid';

function App() {
  const [canvasWidth, setCanvasWidth] = useState(64);
  const [canvasHeight, setCanvasHeight] = useState(64);
  const [pixelSize, setPixelSize] = useState(16);
  const [showGrid, setShowGrid] = useState(true);
  const [selectedColor, setSelectedColor] = useState('black');
  const [resetCanvas, setResetCanvas] = useState(false);

  const canvasRef = useRef();

  const handleReset = () => {
    setResetCanvas(true);
    setInterval(() => setResetCanvas(false), 1000);
  }

  const exportCanvas = () => {
    const dataURL = canvasRef.current.toDataURL("image/png");
    const newTab = window.open('about:blank','image from canvas');
    newTab.document.write("<img src='" + dataURL + "' alt='from canvas'/>");
  }

  return (
    <div className="App">
      <h1>Pixel Art Creator</h1>
      <div style={{padding: '10px'}}>
        <label for="toggleGrid">Show Grid: </label>
        <input type="checkbox" id="toggleGrid" defaultChecked='true' onChange={(e) => setShowGrid(e.target.checked)} />
      </div>
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <button type='button' style={{marginBottom: '10px'}} onClick={handleReset}>Reset</button>
        <button type='button' style={{marginBottom: '10px'}} onClick={exportCanvas}>Export to PNG</button>
      </div>
      {showGrid && <Grid canvasHeight={canvasHeight} canvasWidth={canvasWidth} pixelSize={pixelSize} selectedColor={selectedColor} />}
      <Canvas canvasRef={canvasRef} canvasHeight={canvasHeight} canvasWidth={canvasWidth} pixelSize={pixelSize} selectedColor={selectedColor}
        resetCanvas={resetCanvas} />
    </div>
  );
}

export default App;

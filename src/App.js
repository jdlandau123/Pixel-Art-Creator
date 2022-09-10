import { useState, useRef } from 'react';
import './App.css';
import Canvas from './Canvas';
import Grid from './Grid';
import SetupForm from './SetupForm';
import ColorSelector from './ColorSelector';

function App() {
  const [projectName, setProjectName] = useState('No Name');
  const [canvasWidth, setCanvasWidth] = useState(64);
  const [canvasHeight, setCanvasHeight] = useState(64);
  const [pixelSize, setPixelSize] = useState(16);
  const [showSetup, setShowSetup] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [selectedColor, setSelectedColor] = useState('black');
  const [resetCanvas, setResetCanvas] = useState(false);

  const canvasRef = useRef();

  const createProject = (customWidth, customHeight, customPixelSize, customProjectName) => {
    setShowSetup(false);
    setCanvasWidth(customWidth);
    setCanvasHeight(customHeight);
    setPixelSize(customPixelSize);
    setProjectName(customProjectName);
  }

  const handleReset = () => {
    setResetCanvas(true);
    setInterval(() => setResetCanvas(false), 1000);
  }

  const exportCanvas = () => {
    const dataURL = canvasRef.current.toDataURL("image/png");
    const newTab = window.open('about:blank','image from canvas');
    newTab.document.write("<img src='" + dataURL + "' alt='from canvas'/>");
  }

  const changeSelectedColor = (color) => {
    setSelectedColor(color);
  }

  // TODO: Need a way to make this update canvas without resetting the drawing
  // const handleZoom = (e) => {
  //   if (e.deltaY > 0) {
  //     setPixelSize(pixelSize / 2);
  //   }

  //   if (e.deltaY < 0) {
  //     setPixelSize(pixelSize * 2);
  //   }
  // }

  return (
    <div className="App">
      <h1>Pixel Art Creator</h1>
      {showSetup && <SetupForm createProject={createProject} />}
      {!showSetup && <div>
        <div style={{padding: '10px'}}>
          <label for="toggleGrid">Show Grid: </label>
          <input type="checkbox" id="toggleGrid" defaultChecked='true' onChange={(e) => setShowGrid(e.target.checked)} />
        </div>
        <div style={{display: 'flex', justifyContent: 'center', gap: '20px'}}>
          <button type='button' style={{marginBottom: '10px'}} onClick={handleReset}>Reset</button>
          <ColorSelector changeSelectedColor={changeSelectedColor} color={'black'} />
          <ColorSelector changeSelectedColor={changeSelectedColor} color={'red'} />
          <ColorSelector changeSelectedColor={changeSelectedColor} color={'blue'} />
          <ColorSelector changeSelectedColor={changeSelectedColor} color={'green'} />
          <ColorSelector changeSelectedColor={changeSelectedColor} color={'yellow'} />
          <button type='button' style={{marginBottom: '10px'}} onClick={exportCanvas}>Export to PNG</button>
        </div>
        {showGrid && <Grid canvasHeight={canvasHeight} canvasWidth={canvasWidth} pixelSize={pixelSize} selectedColor={selectedColor} />}
        <Canvas canvasRef={canvasRef} canvasHeight={canvasHeight} canvasWidth={canvasWidth} pixelSize={pixelSize} selectedColor={selectedColor}
          resetCanvas={resetCanvas} />
        </div>}
    </div>
  );
}

export default App;

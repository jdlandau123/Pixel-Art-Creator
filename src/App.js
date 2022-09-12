import { useState, useRef } from 'react';
import './App.css';
import './reusableStyles.css';
import Canvas from './Canvas';
import Grid from './Grid';
import SetupForm from './SetupForm';
import ColorSelector from './ColorSelector';
import { HexColorPicker } from "react-colorful";


function App() {
  const [projectName, setProjectName] = useState('');
  const [canvasWidth, setCanvasWidth] = useState(32);
  const [canvasHeight, setCanvasHeight] = useState(32);
  const [pixelSize, setPixelSize] = useState(16);
  const [showSetup, setShowSetup] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [selectedColor, setSelectedColor] = useState('black');
  const [resetCanvas, setResetCanvas] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [savedColors, setSavedColors] = useState([
    '#000000', '#413E3D', '#CF2525', '#13D3E7', '#1C3ADE', '#33EA16', '#1A9029', '#E9AF1C', '#ECEE19'
  ]);
  const [isGetColor, setIsGetColor] = useState(false);

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

  const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  const getColorAtPixel = (x, y, context) => {
    const pixelData = context.getImageData(x, y, 1, 1).data;
    const pixelHex = rgbToHex(pixelData[0], pixelData[1], pixelData[2]);
    setSelectedColor(pixelHex);
    setIsGetColor(false);
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
        <div className='sidebar' id='leftSidebar' style={{left: '0'}}>
          <p>Project: {projectName}</p>
          <div style={{padding: '10px'}}>
            <label className='sidebarText' for="toggleGrid">Show Grid: </label>
            <input type="checkbox" id="toggleGrid" defaultChecked='true' onChange={(e) => setShowGrid(e.target.checked)} />
          </div>
          <button className='mainBtn' type='button' style={{marginBottom: '10px'}} onClick={handleReset}>Reset</button>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
            <p className='sidebarText'>Current color: </p>
            <ColorSelector changeSelectedColor={changeSelectedColor} color={selectedColor} />
          </div>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', padding: '20px 10px',
            gap: '10px', flexWrap: 'wrap'}}>
            {savedColors.map((c) => <ColorSelector changeSelectedColor={changeSelectedColor} color={c} />)}
          </div>
          {showColorPicker && <HexColorPicker color={selectedColor} onChange={setSelectedColor} />}
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
            <button className='mainBtn' type='button' style={{margin: '10px 0'}} 
              onClick={() => setShowColorPicker(!showColorPicker)}>{showColorPicker ? 'Finish' : 'Add Color'}</button>
            {showColorPicker && <button className='mainBtn' type='button' style={{margin: '10px 0'}} 
              onClick={() => setSavedColors([...savedColors, selectedColor])}>Add</button>}
          </div>
          <button className='mainBtn' type='button' style={{marginBottom: '10px'}} onClick={exportCanvas}>Export to PNG</button>
        </div>
        {showGrid && <Grid canvasHeight={canvasHeight} canvasWidth={canvasWidth} pixelSize={pixelSize} selectedColor={selectedColor} />}
        <Canvas canvasRef={canvasRef} canvasHeight={canvasHeight} canvasWidth={canvasWidth} pixelSize={pixelSize}
          selectedColor={selectedColor} resetCanvas={resetCanvas} getColorAtPixel={getColorAtPixel} isGetColor={isGetColor} />
        <div className='sidebar' id='rightSidebar' style={{right: '0'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: '20px'}}>
            <img className='icons' src="/eraser-icon.svg" onClick={() => setSelectedColor('#FFFFFF')}></img>
            <img className='icons' src="/color-dropper-icon.svg" onClick={() => setIsGetColor(true)}
              style={{border: `${isGetColor ? '1.5pt solid black' : 'none'}`}}></img>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default App;

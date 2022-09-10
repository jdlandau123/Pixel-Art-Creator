import { useState } from 'react';

export function SetupForm(props) {
    const { createProject } = props;

    const [projectNameInput, setProjectNameInput] = useState('No Name');
    const [widthInput, setWidthInput] = useState(64);
    const [heightInput, setHeightInput] = useState(64);
    const [pixelSizeInput, setPixelSizeInput] = useState(16);

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div>
                <label for='projectNameInput' style={{display: 'block'}}>Project Name</label>
                <input type='text' id='projectNameInput' style={{width: '30rem'}} 
                    onChange={(e) => setProjectNameInput(e.target.value)} />
            </div>
            <div style={{padding: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width:'30%'}}>
                <div>
                    <label for='projectWidthInput'>Width(px)</label>
                    <input type='text' id='projectWidthInput' style={{margin: '0 10px', width: '25%'}} defaultValue='64'
                        onChange={(e) => setWidthInput(e.target.value)} />
                </div>
                <div>
                    <label for='projectHeightInput'>Height(px)</label>
                    <input type='text' id='projectHeightInput' style={{margin: '0 10px', width: '25%'}} defaultValue='64'
                        onChange={(e) => setHeightInput(e.target.value)} />
                </div>
            </div>
            <div style={{padding: '10px'}}>
                <label for='pixelSizeInput'>Pixel Size</label>
                <input type='text' id='pixelSizeInput' style={{margin: '0 10px', width: '25%'}} defaultValue='16'
                    onChange={(e) => setPixelSizeInput(e.target.value)} />
            </div>
            <button type='button' onClick={() => createProject(widthInput, heightInput, pixelSizeInput, projectNameInput)}>
                Create New Project
            </button>
        </div>
    )
}

export default SetupForm;
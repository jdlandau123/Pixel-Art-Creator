import './reusableStyles.css';
import { useState } from 'react';

export function SetupForm(props) {
    const { createProject, login, isLoggedIn, loginError, signUp } = props;

    const [projectNameInput, setProjectNameInput] = useState('');
    const [widthInput, setWidthInput] = useState(32);
    const [heightInput, setHeightInput] = useState(32);
    const [pixelSizeInput, setPixelSizeInput] = useState(16);
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [hideLogin, setHideLogin] = useState(false);

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {!isLoggedIn && !hideLogin ? <div id='loginForm'>
                {loginError && <p style={{color: 'red'}}>{loginError}</p>}
                <div>
                    <label for='usernameInput' style={{display: 'block'}}>Username</label>
                    <input className='textInput' type='text' id='usernameInput' style={{width: '30rem'}} 
                        onChange={(e) => setUsernameInput(e.target.value)} />
                </div>
                <div>
                    <label for='passwordInput' style={{display: 'block'}}>Password</label>
                    <input className='textInput' type='password' id='passwordInput' style={{width: '30rem'}} 
                        onChange={(e) => setPasswordInput(e.target.value)} />
                </div>
                <div style={{display: 'flex', flexDirection: 'column', rowGap: '10px', alignItems: 'center'}}>
                    <button className='mainBtn' type='button' style={{marginTop: '10px', width: '5em'}}
                        onClick={() => login(usernameInput, passwordInput)}>Log In</button>
                    <button className='mainBtn' type='button' style={{width: '15em'}}
                        onClick={() => setHideLogin(true)}>Continue as Guest</button>
                    <div>
                        <p>Don't have an account? 
                            <button className='mainBtn' type='button' style={{marginLeft: '10px'}}
                                onClick={() => signUp(usernameInput, passwordInput)}>
                                Sign Up
                            </button>
                        </p>
                    </div>
                </div>
            </div> : null}
            {(isLoggedIn || hideLogin) && <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div>
                    <label for='projectNameInput' style={{display: 'block'}}>Project Name</label>
                    <input className='textInput' type='text' id='projectNameInput' style={{width: '30rem'}} 
                        onChange={(e) => setProjectNameInput(e.target.value)} />
                </div>
                <div style={{padding: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width:'50%'}}>
                    <label for='projectWidthInput'>Width(px)</label>
                    <input className='textInput' type='text' id='projectWidthInput' style={{margin: '0 10px', width: '50%'}}
                        defaultValue='32' onChange={(e) => setWidthInput(e.target.value)} />
                    <label for='projectHeightInput'>Height(px)</label>
                    <input className='textInput' type='text' id='projectHeightInput' style={{margin: '0 10px', width: '50%'}}
                        defaultValue='32' onChange={(e) => setHeightInput(e.target.value)} />
                </div>
                <div style={{padding: '10px'}}>
                    <label for='pixelSizeInput'>Pixel Size</label>
                    <input className='textInput' type='text' id='pixelSizeInput' style={{margin: '0 10px', width: '25%'}}
                        defaultValue='16' onChange={(e) => setPixelSizeInput(e.target.value)} />
                </div>
                <br />
                <button className='mainBtn' type='button'
                    onClick={() => createProject(widthInput, heightInput, pixelSizeInput, projectNameInput)}>
                    Create New Project
                </button>
            </div>}
        </div>
    )
}

export default SetupForm;

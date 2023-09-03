import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'

const Logo = () => {
    return (
        <div className="ma4 mt0 left w2">
            <Tilt>
                <div className="br3" style={{ height: '100px', width: '100px', backgroundColor: 'lightgreen' }}>
                    <h1><img className="center " style={{ height: '80px', width: '80px', paddingTop: '12px' }} src={brain} alt="logo" /></h1>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;
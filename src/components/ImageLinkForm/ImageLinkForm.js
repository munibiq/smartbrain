import React from "react";
import "./ImageLinkForm.css"


const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className="f3 center red">
                {'This Magic Brain will detect faces in your pictures. Try it now'}
            </p>
            <div className="center">
                <div className="pa4 br3 shadow-5 form center">
                    <input className="f4 pa2 w-70 center" type="text" onChange={onInputChange}></input>
                    <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-green"
                    onClick={onButtonSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
    )
}



export default ImageLinkForm;
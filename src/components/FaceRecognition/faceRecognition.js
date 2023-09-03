import React from "react";
import "./faceRecognition.css"

// const faceRecognition = ({imageURL, box}) => {
//     console.log('check', imageURL)
//     console.log('box', box);
//     return (
//         <div className="center pa5">
//             <div className="absolute mt2">
//                 <img id='inputImage' alt="" src={imageURL} width={'500px'} height={'auto'} />
//             </div>
//             <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
//         </div>
//     );
// }

// export default faceRecognition;

// const FaceRecognition = ({ imageURL, box }) => {
//     console.log('check', imageURL);
//     console.log('box', box);
  
//     return (
//       <div className="center pa5">
//             <div className="absolute mt2">
//                 <img id="inputImage" alt="" src={imageURL} width={'500px'} height={'auto'} />
//                 <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol, border: '50px solid red'}}></div>
//             </div>
//         </div>
//     );
//   };

const FaceRecognition = ({ imageURL, box }) => {
    console.log('check', imageURL);
    console.log('box', box);
  
    const faceBoxes = box && box.faceBoxes ? box.faceBoxes : [];
  
    return (
      <div className="center pa5">
        <div className="absolute mt2">
          <img id="inputImage" alt="" src={imageURL} width={'500px'} height={'auto'} />
          {faceBoxes.map((faceBox, index) => (
            <div
              key={index}
              className="bounding-box"
              style={{
                top: faceBox.topRow,
                right: faceBox.rightCol,
                bottom: faceBox.bottomRow,
                left: faceBox.leftCol,
                border: '2px solid red', // Add a border for debugging purposes
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  };
  export default FaceRecognition;
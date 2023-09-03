import './App.css';
import { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank'
import ParticlesBackground from './components/Particles/ParticlesBackground';
import FaceRecognition from './components/FaceRecognition/faceRecognition';
import Register from './components/Register/Register'


// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = 'clarifai';       
const APP_ID = 'main';
// Change these to whatever model and image URL you want to use


const intialState = {
  input: '',
  imageURL: '',
  box: {},
  route: 'SignIn',
  isSignedIn: false,
  user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = intialState;
  }



  loadUser = (data) => {
    this.setState( {user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calcFaceLocation = (result) => {
    // console.log('Result:', result);
    // const data = JSON.parse(result);
    const regions = result.outputs[0].data.regions;
  
    // Check if the image element exists
    const image = document.getElementById('inputImage');
    if (!image) {
      console.error('Image element not found.');
      return;
    }
  
    const width = Number(image.width);
    const height = Number(image.height);
  
    const faceBoxes = regions.map((region) => {
      const clarafaiFace = region.region_info.bounding_box;
  
      return {
        leftCol: clarafaiFace.left_col * width,
        topRow: clarafaiFace.top_row * height,
        rightCol: width - clarafaiFace.right_col * width,
        bottomRow: height - clarafaiFace.bottom_row * height,
      };
    });
  
    return faceBoxes;
  };

  
  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: { faceBoxes: box || {} } }); // If box is undefined, set it as an empty object
  };

  onInputChange = (event) => {
    this.setState({input: event.target.value})
    // console.log(this.state.input)
  }

  onButtonSubmit = () => {
    const inputURL = this.state.input.trim(); // Remove leading/trailing whitespace

  // If the inputURL is empty, reset the state and return
    if (!inputURL) {
    this.setState({ imageURL: '', box: {} });
    return;
    }

  this.setState({ imageURL: inputURL });
    // this.setState({imageURL: this.state.input})
    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": this.state.input
                  }
              }
          }
      ]
    });
    // const requestOptions = {
    //   method: 'POST',
    //   headers: {
    //       'Accept': 'application/json',
    //       'Authorization': 'Key ' + PAT
    //   },
    //   body: raw
    // };    
    fetch('https://smapi.cyclic.app:3000/imageurl' , {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        const faceBoxes = this.calcFaceLocation(result);
        this.displayFaceBox(faceBoxes);

          if (faceBoxes && this.state.user.id) {
            fetch('https://smapi.cyclic.app:3000/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log)
          }
        })
        .catch(error => console.log('error', error));
      }
  
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(intialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})}
    this.setState({route: route });
  }
  
  render() {
    // Destructuring for better code readability(Shortforms)
      const {isSignedIn, imageURL, route, box} = this.state;
      return (
        <div>
          <ParticlesBackground className='particles' />
          <Navigation isSignedIn={isSignedIn} onRouteChange={ this.onRouteChange } />
          <Logo />
          { route === 'home'
            ? <div>
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition box={ box } imageURL={ imageURL } />
            </div> 
            : (
              route === 'SignIn'
              ? <SignIn loadUser={this.loadUser} onRouteChange={ this.onRouteChange } />
              : <Register loadUser={this.loadUser} onRouteChange={ this.onRouteChange } />
            )
            }
          </div>
          );
      }
    }

export default App;

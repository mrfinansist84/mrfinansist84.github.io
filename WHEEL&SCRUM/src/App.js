import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const firebaseConfig = {
  apiKey: "AIzaSyCCPf2eBO8OuXoMMBCaQ8xXnznUE0saX-o",
  authDomain: "todo-af545.firebaseapp.com",
  databaseURL: "https://todo-af545.firebaseio.com",
  projectId: "todo-af545",
  storageBucket: "",
  messagingSenderId: "943825692455",
  appId: "1:943825692455:web:70136e83a0a1f7fb"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends React.Component {
  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  state = {
    isSignedIn: undefined,
  };

  componentDidMount() {
    this.unregisterAuthObserver = firebaseApp.auth().onAuthStateChanged((user) => {
      this.setState({isSignedIn: !!user});
    });
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    return (
      <div >
        <div >
          <i >photo</i> My App
        </div>
        <div>This is a cool demo app</div>
        {this.state.isSignedIn !== undefined && !this.state.isSignedIn &&
          <div>
            <StyledFirebaseAuth  uiConfig={this.uiConfig}
                                firebaseAuth={firebaseApp.auth()}/>
          </div>
        }
        {this.state.isSignedIn &&
          <div >
            Hello {firebaseApp.auth().currentUser.displayName}. You are now signed In!
            <a  onClick={() => firebaseApp.auth().signOut()}>Sign-out</a>
          </div>
        }
      </div>
    );
  }
}

export default App;

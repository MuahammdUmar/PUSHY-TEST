import logo from './logo.svg';
import './App.css';
import Pushy from 'pushy-sdk-web';


function App() {

  // Add an import if you installed from npm

// Register visitor's browser for push notifications
Pushy.register({ appId: '6214f12aca130a4f54f56532' }).then(function (deviceToken) {
    // Print device token to console
    console.log('Pushy device token: ' + deviceToken);

    // Send the token to your backend server via an HTTP GET request
    //fetch('https://your.api.hostname/register/device?token=' + deviceToken);

    // Succeeded, optionally do something to alert the user
}).catch(function (err) {
    // Handle registration errors
    console.error(err);
});
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

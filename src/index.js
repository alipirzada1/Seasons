import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import Spinner from "./Spinner";

// Class Based Component
class App extends React.Component {
  // Method1 of initializing state through constructor function
  // constructor(props) {
  //   super(props);

  //   // THIS IS THE ONLY TIME we do direct assignment to this.state
  //   this.state = { lat: null, errorMessage: "" };
  // }

  // This is an alternate way of initializing state outside constructor
  state = { lat: null, errorMessage: "" };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        // IMP Note:- to update our state object we called setState!!!
        this.setState({ lat: position.coords.latitude });

        // We do not!!!
        // this.state.lat = position.coords.latitude;
      },
      (err) => {
        this.setState({ errorMessage: err.message });
      }
    );
  }

  componentDidUpdate() {
    console.log("My component was just updated!!!- it rerendered!");
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return (
        <div className="ui container wide1">
          <div className="ui red message">
            <div className="header">Unable to locate</div>
            <p> {this.state.errorMessage}</p>
          </div>
        </div>
      );
    } else if (!this.state.errorMessage && this.state.lat) {
      return (
        // <div className="">
        // <div className="ui container wide1">
        // <div className="ui positive message">
        // {/* <i className="close icon"></i> */}
        // {/* <div className="header">Your Coordinates:</div> */}
        <div>
          <SeasonDisplay lat={this.state.lat} />
        </div>
        // </div>
        // </div>
        // </div>
      );
    } else {
      return <Spinner message="Please accept location request" />;
    }
  }

  // React says we have to define render method!!!
  render() {
    return <div className="borderred1">{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));

if (module.hot) {
  module.hot.accept();
}

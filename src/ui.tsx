import * as React from "react";
import * as ReactDOM from "react-dom";
import "./ui.css";

class App extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <ul>
          <li>
            <a href="#" className="active">
              Tokens
            </a>
          </li>
          <li>
            <a href="#">CSS</a>
          </li>
          <li>
            <a href="#">SCSS</a>
          </li>
          <li>
            <a href="#">JSON</a>
          </li>
        </ul>
      </nav>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("react-page"));

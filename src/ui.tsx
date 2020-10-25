import * as React from "react";
import * as ReactDOM from "react-dom";
import PencilIcon from "./components/icons/PencilIcon";
import PlusIcon from "./components/icons/PlusIcon";
import "./ui.css";

class App extends React.Component {
  render() {
    return (
      <>
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

        <main>
          <section className="tokens-section">
            <div className="tokens-section-header">
              <h3>Colors</h3>

              <div>
                <button type="button" className="btn-icon mg-right-sm">
                  <PencilIcon />
                </button>

                <button type="button" className="btn-icon">
                  <PlusIcon />
                </button>
              </div>
            </div>

            <div className="mg-top-lg">
              <p className="color-gray">Add your tokens...</p>
            </div>
          </section>
        </main>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("react-page"));

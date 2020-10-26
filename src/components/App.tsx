import * as React from "react";
import PencilIcon from "./icons/PencilIcon";
import PlusIcon from "./icons/PlusIcon";
import CloseIcon from "./icons/CloseIcon";
import "../styles/main.css";

const App = () => {
  const addToken = () => {
    document.querySelector("#modal").classList.add("active");
  };

  const closeDialog = () => {
    document.querySelector("#modal").classList.remove("active");
  };

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

              <button type="button" className="btn-icon" onClick={addToken}>
                <PlusIcon />
              </button>
            </div>
          </div>

          <div className="mg-top-lg">
            <p className="color-gray">Add your tokens...</p>
          </div>
        </section>

        <div id="modal">
          <div className="modal-dialog">
            <div className="modal-dialog-header">
              <h2>Colors</h2>

              <button type="button" className="btn-icon" onClick={closeDialog}>
                <CloseIcon />
              </button>
            </div>

            <form className="modal-dialog-body">
              <div className="input-group">
                <label htmlFor="name">Name</label>
                <input id="name" className="input" />
              </div>

              <div className="input-group">
                <label htmlFor="value">Value</label>
                <input id="value" className="input" />
              </div>

              <div className="modal-dialog-footer">
                <button type="submit" className="btn-primary">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default App;

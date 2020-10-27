import * as React from "react";
import PencilIcon from "./icons/PencilIcon";
import PlusIcon from "./icons/PlusIcon";
import CloseIcon from "./icons/CloseIcon";
import "../styles/main.css";

const App = () => {
  const [colorTokens, setColorTokens] = React.useState([
    {
      id: "22cb8e4e-7826-4d8f-818e-e039bc994117",
      type: "color",
      name: "color-primary",
      value: "#18a0fb",
    },
    {
      id: "13c91362-e71c-4aa6-9bff-1de159bf2f14",
      type: "color",
      name: "color-dark",
      value: "#333",
    },
    {
      id: "13c91362-e71c-4aa6-9bff-1de159bf2f14",
      type: "color",
      name: "color-gray-light",
      value: "#e3e1e1",
    },
    {
      id: "1db61162-2eff-4ae9-b187-3e12313d2a24",
      type: "color",
      name: "color-gray",
      value: "#bab6b6",
    },
  ]);

  const openModal = () => {
    document.querySelector("#modal").classList.add("active");
  };

  const closeModal = () => {
    document.querySelector("#modal").classList.remove("active");
  };

  const onSubmitColorToken = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const renderColorTokens = () => {
    return (
      <div className="row mg-top-lg">
        {colorTokens.map((colorToken) => (
          <button key={colorToken.id} className="color-token">
            <span
              className="color-token-shape"
              style={{ backgroundColor: colorToken.value }}
            ></span>
            <span>{colorToken.name}</span>
          </button>
        ))}
      </div>
    );
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

              <button type="button" className="btn-icon" onClick={openModal}>
                <PlusIcon />
              </button>
            </div>
          </div>

          {colorTokens.length === 0 ? (
            <div className="mg-top-lg">
              <p className="color-gray">Add your tokens...</p>
            </div>
          ) : (
            renderColorTokens()
          )}
        </section>

        <div id="modal">
          <div className="modal-dialog">
            <div className="modal-dialog-header">
              <h2>Colors</h2>

              <button type="button" className="btn-icon" onClick={closeModal}>
                <CloseIcon />
              </button>
            </div>

            <form className="modal-dialog-body" onSubmit={onSubmitColorToken}>
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

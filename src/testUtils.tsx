import * as React from "react";
import { render } from "@testing-library/react";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./ui/redux/store";

const Providers = ({ children }) => {
  return <ReduxProvider store={configureStore()}>{children}</ReduxProvider>;
};

const customRender = (ui) => {
  return render(ui, {
    wrapper: Providers,
  });
};

export * from "@testing-library/react";
export { customRender as render };

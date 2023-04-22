import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* Redux Persistor */}
    <PersistGate persistor={persistor}>
      {/* Redux Store */}
      <Provider store={store}>
        {/* My App */}
        <App />
      </Provider>
    </PersistGate>
  </React.StrictMode>
);

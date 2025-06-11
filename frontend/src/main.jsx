import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import { store, persistor } from "./store/store"; // update path
// import { PersistGate } from "redux-persist/integration/react";
import { store } from "./store/store.jsx";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <StrictMode>
      <App />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#facc15", // yellow-400
            color: "#1f2937", // gray-800
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          },
        }}
      />
    </StrictMode>
    {/* </PersistGate> */}
  </Provider>
);

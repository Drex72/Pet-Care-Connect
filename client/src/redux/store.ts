import userReducer from "./UserSlice";
import authScreenImageReducer from "./AuthScreenImageSlice";
import registrationFormReducer from "./RegistrationFormSlice";
import sidebarReducer from "./sidebarSlice";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

// Reducers
const rootReducer = combineReducers({
  userReducer,
  authScreenImageReducer,
  registrationFormReducer,
  sidebarReducer,
});

// Redux Persistor Configuration
const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
  whitelist: ["userReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
export const persistor = persistStore(store);

export type IRootState = ReturnType<typeof store.getState>;

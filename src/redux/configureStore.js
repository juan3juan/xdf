import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/index";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
// import AsyncStorage from "@react-native-community/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

// export default function configureStore() {
//   const composeEnhancers =
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

//   return createStore(
//     rootReducer,
//     composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
//   );
// }

const persistConfig = {
  key: "root",
  storage: storageSession,
  //   whitelist: ["clientReducer", "leadReducer"],
  //   blacklist: [],
  stateReconciler: autoMergeLevel2 // 查看 'Merge Process' 部分的具体情况
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk, reduxImmutableStateInvariant())
);

let persistor = persistStore(store);

export { store, persistor };

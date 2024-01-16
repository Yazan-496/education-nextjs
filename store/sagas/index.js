import { all } from "redux-saga/effects";
import { AuthSaga } from "./auth"; // Import your feature sagas here

function* rootSaga() {
  yield all([AuthSaga()]);
}

export default rootSaga;

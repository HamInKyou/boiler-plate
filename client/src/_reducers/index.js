import { combineReducers } from "redux";
import user from "./user_reducer";

//Store에는 Reducer들이 여러개 있을 수 있다.
//왜? -> Reducer 안에서 하는 일이 어떻게 State가 변화하는지 보여준 다음에
//변한 그 마지막 값을 리턴해주는게 Reducer인데,
//State따라 Reducer가 나뉘어져 있다.
//이 나뉘어진 Reducer들을 combineReducer라는 것을 이용해서
//rootReducer에서 하나로 합쳐준다!
const rootReducer = combineReducers({
  user,
});

export default rootReducer;

import { useDispatch } from "react-redux";
import { ActionCreatorsMapObject, bindActionCreators } from "redux";

export const useReduxActions = (action: ActionCreatorsMapObject<any>) => {
  const dispatch = useDispatch();

  return bindActionCreators(Object.assign({}, action), dispatch);
};

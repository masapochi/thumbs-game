import type { Player, Call, Raise } from "../types";

type YouAction =
  | { type: "RESET_CALL_RAISE" }
  | { type: "SET_CALL"; callNum: number }
  | { type: "SET_RAISE"; raiseNum: number }
  | { type: "THUMBS_CHANGE" }
  | { type: "THUMBS_RESET" }
  | { type: "REDUCE_REMAIN" };

export function youReducer(state: Player, action: YouAction): Player {
  switch (action.type) {
    case "RESET_CALL_RAISE":
      return { ...state, call: null, raise: null };
    case "SET_CALL":
      return { ...state, call: action.callNum as Call };
    case "SET_RAISE":
      return { ...state, raise: action.raiseNum as Raise };
    case "THUMBS_CHANGE":
      if (state.raise === 0) {
        return { ...state, left: "DOWN", right: "DOWN" };
      } else if (state.raise === 1) {
        return { ...state, left: "DOWN", right: "UP" };
      } else {
        return { ...state, left: "UP", right: "UP" };
      }
    case "THUMBS_RESET":
      return { ...state, left: "DOWN", right: "DOWN" };
    case "REDUCE_REMAIN":
      return { ...state, remain: (state.remain - 1) as Raise };
    default:
      throw new Error("error");
  }
}

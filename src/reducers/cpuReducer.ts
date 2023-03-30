import type { Player, Call, Raise } from "../types";
import { randomNum } from "../libs/utils";

type CpuAction =
  | { type: "RESET_CALL" }
  | { type: "SET_CALL"; totalRemainCount: number }
  | { type: "SET_RAISE" }
  | { type: "THUMBS_CHANGE" }
  | { type: "THUMBS_RESET" }
  | { type: "REDUCE_REMAIN" };

export function cpuReducer(state: Player, action: CpuAction): Player {
  switch (action.type) {
    case "RESET_CALL":
      return { ...state, call: null };
    case "SET_CALL":
      return { ...state, call: randomNum(action.totalRemainCount) as Call };
    case "SET_RAISE":
      return { ...state, raise: randomNum(state.remain) as Raise };
    case "THUMBS_CHANGE":
      if (state.raise === 0) {
        return { ...state, left: "DOWN", right: "DOWN" };
      } else if (state.raise === 1) {
        return { ...state, left: "UP", right: "DOWN" };
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

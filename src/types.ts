export type Process =
  | "NEUTRAL"
  | "READY"
  | "JUDGING"
  | "MATCH"
  | "DRAW"
  | "DONE"
  | "FINISH";

export type Raise = 0 | 1 | 2;
export type Call = 0 | 1 | 2 | 3 | 4;

export type PlayerType = "YOU" | "CPU";

export type ThumbForm = "DOWN" | "UP";

export type Player = {
  name: PlayerType;
  left: ThumbForm;
  right: ThumbForm;
  remain: Raise;
  raise: Raise | null;
  call: Call | null;
};

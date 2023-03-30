import type { Player } from "../types";
import YouRightDown from "../assets/images/you/right/down.svg";
import YouRightUp from "../assets/images/you/right/up.svg";
import YouRightLost from "../assets/images/you/right/lost.svg";

import YouLeftDwon from "../assets/images/you/left/down.svg";
import YouLeftUp from "../assets/images/you/left/up.svg";
import YouLeftLost from "../assets/images/you/left/lost.svg";

type Props = {
  player: Player;
};

export function YouHands({ player }: Props): JSX.Element {
  const { remain, left, right } = player;

  let leftSrc = YouLeftLost;

  if (remain === 2) {
    leftSrc = left === "DOWN" ? YouLeftDwon : YouLeftUp;
  }

  let rightSrc = right === "DOWN" ? YouRightDown : YouRightUp;
  if (remain === 0) {
    rightSrc = YouRightLost;
  }

  return (
    <>
      <img src={leftSrc} alt="" />
      <img src={rightSrc} alt="" />
    </>
  );
}

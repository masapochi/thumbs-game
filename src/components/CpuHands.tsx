import type { Player } from "../types";
import CpuLeftDown from "../assets/images/cpu/left/down.svg";
import CpuLeftUp from "../assets/images/cpu/left/up.svg";
import CpuLeftLost from "../assets/images/cpu/left/lost.svg";
import CpuRightDown from "../assets/images/cpu/right/down.svg";
import CpuRightUp from "../assets/images/cpu/right/up.svg";
import CpuRightLost from "../assets/images/cpu/right/lost.svg";

type Props = {
  player: Player;
};

export function CputHands({ player }: Props): JSX.Element {
  const { remain, left, right } = player;

  let leftSrc = left === "DOWN" ? CpuLeftDown : CpuLeftUp;
  if (remain === 0) {
    leftSrc = CpuLeftLost;
  }

  let rightSrc = CpuRightLost;

  if (remain === 2) {
    rightSrc = right === "DOWN" ? CpuRightDown : CpuRightUp;
  }

  return (
    <>
      <img src={rightSrc} alt="" />
      <img src={leftSrc} alt="" />
    </>
  );
}

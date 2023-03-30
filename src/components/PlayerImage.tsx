import type { Player, PlayerType, Process } from "../types";
import Happy from "../assets/images/faces/happy.svg";
import Sad from "../assets/images/faces/sad.svg";
import Draw from "../assets/images/faces/draw.svg";
import Win from "../assets/images/faces/win.svg";
import Lose from "../assets/images/faces/lose.svg";
import { CputHands } from "./CpuHands";
import { YouHands } from "./YouHands";

type Props = {
  player: Player;
  process: Process;
  turn: PlayerType;
  className?: string;
};

export function PlayerImage({
  player,
  process,
  turn,
  className = "",
}: Props): JSX.Element {
  const handMap = {
    CPU: <CputHands player={player} />,
    YOU: <YouHands player={player} />,
  };

  return (
    <>
      <div className={`flex justify-center gap-6 ${className}`}>
        {process === "DRAW" ? (
          <img src={Draw} alt="" />
        ) : process === "MATCH" && turn === player.name ? (
          <img src={Happy} alt="" />
        ) : process === "MATCH" && turn !== player.name ? (
          <img src={Sad} alt="" />
        ) : process === "FINISH" && player.remain === 0 ? (
          <img src={Win} alt="" />
        ) : process === "FINISH" && player.remain !== 0 ? (
          <img src={Lose} alt="" />
        ) : (
          <>{handMap[player.name]}</>
        )}
      </div>
    </>
  );
}

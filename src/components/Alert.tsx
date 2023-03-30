import type { Player, PlayerType, Process } from "../types";
import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";
type Props = {
  process: Process;
  cpu: Player;
  you: Player;
  turn: PlayerType;
  round: number;
  className?: string;
};

export function Alert({
  className = "",
  process,
  cpu,
  you,
  turn,
  round,
}: Props): JSX.Element {
  const isYourTurn = turn === "YOU" ? true : false;
  return (
    <div
      className={`${className} flex flex-col justify-center text-white text-4xl`}
    >
      {!isYourTurn && (
        <span className="text-base">
          <BsFillCaretUpFill className="inline-block text-emerald-500" />
        </span>
      )}
      <div className="text-lg text-red-400 mb-1">Round {round}</div>

      {process === "NEUTRAL" ? (
        <>{isYourTurn ? "Your Turn" : "CPU's Turn"}</>
      ) : process === "READY" ? (
        <>Ready...</>
      ) : process === "JUDGING" ? (
        <>
          <span className="text-emerald-400 font-bold">
            {isYourTurn ? you.call : cpu.call}
          </span>
        </>
      ) : process === "MATCH" ? (
        <>{isYourTurn ? "Your hit!" : "CPU's hit!"}</>
      ) : process === "DRAW" ? (
        <>Draw...</>
      ) : process === "DONE" ? (
        <></>
      ) : process === "FINISH" ? (
        <>
          <span className="text-yellow-500">
            {you.remain === 0
              ? "You Win!"
              : cpu.remain === 0
              ? "You Lose..."
              : ""}
          </span>
        </>
      ) : null}
      {isYourTurn && (
        <span className="text-base">
          <BsFillCaretDownFill className="inline-block text-emerald-500" />
        </span>
      )}
    </div>
  );
}

import { useEffect, useReducer, useState } from "react";

import type { Player, Process, PlayerType, Raise } from "./types";
import {
  PlayerImage,
  Alert,
  Button,
  PlayButton,
  PlayAgainButton,
} from "./components";
import { cpuReducer, youReducer } from "./reducers";

const defaultCpu: Player = {
  name: "CPU",
  left: "DOWN",
  right: "DOWN",
  remain: 2,
  raise: 0,
  call: 0,
};

const defaultYou: Player = {
  name: "YOU",
  left: "DOWN",
  right: "DOWN",
  remain: 2,
  raise: null,
  call: null,
};

function App() {
  const [cpu, cpuDispatch] = useReducer(cpuReducer, defaultCpu);
  const [you, youDispatch] = useReducer(youReducer, defaultYou);
  const [process, setProcess] = useState<Process>("NEUTRAL");
  const [round, setRound] = useState<number>(1);
  const [turn, setTurn] = useState<PlayerType>("YOU");

  const isYourTurn = turn === "YOU" ? true : false;
  const isCpuTurn = !isYourTurn;
  const totalRemainCount = you.remain + cpu.remain;
  const totalRaiseCount = (you.raise as Raise) + (cpu.raise as Raise);
  const hasMatched =
    cpu.call === totalRaiseCount || you.call === totalRaiseCount;
  const isNeutral = process === "NEUTRAL";
  const canFight =
    (isYourTurn && you.call !== null && you.raise !== null) ||
    (isCpuTurn && you.raise !== null);

  useEffect(() => {
    if (isCpuTurn) {
      cpuDispatch({ type: "SET_CALL", totalRemainCount });
    } else {
      cpuDispatch({ type: "RESET_CALL" });
    }
    cpuDispatch({ type: "SET_RAISE" });
  }, [round]);

  async function asyncProcess(
    process: Process,
    milliseconds: number = 2000
  ): Promise<void> {
    console.log(process);
    await new Promise<void>((resolve) =>
      setTimeout(() => resolve(setProcess(() => process)), milliseconds)
    );
  }

  function reduceCpuRemain(): number {
    const remain =
      cpu.call === totalRaiseCount ? ((cpu.remain - 1) as Raise) : cpu.remain;
    cpuDispatch({ type: "REDUCE_REMAIN" });
    return remain;
  }

  function reduceYouRemain(): number {
    const remain =
      you.call === totalRaiseCount ? ((you.remain - 1) as Raise) : you.remain;
    youDispatch({ type: "REDUCE_REMAIN" });
    return remain;
  }

  function setYouCall(num: number) {
    youDispatch({ type: "SET_CALL", callNum: num });
  }
  function setYouRaise(num: number) {
    youDispatch({ type: "SET_RAISE", raiseNum: num });
  }

  async function handleClick() {
    await asyncProcess("READY", 0);

    await asyncProcess("JUDGING");
    cpuDispatch({ type: "THUMBS_CHANGE" });
    youDispatch({ type: "THUMBS_CHANGE" });

    let cpuRemain = null;
    let youRemain = null;
    if (hasMatched) {
      await asyncProcess("MATCH");
      if (isYourTurn) {
        youRemain = reduceYouRemain();
      } else {
        cpuRemain = reduceCpuRemain();
      }
    } else {
      await asyncProcess("DRAW");
    }

    if (youRemain === 0 || cpuRemain === 0) {
      await asyncProcess("FINISH");
    } else {
      await asyncProcess("NEUTRAL");
      isCpuTurn ? setTurn(() => "YOU") : setTurn(() => "CPU");
      setRound((current) => current + 1);
      youDispatch({ type: "RESET_CALL_RAISE" });
      cpuDispatch({ type: "THUMBS_RESET" });
      youDispatch({ type: "THUMBS_RESET" });
    }
  }
  const bgStyle = {
    background:
      "radial-gradient(circle, rgba(15,13,69,1) 0%, rgba(33,34,125,1) 100%)",
  };
  const contentStyle = {
    background: "radial-gradient(circle, #262185 0%, #4648c2 100%)",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  };

  return (
    <>
      {/* <div>Round: {round}</div>
      <div>CPU:{JSON.stringify(cpu, null, 2)}</div>
      <div>YOU:{JSON.stringify(you, null, 2)}</div> */}
      <div className="h-screen md:py-6" style={bgStyle}>
        <div
          className="w-screen md:max-w-md mx-auto h-full md:rounded-3xl text-center"
          style={contentStyle}
        >
          <div className="h-screen text-center flex flex-col gap-6 p-6">
            <PlayerImage
              className="h-[16%]"
              player={cpu}
              process={process}
              turn={turn}
            />

            <div className="mt-4">
              <Alert
                className=""
                process={process}
                round={round}
                turn={turn}
                cpu={cpu}
                you={you}
              />
            </div>

            <PlayerImage
              className="h-[16%]"
              player={you}
              process={process}
              turn={turn}
            />

            <div className="">
              <p className="text-white">Call</p>
              <div className="flex gap-4 justify-center mt-3">
                <Button
                  num={0}
                  disabled={isCpuTurn || !isNeutral}
                  current={you.call === 0}
                  handleClick={() => setYouCall(0)}
                />
                <Button
                  num={1}
                  disabled={isCpuTurn || !isNeutral}
                  current={you.call === 1}
                  handleClick={() => setYouCall(1)}
                />
                <Button
                  num={2}
                  disabled={isCpuTurn || !isNeutral}
                  current={you.call === 2}
                  handleClick={() => setYouCall(2)}
                />
                <Button
                  num={3}
                  disabled={isCpuTurn || !isNeutral || totalRemainCount < 3}
                  current={you.call === 3}
                  handleClick={() => setYouCall(3)}
                />
                <Button
                  num={4}
                  disabled={isCpuTurn || !isNeutral || totalRemainCount < 4}
                  current={you.call === 4}
                  handleClick={() => setYouCall(4)}
                />
              </div>

              <div className="mt-3">
                <p className="text-white">Raise</p>
                <div className="flex gap-4 justify-center mt-3">
                  <Button
                    num={0}
                    disabled={!isNeutral}
                    current={you.raise === 0}
                    handleClick={() => setYouRaise(0)}
                  />
                  <Button
                    num={1}
                    disabled={!isNeutral}
                    current={you.raise === 1}
                    handleClick={() => setYouRaise(1)}
                  />
                  <Button
                    num={2}
                    disabled={you.remain !== 2 || !isNeutral}
                    current={you.raise === 2}
                    handleClick={() => setYouRaise(2)}
                  />
                </div>
              </div>
              <div className="mt-6">
                {process === "FINISH" ? (
                  <PlayAgainButton />
                ) : (
                  <PlayButton
                    canFight={canFight}
                    isNeutral={isNeutral}
                    handleClick={handleClick}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

type Props = {
  canFight: boolean;
  isNeutral: boolean;
  handleClick: () => void;
};

export function PlayButton({
  canFight,
  isNeutral,
  handleClick,
}: Props): JSX.Element {
  const buttonBaseClass = "py-3 px-10 rounded-full text-white text-lg";
  const isActive = canFight && isNeutral;
  const buttonClass = isActive
    ? "bg-violet-500 hover:bg-purple-500 hover:text-white drop-shadow-2xl"
    : "bg-gray-500 text-gray-800 cursor-default";

  return (
    <button
      className={`${buttonBaseClass} ${buttonClass}`}
      disabled={!isActive}
      onClick={handleClick}
    >
      Play
    </button>
  );
}

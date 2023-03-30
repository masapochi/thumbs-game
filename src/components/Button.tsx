type Props = {
  num: number;
  disabled: boolean;
  current: boolean;
  handleClick: () => void;
};

const buttonBaseClass =
  "w-[44px] h-[44px] rounded-full text-lg font-bold drop-shadow-2xl";

export function Button({
  num,
  disabled,
  current,
  handleClick,
}: Props): JSX.Element {
  const buttonClass =
    disabled && !current
      ? "bg-gray-500 text-gray-700 drop-shadow-none cursor-default"
      : current
      ? "bg-emerald-500 text-white cursor-default "
      : "bg-violet-300 hover:bg-purple-500 hover:text-white";

  return (
    <button
      className={`${buttonBaseClass} ${buttonClass}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {num}
    </button>
  );
}

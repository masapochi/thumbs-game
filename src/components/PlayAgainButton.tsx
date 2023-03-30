export function PlayAgainButton(): JSX.Element {
  const buttonClass =
    "inline-block py-3 px-10 rounded-full text-white text-lg bg-violet-500 hover:bg-purple-500 hover:text-white drop-shadow-2xl";

  return (
    <a href="./" className={buttonClass}>
      Play Again
    </a>
  );
}

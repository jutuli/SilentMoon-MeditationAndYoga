interface Props {
  name: string;
  onClick?: () => void;
}

export const ProfileButton: React.FunctionComponent<Props> = ({
  name,
  onClick,
}) => {
  return (
    <button
      className="bg-cream text-pink cursor-pointer rounded-full px-3 w-10 h-10 tracking-widest uppercase absolute -top-7 left-15 z-10 flex justify-center items-center"
      onClick={onClick}
    >
      {name}
    </button>
  );
};

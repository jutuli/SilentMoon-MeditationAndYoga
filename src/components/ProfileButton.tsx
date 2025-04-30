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
      className="bg-cream text-pink cursor-pointer rounded-full px-3 tracking-widest uppercase"
      onClick={onClick}
    >
      {name}
    </button>
  );
};

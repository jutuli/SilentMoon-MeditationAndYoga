interface IinitialFilteringButtonProps {
  text: string;
  isActive: boolean;
  onToggle: () => void;
}

const InitialFilteringButton = ({
  text,
  isActive,
  onToggle,
}: IinitialFilteringButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className={`w-30 rounded-full py-2 font-bold ${isActive ? "bg-pink text-cream" : "text-dark-green bg-gray-100"}`}
    >
      {text}
    </button>
  );
};

export default InitialFilteringButton;

interface IButtonProps {
  text: string;
  onClick?: () => void;
}

const Button = ({ text, onClick }: IButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-pink text-cream w-full cursor-pointer rounded-full py-4 uppercase"
    >
      {text}
    </button>
  );
};

export default Button;

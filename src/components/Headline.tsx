import SilentMoon from "./SilentMoon";

interface Props {
  name: string;
  description: string;
}

const Headline: React.FC<Props> = ({ name, description }) => {
  return (
    <>
      <SilentMoon />
      <div className="text-center">
        <h1 className="mt-14 mb-7 text-4xl font-bold text-dark-green tracking-wider">{name}</h1>
        <p className="text-gray mb-12 text-base">{description}</p>
      </div>
    </>
  );
};

export default Headline;

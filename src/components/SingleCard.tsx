import { Link } from "react-router";
import { ISession } from "../pages/Yoga";

interface Props {
  session: ISession | undefined;
}
export const SingleCart: React.FC<Props> = ({ session }) => {
  if (!session) {
    return <div>. . .</div>;
  }

  return (
    <Link to={"detail"} className="">
      <img
        src={session.image_url}
        alt={session.title}
        className="w-full rounded-4xl"
      />
      <h1>{session.title}</h1>
    </Link>
  );
};

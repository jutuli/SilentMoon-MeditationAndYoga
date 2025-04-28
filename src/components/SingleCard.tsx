import { Link } from "react-router";
import { ISession } from "../pages/Yoga";


interface Props {
  session: ISession | undefined;
  style: string
}
export const SingleCart: React.FC<Props> = ({ session, style }) => {

  if (!session) {
    return <div>. . .</div>;
  }




  return (
    <Link to={`${session.id}`} className="relative">
      <img
        src={session.image_url}
        alt={session.title}
        className={`${style} object-cover object-center rounded-4xl`}
      />
      <h4 className="absolute bottom-0 text-white font-medium tracking-wider px-5 py-5">{session.title}</h4>
    </Link>
  );
};

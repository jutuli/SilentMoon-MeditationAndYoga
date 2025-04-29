import { ReactElement } from "react";

interface Props {
  items: ReactElement[];
  placeholder?: string;
}

export const Carousel: React.FunctionComponent<Props> = ({
  items,
  placeholder: name,
}) => {
  if (!items || items.length < 1) {
    return <div>{name ?? "…"}</div>;
  }
  return (
    <div className="carousel rounded-box">
      {items.map((item, index) => (
        <div className="carousel-item" key={index}>
          {item}
        </div>
      ))}
    </div>
  );
};

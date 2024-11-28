import { Link, Outlet } from "react-router-dom";
import "./collection.modul.scss";
import { storImagePath } from "../../../../../utils/Glob_Functions/GlobalFunction";

const CollectionPage = () => {
  const collections = [
    {
      title: "Askew",
      img: `${storImagePath()}/images/catalog/1.webp`,
    },
    {
      title: "Emra",
      img:`${storImagePath()}/images/catalog/2.webp`,
    },
    {
      title: "Stellar",
      img:`${storImagePath()}/images/catalog/3.webp`,
    },
  ];
  return (
    <div className="hoq_collection_Static">
      <div className="head">
        <h1>Catalog</h1>
      </div>
      <div className="card_col">
        {collections.map((val, i) => {
          return (
            <Card
              img={val?.img}
              title={val?.title}
              link={`/collections/${val?.title}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CollectionPage;

export const Card = ({ img, link, title }) => {
  return (
    <div className="b_card">
      <Link to={link}>
        <img src={img} alt="" />
        <h2>{title}</h2>
      </Link>
    </div>
  );
};

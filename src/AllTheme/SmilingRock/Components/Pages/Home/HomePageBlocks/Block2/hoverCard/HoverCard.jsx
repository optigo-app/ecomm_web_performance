import { useState } from "react";
import './HoverCard.scss';
import { Diamond } from "lucide-react";
import { Link } from "react-router-dom";

export default function HoverCard() {
  const [hoveredItem, setHoveredItem] = useState(null);

  const jewelryItems = [
    {
      id: 1,
      name: "Ruby Radiance Ring",
      image: "https://ourosjewels.com/cdn/shop/files/OJS0447-pink_colored_diamond_engagement_ring_1000x1000.webp?v=1719404705",
      description: "A stunning red ruby surrounded by brilliant diamonds in a platinum setting.",
      price: "$4,250",
      color: "Red",
    },
    {
      id: 2,
      name: "Sapphire Hexagon Ring",
      image: "https://ourosjewels.com/cdn/shop/files/hexagon_cut_halo_diamond_three_stone_ring_1000x1000.webp?v=1734753475",
      description: "Elegant blue sapphire in a unique hexagonal cut with diamond accents.",
      price: "$3,850",
      color: "Blue",
    },
    {
      id: 3,
      name: "Yellow Diamond Flower",
      image: "https://ourosjewels.com/cdn/shop/files/OJS0546-flower_shaped_bezel_set_yellow_diamond_ring_1000x1000.webp?v=1719404705",
      description: "Delicate flower design featuring a yellow diamond center with white diamond petals.",
      price: "$5,200",
      color: "Yellow",
    },
    {
      id: 4,
      name: "Green Emerald Halo",
      image: "https://ourosjewels.com/cdn/shop/files/001-pink_and_green_diamond_halo_engagment_ring_1000x1000.webp?v=1719404705",
      description: "Vibrant green emerald surrounded by pink sapphires in a rose gold setting.",
      price: "$4,750",
      color: "Green",
    },
    {
      id: 5,
      name: "Diamond Butterfly Ring",
      image: "https://ourosjewels.com/cdn/shop/files/OJS0509-olive_diamond_4_clover_leaf_ring_1000x1000.webp?v=1719404705",
      description: "Whimsical butterfly design crafted entirely from white diamonds.",
      price: "$3,950",
      color: "White",
    },
  ];

  return (
    <>
      <div className="jewelry-showcase">
        <div className="jewelry-showcase__content">
          <div className="jewelry-showcase__left">
            <div className="jewelry-showcase__icon">
              <Diamond className="icon" />
            </div>
            <h2 className="jewelry-showcase__title">
              Fancy Colored Rings & Jewelry
            </h2>
            <p className="jewelry-showcase__description">
              Discover the vibrant allure of our fancy colored diamonds rings and jewelry, where each piece is a testament
              to the beauty of color and the innovation of sustainability.
            </p>
          </div>

          <div className="jewelry-showcase__right">
            {jewelryItems.map((item) => (
              <div
                key={item.id}
                className={`jewelry-showcase__item ${hoveredItem === item.id ? "hovered" : "not-hovered"}`}
                style={{
                  width: hoveredItem === item.id ? '50%' : hoveredItem ? '10%' : '19.5%'
                }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="jewelry-showcase__image">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain" />
                  <div
                    className={`jewelry-showcase__overlay ${hoveredItem === item.id ? "visible" : "hidden"}`}
                  >
                    <div className="overlay-content">
                      <h3 className="overlay-title">{item.name}</h3>
                      <div className="overlay-color">{item.color}</div>
                      <p className="overlay-description">{item.description}</p>
                      <p className="overlay-price">{item.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", gap: "1rem", marginTop: "2rem" }}>
        <Link to={"/banner"}>Banner</Link>
        <Link to={"/diamond"}>Diamond</Link>
        <Link to={"/album"}>Album</Link>
        <Link to={"/hero"}>Hero</Link>
      </div> */}
    </>
  );
}

import React from 'react'
import './Category.scss';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';

const Category = () => {

    const DiamondLists = [
        { img: `${storImagePath()}/Stamford/home/shape-ew/bracelet.webp`, name: "Bracelets" },
        { img: `${storImagePath()}/Stamford/home/shape-ew/ring.webp`, name: "Ring" },
        { img: `${storImagePath()}/Stamford/home/shape-ew/pendant.webp`, name: "Pendant" },
        { img: `${storImagePath()}/Stamford/home/shape-ew/necklace.webp`, name: "necklace" },
        { img: `${storImagePath()}/Stamford/home/shape-ew/earring.webp`, name: "Earrings" },
        { img: `${storImagePath()}/Stamford/home/shape-ew/pendant_set.webp`, name: "Pendant set" },
    ];

    return (
        <div className="for_ShapeSection">
            <div className="shape_Section">
                <div className="head">
                    <h3>Shop by Category</h3>
                </div>
                <div className="shape_list">
                    {DiamondLists?.map((val, i) => {
                        return (
                            <div
                                className="shape_card_for"
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                <img src={val?.img} alt="" loading="lazy" />
                                <span>{val?.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Category

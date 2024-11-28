import { GiDiamondRing } from "react-icons/gi";
import { IoDiamondOutline } from "react-icons/io5";
import { storImagePath } from "../../../../utils/Glob_Functions/GlobalFunction";

console.log(`${storImagePath()}/Forevery/writing.png`);
const Writing = (
  <img src={`${storImagePath()}/Forevery/writing.png`} alt="writing" />
);

const Women = (
  <img
    src="https://www.forevery.one/images_new/foreveryimg/wedding-women.png"
    alt=""
  />
);
const Mens = (
  <img
    src="https://www.forevery.one/images_new/foreveryimg/wedding-men.png"
    alt=""
  />
);
const NavbarMenu = [
  {
    category: "Engagement & Wedding Diamonds",
    link: "lab-created-engagement-rings",
    disabled: false,
    submenu: [
      {
        title: ` Engagement Ring`,
        align: "col",
        submenu: [
          {
            icon: <GiDiamondRing />,
            icon2: <IoDiamondOutline />,
            title: "create your own diamond ring",
            menu: ["start with a setting", "Start With a Diamond"],
          },
          {
            title: `shop by style`,
            menu: ["Solitaire", "Halo", "Vintage", "Side Stone", "Designer"],
          },
          {
            title: "Bespoke",
            icon: Writing,
          },
        ],
      },
      {
        title: `Wedding Ring`,
        icon: <GiDiamondRing />,
        submenu: [
          {
            title: "Womens",
            icon: Women,
            align: "row",
            menu: [
              "Classic Rings",
              "Diamond Rings",
              "Eternity Rings",
              "Half-Eternity Rings",
              "Stackable Rings",
            ],
          },
          {
            title: "Mens",
            align: "row",
            icon: Mens,
            menu: ["Carved Rings", "Diamond Rings", "Classic Rings"],
          },
        ],
      },
      {
        img: "https://www.forevery.one/images_new/foreveryimg/engagement-submenu-img.png",
      },
    ],
  },
  {
    category: "Diamond",
    link: "diamond",
    disabled: false,
  },
  {
    category: "High End Jewelry",
    link: "/p/Ikigai/?M=SWtpZ2FpL2NvbGxlY3Rpb24=",
    disabled: false,
    IsB2b : true ,
  },
  // {
  //   category: "Fine Jewelry",
  //   link: "lab-grown-fine-jewelry",
  //   disabled: false,
  // },
  // {
  //   category: "Letter Diamonds",
  //   link: "letter-diamonds/all",
  //   disabled: true,
  // },
];

// Creating an array of diamond objects
const diamondShapes = [
  { name: "Round", img: `${storImagePath()}/Forevery/diamond/i-round.png` },
  { name: "Pear", img: `${storImagePath()}/Forevery/diamond/i-peer.png` },
  {
    name: "Princess",
    img: `${storImagePath()}/Forevery/diamond/i-princess.png`,
  },
  { name: "Asscher", img: `${storImagePath()}/Forevery/diamond/i-asscher.png` },
  { name: "Cushion", img: `${storImagePath()}/Forevery/diamond/i-cushion.png` },
  { name: "Heart", img: `${storImagePath()}/Forevery/diamond/i-heart.png` },
  { name: "Oval", img: `${storImagePath()}/Forevery/diamond/i-oval.png` },
  { name: "Radiant", img: `${storImagePath()}/Forevery/diamond/i-radiant.png` },
  { name: "Emerald", img: `${storImagePath()}/Forevery/diamond/i-emerald.png` },
  {
    name: "Marquise",
    img: `${storImagePath()}/Forevery/diamond/i-marquise.png`,
  },
];
// diamond

const RingCategory = `Ring/category`;
const filterKeyVal1 = btoa(RingCategory);

const RingsNavi = `/certified-loose-lab-grown-diamonds/settings/Ring/diamond_shape=Round/M=${filterKeyVal1}`;
const EaringCategory = `Earring/category`;
const filterKeyVal2 = btoa(EaringCategory);
const EaringNavi = `/certified-loose-lab-grown-diamonds/settings/Earring/diamond_shape=Round/M=${filterKeyVal2}`;
const PendantCategory = `Pendant/category`;
const filterKeyVal3 = btoa(PendantCategory);
const PendantNavi = `/certified-loose-lab-grown-diamonds/settings/Pendant/diamond_shape=Round/M=${filterKeyVal3}`;

const SideItems = [
  {
    name: "Diamond Rings",
    img: `${storImagePath()}/Forevery/diamond/side/wedding-rings.png`,
    link: RingsNavi,
  },
  {
    name: "Diamond Earrings",
    img: `${storImagePath()}/Forevery/diamond/side/easrrings.png`,
    link: EaringNavi,
  },
  {
    name: "Diamond Pendant",
    img: `${storImagePath()}/Forevery/diamond/side/s.png`,
    link: PendantNavi,
  },
];

const setIkigaiLink = "Ikigai/collection";
const encodeLink1 = btoa(setIkigaiLink);
const setHeritageLink = "Heritage/collection";
const encodeLink2 = btoa(setHeritageLink);
const setIconLink = "Icon/collection";
const encodeLink3 = btoa(setIconLink);

const CollectionData = [
  {
    name: "IKIGAI",
    img: `${storImagePath()}/Forevery/collections/ikigai-banner.webp`,
    link: `/p/Ikigai/?M=${encodeLink1}`,
  },
  {
    name: "heritage",
    img: `${storImagePath()}/Forevery/collections/heritage-banner.webp`,
    link: `/p/Heritage/?M=${encodeLink2}`,
  },
  {
    name: "Icon",
    img: `${storImagePath()}/Forevery/collections/icon-banner.webp`,
    link: `/p/Icon/?M=${encodeLink3}`,
  },
];

const CollectionArray = [
  {
    titel: "Engagement Ring",
    img: `${storImagePath()}/Forevery/home/collection/76.webp`,
    link: "lab-created-engagement-rings",
  },
  {
    titel: "Wedding Ring",
    img: `${storImagePath()}/Forevery/home/collection/77.webp`,
    link: "lab-grown-wedding-rings",
  },
  {
    titel: "Diamond Earrings",
    img: `${storImagePath()}/Forevery/home/collection/78.webp`,
    link: EaringNavi,
  },
  {
    titel: "Fine Jewelry",
    img: `${storImagePath()}/Forevery/home/collection/79.webp`,
    link: "lab-grown-fine-jewelry",
  },
];
const shapes = [
  { name: "Round", img: `${storImagePath()}/Forevery/home/shape/round.png` },
  {
    name: "Princess",
    img: `${storImagePath()}/Forevery/home/shape/princess.png`,
  },
  {
    name: "Cushion",
    img: `${storImagePath()}/Forevery/home/shape/cushion.png`,
  },
  {
    name: "Asscher",
    img: `${storImagePath()}/Forevery/home/shape/asscher.jpg`,
  },
  {
    name: "Marquise",
    img: `${storImagePath()}/Forevery/home/shape/marqise.png`,
  },
  { name: "Oval", img: `${storImagePath()}/Forevery/home/shape/oval.png` },
  {
    name: "Radiant",
    img: `${storImagePath()}/Forevery/home/shape/radiant.png`,
  },
  { name: "Pear", img: `${storImagePath()}/Forevery/home/shape/pear.jpg` },
  { name: "Emerald", img: `${storImagePath()}/Forevery/home/shape/emrald.png` },
  { name: "Heart", img: `${storImagePath()}/Forevery/home/shape/heart.png` },
];

const DiamondLists = [
  { img: `${storImagePath()}/Forevery/home/shape-ew/r.png`, name: "Round" },
  { img: `${storImagePath()}/Forevery/home/shape-ew/p.png`, name: "Princess" },
  { img: `${storImagePath()}/Forevery/home/shape-ew/c.png`, name: "Cushion" },
  { img: `${storImagePath()}/Forevery/home/shape-ew/e.png`, name: "Emerald" },
  { img: `${storImagePath()}/Forevery/home/shape-ew/o.png`, name: "Oval" },
  { img: `${storImagePath()}/Forevery/home/shape-ew/rad.png`, name: "Radiant" },
  { img: `${storImagePath()}/Forevery/home/shape-ew/as.png`, name: "Asscher" },
  { img: `${storImagePath()}/Forevery/home/shape-ew/m.png`, name: "Marquise" },
  { img: `${storImagePath()}/Forevery/home/shape-ew/hea.png`, name: "Heart" },
  { img: `${storImagePath()}/Forevery/home/shape-ew/pear.png`, name: "Pear" },
  {
    img: `${storImagePath()}/Forevery/home/shape-ew/bag.png`,
    name: "Baguette",
  },
  { img: `${storImagePath()}/Forevery/home/shape-ew/kite.png`, name: "Kite" },
  {
    img: `${storImagePath()}/Forevery/home/shape-ew/shield.png`,
    name: "Shield",
  },
];

const StepImages = [
  {
    img: `${storImagePath()}/Forevery/diamondFilter/mount-diamond-icon.svg`,
    name: "Diamond",
    link: "diamond",
    eyeIcon: `${storImagePath()}/images/ProductListing/settingNav/eye.png`,
    downIcon: `${storImagePath()}/images/ProductListing/settingNav/down-arrow.png`,
  },
  {
    img: `${storImagePath()}/Forevery/diamondFilter/mount-icon.svg`,
    img1: `${storImagePath()}/Forevery/diamondFilter/easrrings.png`,
    name: "Settings",
    link: "settings",
    eyeIcon: `${storImagePath()}/images/ProductListing/settingNav/eye.png`,
    downIcon: `${storImagePath()}/images/ProductListing/settingNav/down-arrow.png`,
  },
  {
    img: `${storImagePath()}/Forevery/diamondFilter/complete-ring-icon.svg`,
    img1: `${storImagePath()}/Forevery/diamondFilter/easrrings.png`,
    name: "Rings",
    link: "ring",
    eyeIcon: `${storImagePath()}/images/ProductListing/settingNav/eye.png`,
    downIcon: `${storImagePath()}/images/ProductListing/settingNav/down-arrow.png`,
  },
];

const Image = `${storImagePath()}/Forevery/diamondFilter/8-1.png`;
const Video = `${storImagePath()}/Forevery/diamondFilter/video.mp4`;
const IMG = `${storImagePath()}/Forevery/diamondFilter/svg.png`;

const DiamondProductList = [
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    Banner: Image,
    HaveCustomization: false,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    Banner: Image,
    HaveCustomization: false,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    Banner: Image,
    HaveCustomization: false,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    Banner: Image,
    HaveCustomization: false,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    Banner: Image,
    HaveCustomization: false,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    Banner: Image,
    HaveCustomization: false,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    Banner: Image,
    HaveCustomization: false,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    Banner: Image,
    HaveCustomization: false,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    Banner: Image,
    HaveCustomization: false,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    Banner: Image,
    HaveCustomization: false,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    Banner: Image,
    HaveCustomization: false,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    Banner: Image,
    HaveCustomization: false,
  },
];

const LooseDiamond = [
  {
    img: `${storImagePath()}/Forevery/diamond/new/asscher-diamond.png`,
    name: "Asscher",
  },
  {
    img: `${storImagePath()}/Forevery/diamond/new/cushion-diamond.png`,
    name: "Cushion",
  },
  {
    img: `${storImagePath()}/Forevery/diamond/new/emerald-diamond.png`,
    name: "Emerald",
  },
  {
    img: `${storImagePath()}/Forevery/diamond/new/oval-diamond.png`,
    name: "Oval",
  },
  {
    img: `${storImagePath()}/Forevery/diamond/new/round-diamond.png`,
    name: "Round",
  },
  {
    img: `${storImagePath()}/Forevery/diamond/new/asscher-diamond.png`,
    name: "Asscher",
  },
  {
    img: `${storImagePath()}/Forevery/diamond/new/cushion-diamond.png`,
    name: "Cushion",
  },
  {
    img: `${storImagePath()}/Forevery/diamond/new/emerald-diamond.png`,
    name: "Emerald",
  },
  {
    img: `${storImagePath()}/Forevery/diamond/new/oval-diamond.png`,
    name: "Oval",
  },
  {
    img: `${storImagePath()}/Forevery/diamond/new/round-diamond.png`,
    name: "Round",
  },
];

const ringscollection = [
  {
    key: "solitaire",
    image: `${storImagePath()}/Forevery/ring-col/1.webp`,
  },

  {
    key: "halo",
    image: `${storImagePath()}/Forevery/ring-col/4.webp`,
  },
  {
    key: "vintage",
    image: `${storImagePath()}/Forevery/ring-col/7.webp`,
  },
  {
    key: "side stone",
    image: `${storImagePath()}/Forevery/ring-col/10.webp`,
  },
  {
    key: "designer",
    image: `${storImagePath()}/Forevery/ring-col/13.webp`,
  },
];

const StylesCollections = [
  {
    key: "Classic Rings",
    image: `${storImagePath()}/Forevery/ring-col/2/1.webp`,
  },

  {
    key: "Eternity Rings",
    image: `${storImagePath()}/Forevery/ring-col/2/2.webp`,
  },
  {
    key: "Half-Eternity Rings",
    image: `${storImagePath()}/Forevery/ring-col/2/3.webp`,
  },
  {
    key: " Diamond Rings",
    image: `${storImagePath()}/Forevery/ring-col/2/4.webp`,
  },
  {
    key: "Stackable Rings",
    image: `${storImagePath()}/Forevery/ring-col/2/6.png`,
  },
];

const metalcollection = [
  {
    key: "WHITE GOLD",
    image: `${storImagePath()}/Forevery/metalcolor/2.png`,
  },

  {
    key: "ROSE GOLD",
    image: `${storImagePath()}/Forevery/metalcolor/3.jpg`,
  },
  {
    key: "YELLOW GOLD",
    image: `${storImagePath()}/Forevery/metalcolor/4.jpg`,
  },
];
const weddingRingsCollection = [
  {
    id: "womens-wedding-rings",
    title: "Women's Wedding Rings",
    description:
      "Discover Timeless Women's Wedding Rings of Unmatched Quality & Style. Browse our collection today and find the perfect ring to celebrate your 'Forever' Love.",
    link: "/womens-wedding-rings",
    img: `${storImagePath()}/Forevery/ring-col/108.webp`,
    btnText: "Shop womens rings",
  },
  {
    id: "mens-wedding-rings",
    title: "Men's Wedding Rings",
    description:
      "Browse our selection today and make your wedding day unforgettable with the perfect ring for Him.",
    link: "/mens-wedding-rings",
    img: `${storImagePath()}/Forevery/ring-col/109.webp`,
    btnText: "Shop men`s rings",
  },
  {
    id: "wedding-bands",
    title: "Wedding Bands",
    description:
      "Commemorate your love with a ring that reflects your special connection and represents your love story for a lifetime.",
    link: "/wedding-bands",
    img: `${storImagePath()}/Forevery/ring-col/175.webp`,
    btnText: "Shop wedding rings",
  },
];

export {
  SideItems,
  diamondShapes,
  NavbarMenu,
  CollectionData,
  CollectionArray,
  shapes,
  DiamondLists,
  StepImages,
  DiamondProductList,
  LooseDiamond,
  ringscollection,
  metalcollection,
  StylesCollections,
  weddingRingsCollection,
};

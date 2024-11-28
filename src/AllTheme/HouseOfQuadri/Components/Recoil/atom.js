import { atom } from "recoil";

export const Hoq_companyLogo = atom({
  key: "hoq_companyLogo",
  default: [],
});
export const Hoq_MobilecompanyLogo = atom({
  key: "Hoq_MobilecompanyLogo",
  default: [],
});


export const Hoq_loginState = atom({
  key: "hoq_loginState",
  default: false,
});

export const Hoq_CartCount = atom({
  key: "hoq_CartCount",
  default: 0,
});

export const Hoq_WishCount = atom({
  key: "hoq_WishCount",
  default: 0,
});

export const Hoq_cartB2CDrawer = atom({
  key: "hoq_cartB2CDrawer",
  default: false,
});

export const Hoq_DiamondRangeArr = atom({
  key: "hoq_DiamondRangeArr",
  default: [],
});


export const Hoq_defaultAddressState =atom({
  key : "Hoq_defaultAddressState",
  default : null
})
export const lookBookDrawer = atom({
  key: 'hoq_lookBookDrawer',
  default: false,
});

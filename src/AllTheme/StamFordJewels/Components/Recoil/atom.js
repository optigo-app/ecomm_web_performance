import { atom } from "recoil";

export const stam_companyLogo = atom({
  key: 'companyLogo',
  default: []
})

export const stam_companyLogoM = atom({
  key: 'stam_companyLogoM',
  default: []
})

export const stam_loginState = atom({
  key: 'loginState',
  default: false,
})

export const stam_CartCount = atom({
  key: 'CartCount',
  default: 0
})

export const stam_WishCount = atom({
  key: 'WishCount',
  default: 0
})

export const stam_cartB2CDrawer = atom({
  key: 'cartB2CDrawer',
  default: false
})

export const stam_DiamondRangeArr = atom({
  key: 'DiamondRangeArr',
  default: []
})

export const stam_defaultAddressState = atom({
  key: 'defaultAddressState',
  default: null,
});

export const stam_CartNo = atom({
  key: 'cartNo',
  default: 0,
});

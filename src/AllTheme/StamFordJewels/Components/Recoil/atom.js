import { atom } from "recoil";

export const stam_companyLogo = atom({
  key: 'stam_companyLogo',
  default: []
})

export const stam_companyLogoM = atom({
  key: 'stam_stam_companyLogoM',
  default: []
})

export const stam_loginState = atom({
  key: 'stam_loginState',
  default: false,
})

export const stam_CartCount = atom({
  key: 'stam_CartCount',
  default: 0
})

export const stam_WishCount = atom({
  key: 'stam_WishCount',
  default: 0
})

export const stam_cartB2CDrawer = atom({
  key: 'stam_cartB2CDrawer',
  default: false
})

export const stam_DiamondRangeArr = atom({
  key: 'stam_DiamondRangeArr',
  default: []
})

export const stam_defaultAddressState = atom({
  key: 'stam_defaultAddressState',
  default: null,
});

export const stam_CartNo = atom({
  key: 'stam_cartNo',
  default: 0,
});

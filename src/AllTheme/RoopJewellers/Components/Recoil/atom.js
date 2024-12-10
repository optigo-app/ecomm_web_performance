import { atom } from "recoil";

export const roop_companyLogo = atom({
  key:'rp_jewels_companyLogo',
  default:[]
})

export const roop_companyLogoM = atom({
  key:'rp_jewels_roop_companyLogoM',
  default:[]
})

export const roop_loginState = atom({
  key: 'rp_jewels_loginState',
  default: false,
})

export const roop_CartCount = atom({
  key: 'rp_jewels_CartCount',
  default: 0
})

export const roop_WishCount = atom({
  key: 'rp_jewels_WishCount',
  default: 0
})

export const roop_cartB2CDrawer = atom({
  key: 'rp_jewels_cartB2CDrawer',
  default: false
})

export const roop_DiamondRangeArr = atom({
  key: 'rp_jewels_DiamondRangeArr',
  default: []
})

export const roop_defaultAddressState = atom({
  key: 'rp_jewels_defaultAddressState',
  default: null,
});

export const roop_CartNo = atom({
  key: 'rp_jewels_cartNo',
  default: 0,
});

export const lookBookDrawer = atom({
  key: 'rp_jewels_lookBookDrawer',
  default: false,
});

import { atom } from "recoil";

export const smr_companyLogo = atom({
  key: 'smr_smr_companyLogo',
  default: []
})

export const smr_companyLogoM = atom({
  key: 'smr_smr_companyLogoM',
  default: []
})

export const smr_loginState = atom({
  key: 'smr_smr_loginState',
  default: false,
})

export const CartCount = atom({
  key: 'smr_CartCount',
  default: 0
})

export const WishCount = atom({
  key: 'smr_WishCount',
  default: 0
})

export const cartB2CDrawer = atom({
  key: 'smr_cartB2CDrawer',
  default: false
})

export const DiamondRangeArr = atom({
  key: 'smr_DiamondRangeArr',
  default: []
})

export const homeLoading = atom({
  key: 'smr_homeLoading',
  default: true
})

export const defaultAddressState = atom({
  key: 'smr_defaultAddressState',
  default: null,
});

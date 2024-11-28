import { atom } from "recoil";

export const smr_companyLogo = atom({
  key: 'smr_companyLogo',
  default: []
})

export const smr_companyLogoM = atom({
  key: 'smr_companyLogoM',
  default: []
})

export const smr_loginState = atom({
  key: 'smr_loginState',
  default: false,
})

export const CartCount = atom({
  key: 'CartCount',
  default: 0
})

export const WishCount = atom({
  key: 'WishCount',
  default: 0
})

export const cartB2CDrawer = atom({
  key: 'cartB2CDrawer',
  default: false
})

export const DiamondRangeArr = atom({
  key: 'DiamondRangeArr',
  default: []
})

export const homeLoading = atom({
  key: 'homeLoading',
  default: true
})

export const defaultAddressState = atom({
  key: 'defaultAddressState',
  default: null,
});

import { atom } from "recoil";

export const lov_companyLogo = atom({
  key: 'lov_lov_companyLogo',
  default: []
})

export const lov_companyLogoM = atom({
  key: 'lov_lov_companyLogoM',
  default: []
})

export const lov_loginState = atom({
  key: 'lov_lov_loginState',
  default: false,
})

export const CartCount = atom({
  key: 'lov_CartCount',
  default: 0
})

export const WishCount = atom({
  key: 'lov_WishCount',
  default: 0
})

export const cartB2CDrawer = atom({
  key: 'lov_cartB2CDrawer',
  default: false
})

export const DiamondRangeArr = atom({
  key: 'lov_DiamondRangeArr',
  default: []
})

export const homeLoading = atom({
  key: 'lov_homeLoading',
  default: true
})

export const defaultAddressState = atom({
  key: 'lov_defaultAddressState',
  default: null,
});

export const MetalColor_Image = atom({
  key: "lov_MetalColor_Image",
  default: "",
})
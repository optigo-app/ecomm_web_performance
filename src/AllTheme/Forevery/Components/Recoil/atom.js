import { atom } from "recoil";

export const for_companyLogo = atom({
  key: 'for_companyLogo',
  default: []
})

export const for_companyLogoM = atom({
  key: 'for_companyLogoM',
  default: []
})

export const for_loginState = atom({
  key: 'for_loginState',
  default: false,
})

export const for_CartCount = atom({
  key: 'for_CartCount',
  default: 0
})

export const for_WishCount = atom({
  key: 'for_WishCount',
  default: 0
})

export const for_cartB2CDrawer = atom({
  key: 'for_cartB2CDrawer',
  default: false
})

export const for_MakeMyRingProcessDrawer = atom({
  key: 'for_MakeMyRingProcessDrawer',
  default: false
})

export const for_DiamondRangeArr = atom({
  key: 'for_DiamondRangeArr',
  default: []
})

export const for_defaultAddressState = atom({
  key: 'for_defaultAddressState',
  default: null,
});

export const for_nav_height = atom({
  key: 'for_navbar_height',
  default: null,
});


export const for_customizationSteps = atom({
  key: "for_customizationSteps",
  default: {
    step1: null,
    step2: null,
    step3: {},
  }
})

export const for_customizationSteps1 = atom({
  key: "for_customizationSteps1",
  default: {
    step1: null,
    step2: null,
    step3: {},
  }
})

export const for_Loader = atom({
  key: 'for_Loader',
  default: false,
})


export const for_NavbarItems = atom({
  key: 'for_NavbarItems',
  default: [],
})

export const for_MetalColor_Image = atom({
  key: "for_MetalColor_Image",
  default: "",
})

export const for_MatchDiamonds = atom({
  key: "for_MatchDiamonds",
  default: [],
})

export const for_filterDiamond = atom({
  key: "for_filterDiamond",
  default: [],
})


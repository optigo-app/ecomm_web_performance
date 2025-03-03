import { atom } from "recoil";

export const orz_companyLogo = atom({
  key:'orz_jewels_companyLogo',
  default:[]
})

export const orz_companyLogoM = atom({
  key:'orz_jewels_orz_companyLogoM',
  default:[]
})

export const orz_loginState = atom({
  key: 'orz_jewels_loginState',
  default: false,
})

export const orz_CartCount = atom({
  key: 'orz_jewels_CartCount',
  default: 0
})

export const orz_WishCount = atom({
  key: 'orz_jewels_WishCount',
  default: 0
})

export const orz_cartB2CDrawer = atom({
  key: 'orz_jewels_cartB2CDrawer',
  default: false
})

export const orz_DiamondRangeArr = atom({
  key: 'orz_jewels_DiamondRangeArr',
  default: []
})

export const orz_defaultAddressState = atom({
  key: 'orz_jewels_defaultAddressState',
  default: null,
});

export const orz_CartNo = atom({
  key: 'orz_jewels_cartNo',
  default: 0,
});

export const lookBookDrawer = atom({
  key: 'orz_jewels_lookBookDrawer',
  default: false,
});

export const orz_album_length = atom({
  key: 'album_length',
  default: 0,
});

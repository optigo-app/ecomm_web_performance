import { atom } from "recoil";

export const el_companyLogo = atom({
  key: 'elvee_companyLogo',
  default: '',
})

export const el_companyLogoM = atom({
  key: 'elvee_companyLogoM',
  default: '',
})

export const el_loginState = atom({
  key: 'elvee_loginState',
  default: false,
})

export const el_CartCount = atom({
  key: 'elvee_CartCount',
  default: 0
})

export const el_WishCount = atom({
  key: 'elvee_WishCount',
  default: 0
})

export const defaultAddressState = atom({
  key: 'elvee_defaultAddressState',
  default: null,
});

export const timerExpiredState = atom({
  key: 'elvee_timerExpiredState',
  default: false,
});

export const redirectModal = atom({
  key: 'elvee_redirectModal',
  default: false,
});
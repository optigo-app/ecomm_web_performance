import { atom } from "recoil";
import { storImagePath } from "../../../../utils/Glob_Functions/GlobalFunction";

export const el_companyLogo = atom({
  key: 'dt_companyLogo',
  default: '',
})

export const el_companyLogoM = atom({
  key: 'dt_companyLogoM',
  default: '',
})

export const el_loginState = atom({
  key: 'el_loginState',
  default: false,
})

export const el_CartCount = atom({
  key: 'dt_CartCount',
  default: 0
})

export const el_WishCount = atom({
  key: 'dt_WishCount',
  default: 0
})

export const defaultAddressState = atom({
  key: 'defaultAddressState',
  default: null,
});

export const timerExpiredState = atom({
  key: 'timerExpiredState',
  default: false,
});

export const redirectModal = atom({
  key: 'redirectModal',
  default: false,
});
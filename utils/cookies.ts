import Cookies from "js-cookie";

export const setCookie = (name: string, data: any) => {
  Cookies.set(name, data, { expires: 1 }); // الكوكيز ستنتهي بعد يوم واحد
};

export const getCookie = (name: string) => {
  return Cookies.get(name); // لاسترجاع التوكن من الكوكيز
};

export const removeCookie = (name: string) => {
  Cookies.remove(name); // لحذف الكوكيز
};

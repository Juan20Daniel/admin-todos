import { getCookie, hasCookie, setCookie } from "cookies-next"

export const getCookieCart = ():{[id:string]:number} => {
    if(!hasCookie('cart')) return {}
    const cookieCart = JSON.parse(getCookie('cart') as string ??'{}');
    return cookieCart;
}

export const addProductToCart = (id:string) => {
    const cookieCart = getCookieCart();
    if(cookieCart[id]) {
       cookieCart[id] = cookieCart[id] + 1;
    } else {
        cookieCart[id] = 1;
    }

    setCookie('cart', JSON.stringify(cookieCart));
}

export const removeProductFromCart = (id:string) => {
    const cookiesCart = getCookieCart();
    if(!cookiesCart.hasOwnProperty(id)) return;
    delete cookiesCart[id];
    setCookie('cart', JSON.stringify(cookiesCart));   
}

export const removeSingleItemFromCart = (id:string) => {
    let cookiesCart = getCookieCart();
    if(!cookiesCart[id]) return;
    cookiesCart[id] = cookiesCart[id]-1;
    if(!cookiesCart[id]) delete cookiesCart[id];
   
    setCookie('cart', JSON.stringify(cookiesCart));
}
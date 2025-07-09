import { WidgetItem } from "@/components";
import { Product, products } from "@/products/data/products";
import { ItemCard } from "@/shopping-cart/components";
import { cookies } from "next/headers";

export const metadata = {
 title: 'Productos en el carrito',
 description: 'Productos en el carrito',
};

interface ProductInCart {
    product: Product;
    quantity: number;
}

const getProductsInCart = (cart:{[id:string]:number}):ProductInCart[] => {

    const productsInCart: ProductInCart[] = [];

    for(const id of Object.keys(cart)) {
        const product = products.find(prod => prod.id === id);
        if(product) {
            productsInCart.push({product:product, quantity:cart[id]});
        }
    }
    return productsInCart;
}

export default async function CartPage() {
    const cookiesStore = await cookies();
    const cartTotal = JSON.parse(cookiesStore.get('cart')?.value??'{}') as {[id:string]:number};

    const productsInCart = getProductsInCart(cartTotal);

    const totalToPay = productsInCart.reduce((preValue, currentValue) => {
        return (currentValue.product.price * currentValue.quantity) + preValue
    },0);

    console.log(totalToPay);

    return (
        <div>
            <h1 className="text-5xl">Productos en el carrito</h1>
            <hr className="mb-2" />
            <div className="flex flex-row ms:flex-row gap-2 w-full">
                <div className="flex flex-col gap-2 w-full sm:w-8/12">
                    {productsInCart.map(({product, quantity}) => (
                        <ItemCard 
                            key={product.id} 
                            product={product} 
                            quantity={quantity} 
                        />
                    ))}
                </div>
                <div className="flex flex-col gap-2 w-full sm:w-4/12">
                    <WidgetItem title=''>
                        {/* <div>
                            <h3>Total:</h3>
                        </div>
                        <span>Impuesto 15%: $...</span> */}
                        <h3 className="text-3xl font-bold text-gray-700">${(totalToPay * 1.15).toFixed(2)}</h3>
                        <div className="flex items-end gap-1 text-green-500">
                            <svg className="w-3" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.00001 0L12 8H-3.05176e-05L6.00001 0Z" fill="currentColor" />
                            </svg>
                            <span>2%</span>
                        </div>
                    </WidgetItem>
                </div>
            </div>
        </div>
    );
}
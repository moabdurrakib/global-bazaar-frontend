import {defineStore} from "pinia"
import axiosInstance from "@/services/AxiosService"
export const useCart = defineStore('cart', {
    state: () => ({
        cartItems:[],
        cartItemsCount: 0,
    }),
    actions: {
        addToCart(product){

            let item = product;
            item ={...item, quantity: 1}
            console.log(item);

            if(this.cartItems.length > 0){
                let boolean = this.cartItems.some((i)=>i.id ===item.id);
                if(boolean){
                    let index= this.cartItems.findIndex((i)=>i.id===item.id)
                    this.cartItems[index]["quantity"] += 1;
                }else{
                    
                    this.cartItems.push(item);
                }
            }else{
                this.cartItems.push(item);
            }
            this.cartItemsCount++;
            }
    },
 });


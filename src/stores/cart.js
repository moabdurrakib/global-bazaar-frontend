import {defineStore} from "pinia"
import axiosInstance from "@/services/AxiosService"
export const useCart = defineStore('cart', {
    state: () => ({
        cartItems:[],
    }),

    persist:{
        paths:["cartItems","cartItemsCount"]
    },
    getters:{
        totalPrice:(state)=>{
            let total =0;
            state.cartItems.map((el)=>{
                total+=el["price"]*el["quantity"]
            })
            return total;
        },

        cartItemsCount:(state)=>{
            let total =0;
            state.cartItems.map((el)=>{
                total+=el["quantity"]
            })
            return total;
        }

    },
    actions: {
        addToCart(product){

            let item = product;
            item ={...item, quantity: 1}
            // console.log(item);

            if(this.cartItems.length > 0){
                let boolean = this.cartItems.some((i)=>i.id ===item.id);
                if(boolean){
                    let index= this.cartItems.findIndex((i)=>i.id===item.id)
                    console.log(index)
                    this.cartItems[index]["quantity"] += 1;
                    console.log(this.cartItems[index])
                    console.log(this.cartItems["quantity"])
                    console.log(this.cartItems[index]["quantity"]);
                }else{
                    
                    this.cartItems.push(item);
                }
            }else{
                this.cartItems.push(item);
            }
            }
    },
 });


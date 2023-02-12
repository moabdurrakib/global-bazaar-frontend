import {defineStore} from "pinia"
import axiosInstance from "@/services/AxiosService"
export const useCategory = defineStore('category', {
    state: () => ({
        categories: {},
        loading: false,
    }),
    actions: {

        async getData() {
            try {
                const res = await axiosInstance.get("/categories",)


                if (res.status === 200) {
                    // console.log(res.data);
                    this.categories = res.data
                    return new Promise((resolve) => {
                        resolve(res.data)
                    })
                }

            }
            catch (error) {
                if (error.response.data) {
                    console.log(error.response.data)

                    // return new Promise((reject) => {
                    //     reject(error = error.response.data.errors)
                    // })
                }
            }

        },
    },
 });


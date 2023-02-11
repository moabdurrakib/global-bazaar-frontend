import { defineStore } from "pinia"
import { ElNotification } from "element-plus"
export const useNotification = defineStore('notification', {
    state: () => ({
        type: {
            success: "Success",
            warning: "warning",
            info: "info",
            error: "error"

        },
        position: "top-left",
        duration: 2000,
    }),

    getters: {
        doubleCount: (state) => state.count * 2
    },

    actions: {
        Success(msg) {
            ElNotification({
                title: 'Success',
                message: msg,
                type: this.type.success,
                position: this.position,
                duration: 2000,
            })
        },
        Error(msg) {
            ElNotification({
                title: 'Error',
                message: msg,
                type: this.type.warning,
                position: this.position,
                duration: 2000,
            })
        }
    }
},
)

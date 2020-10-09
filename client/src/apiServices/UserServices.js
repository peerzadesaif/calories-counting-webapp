import Api from "./Api"

export default {
    Register(payload) {
        return Api().post("/user/register", payload)
    },
    Login(payload) {
        return Api().post("/user/login", payload)
    },
    ResetPassword(payload) {
        return Api().post("/password/reset", payload)
    }

}
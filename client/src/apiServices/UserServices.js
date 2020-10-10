import Api from "./Api"

export default {
    Register(payload) {
        return Api().post(`/user/register`, payload)
    },
    Login(payload) {
        return Api().post(`/user/login`, payload)
    },
    ResetPassword(payload) {
        return Api().post(`/password/reset`, payload)
    },
    // MEALS
    AddMeal(payload) {
        return Api().post(`/user/meals`, payload)
    },
    GetAllMeals(payload) {
        return Api().get(`/user/meals`)
    },
    GetSingleMeals(payload) {
        return Api().get(`/user/meals/${payload._id}`)
    },
    UpdateSingleMeals(payload) {
        return Api().put(`/user/meals/${payload._id}`, payload)
    },
    DeleteSingleMeals(payload) {
        return Api().delete(`/user/meals/${payload._id}`)
    },


}
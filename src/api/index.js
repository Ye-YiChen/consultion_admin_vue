
import axios from "axios";
import router from "../router";

const adminAxios = axios.create({
    // baseURL: 'http://xaky.cpolar.cn'
    baseURL: 'http://xaky.cpolar.top'
    // baseURL :"https://xaky.hdu.edu.cn/admin",
    // baseURL: "/api",
})
// 允许携带cookie
// adminAxios.defaults.withCredentials = true;

// 统一请求头 携带token
adminAxios.interceptors.request.use((config) => {
    if (localStorage.getItem("token")) {
        config.headers.token = localStorage.getItem("token");

    }
    return config;
});
adminAxios.interceptors.response.use((response) => {
    const { data: { status } } = response;

    if (parseInt(status) == -1) {
        window.localStorage.removeItem("token");
        router.push("/login");
    }
    return response;
})

export default adminAxios;
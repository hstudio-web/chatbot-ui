import axios from 'axios'

const Instance = axios.create({
    baseURL: '',
    timeout: 60000,
    withCredentials: false,
})
export const getToken = () => {
    return sessionStorage.getItem("token")
}

Instance.interceptors.request.use(
    (config) => {

        const headers = config.headers;
        if (headers) {
            headers['Content-Type'] = 'application/json';
            headers['Authorization'] = 'Bearer ' + getToken();
        }
        return config
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error)
    },
)

Instance.interceptors.response.use(
    (response) => {
        const {code} = response.data
        if (code === 401) {
            // TODO 重置当前的登录状态

        }
        return response.data.data
    },
    (error) => {
        let message = ''
        if (error && error.response) {
            switch (error.response.status) {
                case 302:
                    message = '接口重定向了！'
                    break
                case 400:
                    message = '参数不正确！'
                    break
                case 401:
                    message = '您未登录，或者登录已经超时，请先登录！'
                    break
                case 403:
                    message = '您没有权限操作！'
                    break
                case 404:
                    message = `请求地址出错: ${error.response.config.url}`
                    break
                case 408:
                    message = '请求超时！'
                    break
                case 409:
                    message = '系统已存在相同数据！'
                    break
                case 500:
                    message = '服务器内部错误！'
                    break
                case 501:
                    message = '服务未实现！'
                    break
                case 502:
                    message = '网关错误！'
                    break
                case 503:
                    message = '服务不可用！'
                    break
                case 504:
                    message = '服务暂时无法访问，请稍后再试！'
                    break
                case 505:
                    message = 'HTTP 版本不受支持！'
                    break
                default:
                    message = '异常问题，请联系管理员！'
                    break
            }
        }
        return Promise.reject(error)
    },
)

export default Instance

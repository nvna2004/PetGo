import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  (config) => {
    const publicEndpoints = ["/auth/login", "/auth/register"];
    const isPublic = publicEndpoints.some(endpoint => config.url?.includes(endpoint));

    if (!isPublic) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;

    if (!response) {
      return Promise.reject({
        response: {
          data: {
            message: "Không thể kết nối đến máy chủ. Vui lòng thử lại sau.",
          },
        },
      });
    }

    const noRetryEndpoints = [
      "/auth/login",
      "/auth/register",
      "/auth/verify-email", 
      "/auth/set-username", 
      "/auth/set-password", 
      "/auth/forgot-password", 
      "/auth/refresh",
    ];

    if (noRetryEndpoints.some((url) => config.url.includes(url))) {
      return Promise.reject(error);
    }

    if (response.status === 401 && !config._retry) {
      config._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(
          `${baseURL}/auth/refresh`,
          {},
          {
            headers: { Authorization: `Bearer ${refreshToken}` },
          }
        );

        const {
          token,
          refreshToken: newRefreshToken,
          account,
        } = res.data.result || res.data;

        localStorage.setItem("token", token);
        if (newRefreshToken) localStorage.setItem("refreshToken", newRefreshToken);
        if (account) localStorage.setItem("account", JSON.stringify(account));

        config.headers.Authorization = `Bearer ${token}`;
        return axios(config);
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("account");
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

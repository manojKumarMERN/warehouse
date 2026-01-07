import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

console.log("🚀 API URL:", process.env.NEXT_PUBLIC_API_URL);

api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("access_token");

        console.log("➡️ Request:", config.url);
        console.log("🔑 Access Token:", token);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

api.interceptors.response.use(
    (res) => {
        console.log("✅ Response:", res.config.url, res.status);
        return res;
    },
    async (error) => {
        const originalRequest = error.config;

        console.error("❌ API Error:", {
            url: originalRequest?.url,
            status: error.response?.status,
            data: error.response?.data,
        });

        if (error.response?.status === 401) {
            console.warn("⚠️ 401 Unauthorized detected");

            // 🔕 Refresh token logic disabled for debugging
            /*
            if (!originalRequest._retry) {
              originalRequest._retry = true;
              try {
                const res = await axios.post(
                  `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
                  {},
                  { withCredentials: true }
                );
      
                const newToken = res.data.accessToken;
                localStorage.setItem("access_token", newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
              } catch (err) {
                localStorage.removeItem("access_token");
                window.location.href = "/usersLogin";
              }
            }
            */

            // 🚪 Direct logout for now
            localStorage.removeItem("access_token");
            // window.location.href = "/usersLogin";
        }

        return Promise.reject(error);
    }
);

export default api;

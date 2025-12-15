import api from './api';

export const authService = {
    // Matches @PostMapping("/api/auth/register")
    register: async (userData) => {
        const response = await api.post('/api/auth/register', userData);
        return response.data;
    },

    // Matches @PostMapping("/api/auth/login")
    login: async (credentials) => {
        const response = await api.post('/api/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    },

    // Matches @GetMapping("/api/auth/profile")
    getProfile: async () => {
        const response = await api.get('/api/auth/profile');
        return response.data;
    },

    // Matches @PostMapping("/api/auth/upload-profile")
    uploadProfileImage: async (formData) => {
        const response = await api.post('/api/auth/upload-profile', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
};
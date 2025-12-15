import api from './api';

export const resumeService = {
    // Matches @PostMapping("/api/resumes/create")
    createResume: async (resumeData) => {
        const response = await api.post('/api/resumes/create', resumeData);
        console.log("Create Resume Response:", response);
        return response.data;
    },

    // Matches @GetMapping("/api/resumes/get-user-resumes")
    getUserResumes: async () => {
        const response = await api.get('/api/resumes/get-user-resumes');
        return response.data;
    },

    // Matches @GetMapping("/api/resumes/{id}")
    getResumeById: async (id) => {
        const response = await api.get(`/api/resumes/${id}`);
        return response.data;
    },

    // Matches @PutMapping("/api/resumes/{id}")
    updateResume: async (id, resumeData) => {
        const response = await api.put(`/api/resumes/${id}`, resumeData);
        return response.data;
    },

    // Matches @DeleteMapping("/api/resumes/{id}")
    deleteResume: async (id) => {
        const response = await api.delete(`/api/resumes/${id}`);
        return response.data;
    },

    emailResume: async (recipientEmail, pdfBlob, subject, message) => {
        const formData = new FormData();
        formData.append("recipientEmail", recipientEmail);

        // Append optional fields if they exist
        if (subject) formData.append("subject", subject);
        if (message) formData.append("message", message);

        // Append the file (Blob)
        // Note: 'pdfFile' matches the @RequestPart in EmailController.java
        formData.append("pdfFile", pdfBlob, "resume.pdf");

        const response = await api.post('/api/email/send-resume', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }
};
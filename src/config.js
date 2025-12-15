export const API_BASE_URL = "https://resumebuilder-production-e8a7.up.railway.app/api";

export const ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  RESEND_VERIFY: `${API_BASE_URL}/auth/resend-verify-email`,
  VERIFY_EMAIL: `${API_BASE_URL}/auth/verify-email`,
  CREATE_ORDER: `${API_BASE_URL}/payment/create-order`,
  VERIFY_PAYMENT: `${API_BASE_URL}/payment/verify-payment`,
  PAYMENT_HISTORY: `${API_BASE_URL}/payment/history`
};

export const TEMPLATES = [
  {
    id: 'modern',
    name: 'Modern Blue',
    type: 'free',
    previewColor: 'bg-blue-600',
    description: 'Clean header with accent colors. Great for tech and corporate jobs.'
  },
  {
    id: 'minimal',
    name: 'Clean Minimal',
    type: 'free',
    previewColor: 'bg-gray-800',
    description: 'Simple, centered layout. Perfect for creative and academic roles.'
  },
  {
    id: 'professional',
    name: 'Executive Side',
    type: 'premium',
    previewColor: 'bg-slate-900',
    description: 'Two-column layout with dark sidebar. Ideal for senior positions.'
  },
  {
    id: 'creative',
    name: 'Creative Bold',
    type: 'premium',
    previewColor: 'bg-purple-600',
    description: 'Vibrant layout with colored sidebar. Stands out for design roles.'
  },
  {
    id: 'elegant',
    name: 'Classic Elegant',
    type: 'free',
    previewColor: 'bg-emerald-700',
    description: 'Traditional serif layout. Excellent for legal and administrative roles.'
  }
];

export const COLORS = [
  '#2563eb', // Blue (Default)
  '#0f172a', // Slate/Black
  '#dc2626', // Red
  '#16a34a', // Green
  '#9333ea', // Purple
  '#ea580c', // Orange
  '#0891b2', // Cyan
  '#be185d', // Pink
];

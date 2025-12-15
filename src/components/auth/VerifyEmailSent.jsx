import React, { useState } from 'react';
import { Mail, RefreshCw, Loader } from 'lucide-react';
import { ENDPOINTS } from '../../config';

const VerifyEmailSent = ({ email, onNavigate }) => {
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState('');

  const handleResend = async () => {
    setResending(true);
    setMessage('');
    try {
      const response = await fetch(ENDPOINTS.RESEND_VERIFY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Verification email sent successfully!');
      } else {
        setMessage('Failed to resend email. Please try again.');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify your email</h2>
        <p className="text-gray-600 mb-6">
          We've sent a verification link to <span className="font-semibold text-gray-900">{email}</span>.
          Please check your inbox to activate your account.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => onNavigate('login')}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Go to Login
          </button>

          <button
            onClick={handleResend}
            disabled={resending}
            className="flex items-center justify-center w-full text-blue-600 font-medium hover:text-blue-700 transition"
          >
            {resending ? <Loader className="w-4 h-4 animate-spin mr-2" /> : <RefreshCw className="w-4 h-4 mr-2" />}
            Resend Verification Email
          </button>

          {message && (
            <p className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailSent;

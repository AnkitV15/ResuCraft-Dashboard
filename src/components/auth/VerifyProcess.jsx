import React, { useState, useEffect } from 'react';
import { Loader, CheckCircle, X } from 'lucide-react';
import { ENDPOINTS } from '../../config';

const VerifyProcess = ({ token, onNavigate }) => {
  const [status, setStatus] = useState('verifying'); // verifying, success, error

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await fetch(`${ENDPOINTS.VERIFY_EMAIL}?token=${token}`);
        if (response.ok) {
          setStatus('success');
          // Redirect to login after 2 seconds
          setTimeout(() => onNavigate('login'), 2000);
        } else {
          setStatus('error');
        }
      } catch (error) {
        setStatus('error');
      }
    };

    if (token) verify();
  }, [token, onNavigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center">
        {status === 'verifying' && (
          <>
            <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900">Verifying your email...</h2>
          </>
        )}
        {status === 'success' && (
          <>
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Email Verified!</h2>
            <p className="text-gray-600">Redirecting to login...</p>
          </>
        )}
        {status === 'error' && (
          <>
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Verification Failed</h2>
            <p className="text-gray-600 mb-4">The link may be invalid or expired.</p>
            <button
              onClick={() => onNavigate('login')}
              className="text-blue-600 font-medium hover:underline"
            >
              Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyProcess;

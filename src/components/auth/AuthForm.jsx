import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Loader, Shield, ArrowLeft, FileText } from 'lucide-react';
import { ENDPOINTS } from '../../config';

const AuthForm = ({ type, onNavigate, onSuccess, onRegisterSuccess }) => {
  const isLogin = type === 'login';

  // Login State
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  // Register State
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isLogin) {
      setLoginData(prev => ({ ...prev, [name]: value }));
    } else {
      setRegisterData(prev => ({ ...prev, [name]: value }));
    }
    setError(''); // Clear error on typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!isLogin) {
      if (registerData.firstName.length < 2 || registerData.firstName.length > 15) {
        setError('First name must be between 2 and 15 characters.');
        return;
      }
      if (registerData.lastName.length < 2 || registerData.lastName.length > 15) {
        setError('Last name must be between 2 and 15 characters.');
        return;
      }
      if (registerData.password.length < 6 || registerData.password.length > 15) {
        setError('Password must be between 6 and 15 characters.');
        return;
      }
    }

    setIsLoading(true);

    const endpoint = isLogin ? ENDPOINTS.LOGIN : ENDPOINTS.REGISTER;
    let payload = isLogin ? loginData : registerData;

    if (!isLogin) {
      payload = {
        name: `${registerData.firstName} ${registerData.lastName}`.trim(),
        email: registerData.email,
        password: registerData.password,
      };
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        // Feature: Auto-resend verification email if login fails due to unverified status
        if (isLogin && (
          data.message?.toLowerCase().includes('verify') ||
          data.message?.toLowerCase().includes('disabled') ||
          data.message?.toLowerCase().includes('active')
        )) {
          try {
            // Attempt to resend verification email
            const resendResponse = await fetch(ENDPOINTS.RESEND_VERIFY, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: loginData.email }),
            });

            if (resendResponse.ok) {
              throw new Error('Your email is not verified. A new verification link has just been sent to your inbox.');
            }
          } catch (resendError) {
            // If resend fails or network error, fallback to original error or generic message
            if (resendError.message.includes('sent')) {
              throw resendError; // Propagate the success message as an error to display it
            }
          }
        }

        throw new Error(data.message || 'Authentication failed');
      }

      if (isLogin) {
        onSuccess(data || { email: loginData.email, firstName: 'User' }, data.token || data.accessToken);
      } else {
        onRegisterSuccess(registerData.email);
      }

    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 relative">
      <button
        onClick={() => onNavigate('landing')}
        className="absolute top-8 left-8 flex items-center text-gray-600 hover:text-blue-600 transition"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
      </button>

      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-600/20">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="mt-2 text-gray-600">
            {isLogin ? 'Enter your details to access your resume.' : 'Start building your professional resume today.'}
          </p>
        </div>

        {error && (
          <div className={`p-4 rounded-lg text-sm flex items-start ${error.includes('sent') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
            <Shield className="w-5 h-5 mr-2 flex-shrink-0" />
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">

            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    name="firstName"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="John"
                    value={registerData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    name="lastName"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Doe"
                    value={registerData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="john@example.com"
                  value={isLogin ? loginData.email : registerData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="••••••••"
                  value={isLogin ? loginData.password : registerData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-lg shadow-blue-600/30 hover:-translate-y-0.5"
          >
            {isLoading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <>
                {isLogin ? 'Sign in' : 'Create Account'}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => onNavigate(isLogin ? 'signup' : 'login')}
              className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
            >
              {isLogin ? 'Sign up for free' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

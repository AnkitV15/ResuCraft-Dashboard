import React, { useState, useEffect } from 'react';
import UpgradeModal from './components/payment/UpgradeModal.jsx';
import AuthForm from './components/auth/AuthForm.jsx';
import VerifyEmailSent from './components/auth/VerifyEmailSent.jsx';
import VerifyProcess from './components/auth/VerifyProcess.jsx';
import Dashboard from './pages/Dashboard.jsx';
import LandingPage from './pages/LandingPages.jsx';
import ResumeEditor from './pages/ResumeEditor.jsx';

const App = () => {
  // State for Navigation and Auth
  const [currentView, setCurrentView] = useState('landing');
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tempEmail, setTempEmail] = useState('');
  const [verificationToken, setVerificationToken] = useState(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Resume Data Management
  const [resumes, setResumes] = useState(() => {
    const saved = localStorage.getItem('resumes');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentResume, setCurrentResume] = useState(null);

  // Check for existing token on load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get('token');
    if (tokenParam) {
      setVerificationToken(tokenParam);
      setCurrentView('verify_process');
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Update local storage whenever resumes change
  useEffect(() => {
    localStorage.setItem('resumes', JSON.stringify(resumes));
  }, [resumes]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    setCurrentView('landing');
  };

  const handleLoginSuccess = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleRegisterSuccess = (email) => {
    setTempEmail(email);
    setCurrentView('verify_sent');
  };

  const handleSaveResume = (resumeData) => {
    let updatedResumes;
    const now = new Date().toISOString();

    if (resumeData.id) {
      updatedResumes = resumes.map(r =>
        r.id === resumeData.id ? { ...resumeData, updatedAt: now } : r
      );
    } else {
      const newResume = {
        ...resumeData,
        id: Date.now().toString(),
        createdAt: now,
        updatedAt: now
      };
      updatedResumes = [...resumes, newResume];
    }

    setResumes(updatedResumes);
    setCurrentResume(null);
  };

  const handleDeleteResume = (id) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      setResumes(resumes.filter(r => r.id !== id));
    }
  };

  const handleEditResume = (resume) => {
    setCurrentResume(resume);
    setCurrentView('editor');
  };

  const handleCreateNew = () => {
    setCurrentResume(null);
    setCurrentView('editor');
  };

  const handleUpgradeSuccess = () => {
    const updatedUser = { ...user, subscriptionPlan: 'PREMIUM' };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setShowUpgradeModal(false);
    alert("Welcome to Premium! You now have access to all templates.");
  };

  // Render View Based on State
  const renderView = () => {
    switch (currentView) {
      case 'login':
        return <AuthForm type="login" onNavigate={setCurrentView} onSuccess={handleLoginSuccess} />;
      case 'signup':
        return <AuthForm type="signup" onNavigate={setCurrentView} onRegisterSuccess={handleRegisterSuccess} />;
      case 'verify_sent':
        return <VerifyEmailSent email={tempEmail} onNavigate={setCurrentView} />;
      case 'verify_process':
        return <VerifyProcess token={verificationToken} onNavigate={setCurrentView} />;
      case 'dashboard':
        return (
          <Dashboard
            user={user}
            resumes={resumes}
            onCreateNew={handleCreateNew}
            onEdit={handleEditResume}
            onDelete={handleDeleteResume}
            onLogout={handleLogout}
            onUpgrade={() => setShowUpgradeModal(true)}
          />
        );
      case 'editor':
        return (
          <ResumeEditor
            user={user}
            initialData={currentResume}
            onSave={handleSaveResume}
            onBack={() => setCurrentView('dashboard')}
            onUpgrade={() => setShowUpgradeModal(true)}
          />
        );
      case 'landing':
      default:
        return (
          <LandingPage
            onNavigate={setCurrentView}
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
            user={user}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      {renderView()}
      {showUpgradeModal && (
        <UpgradeModal
          user={user}
          onClose={() => setShowUpgradeModal(false)}
          onSuccess={handleUpgradeSuccess}
        />
      )}
    </div>
  );
};

export default App;

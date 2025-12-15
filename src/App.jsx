import React, { useState, useEffect } from 'react';
import UpgradeModal from './components/payment/UpgradeModal.jsx';
import AuthForm from './components/auth/AuthForm.jsx';
import VerifyEmailSent from './components/auth/VerifyEmailSent.jsx';
import VerifyProcess from './components/auth/VerifyProcess.jsx';
import Dashboard from './pages/Dashboard.jsx';
import LandingPage from './pages/LandingPages.jsx';
import ResumeEditor from './pages/ResumeEditor.jsx';
import { resumeService } from './services/resumeService.js';

const App = () => {
  // State for Navigation and Auth
  const [currentView, setCurrentView] = useState('landing');
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tempEmail, setTempEmail] = useState('');
  const [verificationToken, setVerificationToken] = useState(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Resume Data Management
  const [resumes, setResumes] = useState([]);
  const [currentResume, setCurrentResume] = useState(null);

  // Fetch resumes from server on authenticated load
  useEffect(() => {
    const fetchResumes = async () => {
      if (isAuthenticated) {
        try {
          const serverResumes = await resumeService.getUserResumes();
          setResumes(serverResumes);
        } catch (error) {
          console.error("Failed to fetch resumes:", error);
          // Optionally, handle the error, e.g., show a notification
        }
      }
    };

    fetchResumes();
  }, [isAuthenticated]);

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

  const handleSaveResume = async (resumeData) => {
    try {
      let savedResume;
      if (resumeData._id) {
        // Update existing resume
        savedResume = await resumeService.updateResume(resumeData._id, resumeData);
        setResumes(resumes.map(r => (r._id === savedResume._id ? savedResume : r)));
      } else {
        // Create new resume
        savedResume = await resumeService.createResume(resumeData);
        setResumes(prevResumes => [...prevResumes, savedResume]);
      }
      return savedResume; // Return the saved data to the caller
    } catch (error) {
      console.error("Failed to save resume:", error);
      throw error; // Re-throw so the editor knows the save failed
    }
  };

  const handleDeleteResume = async (id) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      try {
        await resumeService.deleteResume(id);
        console.log("Resume deleted successfully with id:", id);
        setResumes(resumes.filter(r => r._id !== id));
      } catch (error) {
        console.error("Failed to delete resume:", error);
        // Optionally, show an error to the user
      }
    }
  };

  const handleEditResume = (resume) => {
    setCurrentResume(resume);
    setCurrentView('editor');
  };

  const handleCreateNew = async () => {
    const savedResume = await resumeService.createResume({ "title": "New Resume" }); // Create with empty data
    setResumes(prevResumes => [...prevResumes, savedResume]);
    setCurrentResume(savedResume); // Set the newly created resume as the current one
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

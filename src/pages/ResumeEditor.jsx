import React, { useState, useEffect, useRef } from 'react';
import {
  FileText, CheckCircle, Zap, Layout, Star, ArrowRight, Menu, X,
  Shield, Users, Download, Lock, Mail, User, Loader, ArrowLeft, RefreshCw,
  Plus, Trash2, ChevronDown, ChevronUp, Printer, Save, Palette, Briefcase, MapPin, Phone, Edit, Calendar, Clock, CreditCard, Crown, Globe, Award, BookOpen, Heart
} from 'lucide-react';
import { TEMPLATES, COLORS } from '../config';
import ModernTemplate from '../components/templates/ModernTemplate';
import MinimalTemplate from '../components/templates/MinimalTemplate';
import ProfessionalTemplate from '../components/templates/ProfessionalTemplate';
import CreativeTemplate from '../components/templates/CreativeTemplate';
import ElegantTemplate from '../components/templates/ElegantTemplate';

const ResumeEditor = ({ user, initialData, onSave, onBack, onUpgrade }) => {
  const [activeTab, setActiveTab] = useState('content');
  const [selectedTemplate, setSelectedTemplate] = useState(initialData?.templates?.theme || 'modern');
  const [activeSection, setActiveSection] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const resumeRef = useRef(null);

  const isPremiumUser = user?.subscriptionPlan === 'PREMIUM';

  // --- DEFAULT STATE ---
  const defaultState = {
    title: 'Untitled Resume',
    thumbnailLink: '',
    templates: { Theme: 'modern', colorPalette: ['#2563eb'] },
    profileInfo: {
      profilePreviewUrl: '',
      fullName: user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : '',
      designation: '',
      summary: ''
    },
    contactInfo: {
      email: user?.email || '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      website: ''
    },
    workExperiences: [],
    educations: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    interests: []
  };

  // --- STATE INITIALIZATION WITH MIGRATION LOGIC ---
  const [resumeData, setResumeData] = useState(() => {
    if (!initialData) return defaultState;

    if (initialData.personalInfo && !initialData.profileInfo) {
      console.log("Migrating old resume format to new structure...");
      return {
        ...defaultState,
        id: initialData.id,
        title: initialData.title || "Migrated Resume",
        profileInfo: {
          fullName: initialData.personalInfo.fullName || "",
          summary: initialData.personalInfo.summary || "",
          designation: "Software Engineer",
          profilePreviewUrl: ""
        },
        contactInfo: {
          email: initialData.personalInfo.email || "",
          phone: initialData.personalInfo.phone || "",
          location: initialData.personalInfo.address || "",
          linkedin: "",
          github: "",
          website: ""
        },
        workExperiences: initialData.experience?.map(e => ({
          role: e.title || "",
          company: e.company || "",
          startDate: e.startDate || "",
          endDate: e.endDate || "",
          description: e.description || "",
          website: ""
        })) || [],
        educations: initialData.education || [],
        skills: initialData.skills?.map(s => (typeof s === 'string' ? { name: s, progress: 0 } : s)) || [],
        templates: { theme: selectedTemplate, colorPalette: ['#2563eb'] }
      };
    }

    return {
      ...defaultState,
      ...initialData,
      profileInfo: { ...defaultState.profileInfo, ...(initialData.profileInfo || {}) },
      contactInfo: { ...defaultState.contactInfo, ...(initialData.contactInfo || {}) },
      templates: { ...defaultState.templates, ...(initialData.templates || {}) },
      projects: initialData.projects || [],
      certifications: initialData.certifications || [],
      languages: initialData.languages || [],
      interests: initialData.interests || []
    };
  });

  const handleTemplateSelect = (templateId, type) => {
    if (type === 'premium' && !isPremiumUser) {
      onUpgrade();
    } else {
      setSelectedTemplate(templateId);
      setResumeData(prev => ({
        ...prev,
        templates: { ...prev.templates, theme: templateId }
      }));
    }
  };

  const handleColorSelect = (color) => {
    setResumeData(prev => ({
      ...prev,
      templates: { ...prev.templates, colorPalette: [color] }
    }));
  };

  const handleSaveClick = async () => {
    setIsSaving(true);
    try {
      const payload = {
        ...resumeData,
        templates: { ...resumeData.templates, Theme: selectedTemplate }
      };
      const savedResume = await onSave(payload);

      // If the save was successful, navigate back to the dashboard
      if (savedResume) {
        onBack();
      }
    } catch (error) {
      console.error("Save failed:", error);
      // You could add a user-facing error message here
    } finally {
      setIsSaving(false);
    }
  };
  const handleDownloadPDF = () => {
    const originalTitle = document.title;
    document.title = resumeData.title || 'Resume';

    const iframe = document.createElement('iframe');
    Object.assign(iframe.style, {
      position: 'fixed', right: '0', bottom: '0', width: '0', height: '0', border: '0'
    });
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    const content = resumeRef.current.innerHTML;

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${resumeData.title || 'Resume'}</title>
          <meta charset="utf-8" />
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @page { size: A4; margin: 0; }
            body { margin: 0; padding: 0; background: white; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            .break-inside-avoid { page-break-inside: avoid; }
            .resume-container { width: 210mm; min-height: 297mm; margin: 0 auto; background: white; overflow: hidden; }
          </style>
        </head>
        <body>
          <div class="resume-container">${content}</div>
          <script>
            window.onload = function() { setTimeout(() => { window.print(); }, 500); }
          </script>
        </body>
      </html>
    `);
    doc.close();

    setTimeout(() => {
      document.body.removeChild(iframe);
      document.title = originalTitle;
    }, 2000);
  };

  const themeColor = resumeData.templates?.colorPalette?.[0] || '#2563eb';

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col h-screen overflow-hidden">
      {/* Editor Header */}
      <header className="bg-white border-b border-gray-200 h-16 flex-shrink-0 z-20">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex flex-col">
              <input
                type="text"
                className="font-bold text-gray-900 text-sm sm:text-base bg-transparent outline-none focus:border-b border-blue-500"
                value={resumeData.title}
                onChange={(e) => setResumeData({ ...resumeData, title: e.target.value })}
                placeholder="Name your resume..."
              />
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">
                  {initialData ? "Editing" : "Creating"}
                </span>
                {!isPremiumUser && (
                  <button onClick={onUpgrade} className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-bold flex items-center gap-1 hover:bg-yellow-200 transition">
                    <Crown className="w-3 h-3" /> Upgrade
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveClick}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium shadow-sm disabled:opacity-50"
            >
              {isSaving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span className="hidden sm:inline">{isSaving ? 'Saving...' : 'Save'}</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
            >
              <Download className="w-4 h-4" /> <span className="hidden sm:inline">PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Split Screen */}
      <div className="flex-1 flex overflow-hidden">

        {/* LEFT PANEL: Editor & Tabs */}
        <div className="w-full lg:w-5/12 bg-white border-r border-gray-200 flex flex-col z-10 print:hidden">

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('content')}
              className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 border-b-2 transition ${activeTab === 'content' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              <FileText className="w-4 h-4" /> Content
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 border-b-2 transition ${activeTab === 'templates' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              <Palette className="w-4 h-4" /> Templates
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">

            {activeTab === 'content' ? (
              <div className="max-w-2xl mx-auto space-y-4 pb-20">
                {/* ... (Existing Editor Forms: Profile, Contact, Experience, Education, Projects, Skills, Certifications, Languages, Interests - kept exactly as is from previous code, see previous full implementation for brevity here as logic is unchanged) ... */}
                {/* Placeholder for content forms - in real file, keep the full form implementation here from previous step */}
                <div className="p-4 bg-blue-50 rounded-lg text-blue-800 text-sm text-center">
                  Use the sections below to add your resume details. (Forms hidden for brevity, logic remains unchanged).
                </div>
                {/* To ensure the file is complete, I will include the full form implementation again below */}
                {/* ... (Full Form Implementation Start) ... */}

                {/* Profile Info Section */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setActiveSection(activeSection === 'profile' ? '' : 'profile')}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center gap-3 font-semibold text-gray-700 text-sm">
                      <User className="w-4 h-4 text-blue-600" /> Profile Information
                    </div>
                    {activeSection === 'profile' ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>

                  {activeSection === 'profile' && (
                    <div className="p-4 space-y-4 animate-fade-in-down border-t border-gray-100">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Full Name</label>
                        <input
                          type="text"
                          className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                          value={resumeData.profileInfo.fullName}
                          onChange={(e) => setResumeData({ ...resumeData, profileInfo: { ...resumeData.profileInfo, fullName: e.target.value } })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Designation / Job Title</label>
                        <input
                          type="text"
                          className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                          value={resumeData.profileInfo.designation}
                          onChange={(e) => setResumeData({ ...resumeData, profileInfo: { ...resumeData.profileInfo, designation: e.target.value } })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Professional Summary</label>
                        <textarea
                          rows="4"
                          className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                          value={resumeData.profileInfo.summary}
                          onChange={(e) => setResumeData({ ...resumeData, profileInfo: { ...resumeData.profileInfo, summary: e.target.value } })}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Contact Info Section */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setActiveSection(activeSection === 'contact' ? '' : 'contact')}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center gap-3 font-semibold text-gray-700 text-sm">
                      <Phone className="w-4 h-4 text-blue-600" /> Contact Information
                    </div>
                    {activeSection === 'contact' ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>

                  {activeSection === 'contact' && (
                    <div className="p-4 space-y-4 animate-fade-in-down border-t border-gray-100">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Email</label>
                          <input
                            type="email"
                            className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={resumeData.contactInfo.email}
                            onChange={(e) => setResumeData({ ...resumeData, contactInfo: { ...resumeData.contactInfo, email: e.target.value } })}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Phone</label>
                          <input
                            type="text"
                            className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={resumeData.contactInfo.phone}
                            onChange={(e) => setResumeData({ ...resumeData, contactInfo: { ...resumeData.contactInfo, phone: e.target.value } })}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Location</label>
                          <input
                            type="text"
                            className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={resumeData.contactInfo.location}
                            onChange={(e) => setResumeData({ ...resumeData, contactInfo: { ...resumeData.contactInfo, location: e.target.value } })}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">LinkedIn URL</label>
                          <input
                            type="text"
                            className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={resumeData.contactInfo.linkedin}
                            onChange={(e) => setResumeData({ ...resumeData, contactInfo: { ...resumeData.contactInfo, linkedin: e.target.value } })}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Work Experience Section */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setActiveSection(activeSection === 'experience' ? '' : 'experience')}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center gap-3 font-semibold text-gray-700 text-sm">
                      <Briefcase className="w-4 h-4 text-blue-600" /> Work Experience
                    </div>
                    {activeSection === 'experience' ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>

                  {activeSection === 'experience' && (
                    <div className="p-4 space-y-6 animate-fade-in-down border-t border-gray-100">
                      {resumeData.workExperiences.map((exp, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg relative group border border-gray-100">
                          <button
                            onClick={() => {
                              const newExp = resumeData.workExperiences.filter((_, i) => i !== index);
                              setResumeData({ ...resumeData, workExperiences: newExp });
                            }}
                            className="absolute top-2 right-2 p-1.5 bg-white shadow-sm rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <input
                              type="text"
                              placeholder="Role / Job Title"
                              className="p-2 text-sm border border-gray-300 rounded-md font-medium w-full"
                              value={exp.role}
                              onChange={(e) => {
                                const newExp = [...resumeData.workExperiences];
                                newExp[index].role = e.target.value;
                                setResumeData({ ...resumeData, workExperiences: newExp });
                              }}
                            />
                            <input
                              type="text"
                              placeholder="Company Name"
                              className="p-2 text-sm border border-gray-300 rounded-md w-full"
                              value={exp.company}
                              onChange={(e) => {
                                const newExp = [...resumeData.workExperiences];
                                newExp[index].company = e.target.value;
                                setResumeData({ ...resumeData, workExperiences: newExp });
                              }}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <input
                              type="text"
                              placeholder="Start Date"
                              className="p-2 text-sm border border-gray-300 rounded-md w-full"
                              value={exp.startDate}
                              onChange={(e) => {
                                const newExp = [...resumeData.workExperiences];
                                newExp[index].startDate = e.target.value;
                                setResumeData({ ...resumeData, workExperiences: newExp });
                              }}
                            />
                            <input
                              type="text"
                              placeholder="End Date"
                              className="p-2 text-sm border border-gray-300 rounded-md w-full"
                              value={exp.endDate}
                              onChange={(e) => {
                                const newExp = [...resumeData.workExperiences];
                                newExp[index].endDate = e.target.value;
                                setResumeData({ ...resumeData, workExperiences: newExp });
                              }}
                            />
                          </div>
                          <textarea
                            rows="3"
                            placeholder="Job description..."
                            className="w-full p-2 text-sm border border-gray-300 rounded-md"
                            value={exp.description}
                            onChange={(e) => {
                              const newExp = [...resumeData.workExperiences];
                              newExp[index].description = e.target.value;
                              setResumeData({ ...resumeData, workExperiences: newExp });
                            }}
                          />
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          setResumeData({
                            ...resumeData,
                            workExperiences: [...resumeData.workExperiences, { company: '', role: '', startDate: '', endDate: '', description: '', website: '' }]
                          });
                        }}
                        className="w-full py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition flex items-center justify-center gap-2 text-sm font-semibold"
                      >
                        <Plus className="w-4 h-4" /> Add Experience
                      </button>
                    </div>
                  )}
                </div>

                {/* Education Section */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setActiveSection(activeSection === 'education' ? '' : 'education')}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center gap-3 font-semibold text-gray-700 text-sm">
                      <BookOpen className="w-4 h-4 text-blue-600" /> Education
                    </div>
                    {activeSection === 'education' ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>

                  {activeSection === 'education' && (
                    <div className="p-4 space-y-6 animate-fade-in-down border-t border-gray-100">
                      {resumeData.educations.map((edu, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg relative group border border-gray-100">
                          <button
                            onClick={() => {
                              const newEdu = resumeData.educations.filter((_, i) => i !== index);
                              setResumeData({ ...resumeData, educations: newEdu });
                            }}
                            className="absolute top-2 right-2 p-1.5 bg-white shadow-sm rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <input
                              type="text"
                              placeholder="Degree"
                              className="p-2 text-sm border border-gray-300 rounded-md font-medium w-full"
                              value={edu.degree}
                              onChange={(e) => {
                                const newEdu = [...resumeData.educations];
                                newEdu[index].degree = e.target.value;
                                setResumeData({ ...resumeData, educations: newEdu });
                              }}
                            />
                            <input
                              type="text"
                              placeholder="Institution / School"
                              className="p-2 text-sm border border-gray-300 rounded-md w-full"
                              value={edu.institution}
                              onChange={(e) => {
                                const newEdu = [...resumeData.educations];
                                newEdu[index].institution = e.target.value;
                                setResumeData({ ...resumeData, educations: newEdu });
                              }}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              placeholder="Start Year"
                              className="p-2 text-sm border border-gray-300 rounded-md w-full"
                              value={edu.startDate}
                              onChange={(e) => {
                                const newEdu = [...resumeData.educations];
                                newEdu[index].startDate = e.target.value;
                                setResumeData({ ...resumeData, educations: newEdu });
                              }}
                            />
                            <input
                              type="text"
                              placeholder="End Year"
                              className="p-2 text-sm border border-gray-300 rounded-md w-full"
                              value={edu.endDate}
                              onChange={(e) => {
                                const newEdu = [...resumeData.educations];
                                newEdu[index].endDate = e.target.value;
                                setResumeData({ ...resumeData, educations: newEdu });
                              }}
                            />
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          setResumeData({
                            ...resumeData,
                            educations: [...resumeData.educations, { degree: '', institution: '', startDate: '', endDate: '' }]
                          });
                        }}
                        className="w-full py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition flex items-center justify-center gap-2 text-sm font-semibold"
                      >
                        <Plus className="w-4 h-4" /> Add Education
                      </button>
                    </div>
                  )}
                </div>

                {/* Projects Section */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setActiveSection(activeSection === 'projects' ? '' : 'projects')}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center gap-3 font-semibold text-gray-700 text-sm">
                      <Layout className="w-4 h-4 text-blue-600" /> Projects
                    </div>
                    {activeSection === 'projects' ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>

                  {activeSection === 'projects' && (
                    <div className="p-4 space-y-6 animate-fade-in-down border-t border-gray-100">
                      {resumeData.projects.map((proj, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg relative group border border-gray-100">
                          <button
                            onClick={() => {
                              const newProj = resumeData.projects.filter((_, i) => i !== index);
                              setResumeData({ ...resumeData, projects: newProj });
                            }}
                            className="absolute top-2 right-2 p-1.5 bg-white shadow-sm rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                          <input
                            type="text"
                            placeholder="Project Title"
                            className="p-2 text-sm border border-gray-300 rounded-md font-medium w-full mb-3"
                            value={proj.title}
                            onChange={(e) => {
                              const newProj = [...resumeData.projects];
                              newProj[index].title = e.target.value;
                              setResumeData({ ...resumeData, projects: newProj });
                            }}
                          />
                          <textarea
                            rows="2"
                            placeholder="Description..."
                            className="w-full p-2 text-sm border border-gray-300 rounded-md mb-3"
                            value={proj.description}
                            onChange={(e) => {
                              const newProj = [...resumeData.projects];
                              newProj[index].description = e.target.value;
                              setResumeData({ ...resumeData, projects: newProj });
                            }}
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              placeholder="GitHub Link"
                              className="p-2 text-sm border border-gray-300 rounded-md w-full"
                              value={proj.github}
                              onChange={(e) => {
                                const newProj = [...resumeData.projects];
                                newProj[index].github = e.target.value;
                                setResumeData({ ...resumeData, projects: newProj });
                              }}
                            />
                            <input
                              type="text"
                              placeholder="Live Demo Link"
                              className="p-2 text-sm border border-gray-300 rounded-md w-full"
                              value={proj.liveDemo}
                              onChange={(e) => {
                                const newProj = [...resumeData.projects];
                                newProj[index].liveDemo = e.target.value;
                                setResumeData({ ...resumeData, projects: newProj });
                              }}
                            />
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          setResumeData({
                            ...resumeData,
                            projects: [...resumeData.projects, { title: '', description: '', github: '', liveDemo: '' }]
                          });
                        }}
                        className="w-full py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition flex items-center justify-center gap-2 text-sm font-semibold"
                      >
                        <Plus className="w-4 h-4" /> Add Project
                      </button>
                    </div>
                  )}
                </div>

                {/* Skills Section */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setActiveSection(activeSection === 'skills' ? '' : 'skills')}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center gap-3 font-semibold text-gray-700 text-sm">
                      <Star className="w-4 h-4 text-blue-600" /> Skills
                    </div>
                    {activeSection === 'skills' ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>
                  {activeSection === 'skills' && (
                    <div className="p-4 space-y-4 animate-fade-in-down border-t border-gray-100">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {resumeData.skills.map((skill, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 pl-3 pr-2 py-1 rounded-full text-sm flex items-center gap-2 border border-gray-200">
                            {skill.name}
                            <button
                              onClick={() => {
                                const newSkills = resumeData.skills.filter((_, i) => i !== index);
                                setResumeData({ ...resumeData, skills: newSkills });
                              }}
                              className="hover:text-red-500 p-0.5 hover:bg-red-50 rounded-full transition"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          id="skillInput"
                          placeholder="Add a skill (e.g. Java)"
                          className="flex-1 p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              if (e.target.value.trim()) {
                                setResumeData({ ...resumeData, skills: [...resumeData.skills, { name: e.target.value.trim(), progress: 0 }] });
                                e.target.value = '';
                              }
                            }
                          }}
                        />
                        <button
                          onClick={() => {
                            const input = document.getElementById('skillInput');
                            if (input.value.trim()) {
                              setResumeData({ ...resumeData, skills: [...resumeData.skills, { name: input.value.trim(), progress: 0 }] });
                              input.value = '';
                            }
                          }}
                          className="bg-gray-900 text-white px-5 rounded-lg hover:bg-gray-800 transition text-sm font-medium"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Certifications Section */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setActiveSection(activeSection === 'certifications' ? '' : 'certifications')}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center gap-3 font-semibold text-gray-700 text-sm">
                      <Award className="w-4 h-4 text-blue-600" /> Certifications
                    </div>
                    {activeSection === 'certifications' ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>

                  {activeSection === 'certifications' && (
                    <div className="p-4 space-y-4 animate-fade-in-down border-t border-gray-100">
                      {resumeData.certifications.map((cert, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg relative group border border-gray-100">
                          <button
                            onClick={() => {
                              const newCerts = resumeData.certifications.filter((_, i) => i !== index);
                              setResumeData({ ...resumeData, certifications: newCerts });
                            }}
                            className="absolute top-2 right-2 p-1.5 bg-white shadow-sm rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <input
                              type="text"
                              placeholder="Certification Title"
                              className="p-2 text-sm border border-gray-300 rounded-md w-full"
                              value={cert.title}
                              onChange={(e) => {
                                const newCerts = [...resumeData.certifications];
                                newCerts[index].title = e.target.value;
                                setResumeData({ ...resumeData, certifications: newCerts });
                              }}
                            />
                            <input
                              type="text"
                              placeholder="Issuer"
                              className="p-2 text-sm border border-gray-300 rounded-md w-full"
                              value={cert.issuer}
                              onChange={(e) => {
                                const newCerts = [...resumeData.certifications];
                                newCerts[index].issuer = e.target.value;
                                setResumeData({ ...resumeData, certifications: newCerts });
                              }}
                            />
                          </div>
                          <input
                            type="text"
                            placeholder="Year"
                            className="p-2 text-sm border border-gray-300 rounded-md w-full"
                            value={cert.year}
                            onChange={(e) => {
                              const newCerts = [...resumeData.certifications];
                              newCerts[index].year = e.target.value;
                              setResumeData({ ...resumeData, certifications: newCerts });
                            }}
                          />
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          setResumeData({
                            ...resumeData,
                            certifications: [...resumeData.certifications, { title: '', issuer: '', year: '' }]
                          });
                        }}
                        className="w-full py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition flex items-center justify-center gap-2 text-sm font-semibold"
                      >
                        <Plus className="w-4 h-4" /> Add Certification
                      </button>
                    </div>
                  )}
                </div>

                {/* Languages Section */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setActiveSection(activeSection === 'languages' ? '' : 'languages')}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center gap-3 font-semibold text-gray-700 text-sm">
                      <Globe className="w-4 h-4 text-blue-600" /> Languages
                    </div>
                    {activeSection === 'languages' ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>

                  {activeSection === 'languages' && (
                    <div className="p-4 space-y-4 animate-fade-in-down border-t border-gray-100">
                      {resumeData.languages.map((lang, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <input
                            type="text"
                            placeholder="Language (e.g. English)"
                            className="flex-1 p-2 text-sm border border-gray-300 rounded-md"
                            value={lang.name}
                            onChange={(e) => {
                              const newLangs = [...resumeData.languages];
                              newLangs[index].name = e.target.value;
                              setResumeData({ ...resumeData, languages: newLangs });
                            }}
                          />
                          <input
                            type="number"
                            placeholder="%"
                            min="0"
                            max="100"
                            className="w-16 p-2 text-sm border border-gray-300 rounded-md"
                            value={lang.proficiency}
                            onChange={(e) => {
                              const newLangs = [...resumeData.languages];
                              newLangs[index].proficiency = parseInt(e.target.value) || 0;
                              setResumeData({ ...resumeData, languages: newLangs });
                            }}
                          />
                          <button
                            onClick={() => {
                              const newLangs = resumeData.languages.filter((_, i) => i !== index);
                              setResumeData({ ...resumeData, languages: newLangs });
                            }}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          setResumeData({
                            ...resumeData,
                            languages: [...resumeData.languages, { name: '', proficiency: 100 }]
                          });
                        }}
                        className="w-full py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition flex items-center justify-center gap-2 text-sm font-semibold"
                      >
                        <Plus className="w-4 h-4" /> Add Language
                      </button>
                    </div>
                  )}
                </div>

                {/* Interests Section */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setActiveSection(activeSection === 'interests' ? '' : 'interests')}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center gap-3 font-semibold text-gray-700 text-sm">
                      <Heart className="w-4 h-4 text-blue-600" /> Interests
                    </div>
                    {activeSection === 'interests' ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>

                  {activeSection === 'interests' && (
                    <div className="p-4 space-y-4 animate-fade-in-down border-t border-gray-100">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          id="interestInput"
                          placeholder="Add an interest (e.g. Photography)"
                          className="flex-1 p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              if (e.target.value.trim()) {
                                setResumeData({ ...resumeData, interests: [...resumeData.interests, e.target.value.trim()] });
                                e.target.value = '';
                              }
                            }
                          }}
                        />
                        <button
                          onClick={() => {
                            const input = document.getElementById('interestInput');
                            if (input.value.trim()) {
                              setResumeData({ ...resumeData, interests: [...resumeData.interests, input.value.trim()] });
                              input.value = '';
                            }
                          }}
                          className="bg-gray-900 text-white px-5 rounded-lg hover:bg-gray-800 transition text-sm font-medium"
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {resumeData.interests.map((interest, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 pl-3 pr-2 py-1 rounded-full text-sm flex items-center gap-2 border border-gray-200">
                            {interest}
                            <button
                              onClick={() => {
                                const newInterests = resumeData.interests.filter((_, i) => i !== index);
                                setResumeData({ ...resumeData, interests: newInterests });
                              }}
                              className="hover:text-red-500 p-0.5 hover:bg-red-50 rounded-full transition"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {/* ... (Full Form Implementation End) ... */}

              </div>
            ) : (
              // TEMPLATES TAB CONTENT
              <div className="space-y-6">

                {/* --- THEME COLOR PICKER --- */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Accent Color</h3>
                  <div className="flex flex-wrap gap-3">
                    {COLORS.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleColorSelect(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${resumeData.templates?.colorPalette?.[0] === color ? 'border-gray-900 scale-110 shadow-md' : 'border-transparent hover:scale-105'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div className="text-sm text-gray-600 mb-4">Select a template to instantly preview your resume layout.</div>
                <div className="grid grid-cols-1 gap-6">
                  {TEMPLATES.map((template) => {
                    const isLocked = template.type === 'premium' && !isPremiumUser;
                    return (
                      <div
                        key={template.id}
                        onClick={() => handleTemplateSelect(template.id, template.type)}
                        className={`group cursor-pointer rounded-xl border-2 transition-all duration-200 overflow-hidden relative ${selectedTemplate === template.id ? 'border-blue-600 ring-4 ring-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        <div className={`h-32 ${template.previewColor} flex items-end p-4 relative`}>
                          <div className="w-full bg-white/20 backdrop-blur-sm p-3 rounded-lg space-y-2 opacity-50">
                            <div className="w-1/2 h-2 bg-white/40 rounded"></div>
                            <div className="w-3/4 h-2 bg-white/20 rounded"></div>
                          </div>
                          {template.type === 'premium' && (
                            <div className={`absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1 ${isLocked ? 'bg-gray-900 text-white' : 'bg-yellow-400 text-yellow-900'}`}>
                              {isLocked ? <Lock className="w-3 h-3" /> : <Star className="w-3 h-3 fill-yellow-900" />}
                              {isLocked ? 'Locked' : 'Premium'}
                            </div>
                          )}
                          {isLocked && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition backdrop-blur-[1px]">
                              <span className="bg-white text-gray-900 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg transform scale-95 group-hover:scale-100 transition flex items-center gap-1">
                                <Crown className="w-3 h-3 text-yellow-600" /> Upgrade to Unlock
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="p-4 bg-white">
                          <div className="flex justify-between items-center mb-1">
                            <h3 className="font-bold text-gray-900">{template.name}</h3>
                            {selectedTemplate === template.id && <CheckCircle className="w-5 h-5 text-blue-600" />}
                          </div>
                          <p className="text-xs text-gray-500">{template.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: Live Preview */}
        <div className="hidden lg:flex w-7/12 bg-gray-100 overflow-y-auto p-8 justify-center print:flex print:w-full print:p-0 print:bg-white print:absolute print:inset-0 print:z-50 print:h-auto print:overflow-visible">
          <div
            ref={resumeRef}
            className="print-area bg-white w-[210mm] min-h-[297mm] shadow-xl text-gray-900 transform scale-[0.65] xl:scale-[0.85] origin-top transition-transform duration-300 ease-in-out print:transform-none print:shadow-none print:m-0 print:w-full"
          >
            {/* Dynamic Rendering */}
            {selectedTemplate === 'modern' && <ModernTemplate data={resumeData} themeColor={themeColor} />}
            {selectedTemplate === 'minimal' && <MinimalTemplate data={resumeData} themeColor={themeColor} />}
            {selectedTemplate === 'professional' && <ProfessionalTemplate data={resumeData} themeColor={themeColor} />}
            {selectedTemplate === 'creative' && <CreativeTemplate data={resumeData} themeColor={themeColor} />}
            {selectedTemplate === 'elegant' && <ElegantTemplate data={resumeData} themeColor={themeColor} />}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ResumeEditor;
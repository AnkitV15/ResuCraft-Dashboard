import React from 'react';
import { FileText, Crown, ArrowRight, Plus, Clock, Edit, Trash2 } from 'lucide-react';
import { TEMPLATES } from '../config';

const Dashboard = ({ user, resumes, onCreateNew, onEdit, onDelete, onLogout, onUpgrade }) => {
  const isPremium = user?.subscriptionPlan === 'PREMIUM';

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <FileText className="h-6 w-6 text-blue-600 mr-2" />
              <span className="font-bold text-xl text-gray-900">ResuCraft</span>
            </div>
            <div className="flex items-center gap-4">
              {/* PLAN BADGE */}
              {isPremium ? (
                <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-yellow-200">
                  <Crown className="w-3 h-3 fill-yellow-600" /> Premium Member
                </span>
              ) : (
                <button
                  onClick={onUpgrade}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-gray-200 transition"
                >
                  Free Plan <ArrowRight className="w-3 h-3" />
                </button>
              )}

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                  {user?.firstName ? user.firstName[0] : 'U'}
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {user?.firstName}
                </span>
              </div>
              <button onClick={onLogout} className="text-sm text-gray-500 hover:text-red-600 font-medium">Sign out</button>
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Resumes</h1>
            <p className="text-gray-600">Manage your CVs</p>
          </div>
          <button onClick={onCreateNew} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 hover:-translate-y-1 transform flex items-center gap-2">
            <Plus className="w-5 h-5" /> Create New
          </button>
        </div>
        {resumes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">No resumes yet</h2>
            <button onClick={onCreateNew} className="text-blue-600 font-bold hover:underline">Start building</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div key={resume._id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition overflow-hidden flex flex-col group">
                {/* Preview Area */}
                <div
                  className={`h-40 ${TEMPLATES.find(t => t.id === (resume.templates?.theme || 'modern'))?.previewColor || 'bg-gray-100'} p-4 relative`}
                  onClick={() => onEdit(resume)}
                >
                  <div className="w-full h-full bg-white/20 backdrop-blur-sm rounded border border-white/30 p-4 transform group-hover:scale-105 transition duration-300">
                    <div className="h-2 w-1/2 bg-white/50 rounded mb-2"></div>
                    <div className="h-2 w-3/4 bg-white/30 rounded"></div>
                  </div>
                </div>
                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-gray-900 mb-1 truncate">{resume.title || "Untitled Resume"}</h3>
                  <div className="text-xs text-gray-500 mb-4 flex items-center gap-2">
                    <Clock className="w-3 h-3" /> Updated {new Date(resume.updatedAt).toLocaleDateString()}
                  </div>

                  <div className="mt-auto flex gap-3">
                    <button
                      onClick={() => onEdit(resume)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 font-medium rounded hover:bg-blue-100 transition text-sm"
                    >
                      <Edit className="w-3 h-3" /> Edit
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); onDelete(resume._id); }}
                      className="px-3 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

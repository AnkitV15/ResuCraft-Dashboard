import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

const ModernTemplate = ({ data, themeColor }) => (
    <div className="p-[20mm] h-full">
      <div className="border-b-2 pb-6 mb-8" style={{ borderColor: themeColor }}>
        <h1 className="text-4xl font-bold uppercase tracking-wider mb-2 text-gray-900">{data.profileInfo.fullName}</h1>
        <p className="text-xl font-medium mb-4" style={{ color: themeColor }}>{data.profileInfo.designation}</p>
        <div className="text-sm text-gray-600 flex flex-wrap gap-4 font-medium">
          {data.contactInfo.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {data.contactInfo.email}</span>}
          {data.contactInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {data.contactInfo.phone}</span>}
          {data.contactInfo.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {data.contactInfo.location}</span>}
          {data.contactInfo.linkedin && <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> LinkedIn</span>}
        </div>
      </div>

      {data.profileInfo.summary && (
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-3 border-b pb-1" style={{ color: themeColor, borderColor: '#e5e7eb' }}>Professional Summary</h3>
          <p className="text-sm leading-relaxed text-gray-700">{data.profileInfo.summary}</p>
        </div>
      )}

      {data.workExperiences.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b pb-1" style={{ color: themeColor, borderColor: '#e5e7eb' }}>Experience</h3>
          <div className="space-y-6">
            {data.workExperiences.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-gray-800 text-lg">{exp.role}</h4>
                  <span className="text-xs text-gray-500 font-medium whitespace-nowrap bg-gray-100 px-2 py-1 rounded">{exp.startDate} — {exp.endDate}</span>
                </div>
                <div className="text-sm font-semibold mb-2" style={{ color: themeColor }}>{exp.company}</div>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.projects.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b pb-1" style={{ color: themeColor, borderColor: '#e5e7eb' }}>Projects</h3>
          <div className="space-y-6">
            {data.projects.map((proj, i) => (
              <div key={i}>
                <h4 className="font-bold text-gray-800 text-md">{proj.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed mb-1">{proj.description}</p>
                {proj.github && <div className="text-xs" style={{ color: themeColor }}>Repo: {proj.github}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.educations.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b pb-1" style={{ color: themeColor, borderColor: '#e5e7eb' }}>Education</h3>
          <div className="space-y-4">
            {data.educations.map((edu, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-gray-800">{edu.degree}</h4>
                  <span className="text-xs text-gray-500 font-medium">{edu.startDate} — {edu.endDate}</span>
                </div>
                <div className="text-sm text-gray-600">{edu.institution}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-8">
        {data.skills.length > 0 && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b pb-1" style={{ color: themeColor, borderColor: '#e5e7eb' }}>Skills</h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span key={i} className="bg-gray-50 border px-3 py-1 rounded text-xs font-semibold" style={{ color: themeColor, borderColor: '#e5e7eb' }}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.languages.length > 0 && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b pb-1" style={{ color: themeColor, borderColor: '#e5e7eb' }}>Languages</h3>
            <div className="space-y-1">
              {data.languages.map((lang, i) => (
                <div key={i} className="text-sm text-gray-700">
                  <span className="font-semibold">{lang.name}</span> - {lang.proficiency}%
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {data.certifications.length > 0 && (
        <div className="mt-8">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b pb-1" style={{ color: themeColor, borderColor: '#e5e7eb' }}>Certifications</h3>
          <div className="space-y-2">
            {data.certifications.map((cert, i) => (
              <div key={i} className="text-sm text-gray-700">
                <span className="font-semibold">{cert.title}</span> - {cert.issuer} ({cert.year})
              </div>
            ))}
          </div>
        </div>
      )}

      {data.interests.length > 0 && (
        <div className="mt-8">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b pb-1" style={{ color: themeColor, borderColor: '#e5e7eb' }}>Interests</h3>
          <p className="text-sm text-gray-700">{data.interests.join(", ")}</p>
        </div>
      )}
    </div>
);

export default ModernTemplate;

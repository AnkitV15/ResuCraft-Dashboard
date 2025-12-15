import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ProfessionalTemplate = ({ data, themeColor }) => (
    <div className="flex h-full min-h-[297mm]">
      <div className="w-1/3 text-white p-8 pt-12 min-h-[297mm]" style={{ backgroundColor: themeColor }}>
        <div className="mb-10 break-inside-avoid">
          <h1 className="text-3xl font-bold leading-tight mb-2 text-white">{data.profileInfo.fullName}</h1>
          <p className="text-white/80 text-sm mb-6">{data.profileInfo.designation}</p>
          <div className="space-y-3 text-sm text-white/90">
            {data.contactInfo.email && <div className="flex items-center gap-2 break-all"><Mail className="w-3 h-3 flex-shrink-0" /> {data.contactInfo.email}</div>}
            {data.contactInfo.phone && <div className="flex items-center gap-2"><Phone className="w-3 h-3 flex-shrink-0" /> {data.contactInfo.phone}</div>}
            {data.contactInfo.location && <div className="flex items-center gap-2"><MapPin className="w-3 h-3 flex-shrink-0" /> {data.contactInfo.location}</div>}
          </div>
        </div>

        {data.educations.length > 0 && (
          <div className="mb-10 break-inside-avoid">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4 border-b border-white/20 pb-2">Education</h3>
            <div className="space-y-4">
              {data.educations.map((edu, i) => (
                <div key={i}>
                  <div className="font-bold text-white text-sm">{edu.degree}</div>
                  <div className="text-xs text-white/70">{edu.institution}</div>
                  <div className="text-xs text-white/50">{edu.startDate} - {edu.endDate}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.skills.length > 0 && (
          <div className="mb-10 break-inside-avoid">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4 border-b border-white/20 pb-2">Skills</h3>
            <div className="space-y-2">
              {data.skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-white rounded-full"></div><span className="text-sm text-white/90">{skill.name}</span></div>
              ))}
            </div>
          </div>
        )}

        {data.languages.length > 0 && (
          <div className="mb-10 break-inside-avoid">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4 border-b border-white/20 pb-2">Languages</h3>
            <div className="space-y-2">
              {data.languages.map((lang, i) => (
                <div key={i} className="flex justify-between text-sm text-white/90">
                  <span>{lang.name}</span>
                  <span className="text-white/60">{lang.proficiency}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.interests.length > 0 && (
          <div className="mb-10 break-inside-avoid">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4 border-b border-white/20 pb-2">Interests</h3>
            <p className="text-sm text-white/90">{data.interests.join(", ")}</p>
          </div>
        )}
      </div>
      <div className="w-2/3 bg-white p-10 pt-12">
        {data.profileInfo.summary && (
          <div className="mb-10 break-inside-avoid">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b-2 pb-2" style={{ color: themeColor, borderColor: themeColor }}>Profile</h3>
            <p className="text-sm leading-relaxed text-gray-700">{data.profileInfo.summary}</p>
          </div>
        )}
        {data.workExperiences.length > 0 && (
          <div className="mb-10">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b-2 pb-2" style={{ color: themeColor, borderColor: themeColor }}>Experience</h3>
            <div className="space-y-8">
              {data.workExperiences.map((exp, i) => (
                <div key={i} className="break-inside-avoid">
                  <h4 className="font-bold text-lg" style={{ color: themeColor }}>{exp.role}</h4>
                  <div className="flex justify-between items-center text-sm text-slate-600 mb-3 font-medium"><span>{exp.company}</span><span>{exp.startDate} — {exp.endDate}</span></div>
                  <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.projects.length > 0 && (
          <div className="mb-10">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b-2 pb-2" style={{ color: themeColor, borderColor: themeColor }}>Projects</h3>
            <div className="space-y-6">
              {data.projects.map((proj, i) => (
                <div key={i} className="break-inside-avoid">
                  <h4 className="font-bold text-md" style={{ color: themeColor }}>{proj.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{proj.description}</p>
                  {proj.github && <div className="text-xs mt-1" style={{ color: themeColor }}>Repo: {proj.github}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.certifications.length > 0 && (
          <div className="mb-10">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b-2 pb-2" style={{ color: themeColor, borderColor: themeColor }}>Certifications</h3>
            <div className="space-y-2">
              {data.certifications.map((cert, i) => (
                <div key={i} className="text-sm text-gray-600">{cert.title} - {cert.issuer} ({cert.year})</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
);

export default ProfessionalTemplate;

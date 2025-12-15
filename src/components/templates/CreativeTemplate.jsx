import React from 'react';
import { Mail, Phone, MapPin, Briefcase, BookOpen } from 'lucide-react';

const CreativeTemplate = ({ data, themeColor }) => (
    <div className="flex h-full min-h-[297mm]">
      <div className="w-1/3 p-8 pt-12 min-h-[297mm] text-gray-800 bg-gray-50 border-r border-gray-200">
        <div className="mb-10 break-inside-avoid text-center">
          <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-white shadow-lg" style={{ backgroundColor: themeColor }}>
            {data.profileInfo.fullName.charAt(0)}
          </div>
          <h2 className="text-lg font-bold uppercase tracking-widest mb-6" style={{ color: themeColor }}>Contact</h2>
          <div className="space-y-3 text-sm text-gray-600 text-left">
            {data.contactInfo.email && <div className="flex items-center gap-2 break-all"><Mail className="w-4 h-4" style={{ color: themeColor }} /> {data.contactInfo.email}</div>}
            {data.contactInfo.phone && <div className="flex items-center gap-2"><Phone className="w-4 h-4" style={{ color: themeColor }} /> {data.contactInfo.phone}</div>}
            {data.contactInfo.location && <div className="flex items-center gap-2"><MapPin className="w-4 h-4" style={{ color: themeColor }} /> {data.contactInfo.location}</div>}
          </div>
        </div>

        {data.skills.length > 0 && (
          <div className="mb-10 break-inside-avoid">
            <h2 className="text-lg font-bold uppercase tracking-widest mb-6 text-center" style={{ color: themeColor }}>Skills</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {data.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-semibold shadow-sm">{skill.name}</span>
              ))}
            </div>
          </div>
        )}

        {data.languages.length > 0 && (
          <div className="mb-10 break-inside-avoid">
            <h2 className="text-lg font-bold uppercase tracking-widest mb-6 text-center" style={{ color: themeColor }}>Languages</h2>
            <div className="space-y-3">
              {data.languages.map((lang, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>{lang.name}</span>
                    <span>{lang.proficiency}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full" style={{ width: `${lang.proficiency}%`, backgroundColor: themeColor }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-2/3 p-10 pt-12">
        <div className="mb-10 break-inside-avoid border-b-4 pb-6" style={{ borderColor: themeColor }}>
          <h1 className="text-5xl font-extrabold leading-tight mb-2 text-gray-900">{data.profileInfo.fullName}</h1>
          <p className="text-2xl font-light" style={{ color: themeColor }}>{data.profileInfo.designation}</p>
        </div>

        {data.profileInfo.summary && (
          <div className="mb-10 break-inside-avoid">
            <p className="text-md leading-relaxed text-gray-700">{data.profileInfo.summary}</p>
          </div>
        )}

        {data.workExperiences.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-bold uppercase tracking-widest mb-6 flex items-center gap-3" style={{ color: themeColor }}>
              <span className="p-2 rounded-lg bg-gray-100"><Briefcase className="w-5 h-5" /></span> Experience
            </h3>
            <div className="space-y-8 border-l-2 pl-6 ml-3" style={{ borderColor: '#f3f4f6' }}>
              {data.workExperiences.map((exp, i) => (
                <div key={i} className="break-inside-avoid relative">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full border-4 border-white shadow-sm" style={{ backgroundColor: themeColor }}></div>
                  <h4 className="font-bold text-lg text-gray-900">{exp.role}</h4>
                  <div className="text-sm font-semibold mb-2" style={{ color: themeColor }}>{exp.company} <span className="text-gray-400 font-normal">| {exp.startDate} — {exp.endDate}</span></div>
                  <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.educations.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-bold uppercase tracking-widest mb-6 flex items-center gap-3" style={{ color: themeColor }}>
              <span className="p-2 rounded-lg bg-gray-100"><BookOpen className="w-5 h-5" /></span> Education
            </h3>
            <div className="space-y-4">
              {data.educations.map((edu, i) => (
                <div key={i} className="break-inside-avoid bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                      <div className="text-sm text-gray-600">{edu.institution}</div>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 bg-white rounded shadow-sm text-gray-500">{edu.startDate} - {edu.endDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
);

export default CreativeTemplate;

import React from 'react';

const MinimalTemplate = ({ data, themeColor }) => (
    <div className="p-[20mm] h-full text-center">
      <div className="mb-10 break-inside-avoid">
        <h1 className="text-5xl font-light mb-4 text-gray-900">{data.profileInfo.fullName}</h1>
        <p className="text-xl text-gray-600 mb-6">{data.profileInfo.designation}</p>
        <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-500 tracking-wide uppercase">
          {data.contactInfo.email && <span style={{ color: themeColor }}>{data.contactInfo.email}</span>}
          {data.contactInfo.phone && <span>• {data.contactInfo.phone}</span>}
          {data.contactInfo.location && <span>• {data.contactInfo.location}</span>}
        </div>
      </div>
      <div className="text-left max-w-3xl mx-auto">
        {data.profileInfo.summary && (
          <div className="mb-10 break-inside-avoid"><p className="text-md leading-relaxed text-gray-700 italic text-center">{data.profileInfo.summary}</p></div>
        )}
        <div className="h-px bg-gray-200 w-1/2 mx-auto mb-10"></div>

        {data.workExperiences.length > 0 && (
          <div className="mb-10">
            <h3 className="text-center text-lg font-medium uppercase tracking-[0.2em] mb-8" style={{ color: themeColor }}>Experience</h3>
            <div className="space-y-8">
              {data.workExperiences.map((exp, i) => (
                <div key={i} className="relative pl-8 border-l border-gray-200 break-inside-avoid" style={{ borderColor: themeColor }}>
                  <h4 className="font-bold text-gray-900">{exp.role}</h4>
                  <div className="text-sm text-gray-600 mb-2">{exp.company} | {exp.startDate} – {exp.endDate}</div>
                  <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.projects.length > 0 && (
          <div className="mb-10">
            <h3 className="text-center text-lg font-medium uppercase tracking-[0.2em] mb-8" style={{ color: themeColor }}>Projects</h3>
            <div className="space-y-6">
              {data.projects.map((proj, i) => (
                <div key={i} className="text-center break-inside-avoid">
                  <h4 className="font-bold text-gray-900">{proj.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.educations.length > 0 && (
          <div className="mb-10">
            <h3 className="text-center text-lg font-medium uppercase tracking-[0.2em] mb-8" style={{ color: themeColor }}>Education</h3>
            <div className="space-y-4">
              {data.educations.map((edu, i) => (
                <div key={i} className="text-center break-inside-avoid">
                  <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                  <div className="text-sm text-gray-600">{edu.institution}</div>
                  <div className="text-xs text-gray-500 italic">{edu.startDate} – {edu.endDate}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.skills.length > 0 && (
          <div className="mb-8 break-inside-avoid">
            <h3 className="text-center text-lg font-medium uppercase tracking-[0.2em] mb-6" style={{ color: themeColor }}>Skills</h3>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {data.skills.map((skill, i) => <span key={i} className="text-sm text-gray-600 border-b border-transparent hover:border-gray-300 transition">{skill.name}</span>)}
            </div>
          </div>
        )}

        {data.certifications.length > 0 && (
          <div className="mb-8 break-inside-avoid text-center">
            <h3 className="text-center text-lg font-medium uppercase tracking-[0.2em] mb-6" style={{ color: themeColor }}>Certifications</h3>
            <div className="space-y-2">
              {data.certifications.map((cert, i) => (
                <div key={i} className="text-sm text-gray-600">{cert.title} - {cert.issuer} ({cert.year})</div>
              ))}
            </div>
          </div>
        )}

        {data.languages.length > 0 && (
          <div className="mb-8 break-inside-avoid text-center">
            <h3 className="text-center text-lg font-medium uppercase tracking-[0.2em] mb-6" style={{ color: themeColor }}>Languages</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {data.languages.map((lang, i) => (
                <span key={i} className="text-sm text-gray-600">{lang.name} ({lang.proficiency}%)</span>
              ))}
            </div>
          </div>
        )}

        {data.interests.length > 0 && (
          <div className="mb-8 break-inside-avoid text-center">
            <h3 className="text-center text-lg font-medium uppercase tracking-[0.2em] mb-6" style={{ color: themeColor }}>Interests</h3>
            <p className="text-sm text-gray-600">{data.interests.join(" • ")}</p>
          </div>
        )}
      </div>
    </div>
);

export default MinimalTemplate;

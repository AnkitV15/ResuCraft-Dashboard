import React from 'react';

const ElegantTemplate = ({ data, themeColor }) => (
    <div className="p-[20mm] h-full font-serif">
      <div className="text-center mb-10 pb-6 border-b border-gray-300 break-inside-avoid">
        <h1 className="text-4xl font-bold mb-3 tracking-wide text-gray-900">{data.profileInfo.fullName}</h1>
        <p className="text-lg italic text-gray-600 mb-4">{data.profileInfo.designation}</p>
        <div className="flex justify-center gap-6 text-sm text-gray-500 font-sans">
          {data.contactInfo.email && <span>{data.contactInfo.email}</span>}
          {data.contactInfo.phone && <span>{data.contactInfo.phone}</span>}
          {data.contactInfo.location && <span>{data.contactInfo.location}</span>}
        </div>
      </div>

      <div className="px-4">
        {data.profileInfo.summary && (
          <div className="mb-8 break-inside-avoid text-center">
            <p className="text-md leading-relaxed text-gray-700">{data.profileInfo.summary}</p>
          </div>
        )}

        {data.workExperiences.length > 0 && (
          <div className="mb-8">
            <h3 className="text-center font-bold uppercase tracking-widest mb-6 text-sm border-b border-gray-200 pb-2 mx-auto w-1/2" style={{ color: themeColor }}>Professional Experience</h3>
            <div className="space-y-6">
              {data.workExperiences.map((exp, i) => (
                <div key={i} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-lg text-gray-900">{exp.role}</h4>
                    <span className="text-sm italic text-gray-500 font-sans">{exp.startDate} — {exp.endDate}</span>
                  </div>
                  <div className="text-md italic mb-2" style={{ color: themeColor }}>{exp.company}</div>
                  <p className="text-sm text-gray-700 leading-relaxed font-sans">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.educations.length > 0 && (
          <div className="mb-8">
            <h3 className="text-center font-bold uppercase tracking-widest mb-6 text-sm border-b border-gray-200 pb-2 mx-auto w-1/2" style={{ color: themeColor }}>Education</h3>
            <div className="space-y-4">
              {data.educations.map((edu, i) => (
                <div key={i} className="break-inside-avoid flex justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                    <div className="italic text-gray-600">{edu.institution}</div>
                  </div>
                  <span className="text-sm text-gray-500 font-sans">{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-8 mt-8">
          {data.skills.length > 0 && (
            <div>
              <h3 className="text-center font-bold uppercase tracking-widest mb-4 text-sm border-b border-gray-200 pb-2" style={{ color: themeColor }}>Skills</h3>
              <div className="text-center text-sm font-sans text-gray-700 leading-loose">
                {data.skills.map(s => s.name).join(" • ")}
              </div>
            </div>
          )}

          {data.certifications.length > 0 && (
            <div>
              <h3 className="text-center font-bold uppercase tracking-widest mb-4 text-sm border-b border-gray-200 pb-2" style={{ color: themeColor }}>Certifications</h3>
              <div className="space-y-1 text-center font-sans">
                {data.certifications.map((cert, i) => (
                  <div key={i} className="text-sm text-gray-700">{cert.title}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
);

export default ElegantTemplate;

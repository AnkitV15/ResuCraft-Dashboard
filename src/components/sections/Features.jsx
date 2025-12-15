import React from 'react'
import { Zap, Shield, Layout, Download, Users, Star } from 'lucide-react'


const FeatureCard = ({ icon, iconColor, title, description }) => (
    <div className="group p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className={`${iconColor} w-12 h-12 rounded-xl flex items-center justify-center shadow-md mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
);

function Features() {
    return (
        <section id="features" className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Why professionals choose ResuCraft</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">We focus on the details that recruiters care about, so you can focus on the interview.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<Zap className="w-6 h-6 text-white" />}
                        iconColor="bg-yellow-500"
                        title="Smart Content"
                        description="Stuck on what to say? Access thousands of professional bullet points tailored specifically to your job title and industry."
                    />
                    <FeatureCard
                        icon={<Shield className="w-6 h-6 text-white" />}
                        iconColor="bg-green-500"
                        title="ATS Friendly"
                        description="Our templates are designed to pass Applicant Tracking Systems used by 99% of Fortune 500 companies."
                    />
                    <FeatureCard
                        icon={<Layout className="w-6 h-6 text-white" />}
                        iconColor="bg-indigo-500"
                        title="Real-time Preview"
                        description="See changes instantly as you type. Customize fonts, colors, and layout with a single click without breaking the format."
                    />
                    <FeatureCard
                        icon={<Download className="w-6 h-6 text-white" />}
                        iconColor="bg-blue-500"
                        title="One-Click Export"
                        description="Download your resume in PDF or Word format instantly. No watermarks, even on the free plan."
                    />
                    <FeatureCard
                        icon={<Users className="w-6 h-6 text-white" />}
                        iconColor="bg-pink-500"
                        title="Expert Reviewed"
                        description="Every template is reviewed by HR experts to ensure it meets current hiring standards and best practices."
                    />
                    <FeatureCard
                        icon={<Star className="w-6 h-6 text-white" />}
                        iconColor="bg-orange-500"
                        title="Smart Suggestions"
                        description="Get real-time feedback on your resume's strength and suggestions on how to improve your score."
                    />
                </div>
            </div>
        </section>
    )
}
export default Features
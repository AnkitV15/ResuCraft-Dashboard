import React from 'react'
import { Star, ArrowRight, CheckCircle } from 'lucide-react'

function Hero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-semibold text-sm mb-8 animate-fade-in-up">
                        <Star className="w-4 h-4 mr-2 fill-blue-700" />
                        <span className="mr-1">New:</span> Professional Cover Letter Generator
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 leading-tight">
                        Build a job-winning resume <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            in minutes, not hours.
                        </span>
                    </h1>

                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
                        Our advanced builder helps you create a professional resume that passes ATS scans and lands you 3x more interviews. No design skills needed.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
                        <button className="group flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-all transform hover:-translate-y-1 shadow-xl shadow-blue-600/30 active:scale-95">
                            Build My Resume
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-lg font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95">
                            View Templates
                        </button>
                    </div>
                </div>

                {/* Visual Mockup Area */}
                <div className="relative mx-auto max-w-6xl">
                    {/* Glow effect behind */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur-lg opacity-20"></div>

                    <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 ring-1 ring-gray-900/5">
                        {/* Fake Browser Toolbar */}
                        <div className="h-8 bg-gray-100 border-b border-gray-200 flex items-center px-4 space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>

                        {/* App UI Placeholder */}
                        <div className="grid grid-cols-1 md:grid-cols-12 bg-gray-50 min-h-[400px] md:min-h-[600px]">
                            {/* Sidebar */}
                            <div className="hidden md:block md:col-span-3 bg-white border-r border-gray-200 p-6 space-y-6">
                                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                                <div className="space-y-3">
                                    <div className="h-10 bg-blue-50 border-l-4 border-blue-600 rounded-r flex items-center px-3">
                                        <div className="h-2 w-16 bg-blue-200 rounded"></div>
                                    </div>
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="h-10 flex items-center px-3">
                                            <div className="h-2 w-20 bg-gray-100 rounded"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Editor Area */}
                            <div className="col-span-12 md:col-span-9 p-8 md:p-12 overflow-hidden flex justify-center">
                                <div className="w-full max-w-2xl bg-white shadow-lg h-full rounded-sm p-8 md:p-12 border border-gray-100 transform scale-95 md:scale-100 origin-top">
                                    {/* Resume Skeleton */}
                                    <div className="flex justify-between items-start mb-8 border-b-2 border-gray-900 pb-4">
                                        <div>
                                            <div className="h-8 w-48 bg-gray-800 rounded mb-2"></div>
                                            <div className="h-4 w-32 bg-gray-400 rounded"></div>
                                        </div>
                                        <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                                    </div>
                                    <div className="space-y-6">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="space-y-2">
                                                <div className="h-5 w-32 bg-blue-100 rounded"></div>
                                                <div className="h-3 w-full bg-gray-100 rounded"></div>
                                                <div className="h-3 w-5/6 bg-gray-100 rounded"></div>
                                                <div className="h-3 w-4/6 bg-gray-100 rounded"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Badge on UI */}
                        <div className="absolute bottom-8 right-8 bg-white p-4 rounded-lg shadow-xl border border-gray-100 animate-bounce hidden md:block">
                            <div className="flex items-center gap-3">
                                <div className="bg-green-100 p-2 rounded-full">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-gray-900">ATS Score: 98/100</div>
                                    <div className="text-xs text-gray-500">Excellent!</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Hero
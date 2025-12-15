import React from 'react'

const Step = ({ number, title, desc }) => (
    <div className="flex gap-6 group">
        <div className="flex-shrink-0 w-12 h-12 bg-white border-2 border-blue-100 text-blue-600 font-bold text-xl rounded-full flex items-center justify-center group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
            {number}
        </div>
        <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600">{desc}</p>
        </div>
    </div>
);

function Steps() {
    return (
        <section className="py-24 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Create a perfect resume in <br />
                            <span className="text-blue-600">3 simple steps</span>
                        </h2>
                        <div className="space-y-8 mt-10">
                            <Step
                                number="01"
                                title="Pick a Template"
                                desc="Choose from our library of professional, field-tested templates."
                            />
                            <Step
                                number="02"
                                title="Fill in Your Details"
                                desc="Enter your info manually or import from LinkedIn. Use pre-written examples to save time."
                            />
                            <Step
                                number="03"
                                title="Download & Apply"
                                desc="Export as PDF and start applying to your dream jobs immediately."
                            />
                        </div>
                    </div>
                    <div className="lg:w-1/2 relative">
                        <div className="absolute inset-0 bg-blue-600 rounded-3xl rotate-3 opacity-10"></div>
                        <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                            {/* Abstract representation of templates */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="bg-gray-100 h-48 rounded-xl w-full flex items-center justify-center hover:bg-blue-50 hover:ring-2 ring-blue-500 transition cursor-pointer">
                                        <div className="w-16 h-20 bg-white shadow-sm"></div>
                                    </div>
                                    <div className="bg-gray-100 h-64 rounded-xl w-full flex items-center justify-center hover:bg-blue-50 hover:ring-2 ring-blue-500 transition cursor-pointer">
                                        <div className="w-16 h-24 bg-white shadow-sm"></div>
                                    </div>
                                </div>
                                <div className="space-y-4 pt-8">
                                    <div className="bg-gray-100 h-64 rounded-xl w-full flex items-center justify-center hover:bg-blue-50 hover:ring-2 ring-blue-500 transition cursor-pointer">
                                        <div className="w-16 h-24 bg-white shadow-sm"></div>
                                    </div>
                                    <div className="bg-gray-100 h-48 rounded-xl w-full flex items-center justify-center hover:bg-blue-50 hover:ring-2 ring-blue-500 transition cursor-pointer">
                                        <div className="w-16 h-20 bg-white shadow-sm"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Steps
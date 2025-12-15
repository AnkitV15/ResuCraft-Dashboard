import React from 'react'


function CTA() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">Ready to land your dream job?</h2>
                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">Join thousands of professionals who have advanced their careers with ResuCraft. It takes less than 15 minutes.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl shadow-blue-600/30 transition-all hover:-translate-y-1">
                        Create My Resume for Free
                    </button>
                </div>
                <p className="mt-6 text-sm text-gray-500">No credit card required • Cancel anytime</p>
            </div>
        </section>
    )
}

export default CTA
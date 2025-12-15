import React from 'react'


function SocialProofs() {
    return (
        <section className="py-20 bg-blue-900 text-white relative overflow-hidden">
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-blue-800">
                    <div className="p-4">
                        <div className="text-4xl font-bold mb-2">150k+</div>
                        <div className="text-blue-200">Resumes Created</div>
                    </div>
                    <div className="p-4">
                        <div className="text-4xl font-bold mb-2">85%</div>
                        <div className="text-blue-200">Interview Success</div>
                    </div>
                    <div className="p-4">
                        <div className="text-4xl font-bold mb-2">4.9/5</div>
                        <div className="text-blue-200">User Rating</div>
                    </div>
                    <div className="p-4">
                        <div className="text-4xl font-bold mb-2">24/7</div>
                        <div className="text-blue-200">Support</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SocialProofs
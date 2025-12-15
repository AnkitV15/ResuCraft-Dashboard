import React from 'react'
import { FileText } from 'lucide-react'

function Footer() {
    return (
        <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                    <div className="col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-blue-600 p-1.5 rounded">
                                <FileText className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-bold text-xl text-gray-900">ResuCraft</span>
                        </div>
                        <p className="text-gray-500 max-w-xs mb-6">
                            The easiest way to build a professional resume that gets you hired. trusted by job seekers worldwide.
                        </p>
                        <div className="flex space-x-4">
                            {/* Social placeholders */}
                            <div className="w-8 h-8 bg-gray-200 rounded-full hover:bg-blue-600 hover:text-white transition cursor-pointer"></div>
                            <div className="w-8 h-8 bg-gray-200 rounded-full hover:bg-blue-600 hover:text-white transition cursor-pointer"></div>
                            <div className="w-8 h-8 bg-gray-200 rounded-full hover:bg-blue-600 hover:text-white transition cursor-pointer"></div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Product</h4>
                        <ul className="space-y-2 text-gray-600">
                            <li><a href="#" className="hover:text-blue-600 transition">Templates</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition">Resume Examples</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition">Cover Letter</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition">Pricing</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Resources</h4>
                        <ul className="space-y-2 text-gray-600">
                            <li><a href="#" className="hover:text-blue-600 transition">Blog</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition">Career Advice</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition">Help Center</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition">Contact Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
                        <ul className="space-y-2 text-gray-600">
                            <li><a href="#" className="hover:text-blue-600 transition">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-gray-500 text-sm">
                        © 2024 ResuCraft Inc. All rights reserved.
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>Made with</span>
                        <div className="text-red-500">♥</div>
                        <span>for job seekers</span>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer
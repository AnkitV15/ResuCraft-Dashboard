import React, { useState, useEffect } from 'react';
import { FileText, Star, ArrowRight, Menu, X, Zap, Shield, Layout, CheckCircle } from 'lucide-react';

const NavLinks = () => (
  <>
    <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Features</a>
    <a href="#templates" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Templates</a>
    <a href="#pricing" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Pricing</a>
  </>
);

const MobileNavLink = ({ href, children }) => (
  <a href={href} className="block px-4 py-3 text-gray-600 font-medium hover:bg-gray-50 rounded-lg transition-colors">
    {children}
  </a>
);

const FeatureCard = ({ icon, iconColor, title, description }) => (
  <div className="group p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className={`${iconColor} w-12 h-12 rounded-xl flex items-center justify-center shadow-md mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

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

const LandingPage = ({ onNavigate, isAuthenticated, onLogout, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isMenuOpen ? 'bg-white/90 backdrop-blur-lg border-b border-gray-100 shadow-sm' : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="bg-blue-600 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-600/20">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600">
                ResuCraft
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <NavLinks />
              <div className="flex items-center space-x-4 ml-4">
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={() => onNavigate('dashboard')}
                      className="text-gray-600 hover:text-blue-600 font-medium px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={onLogout}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2.5 rounded-full font-bold transition-all"
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => onNavigate('login')}
                      className="text-gray-600 hover:text-blue-600 font-medium px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      Log in
                    </button>
                    <button
                      onClick={() => onNavigate('signup')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-bold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-blue-600/20 active:scale-95"
                    >
                      Get Started
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl animate-fade-in-down">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <MobileNavLink href="#features">Features</MobileNavLink>
              <MobileNavLink href="#templates">Templates</MobileNavLink>
              <MobileNavLink href="#pricing">Pricing</MobileNavLink>
              <div className="h-px bg-gray-100 my-4"></div>
              {isAuthenticated ? (
                <button
                  onClick={() => { setIsMenuOpen(false); onNavigate('dashboard'); }}
                  className="block w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-bold"
                >
                  Go to Dashboard
                </button>
              ) : (
                <>
                  <button
                    onClick={() => { setIsMenuOpen(false); onNavigate('login'); }}
                    className="block w-full text-left px-4 py-3 text-gray-600 font-medium hover:bg-gray-50 rounded-lg"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => { setIsMenuOpen(false); onNavigate('signup'); }}
                    className="block w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-bold shadow-lg shadow-blue-600/20 active:scale-95 transition-transform"
                  >
                    Get Started Free
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
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
              <button
                onClick={() => onNavigate(isAuthenticated ? 'dashboard' : 'signup')}
                className="group flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-all transform hover:-translate-y-1 shadow-xl shadow-blue-600/30 active:scale-95"
              >
                Build My Resume
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-lg font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95">
                View Templates
              </button>
            </div>
          </div>

          <div className="relative mx-auto max-w-6xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur-lg opacity-20"></div>
            <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 ring-1 ring-gray-900/5">
              <div className="h-8 bg-gray-100 border-b border-gray-200 flex items-center px-4 space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 bg-gray-50 min-h-[400px] md:min-h-[600px]">
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
                <div className="col-span-12 md:col-span-9 p-8 md:p-12 overflow-hidden flex justify-center">
                  <div className="w-full max-w-2xl bg-white shadow-lg h-full rounded-sm p-8 md:p-12 border border-gray-100 transform scale-95 md:scale-100 origin-top">
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

      {/* --- Features Grid --- */}
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
          </div>
        </div>
      </section>

      {/* --- Steps Section --- */}
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

      {/* --- Social Proof / Stats --- */}
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

      {/* --- CTA Footer --- */}
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

      {/* --- Footer --- */}
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
    </div>
  );
};

export default LandingPage;

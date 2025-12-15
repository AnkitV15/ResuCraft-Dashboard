import { FileText, Menu, X } from 'lucide-react';


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

const Navbar = ({ scrolled, isMenuOpen, setIsMenuOpen }) => {

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isMenuOpen ? 'bg-white/90 backdrop-blur-lg border-b border-gray-100 shadow-sm' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer group">
                        <div className="bg-blue-600 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-600/20">
                            <FileText className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600">
                            ResuCraft
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLinks />
                        <div className="flex items-center space-x-4 ml-4">
                            <button className="text-gray-600 hover:text-blue-600 font-medium px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors">
                                Log in
                            </button>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-bold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-blue-600/20 active:scale-95">
                                Get Started
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
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

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl animate-fade-in-down">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <MobileNavLink href="#features">Features</MobileNavLink>
                        <MobileNavLink href="#templates">Templates</MobileNavLink>
                        <MobileNavLink href="#pricing">Pricing</MobileNavLink>
                        <div className="h-px bg-gray-100 my-4"></div>
                        <button className="block w-full text-left px-4 py-3 text-gray-600 font-medium hover:bg-gray-50 rounded-lg">
                            Log in
                        </button>
                        <button className="block w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-bold shadow-lg shadow-blue-600/20 active:scale-95 transition-transform">
                            Get Started Free
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
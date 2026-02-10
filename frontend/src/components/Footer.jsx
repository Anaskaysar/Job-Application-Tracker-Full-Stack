import Logo from "./Logo";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-gray-400 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="mb-4">
              <Logo size="md" variant="gradient" />
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              The smart way to manage your job search and land your dream role.
              Join thousands of successful professionals today.
            </p>
          </div>

          {/* Product Section */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white font-semibold mb-6 uppercase text-xs tracking-widest">Product</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Demo
                </a>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white font-semibold mb-6 uppercase text-xs tracking-widest">Company</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start mt-4 md:mt-0 pt-8 md:pt-0 border-t border-gray-800 md:border-t-0 w-full md:w-auto">
            <h4 className="text-white font-semibold mb-6 uppercase text-xs tracking-widest">Legal</h4>
            <div className="flex flex-wrap justify-center md:flex-col gap-x-8 gap-y-4 text-sm">
              <a href="#" className="hover:text-white transition-colors duration-200">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200">
                Security
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; 2026 Job Tracker. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors duration-200">Twitter</a>
            <a href="#" className="hover:text-white transition-colors duration-200">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors duration-200">GitHub</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

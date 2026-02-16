import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-24 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Privacy Policy
          </h1>

          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            {/* 1 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-800 mb-4">
                1. Information We Collect
              </h2>
              <p className="text-slate-600 mb-4">
                We collect information you provide directly when you use our
                services. This may include:
              </p>
              <ul className="list-disc pl-5 text-slate-600 space-y-2">
                <li>Contact information (name, email address)</li>
                <li>Job application data (company names, positions, status, notes)</li>
                <li>Files you upload (resumes, cover letters)</li>
                <li>Technical data such as IP address, browser type, and device information</li>
              </ul>
            </section>

            {/* 2 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-800 mb-4">
                2. How We Use Your Information
              </h2>
              <ul className="list-disc pl-5 text-slate-600 space-y-2">
                <li>Provide, operate, and improve our services</li>
                <li>Store and manage your job application data</li>
                <li>Communicate important updates or support messages</li>
                <li>Maintain platform security and prevent misuse</li>
              </ul>
            </section>

            {/* 3 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-800 mb-4">
                3. Cookies & Advertising
              </h2>
              <p className="text-slate-600 mb-4">
                This website may use cookies and similar technologies to improve
                user experience and deliver relevant content and advertisements.
              </p>
              <p className="text-slate-600 mb-4">
                We may display advertisements served by <strong>Google AdSense</strong>.
                Google uses cookies, including the <strong>DoubleClick cookie</strong>,
                to show ads to users based on their visits to this and other websites.
              </p>
              <p className="text-slate-600 mb-4">
                Users may opt out of personalized advertising by visiting:
              </p>
              <ul className="list-disc pl-5 text-slate-600 space-y-2">
                <li>
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Ads Settings
                  </a>
                </li>
                <li>
                  <a
                    href="https://policies.google.com/technologies/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    How Google uses data from sites that use its services
                  </a>
                </li>
              </ul>
            </section>

            {/* 4 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-800 mb-4">
                4. Data Security
              </h2>
              <p className="text-slate-600">
                We take reasonable administrative and technical measures to help
                protect your information from unauthorized access, loss, misuse,
                or disclosure.
              </p>
            </section>

            {/* 5 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-800 mb-4">
                5. Contact Us
              </h2>
              <p className="text-slate-600">
                If you have any questions about this Privacy Policy, please contact
                us at{" "}
                <a
                  href="mailto:support@jobtrackerr.com"
                  className="text-blue-600 hover:underline"
                >
                  support@jobtrackerr.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const SecurityPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-24 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Security</h1>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-800 mb-4">1. Data Encryption</h2>
              <p className="text-slate-600 mb-4">
                We use industry-standard encryption protocols (TLS/SSL) to protect data transmitted between your device and our servers. Sensitive data, such as passwords, are hashed using strong cryptographic algorithms (Argon2) before being stored in our database.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-800 mb-4">2. Infrastructure Security</h2>
              <p className="text-slate-600 mb-4">
                Our servers are hosted on Amazon Web Services (AWS), a leading cloud provider with world-class physical and network security. We employ firewalls, intrusion detection systems, and regular security updates to safeguard our infrastructure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-800 mb-4">3. Access Control</h2>
              <p className="text-slate-600 mb-4">
                Access to user data is strictly limited to authorized personnel who need it to perform their job duties. We implement strict access controls and regular audits to ensure compliance.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-800 mb-4">4. Vulnerability Disclosure</h2>
              <p className="text-slate-600">
                If you discover a security vulnerability in our platform, please report it to us immediately at kaysarulanas2@gmail.com. We appreciate your help in keeping our community safe.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SecurityPage;

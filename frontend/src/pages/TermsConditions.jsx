import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const TermsConditions = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-24 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Terms and Conditions</h1>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-800 mb-4">1. Introduction</h2>
              <p className="text-slate-600 mb-4">
                    Welcome to JobTrackerr!. By using our application, you agree to these terms. Please read them carefully.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-800 mb-4">2. Use of Service</h2>
              <p className="text-slate-600 mb-4">
                You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-800 mb-4">3. User Content</h2>
              <p className="text-slate-600 mb-4">
                You retain ownership of any data or content you upload to the service (such as job application details). You grant us a license to store and display this content solely for the purpose of providing the service to you.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-800 mb-4">4. Termination</h2>
              <p className="text-slate-600 mb-4">
                We reserve the right to terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-800 mb-4">5. Limitation of Liability</h2>
              <p className="text-slate-600">
                In no event shall JobTrackerr!, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsConditions;

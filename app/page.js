import React from 'react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">TalAIt</span>
          </div>
          <div className="flex gap-4">
            <a 
              href="/login" 
              className="px-6 py-2 text-gray-700 hover:text-indigo-600 transition-colors font-medium"
            >
              Sign In
            </a>
            <a 
              href="/signUp" 
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center space-y-8">
          <div className="inline-block">
            <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
              Secure Enterprise Translation Platform
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 leading-tight">
            Translate with
            <span className="block text-indigo-600">
              Confidence & Security
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Built for TalAIt's US expansion. Secure, fast, and accurate translations for your product listings and customer support—powered by AI.
          </p>

          <div className="flex gap-4 justify-center pt-4">
            <a 
              href="/signUp" 
              className="group px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all text-lg font-medium shadow-lg inline-flex items-center gap-2"
            >
              Start Translating
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a 
              href="#features" 
              className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors text-lg font-medium"
            >
              Learn More
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">2</div>
              <div className="text-gray-600 mt-1">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">100%</div>
              <div className="text-gray-600 mt-1">Secure</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">Instant</div>
              <div className="text-gray-600 mt-1">Results</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built for Enterprise Translation Needs
            </h2>
            <p className="text-gray-600 text-lg">
              Everything your team needs to translate confidently at scale
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-indigo-100 hover:border-indigo-200 transition-colors">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                JWT Authentication
              </h3>
              <p className="text-gray-600">
                Enterprise-grade security with JSON Web Tokens. Only authenticated employees can access translation services.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-indigo-100 hover:border-indigo-200 transition-colors">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                AI-Powered Translation
              </h3>
              <p className="text-gray-600">
                Leveraging Hugging Face's Helsinki-NLP models for accurate French-English translations in real-time.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-indigo-100 hover:border-indigo-200 transition-colors">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Bidirectional Support
              </h3>
              <p className="text-gray-600">
                Seamlessly translate from French to English for marketing and English to French for customer support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="py-24 max-w-7xl mx-auto px-6 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Perfect for Your Teams
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">M</span>
                </div>
                <div>
                  <h3 className="text-gray-900 font-semibold text-lg mb-2">Marketing Team</h3>
                  <p className="text-gray-600">
                    Quickly translate product descriptions from French to English for the US market launch. Maintain brand consistency across regions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">S</span>
                </div>
                <div>
                  <h3 className="text-gray-900 font-semibold text-lg mb-2">Customer Support</h3>
                  <p className="text-gray-600">
                    Handle English customer tickets efficiently by translating them to French for your support team to process.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-indigo-100">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🛡️</span>
                <h3 className="text-gray-900 font-semibold text-lg">Data Security</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Your sensitive data never leaves our secure infrastructure. All translations are processed internally with encrypted connections.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                  PostgreSQL database encryption
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                  JWT token authentication
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                  Dockerized deployment
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Scale Your US Expansion?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join your team and start translating securely today.
          </p>
          <a 
            href="/signUp" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-colors text-lg font-medium shadow-xl"
          >
            Get Started Now
            <span>→</span>
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
          <p>© 2025 TalAIt Translation Platform. Built for secure enterprise translation.</p>
        </div>
      </footer>
    </div>
  );
}
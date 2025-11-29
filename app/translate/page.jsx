"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Page() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en_to_fr");
  const router = useRouter();
  const [translation, setTranslation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, language }),
      });
      const data = await res.json();
      setTranslation(data[0].translation_text);
    } catch (error) {
      console.error("Translation error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function logout(){
    try {
      const res = await fetch("api/logout", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include'
      });
      
      if (res.status === 200) {
        router.push('/login');
      } else {
        console.error('Logout failed with status:', res.status);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  useEffect(() => {
    async function verifyToken() {
      const res = await fetch("api/verifyToken", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (data.message !== "sucess") {
        router.push("/login");
      }
    }
    verifyToken();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header with logout button */}
      <div className="max-w-3xl mx-auto mb-8 flex justify-between items-center">
        <div className="flex-1"></div>
        <button
          onClick={logout}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-sm"
        >
          Logout
        </button>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-3 tracking-tight">
            Language Translator
          </h1>
          <p className="text-lg text-gray-600">
            Translate text between English and French instantly
          </p>
        </div>

        {/* Main Translation Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6 border border-gray-100">
          <div className="space-y-6">
            {/* Text Input */}
            <div>
              <label
                htmlFor="text-input"
                className="block text-sm font-semibold text-gray-900 mb-3"
              >
                Enter text to translate
              </label>
              <textarea
                id="text-input"
                className="w-full border-2 border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none text-gray-900 placeholder-gray-400"
                rows="5"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your text here..."
              />
            </div>

            {/* Language Selector */}
            <div>
              <label
                htmlFor="language-select"
                className="block text-sm font-semibold text-gray-900 mb-3"
              >
                Translation direction
              </label>
              <select
                id="language-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white text-gray-900 font-medium cursor-pointer"
              >
                <option value="en_to_fr">🇬🇧 English → 🇫🇷 French</option>
                <option value="fr_to_en">🇫🇷 French → 🇬🇧 English</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading || !text.trim()}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Translating...
                </span>
              ) : (
                "Translate"
              )}
            </button>
          </div>
        </div>

        {/* Translation Result Card */}
        {translation && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-xl p-8 border-2 border-green-100 animate-in fade-in duration-300">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Translation Result
              </h2>
            </div>
            <p className="text-gray-800 text-lg leading-relaxed font-medium pl-13">
              {translation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
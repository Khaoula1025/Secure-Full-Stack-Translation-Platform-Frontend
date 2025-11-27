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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Language Translator
          </h1>
          <p className="text-gray-600">
            Translate text between English and French instantly
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="text-input"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Enter text to translate
              </label>
              <textarea
                id="text-input"
                className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                rows="4"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your text here..."
                required
              />
            </div>

            <div>
              <label
                htmlFor="language-select"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Translation direction
              </label>
              <select
                id="language-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white"
              >
                <option value="en_to_fr">English → French</option>
                <option value="fr_to_en">French → English</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading || !text.trim()}
              className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "Translating..." : "Translate"}
            </button>
          </form>
        </div>

        {translation && (
          <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Translation:
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {translation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
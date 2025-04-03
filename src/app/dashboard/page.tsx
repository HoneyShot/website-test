"use client";

import { useLanguage } from "../components/LanguageContext";

export default function dashboard() {
    return (<div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        {/* Light Theme Preview */}
        <div className="bg-gray-50 text-gray-800 p-10 space-y-10">
            <h1 className="text-2xl font-bold text-emerald-500">Light Theme</h1>

            <div className="space-y-4">
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-2 rounded">
                    Primary Button
                </button>
                <p>
                    This is some paragraph text.{" "}
                    <a href="#" className="text-emerald-600 underline hover:text-emerald-700">
                        Learn more
                    </a>
                </p>
                <div className="p-4 border border-gray-200 rounded">
                    This is a card or box with subtle border.
                </div>
            </div>

            <footer className="text-sm text-gray-500">© 2025 Your Name</footer>
        </div>

        {/* Dark Theme Preview */}
        <div className="bg-gray-900 text-gray-100 p-10 space-y-10">
            <h1 className="text-2xl font-bold text-emerald-400">Dark Theme</h1>

            <div className="space-y-4">
                <button className="bg-emerald-400 hover:bg-emerald-500 text-black font-medium px-4 py-2 rounded">
                    Primary Button
                </button>
                <p>
                    This is some paragraph text.{" "}
                    <a href="#" className="text-emerald-300 underline hover:text-emerald-400">
                        Learn more
                    </a>
                </p>
                <div className="p-4 border border-gray-700 rounded">
                    This is a card or box with subtle border.
                </div>
            </div>

            <footer className="text-sm text-gray-400">© 2025 Your Name</footer>
        </div>
    </div>);
}
"use client";

import { useState } from "react";

export default function TestCertificate() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const generateCertificate = async () => {
    if (!name.trim()) {
      alert("Please enter a name");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/generate-certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate certificate");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url); // Opens in new tab/window
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate certificate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Certificate Generator
        </h1>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter Name for Certificate
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., John Doe"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={loading}
            />
          </div>

          <button
            onClick={generateCertificate}
            disabled={loading || !name.trim()}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Generating..." : "Generate Certificate"}
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          <p className="mb-2">
            <strong>How it works:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter a name above</li>
            <li>Click &quot;Generate Certificate&quot;</li>
            <li>PDF will open in a new tab</li>
            <li>You can save or print it</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { Trash2, Mail, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DataDeletion() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-indigo-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="mb-8 flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
        >
          <ArrowLeft size={20} />
          Go Back
        </button>

        {/* Main Container */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 md:p-12">
          {/* Header */}
          <div className="border-l-4 border-purple-500 pl-6 mb-12">
            <h1 className="text-4xl font-bold text-white mb-3 flex items-center gap-3">
              <Trash2 className="w-10 h-10 text-purple-400" />
              Data Deletion Policy
            </h1>
            <p className="text-gray-400">Last Updated: October 4, 2025</p>
          </div>

          {/* Content */}
          <div className="space-y-10">
            <section>
              <p className="text-gray-300 leading-relaxed">
                We respect your privacy and provide full control over your data.
                If you would like to request deletion of any information
                associated with your use of <span className="text-purple-300">MessageNumbersLeads</span>, 
                please contact our support team.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Mail className="w-6 h-6 text-purple-400" />
                </div>
                <a
                  href="mailto:amenitybusinesssmm@gmail.com"
                  className="text-purple-400 hover:text-purple-300 underline transition-colors text-lg"
                >
                  amenitybusinesssmm@gmail.com
                </a>
              </div>

              <p className="text-gray-400 mt-6 leading-relaxed">
                Please include your registered email address and the subject line{" "}
                <span className="text-purple-300">“Delete My Data”</span> so we
                can process your request promptly. Once verified, your data will
                be permanently removed from our systems.
              </p>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-purple-500/20">
            <p className="text-sm text-gray-500 text-center">
              WizLead © {new Date().getFullYear()} — Data Deletion Policy v1.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

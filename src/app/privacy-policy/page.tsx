"use client"

import React from 'react';
import { Shield, Database, Lock, Mail, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PrivacyPolicy() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-indigo-900 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <button 
                    onClick={() => router.push('/')}
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
                            <Shield className="w-10 h-10 text-purple-400" />
                            Privacy Policy
                        </h1>
                        <p className="text-gray-400">
                            Last Updated: September 27, 2025
                        </p>
                    </div>

                    {/* Content Sections */}
                    <div className="space-y-10">
                        
                        {/* Data Collection */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-purple-500/20 rounded-lg">
                                    <Database className="w-6 h-6 text-purple-400" />
                                </div>
                                <h2 className="text-2xl font-semibold text-white">Data Collection</h2>
                            </div>
                            <div className="text-gray-300 space-y-3 leading-relaxed">
                                <p>
                                    Phone numbers are collected from CSV files uploaded by our internal business team. These numbers are used exclusively for sending personalized messages via WhatsApp Business API as part of our internal operations and testing.
                                </p>
                                <p className="text-sm text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                                    Collected Data: Phone numbers from uploaded CSV files
                                </p>
                            </div>
                        </section>

                        {/* Data Use */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-purple-500/20 rounded-lg">
                                    <Shield className="w-6 h-6 text-purple-400" />
                                </div>
                                <h2 className="text-2xl font-semibold text-white">How We Use Your Data</h2>
                            </div>
                            <div className="text-gray-300 space-y-3 leading-relaxed">
                                <p>
                                    The collected phone numbers are used solely to send internal business communications through the WhatsApp Business API. No data is sold, shared, or used for marketing purposes outside our organization.
                                </p>
                                <p>
                                    This tool is currently in testing mode, and all processes are monitored for security and compliance.
                                </p>
                            </div>
                        </section>

                        {/* Security */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-purple-500/20 rounded-lg">
                                    <Lock className="w-6 h-6 text-purple-400" />
                                </div>
                                <h2 className="text-2xl font-semibold text-white">Security Measures</h2>
                            </div>
                            <div className="text-gray-300 space-y-3 leading-relaxed">
                                <p>
                                    All data is stored securely and access is restricted to authorized internal personnel. Communications via the WhatsApp Business API are encrypted, and all internal processes are monitored for compliance.
                                </p>
                            </div>
                        </section>

                        {/* Contact */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-purple-500/20 rounded-lg">
                                    <Mail className="w-6 h-6 text-purple-400" />
                                </div>
                                <h2 className="text-2xl font-semibold text-white">Contact Us</h2>
                            </div>
                            <div className="text-gray-300 leading-relaxed">
                                <p>
                                    For privacy-related inquiries or operational questions, contact us at{' '}
                                    <a 
                                        href="mailto:info@amenitybusiness.com" 
                                        className="text-purple-400 hover:text-purple-300 underline transition-colors"
                                    >
                                        info@amenitybusiness.com
                                    </a>
                                </p>
                            </div>
                        </section>

                    </div>

                    {/* Footer */}
                    <div className="mt-12 pt-8 border-t border-purple-500/20">
                        <p className="text-sm text-gray-500 text-center">
                            This document is intended solely for internal operational purposes. Version 1.0
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
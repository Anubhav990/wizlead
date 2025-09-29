"use client"

import React from 'react';
import { Shield, Lock, Database, Mail, ArrowLeft, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TermsOfService() {
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
                            Terms of Service
                        </h1>
                        <p className="text-gray-400">
                            Last Updated: September 27, 2025
                        </p>
                    </div>

                    {/* Notice */}
                    <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 mb-10 flex gap-4">
                        <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-red-400 font-semibold mb-2">Important Notice</h3>
                            <p className="text-red-300/90 text-sm leading-relaxed">
                                This system is for internal business operations only. Unauthorized access or misuse is strictly prohibited and monitored.
                            </p>
                        </div>
                    </div>

                    {/* Content Sections */}
                    <div className="space-y-10">
                        
                        {/* Acceptance of Terms */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-purple-500/20 rounded-lg">
                                    <Lock className="w-6 h-6 text-purple-400" />
                                </div>
                                <h2 className="text-2xl font-semibold text-white">Acceptance of Terms</h2>
                            </div>
                            <div className="text-gray-300 leading-relaxed">
                                <p>
                                    By accessing or using this tool, all internal users agree to comply with the organization's operational guidelines and Terms of Service.
                                </p>
                            </div>
                        </section>

                        {/* Authorized Use */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-purple-500/20 rounded-lg">
                                    <Database className="w-6 h-6 text-purple-400" />
                                </div>
                                <h2 className="text-2xl font-semibold text-white">Authorized Use</h2>
                            </div>
                            <div className="text-gray-300 leading-relaxed">
                                <p>
                                    The tool may only be used for internal business tasks. Data handled must not be shared externally, sold, or exploited for unauthorized purposes.
                                </p>
                            </div>
                        </section>

                        {/* Monitoring & Compliance */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-purple-500/20 rounded-lg">
                                    <Shield className="w-6 h-6 text-purple-400" />
                                </div>
                                <h2 className="text-2xl font-semibold text-white">Monitoring & Compliance</h2>
                            </div>
                            <div className="text-gray-300 leading-relaxed">
                                <p>
                                    All usage is monitored to ensure compliance with internal policies. Violations may lead to restricted access or disciplinary action.
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
                                    Questions regarding these Terms of Service should be directed to{' '}
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
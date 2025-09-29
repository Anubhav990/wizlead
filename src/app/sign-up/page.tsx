"use client"

import React, { useState } from 'react';
import { supabase } from '@/lib/SupabaseClient';
import { Eye, EyeOff, Sparkles, Wand2, Shield, Mail, Lock, Star, Moon, User, UserPlus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const WizardSignupPage = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors: any = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            // Sign up with Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.fullName,
                    },
                    emailRedirectTo: `${window.location.origin}/login`,
                },
            });

            if (authError) {
                throw authError;
            }

            if (authData.user) {
                // Insert user data into users table
                const { error: dbError } = await supabase
                    .from('users')
                    .insert([
                        {
                            id: authData.user.id,
                            full_name: formData.fullName,
                            email: formData.email,
                            created_at: new Date().toISOString(),
                        },
                    ]);

                if (dbError) {
                    console.error('Error inserting user data:', dbError);
                    // Continue anyway since auth user is created
                }

                alert('Welcome to the magical realm! You can now log in.');
                router.push('/login');
            }
        } catch (error: any) {
            alert(error.message || 'Something went wrong during signup.');
            console.error('Signup error:', error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex bg-gradient-to-br from-purple-900 via-black to-indigo-900">
            {/* Left Column - Wizard Theme */}
            <div className="flex-1 relative overflow-hidden bg-[#0c132f]">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Large moon */}
                    <div className="absolute top-10 right-10 opacity-20">
                        <Moon className="w-24 h-24 text-yellow-200 animate-pulse" />
                    </div>

                    {/* Crescent moon */}
                    <div className="absolute top-32 left-16 opacity-30 animate-bounce" style={{ animationDuration: '3s' }}>
                        <div className="w-8 h-8 bg-yellow-200 rounded-full relative">
                            <div className="absolute top-0 right-0 w-6 h-6 bg-[#0c132f] rounded-full translate-x-1"></div>
                        </div>
                    </div>

                    {/* Floating sparkles */}
                    <div className="absolute top-20 left-20 animate-pulse" style={{ animationDelay: '0.5s' }}>
                        <Sparkles className="w-6 h-6 text-yellow-300" />
                    </div>
                    <div className="absolute top-60 right-32 animate-pulse" style={{ animationDelay: '1s' }}>
                        <Sparkles className="w-4 h-4 text-pink-300" />
                    </div>
                    <div className="absolute bottom-40 left-24 animate-pulse" style={{ animationDelay: '1.5s' }}>
                        <Sparkles className="w-5 h-5 text-purple-300" />
                    </div>
                    <div className="absolute bottom-20 right-20 animate-pulse" style={{ animationDelay: '2s' }}>
                        <Sparkles className="w-7 h-7 text-blue-300" />
                    </div>
                    <div className="absolute top-80 left-8 animate-pulse" style={{ animationDelay: '0.3s' }}>
                        <Sparkles className="w-3 h-3 text-yellow-400" />
                    </div>

                    {/* Twinkling stars */}
                    <div className="absolute top-16 left-32 animate-pulse" style={{ animationDelay: '0.8s' }}>
                        <Star className="w-5 h-5 text-white fill-white" />
                    </div>
                    <div className="absolute top-40 right-16 animate-pulse" style={{ animationDelay: '1.2s' }}>
                        <Star className="w-4 h-4 text-yellow-200 fill-yellow-200" />
                    </div>
                    <div className="absolute bottom-60 left-12 animate-pulse" style={{ animationDelay: '0.6s' }}>
                        <Star className="w-6 h-6 text-blue-200 fill-blue-200" />
                    </div>
                    <div className="absolute bottom-32 right-8 animate-pulse" style={{ animationDelay: '1.8s' }}>
                        <Star className="w-3 h-3 text-purple-200 fill-purple-200" />
                    </div>
                    <div className="absolute top-72 right-40 animate-pulse" style={{ animationDelay: '2.2s' }}>
                        <Star className="w-5 h-5 text-pink-200 fill-pink-200" />
                    </div>

                    {/* Small decorative stars */}
                    <div className="absolute top-24 left-40 w-2 h-2 bg-white z-10 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    <div className="absolute top-36 right-24 w-1 h-1 bg-yellow-300 z-10 rounded-full animate-pulse" style={{ animationDelay: '1.6s' }}></div>
                    <div className="absolute bottom-72 left-20 w-2 h-2 bg-blue-200 z-10 rounded-full animate-pulse" style={{ animationDelay: '0.9s' }}></div>
                    <div className="absolute bottom-48 right-32 w-1 h-1 bg-purple-300 z-10 rounded-full animate-pulse" style={{ animationDelay: '2.1s' }}></div>
                    <div className="absolute top-56 left-6 w-1 h-1 bg-pink-200 rounded-full z-10 animate-pulse" style={{ animationDelay: '1.3s' }}></div>
                    <div className="absolute bottom-16 left-32 w-2 h-2 bg-yellow-200 rounded-full z-10 animate-pulse" style={{ animationDelay: '0.7s' }}></div>

                    {/* Magic wand floating */}
                    <div className="absolute bottom-72 right-12 z-20 animate-bounce opacity-40" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                        <Wand2 className="w-8 h-8 text-purple-300 z-20 rotate-45" />
                    </div>

                    {/* Mystical orbs */}
                    <div className="absolute top-44 left-8 w-4 h-4 bg-gradient-to-br z-20 from-purple-400 to-pink-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '1.4s' }}></div>
                    <div className="absolute bottom-56 right-6 w-3 h-3 bg-gradient-to-br z-20 from-blue-400 to-purple-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '0.2s' }}></div>
                    <div className="absolute top-68 right-28 w-5 h-5 bg-gradient-to-br z-20 from-yellow-300 to-orange-300 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1.9s' }}></div>
                </div>

                {/* Main wizard content */}
                <div className="relative flex flex-col items-center justify-center h-full px-12 text-white">
                    {/* Logo */}
                    <div className="relative flex flex-col justify-center">
                        <div className="flex items-center justify-center">
                            <div className="absolute -top-2 -right-2">
                                <Sparkles className="w-8 h-8 z-20 text-yellow-300 animate-pulse" />
                            </div>
                            <div className="absolute -top-4 -left-4 z-30">
                                <Star className="w-6 h-6 text-blue-300 z-30 fill-blue-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
                            </div>
                            <div className="absolute -bottom-3 -right-6">
                                <Sparkles className="w-5 h-5 text-pink-300 z-30 animate-pulse" style={{ animationDelay: '1s' }} />
                            </div>
                            <div className="absolute -bottom-2 -left-2">
                                <Star className="w-4 h-4 text-yellow-300 fill-yellow-300 z-20 animate-pulse" style={{ animationDelay: '1.5s' }} />
                            </div>
                            <Image
                                src="/wizleadlogo.jpg"
                                alt="wizlead"
                                width={600}
                                height={400}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column - Signup Form */}
            <div className="flex-1 flex items-center justify-center px-8 bg-black">
                <div className="w-full max-w-md">
                    {/* Form Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">
                            Join the Academy
                        </h2>
                        <p className="text-gray-400">
                            Begin your magical journey and unlock your potential
                        </p>
                    </div>

                    {/* Signup Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Full Name Field */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                                Wizard Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className={`w-full pl-12 pr-4 py-3 bg-gray-800 border ${errors.fullName ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-colors`}
                                    placeholder="Enter your full name"
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                            {errors.fullName && (
                                <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Wizard Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full pl-12 pr-4 py-3 bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-colors`}
                                    placeholder="Enter your email"
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Secret Spell
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`w-full pl-12 pr-12 py-3 bg-gray-800 border ${errors.password ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-colors`}
                                    placeholder="Create a password"
                                    disabled={isLoading}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                                    disabled={isLoading}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                                Confirm Secret Spell
                            </label>
                            <div className="relative">
                                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className={`w-full pl-12 pr-12 py-3 bg-gray-800 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-colors`}
                                    placeholder="Confirm your password"
                                    disabled={isLoading}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                                    disabled={isLoading}
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            <span className="flex items-center justify-center space-x-2">
                                <span>{isLoading ? 'Creating Account...' : 'Begin Your Journey'}</span>
                                {!isLoading && <UserPlus className="w-5 h-5" />}
                            </span>
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="text-center mt-8">
                        <p className="text-gray-400">
                            Already part of the academy?{' '}
                            <a href="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                                Log In
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WizardSignupPage;
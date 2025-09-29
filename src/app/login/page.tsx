'use client'

import React, { useState } from 'react'
import { Eye, EyeOff, Sparkles, Wand2, Mail, Lock, Star, Moon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/SupabaseClient'

export default function WizardLoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })

    // Clear error for this field when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) {
        throw error
      }

      if (data.user) {
        router.push('/') // Change this to your desired redirect path
      }
    } catch (error: any) {
      alert(error.message || 'Invalid email or password')
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

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

          {/* Magic wand floating */}
          <div className="absolute bottom-72 right-12 z-20 animate-bounce opacity-40" style={{ animationDuration: '4s', animationDelay: '1s' }}>
            <Wand2 className="w-8 h-8 text-purple-300 z-20 rotate-45" />
          </div>

          {/* Mystical orbs */}
          <div className="absolute top-44 left-8 w-4 h-4 bg-gradient-to-br z-20 from-purple-400 to-pink-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '1.4s' }}></div>
          <div className="absolute bottom-56 right-6 w-3 h-3 bg-gradient-to-br z-20 from-blue-400 to-purple-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '0.2s' }}></div>
        </div>

        {/* Logo */}
        <div className="relative flex flex-col items-center justify-center h-full px-12 text-white">
          <div className="relative flex flex-col justify-center">
            <div className="flex items-center justify-center">
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-8 h-8 z-20 text-yellow-300 animate-pulse" />
              </div>
              <div className="absolute -top-4 -left-4 z-30">
                <Star className="w-6 h-6 text-blue-300 z-30 fill-blue-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
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

      {/* Right Column - Login Form */}
      <div className="flex-1 flex items-center justify-center px-8 bg-black">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Enter the Realm</h2>
            <p className="text-gray-400">Cast your credentials to unlock the portal</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Wizard Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  id="email"
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
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-12 py-3 bg-gray-800 border ${errors.password ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-colors`}
                  placeholder="Enter your password"
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>{isLoading ? 'Casting Spell...' : 'Cast Login Spell'}</span>
                {!isLoading && <Sparkles className="w-5 h-5" />}
              </span>
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-8">
            <p className="text-gray-400">
              New to the magical realm?{' '}
              <Link href="/sign-up" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                Sign up
              </Link>
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex justify-center gap-6 text-gray-400 mt-5">
            <button 
              onClick={() => router.push('/privacy-policy')}
              className="hover:text-purple-400 transition-colors text-sm"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => router.push('/terms-of-service')}
              className="hover:text-purple-400 transition-colors text-sm"
            >
              Terms Of Service
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
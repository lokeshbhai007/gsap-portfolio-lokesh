
"use client"

import { useState } from 'react';
import { MapPin, Navigation, Share2, Hash, Loader2, Users, Clock, CheckCircle, Copy, RotateCcw, User, Server } from 'lucide-react';

export default function DistanceChecker() {
  const [currentUser, setCurrentUser] = useState('');
  const [step, setStep] = useState('selectUser');
  const [personAData, setPersonAData] = useState(null);
  const [personBData, setPersonBData] = useState(null);
  const [otp, setOtp] = useState('');
  const [inputOtp, setInputOtp] = useState('');
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Generate 6-digit OTP
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // API call to store location data
  const storeLocationData = async (otpCode, locationData) => {
    try {
      const response = await fetch('/api/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          otp: otpCode,
          location: locationData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to store location data');
      }

      return await response.json();
    } catch (error) {
      throw new Error('Network error: ' + error.message);
    }
  };

  // API call to get location data by OTP
  const getLocationData = async (otpCode) => {
    try {
      const response = await fetch(`/api/location?otp=${otpCode}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Invalid OTP or OTP expired');
        }
        throw new Error('Failed to retrieve location data');
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Get high accuracy location for Person A
  const getCurrentLocation = async (user) => {
    setLoading(true);
    setError('');
    
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude, accuracy } = position.coords;
          const newOtp = generateOTP();
          const locationInfo = {
            lat: latitude,
            lng: longitude,
            accuracy,
            timestamp: Date.now(),
            user: user
          };
          
          if (user === 'personA') {
            // Store location data on server
            await storeLocationData(newOtp, locationInfo);
            setPersonAData(locationInfo);
            setOtp(newOtp);
            setStep('waitingForB');
          }
          
          setLoading(false);
        } catch (error) {
          setError('Failed to store location: ' + error.message);
          setLoading(false);
        }
      },
      (error) => {
        setError('Unable to get location: ' + error.message);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    );
  };

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371000; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lng2 - lng1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
  };

  // Check distance using OTP with backend API
  const checkDistanceWithOtp = async () => {
    if (!inputOtp) {
      setError('Please enter OTP');
      return;
    }

    setLoading(true);
    setError('');
    setStep('calculating');

    try {
      // Get Person A's location data from server
      const personALocation = await getLocationData(inputOtp);
      
      // Get Person B's current location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          const personBLocation = {
            lat: latitude,
            lng: longitude,
            accuracy,
            timestamp: Date.now(),
            user: 'personB'
          };
          
          setPersonAData(personALocation.location);
          setPersonBData(personBLocation);
          
          const dist = calculateDistance(
            personALocation.location.lat,
            personALocation.location.lng,
            latitude,
            longitude
          );
          
          setDistance(Math.round(dist * 100) / 100);
          setStep('result');
          setLoading(false);
        },
        (error) => {
          setError('Unable to get your location: ' + error.message);
          setLoading(false);
          setStep('enterOtp');
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0
        }
      );
    } catch (error) {
      setError(error.message);
      setLoading(false);
      setStep('enterOtp');
    }
  };

  // Copy OTP to clipboard
  const copyOTP = async () => {
    try {
      await navigator.clipboard.writeText(otp);
    } catch (err) {
      console.log('Copy to clipboard failed');
    }
  };

  // Reset everything
  const resetAll = () => {
    setCurrentUser('');
    setStep('selectUser');
    setPersonAData(null);
    setPersonBData(null);
    setOtp('');
    setInputOtp('');
    setDistance(null);
    setError('');
  };

  // Start as Person B
  const startAsPersonB = () => {
    setCurrentUser('personB');
    setStep('enterOtp');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* User Selection Screen */}
        {step === 'selectUser' && (
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Distance Checker</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Check the distance between two people using high-precision GPS
            </p>
            
            <div className="space-y-4">
              <button
                onClick={() => {
                  setCurrentUser('personA');
                  setStep('shareLocation');
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-2xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
              >
                <User className="w-5 h-5" />
                I'm Person A (Share Location)
              </button>
              
              <button
                onClick={startAsPersonB}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 px-6 rounded-2xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
              >
                <Hash className="w-5 h-5" />
                I'm Person B (Enter OTP)
              </button>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-2xl">
              <p className="text-xs text-gray-500 leading-relaxed">
                <strong>How it works:</strong> Person A shares their location and gets an OTP. Person B enters the OTP to calculate the distance between both locations.
              </p>
            </div>

            {/* Backend Status Indicator */}
            <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center justify-center gap-2">
                <Server className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">Backend-Powered</span>
              </div>
              <p className="text-xs text-green-600 mt-1">
                Location data shared securely between devices
              </p>
            </div>
          </div>
        )}

        {/* Person A - Share Location Screen */}
        {step === 'shareLocation' && currentUser === 'personA' && (
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Share2 className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Person A - Share Location</h2>
              <p className="text-gray-600">Allow location access to generate your unique OTP</p>
            </div>

            <button
              onClick={() => getCurrentLocation('personA')}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-2xl font-semibold hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Storing Location on Server...
                </>
              ) : (
                <>
                  <Navigation className="w-6 h-6" />
                  Get Location & Generate OTP
                </>
              )}
            </button>

            {error && (
              <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-2xl text-sm border border-red-200">
                <strong>Error:</strong> {error}
              </div>
            )}

            <button
              onClick={resetAll}
              className="w-full mt-6 text-gray-500 hover:text-gray-700 transition-colors py-2"
            >
              ← Back to User Selection
            </button>
          </div>
        )}

        {/* Person A - Waiting for Person B */}
        {step === 'waitingForB' && currentUser === 'personA' && personAData && (
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Location Stored on Server!</h2>
              <p className="text-gray-600">Share this OTP with Person B</p>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border-2 border-green-200">
                <h3 className="font-bold text-gray-900 mb-4 text-center">Your OTP Code</h3>
                <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
                  <span className="text-3xl font-mono font-bold text-green-600 tracking-widest">
                    {otp}
                  </span>
                  <button
                    onClick={copyOTP}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-colors"
                    title="Copy OTP"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-3 text-center">
                  Send this code to Person B via message, call, or any secure method
                </p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <Server className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-900">Server Status</span>
                </div>
                <div className="space-y-2 text-sm text-blue-700">
                  <p><strong>Status:</strong> Location data securely stored</p>
                  <p><strong>Accuracy:</strong> ±{Math.round(personAData.accuracy)} meters</p>
                  <p><strong>Valid until:</strong> Person B uses the OTP</p>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-200">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800">Waiting for Person B</span>
                </div>
                <p className="text-xs text-yellow-700">
                  Your location is safely stored on the server. Person B can now use your OTP from any device.
                </p>
              </div>
            </div>

            <button
              onClick={resetAll}
              className="w-full mt-6 text-gray-500 hover:text-gray-700 transition-colors py-2 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Start New Session
            </button>
          </div>
        )}

        {/* Person B - Enter OTP Screen */}
        {step === 'enterOtp' && currentUser === 'personB' && (
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Hash className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Person B - Enter OTP</h2>
              <p className="text-gray-600">Enter the OTP code from Person A to calculate distance</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Enter 6-Digit OTP Code
                </label>
                <input
                  type="text"
                  value={inputOtp}
                  onChange={(e) => {
                    setInputOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
                    setError('');
                  }}
                  placeholder="123456"
                  maxLength={6}
                  className="w-full px-6 text-black py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 text-center text-2xl font-mono tracking-widest transition-all"
                />
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Ask Person A to share their OTP code with you
                </p>
              </div>

              <button
                onClick={checkDistanceWithOtp}
                disabled={loading || inputOtp.length !== 6}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Fetching from Server...
                  </>
                ) : (
                  <>
                    <MapPin className="w-6 h-6" />
                    Calculate Distance
                  </>
                )}
              </button>

              {error && (
                <div className="p-4 bg-red-50 text-red-700 rounded-2xl text-sm border border-red-200">
                  <strong>Error:</strong> {error}
                </div>
              )}

              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Server className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">Server Connection</span>
                </div>
                <p className="text-xs text-green-600">
                  Will fetch Person A's location data from secure server
                </p>
              </div>
            </div>

            <button
              onClick={resetAll}
              className="w-full mt-6 text-gray-500 hover:text-gray-700 transition-colors py-2"
            >
              ← Back to User Selection
            </button>
          </div>
        )}

        {/* Calculating Screen */}
        {step === 'calculating' && (
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculating Distance</h2>
            <p className="text-gray-600 mb-6">
              Retrieved Person A's location from server, getting your precise location...
            </p>
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
              <p className="text-sm text-blue-700">
                Using high-precision GPS for accurate measurement
              </p>
            </div>
          </div>
        )}

        {/* Results Screen */}
        {step === 'result' && distance !== null && personAData && personBData && (
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Navigation className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Distance Calculated!</h2>
              <p className="text-gray-600">High-precision measurement between both locations</p>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 text-center border-2 border-green-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Distance Between You</h3>
                <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {distance < 1000 ? `${distance} m` : `${(distance/1000).toFixed(2)} km`}
                </div>
                <p className="text-sm text-gray-600">
                  Combined GPS accuracy: ±{Math.round((personAData.accuracy + personBData.accuracy) / 2)}m
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Person A
                  </h4>
                  <p className="text-xs text-blue-700">
                    Server data: ±{Math.round(personAData.accuracy)}m
                  </p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Person B
                  </h4>
                  <p className="text-xs text-purple-700">
                    Live GPS: ±{Math.round(personBData.accuracy)}m
                  </p>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Server className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">Server-Powered Calculation</span>
                </div>
                <p className="text-xs text-green-600">
                  Location data securely retrieved and processed
                </p>
              </div>
            </div>

            <button
              onClick={resetAll}
              className="w-full mt-6 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-6 rounded-2xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Start New Measurement
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/SupabaseClient";
import Papa from "papaparse";
import { LogOut, Upload, FileSpreadsheet, Phone, Send, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UploadCSV() {
  const router = useRouter();

  // Auth states
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // CSV states
  const [file, setFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([]);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [showAllRows, setShowAllRows] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    checkUser();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        router.push('/login');
      } else {
        setUser(session.user);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const checkUser = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        router.push('/login');
        return;
      }

      setUser(session.user);
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const toggleRow = (index: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedRows(newExpanded);
  };

  const toggleAllRows = () => {
    if (expandedRows.size > 0) {
      setExpandedRows(new Set());
    } else {
      const displayData = showAllRows ? csvData : csvData.slice(0, 50);
      setExpandedRows(new Set(displayData.map((_, index) => index)));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      worker: true,
      complete: (results) => {
        console.log("Parsed CSV Results:", results.data);

        setCsvData(results.data);
        setExpandedRows(new Set());

        const numbers = results.data
          .map((row: any) => row.phone_numbers)
          .filter((num: string | undefined) => num);

        const uniqueNumbers = [...new Set(numbers)];

        console.log("Extracted phone numbers:", numbers);
        console.log("Unique phone numbers:", uniqueNumbers);
        console.log(`Removed ${numbers.length - uniqueNumbers.length} duplicate(s)`);
        setPhoneNumbers(uniqueNumbers);
        alert(`Parsed ${uniqueNumbers.length} unique phone numbers (${numbers.length - uniqueNumbers.length} duplicates removed).`);
      },
    });
  };

  const sendWhatsAppMessages = async () => {
    const testNumber = "+916284301480";
    setIsSending(true);

    try {
      const templateName = "hello_world";
      const templateVariables: string[] = [];

      const res = await fetch("/api/send-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toNumbers: [testNumber],
          templateName,
          templateVariables,
        }),
      });

      const data = await res.json();
      console.log("WhatsApp API response:", data);
      alert("Test message sent! Check console for details.");
    } catch (err) {
      console.error(err);
      alert("Failed to send test message. See console for details.");
    } finally {
      setIsSending(false);
    }
  };

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-indigo-900">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-indigo-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with user info and logout */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">CSV WhatsApp Campaign Manager</h1>
              <p className="text-gray-400">
                Welcome back, <span className="text-purple-400 font-medium">{user.email}</span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-200"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Upload className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Upload CSV File</h2>
              <p className="text-gray-400 text-sm">Upload your CSV file containing phone numbers</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-400
                  file:mr-4 file:py-3 file:px-6
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-purple-500/20 file:text-purple-400
                  hover:file:bg-purple-500/30 file:cursor-pointer
                  file:transition-all file:duration-200
                  cursor-pointer"
              />
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              disabled={!file}
              className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none flex items-center justify-center gap-2"
            >
              <FileSpreadsheet size={20} />
              Parse CSV & Extract Numbers
            </button>
          </div>
        </div>

        {/* Display parsed CSV data */}
        {csvData.length > 0 && (
          <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <FileSpreadsheet className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Parsed CSV Data</h2>
                  <p className="text-gray-400 text-sm">{csvData.length} rows found</p>
                </div>
              </div>
              <button
                onClick={toggleAllRows}
                className="px-4 py-2 bg-purple-500/20 border border-purple-500/50 text-purple-400 rounded-lg hover:bg-purple-500/30 font-medium transition-all"
              >
                {expandedRows.size > 0 ? 'Collapse All' : 'Expand All'}
              </button>
            </div>

            {csvData.length > 50 && (
              <div className="mb-6 flex items-center gap-4">
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg flex-1">
                  <p className="text-sm text-blue-300">
                    <strong>Large dataset:</strong> {csvData.length} rows.
                    {showAllRows ? ' Showing all rows.' : ' Showing first 50 rows.'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowAllRows(!showAllRows);
                    setExpandedRows(new Set());
                  }}
                  className="px-4 py-2 bg-green-500/20 border border-green-500/50 text-green-400 rounded-lg hover:bg-green-500/30 whitespace-nowrap font-medium transition-all"
                >
                  {showAllRows ? 'Show First 50' : 'Show All Rows'}
                </button>
              </div>
            )}

            <div className="border border-purple-500/20 rounded-lg max-h-96 overflow-y-auto bg-black/20">
              {(showAllRows ? csvData : csvData.slice(0, 50)).map((row, index) => {
                const isExpanded = expandedRows.has(index);
                const rowKeys = Object.keys(row);

                return (
                  <div key={index} className="border-b border-purple-500/10 last:border-b-0">
                    <button
                      onClick={() => toggleRow(index)}
                      className="w-full px-6 py-4 text-left hover:bg-purple-500/5 flex justify-between items-center transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold text-purple-400 w-6">
                          {isExpanded ? '−' : '+'}
                        </span>
                        <span className="font-semibold text-white">
                          Row {index + 1}
                        </span>
                        <span className="text-sm text-gray-400 bg-purple-500/10 px-2 py-1 rounded">
                          {rowKeys.length} fields
                        </span>
                      </div>
                      <div className="text-sm">
                        {row.phone_numbers && (
                          <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                            <Phone size={12} />
                            {row.phone_numbers}
                          </span>
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-6 pb-6">
                        <div className="bg-black/30 p-4 rounded-lg border border-purple-500/10">
                          <div className="grid gap-3">
                            {rowKeys.map((key) => (
                              <div key={key} className="flex border-b border-purple-500/10 pb-2 last:border-b-0 last:pb-0">
                                <span className="font-semibold text-sm text-purple-300 w-40 flex-shrink-0">
                                  {key}:
                                </span>
                                <span className="text-sm text-gray-300 break-all">
                                  {row[key] || <span className="text-gray-500 italic">empty</span>}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Display extracted phone numbers */}
        {phoneNumbers.length > 0 && (
          <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Phone className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Extracted Phone Numbers</h2>
                <p className="text-gray-400 text-sm">{phoneNumbers.length} unique numbers ready to send</p>
              </div>
            </div>

            <div className="bg-black/30 p-6 rounded-lg border border-purple-500/10 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {phoneNumbers.map((number, index) => (
                  <div key={index} className="bg-gray-900/50 p-3 rounded-lg border border-purple-500/10 flex items-center gap-2">
                    <Phone size={16} className="text-green-400" />
                    <span className="font-mono text-sm text-gray-300">{number}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={sendWhatsAppMessages}
              disabled={isSending}
              className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isSending ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Sending Messages...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send WhatsApp Messages
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
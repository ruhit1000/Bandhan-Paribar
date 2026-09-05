import React, { useState } from 'react';
import {
  Heart,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Sparkles,
  CreditCard,
  Smartphone,
  Building2,
  Download,
  X,
  Users,
  Droplets,
  GraduationCap,
  AlertTriangle
} from 'lucide-react';

export default function Donate() {
  const [frequency, setFrequency] = useState('one-time'); // 'one-time' | 'monthly'
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [cause, setCause] = useState('disaster');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('mobile_banking');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  const presetAmounts = [500, 1000, 2500, 5000, 10000];

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const val = e.target.value;
    setCustomAmount(val);
    if (val && !isNaN(val)) {
      setSelectedAmount(Number(val));
    }
  };

  const finalAmount = customAmount ? Number(customAmount) || 0 : selectedAmount;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      alert('Please enter your email address.');
      return;
    }
    if (finalAmount <= 0) {
      alert('Please select or enter a valid donation amount.');
      return;
    }

    const causeLabels = {
      disaster: 'Emergency Disaster Relief',
      water: 'Clean Drinking Water Tube-Wells',
      education: 'Education & Student Support',
      winter: 'Winter Clothing & Blanket Drive',
      qurbani: 'Qurbani for Everyone',
      general: 'General Humanitarian Fund',
    };

    const receipt = {
      trxId: 'TXN-' + Math.floor(10000000 + Math.random() * 90000000),
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      donorName: name,
      donorEmail: email,
      donorPhone: phone || 'N/A',
      amount: finalAmount,
      frequency: frequency === 'one-time' ? 'One-Time' : 'Monthly Recurring',
      cause: causeLabels[cause] || 'General Relief',
      paymentMethod:
        paymentMethod === 'mobile_banking'
          ? 'bKash / Nagad / Rocket'
          : paymentMethod === 'card'
          ? 'Credit / Debit Card'
          : 'Bank Wire Transfer'
    };

    setReceiptData(receipt);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Top Hero Banner */}
      <section className="bg-linear-to-b from-[#0F2920] to-[#153a2d] text-white pt-12 pb-20 px-4 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-[#0097E2]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-blue-200">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-current" />
            <span>Bandhan Paribar • 100% Direct Humanitarian Impact</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Empower Lives with Your Generous Support
          </h1>
          <p className="text-sm sm:text-base text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Your contributions directly provide emergency flood relief, clean drinking water, education kits, and warm clothing to underprivileged families across Bangladesh.
          </p>
        </div>
      </section>

      {/* Main Donation Container */}
      <section className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Showcase & Trust Badges */}
          <div className="lg:col-span-5 space-y-6">
            {/* Impact Feature Card with Image */}
            <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-md">
              <div className="relative h-64 sm:h-72 overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop"
                  alt="Relief Distribution"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0097E2] bg-white/90 px-2.5 py-1 rounded-md w-fit">
                    Verified Foundation
                  </span>
                  <h3 className="text-xl font-bold mt-2">
                    Emergency Relief & Self-Reliance
                  </h3>
                  <p className="text-xs text-gray-200 mt-1">
                    Over 50,000+ families supported in 64 districts nationwide.
                  </p>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="p-6 space-y-4 bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Zero Administrative Deduction</h4>
                    <p className="text-[11px] text-gray-500">100% of emergency fund donations reach target beneficiaries.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#0097E2] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Tax Deductible Receipt</h4>
                    <p className="text-[11px] text-gray-500">Instant digital tax receipt emailed upon completion.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">256-Bit Bank Level Encryption</h4>
                    <p className="text-[11px] text-gray-500">Secure gateway powered by bKash, Nagad, & Visa/Mastercard.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact Causes Showcase */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-[#0F2920]">Ongoing Impact Causes</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 text-xs font-semibold">
                  <span className="flex items-center gap-2 text-gray-700">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    Greater Chittagong Flood Relief
                  </span>
                  <span className="text-[#0097E2] font-bold">85% Goal</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 text-xs font-semibold">
                  <span className="flex items-center gap-2 text-gray-700">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    Safe Drinking Water Tube-Wells
                  </span>
                  <span className="text-emerald-600 font-bold">120 Installed</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 text-xs font-semibold">
                  <span className="flex items-center gap-2 text-gray-700">
                    <GraduationCap className="w-4 h-4 text-purple-500" />
                    Orphan & Student Education Kits
                  </span>
                  <span className="text-[#0097E2] font-bold">5,000 Kits</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Donation Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl space-y-6"
            >
              <div className="border-b pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#0F2920]">Make a Contribution</h2>
                  <p className="text-xs text-gray-500">Choose an amount and select your preferred cause</p>
                </div>
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>

              {/* Frequency Toggle */}
              <div className="flex p-1 bg-gray-100 rounded-2xl border border-gray-200">
                <button
                  type="button"
                  onClick={() => setFrequency('one-time')}
                  className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                    frequency === 'one-time'
                      ? 'bg-white text-[#0F2920] shadow-sm'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Give Once
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency('monthly')}
                  className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                    frequency === 'monthly'
                      ? 'bg-[#0097E2] text-white shadow-sm'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Give Monthly ❤
                </button>
              </div>

              {/* Preset Amount Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Select Donation Amount (BDT)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                  {presetAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handleAmountClick(amt)}
                      className={`py-3 px-2 rounded-2xl text-xs font-bold border transition-all ${
                        selectedAmount === amt && !customAmount
                          ? 'bg-[#0097E2] text-white border-[#0097E2] shadow-md scale-[1.02]'
                          : 'bg-[#F4F5F7] text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      ৳{amt.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600">Or Enter Custom Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-500 text-sm">
                    ৳
                  </span>
                  <input
                    type="number"
                    min="10"
                    placeholder="Enter custom amount in BDT"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className="w-full pl-9 pr-4 py-3 bg-[#F4F5F7] border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0097E2]/30 focus:border-[#0097E2] transition-all"
                  />
                </div>
              </div>

              {/* Target Cause Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Select Target Cause
                </label>
                <select
                  value={cause}
                  onChange={(e) => setCause(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F4F5F7] border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0097E2]/30 focus:border-[#0097E2] transition-all"
                >
                  <option value="disaster">Emergency Disaster & Flood Relief</option>
                  <option value="water">Clean Drinking Water Deep Tube-Wells</option>
                  <option value="education">Education & Student Support Kits</option>
                  <option value="winter">Winter Blanket & Warm Clothing Drive</option>
                  <option value="qurbani">Qurbani for Everyone Project</option>
                  <option value="general">General Social Welfare Fund</option>
                </select>
              </div>

              {/* Personal Information */}
              <div className="space-y-4 pt-2 border-t border-gray-100">
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Your Donor Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tanvir Ahmed"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#F4F5F7] border border-gray-200 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0097E2]/30 focus:border-[#0097E2] transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="tanvir@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#F4F5F7] border border-gray-200 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0097E2]/30 focus:border-[#0097E2] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      placeholder="+880 1700-000000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#F4F5F7] border border-gray-200 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0097E2]/30 focus:border-[#0097E2] transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600">Special Note (Optional)</label>
                    <input
                      type="text"
                      placeholder="Prayers or special request"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#F4F5F7] border border-gray-200 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0097E2]/30 focus:border-[#0097E2] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Radio Selector */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mobile_banking')}
                    className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === 'mobile_banking'
                        ? 'border-[#0097E2] bg-blue-50/50 text-[#0097E2] font-bold shadow-xs'
                        : 'border-gray-200 bg-[#F4F5F7] text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Smartphone className="w-5 h-5" />
                    <span className="text-[11px]">bKash / Nagad</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#0097E2] bg-blue-50/50 text-[#0097E2] font-bold shadow-xs'
                        : 'border-gray-200 bg-[#F4F5F7] text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span className="text-[11px]">Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === 'bank'
                        ? 'border-[#0097E2] bg-blue-50/50 text-[#0097E2] font-bold shadow-xs'
                        : 'border-gray-200 bg-[#F4F5F7] text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Building2 className="w-5 h-5" />
                    <span className="text-[11px]">Bank Transfer</span>
                  </button>
                </div>
              </div>

              {/* Submit / Pay Now Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#0097E2] hover:bg-[#0081C4] text-white font-extrabold rounded-2xl text-sm shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 group"
                >
                  <Lock className="w-4 h-4 text-blue-200 group-hover:scale-110 transition-transform" />
                  <span>Pay Now ৳{finalAmount.toLocaleString()} BDT</span>
                </button>
                <p className="text-[11px] text-gray-400 text-center mt-2 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Secured by 256-Bit SSL Encryption. Official receipt will be generated.</span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Interactive Success Receipt Modal */}
      {isSuccessModalOpen && receiptData && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-gray-100">
            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="absolute right-5 top-5 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-[#0F2920]">Thank You for Your Donation!</h3>
              <p className="text-xs text-gray-500">
                Your generous contribution has been received successfully.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 space-y-3 text-xs">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500 font-medium">Transaction Reference:</span>
                <span className="font-mono font-bold text-gray-900">{receiptData.trxId}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500 font-medium">Donor Name:</span>
                <span className="font-bold text-gray-900">{receiptData.donorName}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500 font-medium">Target Cause:</span>
                <span className="font-bold text-[#0097E2]">{receiptData.cause}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500 font-medium">Payment Gateway:</span>
                <span className="font-semibold text-gray-700">{receiptData.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center pt-1 text-sm">
                <span className="font-bold text-gray-900">Total Donated:</span>
                <span className="font-extrabold text-emerald-600 text-base">
                  ৳{receiptData.amount.toLocaleString()} BDT
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  alert(`Downloading official donation receipt (${receiptData.trxId}.pdf)...`);
                }}
                className="w-full py-3 bg-[#0097E2] hover:bg-[#0081C4] text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Official Tax Receipt</span>
              </button>
              <button
                onClick={() => setIsSuccessModalOpen(false)}
                className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-2xl text-xs transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

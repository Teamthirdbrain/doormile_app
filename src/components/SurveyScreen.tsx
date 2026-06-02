import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ClipboardCheck, ArrowRight, ArrowLeft, CheckCircle2, ChevronRight, FileSpreadsheet, Building, Sparkles, Send, MapPin, Layers, Package, PhoneCall, FileText } from 'lucide-react';
import { Client, CityCode, BusinessType } from '../types';

interface SurveyScreenProps {
  onAddClient: (client: Client) => void;
  clients: Client[];
  onNavigate: (tab: 'dashboard' | 'clients' | 'analytics' | 'survey') => void;
}

export default function SurveyScreen({ onAddClient, clients, onNavigate }: SurveyScreenProps) {
  const [isSurveying, setIsSurveying] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);

  // Form State
  const [name, setName] = useState('');
  const [city, setCity] = useState<CityCode>('NY');
  const [businessType, setBusinessType] = useState<BusinessType>('E-commerce');
  const [parcelVolume, setParcelVolume] = useState<number>(450);
  const [activeContracts, setActiveContracts] = useState<number>(12);
  const [provider, setProvider] = useState('SwiftTrans Logistics');
  const [notes, setNotes] = useState('');

  // Get last 3 surveyed clients
  const lastSurveyed = clients.filter(c => c.surveySubmitted).slice(0, 3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    let efficiency = 'High Efficiency';
    if (provider === 'Global SkyLink') efficiency = 'Premium Service';
    if (provider === 'IronTrack Freight') efficiency = 'Cost Leader';

    const newClient: Client = {
      id: `client_${Date.now()}`,
      name: name.trim(),
      city,
      businessType,
      parcelVolume: Number(parcelVolume),
      activeContracts: Number(activeContracts),
      provider,
      efficiency,
      status: 'NEW',
      lastUpdated: 'Just now',
      surveySubmitted: true,
      notes: notes.trim(),
    };

    onAddClient(newClient);
    setSuccess(true);
  };

  const handleReset = () => {
    setName('');
    setCity('NY');
    setBusinessType('E-commerce');
    setParcelVolume(450);
    setActiveContracts(12);
    setProvider('SwiftTrans Logistics');
    setNotes('');
    setStep(1);
    setIsSurveying(false);
    setSuccess(false);
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in" id="survey-screen-root">
      <AnimatePresence mode="wait">
        {!isSurveying && !success && (
          <motion.div
            key="pre-survey"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Splash Greeting Card */}
            <div className="bg-white rounded-2xl p-6 border border-[#e4beba]/25 shadow-xs text-center space-y-4">
              <div className="w-14 h-14 bg-[#ffdad7] rounded-full flex items-center justify-center mx-auto text-[#8d0012]">
                <ClipboardCheck className="w-7 h-7" strokeWidth={1.75} />
              </div>
              <div className="space-y-1">
                <h2 className="text-[#0b1c30] text-xl font-bold font-sans">Welcome back</h2>
                <p className="text-sm text-[#5b403e]">Ready to start your next logistics survey?</p>
              </div>
              <button
                onClick={() => setIsSurveying(true)}
                className="w-full bg-[#8d0012] hover:bg-[#b51621] text-white py-3.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
                id="start-new-survey-btn"
              >
                <FileSpreadsheet className="w-5 h-5 text-white/90" />
                Start New Survey
              </button>
            </div>

            {/* Last 3 surveyed clients */}
            <section className="space-y-3" id="last-surveyed-section">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-sm font-bold text-[#5b403e] uppercase tracking-wider">
                  Last 3 Surveyed Clients
                </h3>
                <button
                  onClick={() => onNavigate('clients')}
                  className="text-[#8d0012] font-semibold text-xs hover:underline cursor-pointer"
                >
                  View all
                </button>
              </div>

              <div className="bg-white rounded-xl divide-y divide-[#e4beba]/10 border border-[#e4beba]/15 overflow-hidden shadow-xs">
                {lastSurveyed.map((client) => (
                  <div
                    key={client.id}
                    onClick={() => onNavigate('clients')}
                    className="flex items-center justify-between p-4 hover:bg-[#f8f9ff] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#eff4ff] text-[#8d0012] flex items-center justify-center">
                        <Building className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#0b1c30]">{client.name}</div>
                        <div className="text-xs text-[#5b403e]">Submitted {client.lastUpdated}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#8f6f6d]" />
                  </div>
                ))}
              </div>
            </section>

            {/* Decorative banner graphic */}
            <div className="relative w-full h-[160px] rounded-2xl overflow-hidden shadow-sm group">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAL4b92Y6zJFhIo1UiPajFQZXBYdO4vuuFaeezRAwPf5MvYCwbEscsVbAnfyMGay60J54v8YAFc-jq_glu3pI2lncCd7qPLFhDq0FUrXTs-WmhXr1262Wf82srIwuv5i9-i1YsHRwN9eMm4bwT6Rjfd0RdC8mxzuGA5byB5NTKX25cqjAVh_ioMe2HZ2gEiTb0Wae5d9D2LaQvm48oEUqm3ni5qZ32JbudyD_jnIJchoUS6fMMMD8-Hg92B-jIEWh4gi2VtaZluhng"
                alt="Cargo Shipping Terminal containers sunset"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5">
                <h3 className="text-white font-sans text-lg font-bold leading-tight">
                  Streamlined Surveys
                </h3>
                <p className="text-white/80 text-xs mt-0.5 font-light">
                  Capturing field data has never been easier.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {isSurveying && !success && (
          <motion.div
            key="survey-form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl p-5 border border-[#e4beba]/30 shadow-md space-y-6"
          >
            {/* Header with back button */}
            <div className="flex items-center justify-between border-b border-[#e4beba]/10 pb-4">
              <button
                onClick={() => setIsSurveying(false)}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#5b403e] hover:text-[#8d0012] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#8d0012]">
                Step {step} of 3
              </span>
            </div>

            {/* Stepper Progress bar */}
            <div className="w-full bg-[#f8f9ff] h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#8d0012] rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" id="survey-interactive-form">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-[#0b1c30]">Client Foundations</h3>
                    <p className="text-xs text-[#5b403e]">Start with basic business identifiers.</p>
                  </div>

                  {/* Client Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0b1c30]">Client/Company Name</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#8f6f6d]" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Apex Deliveries"
                        className="w-full pl-10 pr-4 h-11 border border-[#e4beba] rounded-lg shadow-2xs focus:outline-hidden focus:border-[#8d0012] focus:ring-1 focus:ring-[#8d0012] text-sm text-[#0b1c30]"
                      />
                    </div>
                  </div>

                  {/* City selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0b1c30]">Business Location (City)</label>
                    <div className="grid grid-cols-5 gap-2">
                      {(['NY', 'LA', 'CHI', 'HOU', 'PHX'] as CityCode[]).map((cityCode) => (
                        <button
                          key={cityCode}
                          type="button"
                          onClick={() => setCity(cityCode)}
                          className={`py-2 px-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                            city === cityCode
                              ? 'bg-[#8d0012] text-white border-[#8d0012] shadow-xs'
                              : 'bg-white text-[#5b403e] border-[#e4beba]/60 hover:bg-[#eff4ff]'
                          }`}
                        >
                          {cityCode}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Business classifier */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0b1c30]">Corporate Classification</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['E-commerce', 'Manufacturing', 'Wholesale', 'Retail'] as BusinessType[]).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setBusinessType(type)}
                          className={`py-2 px-3 text-xs font-semibold rounded-lg border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            businessType === type
                              ? 'bg-[#d3e4fe] text-[#0b1c30] border-[#a6c8ff] font-bold'
                              : 'bg-white text-[#5b403e] border-[#e4beba]/50 hover:bg-[#eff4ff]'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-[#0b1c30]">Metrics &amp; Volume</h3>
                    <p className="text-xs text-[#5b403e]">Quantify weekly logistics distribution load.</p>
                  </div>

                  {/* Weekly volume */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-[#0b1c30]">
                      <span>Weekly Parcel Volume</span>
                      <span className="font-mono text-[#8d0012]">{parcelVolume} packages/wk</span>
                    </div>
                    <div className="space-y-1">
                      <input
                        type="range"
                        min="50"
                        max="1200"
                        step="10"
                        value={parcelVolume}
                        onChange={(e) => setParcelVolume(Number(e.target.value))}
                        className="w-full accent-[#8d0012] cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-[#5b403e] font-sans">
                        <span>50 (Low Demand)</span>
                        <span>1,200 (Extreme Traffic)</span>
                      </div>
                    </div>
                  </div>

                  {/* Active contracts */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0b1c30]">Active Service Contracts</label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#8f6f6d]" />
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={activeContracts}
                        onChange={(e) => setActiveContracts(Math.max(1, Number(e.target.value)))}
                        className="w-full pl-10 pr-4 h-11 border border-[#e4beba] rounded-lg shadow-2xs focus:outline-hidden focus:border-[#8d0012] focus:ring-1 focus:ring-[#8d0012] text-sm text-[#0b1c30]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-[#0b1c30]">Logistics Services &amp; Notes</h3>
                    <p className="text-xs text-[#5b403e]">Select vendor allocations and finalize notes.</p>
                  </div>

                  {/* Partner Provider Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0b1c30]">Primary Service provider</label>
                    <select
                      value={provider}
                      onChange={(e) => setProvider(e.target.value)}
                      className="w-full h-11 px-3 border border-[#e4beba] rounded-lg shadow-2xs focus:outline-hidden focus:border-[#8d0012] focus:ring-1 focus:ring-[#8d0012] text-sm text-[#0b1c30]"
                    >
                      <option value="SwiftTrans Logistics">SwiftTrans Logistics (High Efficiency)</option>
                      <option value="Global SkyLink">Global SkyLink (Premium Air Cargo)</option>
                      <option value="IronTrack Freight">IronTrack Freight (Economic Rail Link)</option>
                      <option value="DirectExpress Corp">DirectExpress Corp (Local Trucking)</option>
                    </select>
                  </div>

                  {/* Remarks Notes text area */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0b1c30]">Additional Survey Remarks (Notes)</label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Expand mid-west logistics contract next quarter..."
                      className="w-full p-3 border border-[#e4beba] rounded-lg shadow-2xs focus:outline-hidden focus:border-[#8d0012] focus:ring-1 focus:ring-[#8d0012] text-sm text-[#0b1c30] resize-none"
                    />
                  </div>
                </motion.div>
              )}

              {/* Action Navigators at Bottom */}
              <div className="flex gap-3 pt-4 border-t border-[#e4beba]/10">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex-1 border border-[#e4beba] text-[#5b403e] font-semibold text-sm h-11 rounded-lg flex items-center justify-center gap-1.5 hover:bg-[#eff4ff] active:scale-98 transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (step === 1 && !name.trim()) {
                        alert('Please enter a Client Name first.');
                        return;
                      }
                      setStep(step + 1);
                    }}
                    className="flex-1 bg-[#d3e4fe] text-[#0b1c30] font-semibold text-sm h-11 rounded-lg flex items-center justify-center gap-1.5 hover:bg-[#a6c8ff] active:scale-98 transition-all cursor-pointer"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex-1 bg-[#8d0012] hover:bg-[#b51621] text-white font-bold text-sm h-11 rounded-lg flex items-center justify-center gap-1.5 active:scale-98 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Submit Survey
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        )}

        {success && (
          <motion.div
            key="success-screen"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 border border-[#e4beba]/20 shadow-md text-center space-y-6"
          >
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10 animate-bounce" strokeWidth={2.2} />
            </div>

            <div className="space-y-2">
              <h2 className="text-[#0b1c30] text-xl font-bold">Survey Submissions Logged!</h2>
              <p className="text-sm text-[#5b403e] max-w-sm mx-auto">
                Client profile has been updated and metrics recalculated across Dashboards &amp; Analytics in real-time.
              </p>
            </div>

            <div className="bg-[#f8f9ff] p-4 rounded-xl text-left border border-[#e4beba]/10 text-xs text-[#5b403e] space-y-2 max-w-xs mx-auto">
              <div className="font-bold text-[#0b1c30] border-b border-[#e4beba]/10 pb-1 flex justify-between">
                <span>ENTRY SUMMARY</span>
                <span className="text-[#006760] font-mono">COMPLETE</span>
              </div>
              <div className="flex justify-between">
                <span>Client Name:</span>
                <span className="font-semibold text-[#0b1c30]">{name}</span>
              </div>
              <div className="flex justify-between">
                <span>Location:</span>
                <span className="font-semibold text-[#0b1c30]">{city}</span>
              </div>
              <div className="flex justify-between">
                <span>Volume:</span>
                <span className="font-bold text-[#0b1c30]">{parcelVolume} /wk</span>
              </div>
              <div className="flex justify-between">
                <span>Primary Partner:</span>
                <span className="font-semibold text-[#0b1c30]">{provider}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 max-w-xs mx-auto pt-2">
              <button
                onClick={() => onNavigate('dashboard')}
                className="w-full bg-[#8d0012] hover:bg-[#b51621] text-white font-bold h-11 rounded-lg text-sm cursor-pointer shadow-xs transition-colors"
              >
                Go to Dashboard
              </button>
              <button
                onClick={handleReset}
                className="w-full border border-[#e4beba] text-[#5b403e] font-semibold h-11 rounded-lg text-sm hover:bg-[#eff4ff] cursor-pointer transition-colors"
              >
                Log Another Survey
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

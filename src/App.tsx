import { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Monitor, 
  Code, 
  Layers, 
  Sparkles, 
  UserCheck, 
  HelpCircle,
  TrendingUp,
  Package,
  FolderOpen,
  Wifi,
  Battery,
  MapPin,
  Clock
} from 'lucide-react';
import { Client, Activity, AppStats } from './types';
import { INITIAL_STATS, INITIAL_CLIENTS, INITIAL_ACTIVITIES } from './data';

// Child view imports
import DashboardScreen from './components/DashboardScreen';
import AnalyticsScreen from './components/AnalyticsScreen';
import ClientsScreen from './components/ClientsScreen';
import SurveyScreen from './components/SurveyScreen';
import FlutterExporter from './components/FlutterExporter';

export default function App() {
  // Navigation active state
  const [activeTab, setActiveTab] = useState<'dashboard' | 'clients' | 'analytics' | 'survey'>('dashboard');
  
  // App simulated device layout options
  const [isPhoneMode, setIsPhoneMode] = useState<boolean>(true);
  const [showCodePanel, setShowCodePanel] = useState<boolean>(true);

  // Core application states
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);
  const [stats, setStats] = useState<AppStats>(INITIAL_STATS);

  // Digital status bar clock updater state
  const [statusBarTime, setStatusBarTime] = useState('09:41 AM');

  // Trigger clock state live updates
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // 12-hour formatting
      setStatusBarTime(`${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000); // update every half minute
    return () => clearInterval(interval);
  }, []);

  // Handler to push newly logged survey inputs to global stats triggers
  const handleAddClient = (newClient: Client) => {
    // 1. Add to clients database
    setClients((prev) => [newClient, ...prev]);

    // 2. Output live feed log to Activities lists
    const newActivity: Activity = {
      id: `act_${Date.now()}`,
      clientName: newClient.name,
      action: 'Survey submitted just now',
      status: 'NEW',
      icon: 'shipping',
    };
    setActivities((prev) => [newActivity, ...prev]);

    // 3. Recalculate metrics totals dynamically
    setStats((prev) => {
      const activeSurveyCount = clients.filter(c => c.surveySubmitted).length + 1;
      const totalVolume = clients.reduce((acc, c) => acc + c.parcelVolume, 0) + newClient.parcelVolume;
      const newAverage = Math.round(totalVolume / (clients.length + 1));
      
      return {
        totalClients: prev.totalClients + 1,
        todayEntries: prev.todayEntries + 1,
        pendingFollowups: Math.max(0, prev.pendingFollowups - 1),
        avgVolume: newAverage > 0 ? newAverage : prev.avgVolume,
        revenueOpportunity: parseFloat((prev.revenueOpportunity + 0.1).toFixed(2)), // simple increment for interaction feedback
      };
    });
  };

  // Handler to update customizable comments notes inside detailed layout drawer
  const handleUpdateClientNotes = (clientId: string, newNotes: string) => {
    setClients((prev) =>
      prev.map((c) => (c.id === clientId ? { ...c, notes: newNotes, lastUpdated: 'Updated just now' } : c))
    );

    // Append update feed to activities list
    const updatedClient = clients.find(c => c.id === clientId);
    if (updatedClient) {
      const updateActivity: Activity = {
        id: `act_${Date.now()}`,
        clientName: updatedClient.name,
        action: 'Profile updated by Rep',
        icon: 'edit',
      };
      setActivities((prev) => [updateActivity, ...prev]);
    }
  };

  // Callback to look up and open a client card from activities trigger
  const handleSelectClient = (client: Client) => {
    setActiveTab('clients');
    // Simple state timing callback so list filters are preset
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#0b1c30] flex flex-col font-sans selection:bg-[#ffdad7] selection:text-[#8d0012]" id="applet-main-container">
      
      {/* Platform Level Controlling Headbar */}
      <header className="bg-white border-b border-slate-200 py-3.5 px-6 flex items-center justify-between shrink-0 shadow-xs z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#8d0012] flex items-center justify-center text-white font-black text-xl tracking-tighter shrink-0 animate-pulse shadow-sm">
            D
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-tight text-[#0b1c30]">
              DoorMile Logistics CRM
            </h1>
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#5b403e]">
              Flutter App Simulation Suite &amp; Code Engine
            </p>
          </div>
        </div>

        {/* View Mode & Toggle Controllers */}
        <div className="flex items-center gap-2" id="workspace-controls-header">
          {/* Framer Selectors */}
          <div className="bg-slate-100 p-1 rounded-lg flex items-center gap-1 border border-slate-200">
            <button
              onClick={() => setIsPhoneMode(true)}
              className={`p-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                isPhoneMode
                  ? 'bg-white text-[#8d0012] shadow-xs'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
              title="Toggle Simulated device View"
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden sm:inline">Phone Frame</span>
            </button>
            <button
              onClick={() => setIsPhoneMode(false)}
              className={`p-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                !isPhoneMode
                  ? 'bg-white text-[#8d0012] shadow-xs'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
              title="Toggle Full Canvas view"
            >
              <Monitor className="w-4 h-4" />
              <span className="hidden sm:inline">Full responsive</span>
            </button>
          </div>

          {/* Toggle Code Exporter Panel */}
          <button
            onClick={() => setShowCodePanel(!showCodePanel)}
            className={`p-2 rounded-lg border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
              showCodePanel
                ? 'bg-red-50 text-[#8d0012] border-[#ffdad7]'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Code className="w-4.5 h-4.5" />
            <span className="hidden md:inline">Flutter Code</span>
          </button>
        </div>
      </header>

      {/* Main Core Body Workspace Split Panel */}
      <main className="flex-1 overflow-hidden flex flex-col lg:flex-row min-h-0 bg-slate-55 flex-wrap lg:flex-nowrap">
        
        {/* App Emulator Left Workspace Section */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex items-center justify-center min-w-0 min-h-0">
          
          {isPhoneMode ? (
            /* Immersive Phone Frame Mockup container with iOS dimensions */
            <div className="w-full max-w-[390px] h-[780px] bg-slate-900 rounded-[50px] p-3.5 shadow-2xl border-[11px] border-slate-950 flex flex-col overflow-hidden relative" id="iphone-bezel-emulator">
              
              {/* iPhone Notch Speaker bar and camera pin */}
              <div className="absolute top-0.5 left-1/2 -translate-x-1/2 bg-slate-950 w-36 h-6 rounded-b-2xl z-50 flex items-center justify-center">
                <div className="w-16 h-1 bg-slate-900 rounded-full" />
                <div className="w-2.5 h-2.5 bg-slate-900 rounded-full ml-3" />
              </div>

              {/* IOS Status Bar */}
              <div className="h-6 px-5 pt-1.5 text-white flex justify-between items-center z-45 text-[11px] font-bold font-sans selection:bg-transparent pointer-events-none select-none shrink-0" id="ios-status-bar">
                <span>{statusBarTime}</span>
                <div className="flex items-center gap-1.5">
                  <Wifi className="w-3.5 h-3.5 text-white" />
                  <Battery className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Simulated Native Flutter App shell content container */}
              <div className="flex-1 bg-[#f8f9ff] text-[#0b1c30] rounded-[34px] p-4 pt-1.5 overflow-hidden flex flex-col min-h-0 relative z-10 select-none">
                
                {/* Active Header Render based on tab type */}
                <header className="py-2 mb-3 border-b border-[#e4beba]/10 shrink-0 flex items-center justify-between" id="emulator-internal-header">
                  {activeTab === 'dashboard' && (
                    <div className="w-full flex justify-center py-1">
                      <img
                        alt="DoorMile Logo Red styling"
                        className="h-8 object-contain"
                        referrerPolicy="no-referrer"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-lN7gpMpPT6Z0884o9yONGy64uJLEIae-5QkU5cSGoO_v0gudwpm5MaIM2iWsgeDDLt-XwEJKjUzTC98fnFudTiO2H-IIJKJ_lqqhFqR_FT_nv789RC4rCMZG6iTgYVWx7IdSxVWr8GdrUqdhVgFEzbm401zhMF17OMujtRpjxGoKC6RgYFoZCmxWv1Fn-2Ul6PmkB-3D9K0gvI55n0C5ee7n1Q6nZ1us8WOVVfvNTUi7ktl-wbM1avYH7TRNRmc5pPpYupH6qVo"
                      />
                    </div>
                  )}

                  {activeTab === 'analytics' && (
                    <div className="flex items-center justify-between w-full px-1">
                      <div className="flex items-center gap-1.5">
                        <div className="w-7 h-7 rounded-lg bg-[#8d0012] flex items-center justify-center text-white shrink-0 shadow-xs">
                          <Layers className="w-4 h-4 text-white" />
                        </div>
                        <h2 className="text-[#8d0012] font-sans text-xs font-extrabold tracking-tight">
                          Logistics Client Survey
                        </h2>
                      </div>
                      <button
                        onClick={() => setActiveTab('clients')}
                        className="p-1 rounded-full text-slate-500 hover:bg-[#e4beba]/25 shrink-0"
                      >
                        <Clock className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {activeTab === 'survey' && (
                    <div className="flex items-center justify-between w-full px-1">
                      <div className="flex items-center gap-1.5">
                        <div className="w-7 h-7 rounded-lg bg-[#8d0012] flex items-center justify-center text-white shrink-0">
                          <UserCheck className="w-4 h-4" />
                        </div>
                        <h2 className="text-[#0b1c30] text-xs font-extrabold tracking-tight">
                          Start logistics survey
                        </h2>
                      </div>
                      <span className="text-[9px] font-bold text-[#8d0012] uppercase tracking-wider bg-[#ffdad7] px-2 py-0.5 rounded-full">
                        ACTIVE FORM
                      </span>
                    </div>
                  )}

                  {activeTab === 'clients' && (
                    <div className="flex items-center justify-between w-full px-1">
                      <div className="flex items-center gap-1.5">
                        <div className="w-7 h-7 bg-[#006760] text-white rounded-lg flex items-center justify-center shrink-0">
                          <FolderOpen className="w-4 h-4" />
                        </div>
                        <h2 className="text-[#006760] text-xs font-extrabold tracking-tight">
                          Client Database Files
                        </h2>
                      </div>
                    </div>
                  )}
                </header>

                {/* Inner Client Viewport */}
                <div className="flex-1 overflow-y-auto px-1 scroll-smooth" id="internal-simulator-scroll">
                  {activeTab === 'dashboard' && (
                    <DashboardScreen
                      stats={stats}
                      activities={activities}
                      clients={clients}
                      onNavigate={setActiveTab}
                      onSelectClient={handleSelectClient}
                    />
                  )}
                  {activeTab === 'analytics' && (
                    <AnalyticsScreen stats={stats} clients={clients} />
                  )}
                  {activeTab === 'clients' && (
                    <ClientsScreen 
                      clients={clients} 
                      onUpdateClientNotes={handleUpdateClientNotes}
                      onNavigate={setActiveTab}
                    />
                  )}
                  {activeTab === 'survey' && (
                    <SurveyScreen 
                      clients={clients} 
                      onAddClient={handleAddClient} 
                      onNavigate={setActiveTab}
                    />
                  )}
                </div>

                {/* Native Bottom navigation tabs bar exactly modeled after Material Design 3 guidelines */}
                <nav className="h-[68px] border-t border-[#e4beba]/15 shrink-0 flex items-center justify-around bg-white rounded-t-2xl -mx-4 -mb-4 px-1.5 pb-2 shadow-[0_-2px_10px_rgba(0,0,0,0.02)] relative z-25">
                  {/* Dashboard Tab */}
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className="flex flex-col items-center justify-center py-1 flex-1 relative cursor-pointer"
                  >
                    <div
                      className={`h-7 px-4 rounded-full flex items-center justify-center transition-all ${
                        activeTab === 'dashboard'
                          ? 'bg-[#b51621] text-white animate-pulse'
                          : 'text-[#8f6f6d]'
                      }`}
                    >
                      <Layers className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-[9px] mt-1 font-bold ${
                        activeTab === 'dashboard' ? 'text-[#8d0012]' : 'text-[#8f6f6d]'
                      }`}
                    >
                      Dashboard
                    </span>
                  </button>

                  {/* Clients DB Tab */}
                  <button
                    onClick={() => setActiveTab('clients')}
                    className="flex flex-col items-center justify-center py-1 flex-1 relative cursor-pointer"
                  >
                    <div
                      className={`h-7 px-4 rounded-full flex items-center justify-center transition-all ${
                        activeTab === 'clients'
                          ? 'bg-[#b51621] text-white'
                          : 'text-[#8f6f6d]'
                      }`}
                    >
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-[9px] mt-1 font-bold ${
                        activeTab === 'clients' ? 'text-[#8d0012]' : 'text-[#8f6f6d]'
                      }`}
                    >
                      Clients
                    </span>
                  </button>

                  {/* Survey Form tab */}
                  <button
                    onClick={() => setActiveTab('survey')}
                    className="flex flex-col items-center justify-center py-1 flex-1 relative cursor-pointer"
                  >
                    <div
                      className={`h-7 px-4 rounded-full flex items-center justify-center transition-all ${
                        activeTab === 'survey'
                          ? 'bg-[#b51621] text-white'
                          : 'text-[#8f6f6d]'
                      }`}
                    >
                      <Clock className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-[9px] mt-1 font-bold ${
                        activeTab === 'survey' ? 'text-[#8d0012]' : 'text-[#8f6f6d]'
                      }`}
                    >
                      Survey
                    </span>
                  </button>

                  {/* Analytics Tab */}
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className="flex flex-col items-center justify-center py-1 flex-1 relative cursor-pointer"
                  >
                    <div
                      className={`h-7 px-4 rounded-full flex items-center justify-center transition-all ${
                        activeTab === 'analytics'
                          ? 'bg-[#b51621] text-white'
                          : 'text-[#8f6f6d]'
                      }`}
                    >
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-[9px] mt-1 font-bold ${
                        activeTab === 'analytics' ? 'text-[#8d0012]' : 'text-[#8f6f6d]'
                      }`}
                    >
                      Analytics
                    </span>
                  </button>
                </nav>
              </div>
            </div>
          ) : (
            /* Desktop Responsive View Layout stretched to fill container limits */
            <div className="w-full max-w-5xl bg-[#f8f9ff] text-[#0b1c30] rounded-2xl border border-[#e4beba]/35 shadow-lg overflow-hidden flex flex-col h-[740px] relative transition-all" id="desktop-fullwidth-viewport">
              {/* Responsive Header board */}
              <header className="bg-white border-b border-[#e4beba]/15 px-6 py-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <img
                    alt="DoorMile Logo styled red"
                    className="h-9 object-contain shrink-0"
                    referrerPolicy="no-referrer"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-lN7gpMpPT6Z0884o9yONGy64uJLEIae-5QkU5cSGoO_v0gudwpm5MaIM2iWsgeDDLt-XwEJKjUzTC98fnFudTiO2H-IIJKJ_lqqhFqR_FT_nv789RC4rCMZG6iTgYVWx7IdSxVWr8GdrUqdhVgFEzbm401zhMF17OMujtRpjxGoKC6RgYFoZCmxWv1Fn-2Ul6PmkB-3D9K0gvI55n0C5ee7n1Q6nZ1us8WOVVfvNTUi7ktl-wbM1avYH7TRNRmc5pPpYupH6qVo"
                  />
                  <div className="h-6 w-[1px] bg-slate-200" />
                  <span className="text-xs font-extrabold uppercase tracking-wide bg-[#eff4ff] text-[#0b1c30] px-3.5 py-1.5 rounded-lg border border-[#d3e4fe]">
                    REPRESENTATIVE DASHBOARD CONSOLE
                  </span>
                </div>

                {/* Tab selections for stretched Layout */}
                <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
                  {(['dashboard', 'clients', 'survey', 'analytics'] as any).map((tab: any) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${
                        activeTab === tab
                          ? 'bg-[#8d0012] text-white shadow-md'
                          : 'text-[#5b403e] hover:bg-slate-100 hover:text-[#0b1c30]'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </header>

              {/* Stretch inner scroll area content */}
              <div className="flex-1 overflow-y-auto px-6 py-5">
                {activeTab === 'dashboard' && (
                  <DashboardScreen
                    stats={stats}
                    activities={activities}
                    clients={clients}
                    onNavigate={setActiveTab}
                    onSelectClient={handleSelectClient}
                  />
                )}
                {activeTab === 'analytics' && (
                  <AnalyticsScreen stats={stats} clients={clients} />
                )}
                {activeTab === 'clients' && (
                  <ClientsScreen
                    clients={clients}
                    onUpdateClientNotes={handleUpdateClientNotes}
                    onNavigate={setActiveTab}
                  />
                )}
                {activeTab === 'survey' && (
                  <SurveyScreen 
                    clients={clients} 
                    onAddClient={handleAddClient} 
                    onNavigate={setActiveTab}
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Flutter Exporter Right Code Workspace - Toggled Visually */}
        {showCodePanel && (
          <div className="w-full lg:w-[440px] xl:w-[480px] shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 bg-slate-900 p-4 h-[420px] lg:h-auto overflow-hidden flex flex-col z-20">
            <FlutterExporter activeTab={activeTab} />
          </div>
        )}
      </main>
    </div>
  );
}

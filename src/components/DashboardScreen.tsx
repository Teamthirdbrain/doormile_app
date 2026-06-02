import { ArrowUp, Calendar, Clock, Edit2, Phone, Search, ShoppingBag, Plus, Sparkles, Truck } from 'lucide-react';
import { Client, Activity, AppStats } from '../types';

interface DashboardScreenProps {
  stats: AppStats;
  activities: Activity[];
  clients: Client[];
  onNavigate: (tab: 'dashboard' | 'clients' | 'analytics' | 'survey') => void;
  onSelectClient: (client: Client) => void;
}

export default function DashboardScreen({
  stats,
  activities,
  clients,
  onNavigate,
  onSelectClient,
}: DashboardScreenProps) {
  return (
    <div className="space-y-6 pb-20 animate-fade-in" id="dashboard-screen-root">
      {/* Welcome Title */}
      <section className="space-y-1">
        <h1 className="font-sans text-[26px] font-bold text-[#0b1c30] tracking-tight leading-tight">
          Good morning, Rep
        </h1>
        <p className="font-sans text-sm text-[#5b403e]">
          Ready to manage your logistics survey portfolio?
        </p>
      </section>

      {/* Bento Grid layout */}
      <section className="grid grid-cols-2 gap-3" id="dashboard-bento-grid">
        {/* Large Stats Card (Span 2) */}
        <div className="col-span-2 bg-[#d3e4fe] rounded-xl p-5 flex flex-col justify-between min-h-[140px] relative overflow-hidden shadow-xs border border-[#a6c8ff]/30">
          <div className="relative z-10">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#8d0012]">
              Total Clients
            </span>
            <h2 className="text-3xl font-extrabold text-[#0b1c30] mt-1.5" id="total-clients-value">
              {stats.totalClients.toLocaleString()}
            </h2>
          </div>
          <div className="flex items-center gap-1.5 text-[#00504a] font-medium text-xs relative z-10 mt-3">
            <ArrowUp className="w-4 h-4 text-[#00504a]" strokeWidth={2.5} />
            <span>+12% from last month</span>
          </div>
          {/* Decorative geometric background node */}
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#8d0012]/5 rounded-full blur-2xl pointer-events-none"></div>
        </div>

        {/* Small Stats Card 1: Today Entries */}
        <div className="bg-white border border-[#e4beba]/35 rounded-xl p-4 flex flex-col gap-2 shadow-xs hover:border-[#8d0012]/40 transition-colors">
          <Calendar className="w-6 h-6 text-[#8d0012]" strokeWidth={2} />
          <div>
            <h3 className="text-2xl font-bold text-[#0b1c30]">{stats.todayEntries}</h3>
            <p className="text-xs font-semibold text-[#5b403e]">Today's Entries</p>
          </div>
        </div>

        {/* Small Stats Card 2: Pending Followups */}
        <div className="bg-white border border-[#e4beba]/35 rounded-xl p-4 flex flex-col gap-2 shadow-xs hover:border-[#004d47]/40 transition-colors">
          <Clock className="w-6 h-6 text-[#004d47]" strokeWidth={2} />
          <div>
            <h3 className="text-2xl font-bold text-[#0b1c30]">{stats.pendingFollowups}</h3>
            <p className="text-xs font-semibold text-[#5b403e]">Pending Follow-ups</p>
          </div>
        </div>
      </section>

      {/* Quick Actions Shortcuts */}
      <section className="space-y-3" id="quick-actions-section">
        <h2 className="text-sm font-semibold text-[#5b403e] px-1 uppercase tracking-wider">
          Quick Actions
        </h2>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => onNavigate('survey')}
            className="w-full bg-[#8d0012] hover:bg-[#b51621] text-white font-semibold text-sm h-12 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-98 shadow-sm cursor-pointer"
            id="quick-add-client-btn"
          >
            <Plus className="w-4 h-4 text-white" strokeWidth={2.5} />
            Quick Add Client
          </button>
          <button
            onClick={() => onNavigate('clients')}
            className="w-full bg-[#d3e4fe] hover:bg-[#b8d6ff] text-[#0b1c30] font-semibold text-sm h-12 rounded-xl flex items-center justify-center gap-2 border border-[#a6c8ff] transition-transform active:scale-98 cursor-pointer"
            id="search-database-btn"
          >
            <Search className="w-4 h-4 text-[#0b1c30]" strokeWidth={2.5} />
            Search Client Database
          </button>
        </div>
      </section>

      {/* Recent Activities Feed */}
      <section className="space-y-4" id="recent-activity-section">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-semibold text-[#5b403e] uppercase tracking-wider">
            Recent Activity
          </h2>
          <button
            onClick={() => onNavigate('clients')}
            className="text-[#8d0012] font-semibold text-xs hover:underline pointer-events-auto"
          >
            View all
          </button>
        </div>

        <div className="space-y-2 bg-white rounded-xl p-3 border border-[#e4beba]/20 shadow-xs">
          {activities.map((activity, idx) => {
            const correspondingClient = clients.find(
              (c) => c.name.toLowerCase() === activity.clientName.toLowerCase()
            );

            return (
              <div
                key={activity.id}
                onClick={() => correspondingClient && onSelectClient(correspondingClient)}
                className={`flex items-center gap-4 p-3 rounded-lg hover:bg-[#f8f9ff] transition-colors border-b border-[#e4beba]/10 last:border-b-0 ${
                  correspondingClient ? 'cursor-pointer' : ''
                }`}
              >
                {/* Dynamic Icon circle container */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    activity.icon === 'shipping'
                      ? 'bg-[#d5e0f8] text-[#1e3a8a]'
                      : activity.icon === 'call'
                      ? 'bg-[#ffe4e6] text-[#8d0012]'
                      : 'bg-[#dcfce7] text-[#15803d]'
                  }`}
                >
                  {activity.icon === 'shipping' ? (
                    <Truck className="w-5 h-5" />
                  ) : activity.icon === 'call' ? (
                    <Phone className="w-5 h-5" />
                  ) : (
                    <Edit2 className="w-5 h-5" />
                  )}
                </div>

                {/* Info and action */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#0b1c30] truncate">
                    {activity.clientName}
                  </p>
                  <p className="text-xs text-[#5b403e]">{activity.action}</p>
                </div>

                {/* Render colored badge statuses conditionally */}
                {activity.status === 'NEW' && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ffdad7] text-[#930013]">
                    NEW
                  </span>
                )}
                {activity.status === 'PENDING' && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#d8e3fb] text-[#3c475a]">
                    PENDING
                  </span>
                )}
                {activity.status === 'COMPLETED' && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#d8f9ee] text-[#115e59]">
                    COMPLETED
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Decorative insight card (Weekly report) */}
      <section className="pt-2">
        <div className="relative w-full h-[160px] rounded-2xl overflow-hidden shadow-sm group">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAL4b92Y6zJFhIo1UiPajFQZXBYdO4vuuFaeezRAwPf5MvYCwbEscsVbAnfyMGay60J54v8YAFc-jq_glu3pI2lncCd7qPLFhDq0FUrXTs-WmhXr1262Wf82srIwuv5i9-i1YsHRwN9eMm4bwT6Rjfd0RdC8mxzuGA5byB5NTKX25cqjAVh_ioMe2HZ2gEiTb0Wae5d9D2LaQvm48oEUqm3ni5qZ32JbudyD_jnIJchoUS6fMMMD8-Hg92B-jIEWh4gi2VtaZluhng"
            alt="Weekly Performance Report Container depot"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-5">
            <div className="flex items-center gap-1.5 mb-1 text-[#ffdad7] font-semibold text-[10px] tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Insight of the week</span>
            </div>
            <h3 className="text-white font-sans text-lg font-bold leading-tight">
              Weekly Performance Report
            </h3>
            <p className="text-white/80 text-xs mt-0.5 font-light">
              Analyze your team's survey conversion rates.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

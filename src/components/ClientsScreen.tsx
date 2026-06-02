import { useState } from 'react';
import { Search, MapPin, Truck, Calendar, Building, Sparkles, Filter, FileText, CheckCircle, Circle, Save, MoreHorizontal } from 'lucide-react';
import { Client, CityCode, BusinessType } from '../types';

interface ClientsScreenProps {
  clients: Client[];
  onUpdateClientNotes: (clientId: string, newNotes: string) => void;
  onNavigate: (tab: 'dashboard' | 'clients' | 'analytics' | 'survey') => void;
}

export default function ClientsScreen({ clients, onUpdateClientNotes, onNavigate }: ClientsScreenProps) {
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState<'All' | CityCode>('All');
  const [selectedType, setSelectedType] = useState<'All' | BusinessType>('All');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [editNotes, setEditNotes] = useState('');

  // Filtering Logic
  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(search.toLowerCase()) ||
                          (client.provider && client.provider.toLowerCase().includes(search.toLowerCase()));
    const matchesCity = selectedCity === 'All' || client.city === selectedCity;
    const matchesType = selectedType === 'All' || client.businessType === selectedType;
    return matchesSearch && matchesCity && matchesType;
  });

  const handleOpenClient = (client: Client) => {
    setSelectedClient(client);
    setEditNotes(client.notes || '');
  };

  const handleSaveNotes = () => {
    if (selectedClient) {
      onUpdateClientNotes(selectedClient.id, editNotes);
      setSelectedClient({ ...selectedClient, notes: editNotes });
      alert('Remarks saved successfully!');
    }
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in" id="clients-screen-root">
      {/* List Header */}
      <section className="space-y-1">
        <h2 className="text-[#0b1c30] font-sans text-[22px] font-bold">Client Database</h2>
        <p className="text-sm text-[#5b403e]">
          Search, audit, and coordinate logistics survey reports.
        </p>
      </section>

      {/* Database Search & Controls */}
      <section className="space-y-3" id="db-search-filters">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#8f6f6d]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company or provider..."
            className="w-full pl-10 pr-4 h-11 border border-[#e4beba] bg-white rounded-xl shadow-2xs text-sm focus:outline-hidden focus:border-[#8d0012] focus:ring-1 focus:ring-[#8d0012] text-[#0b1c30]"
          />
        </div>

        {/* City Filter badges */}
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-extrabold text-[#5b403e] tracking-wider block">
            Filter by City
          </span>
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {['All', 'NY', 'LA', 'CHI', 'HOU', 'PHX'].map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city as any)}
                className={`py-1.5 px-3 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedCity === city
                    ? 'bg-[#8d0012] text-white shadow-xs'
                    : 'bg-[#eff4ff] text-[#5b403e] hover:bg-[#d5e0f8]'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Type Filter badges */}
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-extrabold text-[#5b403e] tracking-wider block">
            Filter by Business Classification
          </span>
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {['All', 'E-commerce', 'Manufacturing', 'Wholesale', 'Retail'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type as any)}
                className={`py-1.5 px-3 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedType === type
                    ? 'bg-[#006760] text-white shadow-xs'
                    : 'bg-[#f0f4ff] text-[#545f73] hover:bg-[#d5e0f8]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Results Listing count */}
      <section className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#5b403e]">
          <span>RESULTS ({filteredClients.length})</span>
          <span>CURRENT STACK</span>
        </div>

        <div className="space-y-2.5">
          {filteredClients.length > 0 ? (
            filteredClients.map((client) => {
              // Theme tags for type
              let typeClass = 'bg-[#ffdad7] text-[#930013]';
              if (client.businessType === 'Manufacturing') typeClass = 'bg-[#d8f9ee] text-[#00504a]';
              if (client.businessType === 'Wholesale') typeClass = 'bg-[#d8e3fb] text-[#3c475a]';
              if (client.businessType === 'Retail') typeClass = 'bg-[#eff4ff] text-[#545f73]';

              return (
                <div
                  key={client.id}
                  onClick={() => handleOpenClient(client)}
                  className="bg-white border border-[#e4beba]/25 p-4 rounded-xl hover:border-[#8d0012]/40 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="space-y-2 flex-1 min-w-0 pr-3">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-[#0b1c30] truncate group-hover:text-[#8d0012] transition-colors">
                        {client.name}
                      </h4>
                      <span className={`text-[10px] px-2 py-0.5 font-bold rounded-sm shrink-0 ${typeClass}`}>
                        {client.businessType}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-[#5b403e]">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#8d0012]" />
                        <span className="font-bold font-mono">{client.city}</span>
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-[#004d47]">
                        <Truck className="w-3.5 h-3.5" />
                        <span>{client.provider}</span>
                      </span>
                    </div>
                  </div>

                  {/* Volume circle indicator */}
                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-[#0b1c30] font-mono">
                      {client.parcelVolume} <span className="text-[10px] font-sans font-normal text-[#5b403e]">/wk</span>
                    </div>
                    <span className="text-[10px] font-semibold text-[#5b403e]/80">
                      {client.activeContracts} contracts
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-xl border border-[#e4beba]/15 p-12 text-center space-y-4">
              <div className="w-12 h-12 bg-[#eff4ff] text-[#8d0012] rounded-full flex items-center justify-center mx-auto">
                <Filter className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#0b1c30]">No matching clients found</p>
                <p className="text-xs text-[#5b403e] mt-1">
                  Try adjusting searching queries or changing category filters.
                </p>
              </div>
              <button
                onClick={() => onNavigate('survey')}
                className="bg-[#8d0012] hover:bg-[#b51621] text-white px-4 py-2 rounded-lg text-xs font-bold shadow-xs cursor-pointer inline-flex items-center gap-1.5"
              >
                Start New Survey
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Standard Bottom-Sheet CRM Modal drawer detailed view */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-xs flex items-end justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-t-2xl rounded-b-xl w-full max-w-md overflow-hidden relative shadow-2xl flex flex-col max-h-[85vh] animate-slide-up">
            
            {/* Top drawer bar graphic */}
            <div className="w-12 h-1 bg-[#8f6f6d]/30 rounded-full mx-auto my-3 shrink-0" />

            {/* Modal Header content */}
            <div className="px-5 pb-3 border-b border-[#e4beba]/10">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#006760] bg-[#d8f9ee] px-2 py-0.5 rounded-sm">
                    {selectedClient.businessType}
                  </span>
                  <h3 className="text-lg font-bold text-[#0b1c30] mt-1.5">{selectedClient.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedClient(null)}
                  className="w-8 h-8 rounded-full bg-[#f8f9ff] text-[#5b403e] font-bold text-center flex items-center justify-center hover:bg-[#eff4ff] cursor-pointer shrink-0"
                >
                  &times;
                </button>
              </div>
            </div>

            {/* Modal Body scroll area */}
            <div className="px-5 py-4 overflow-y-auto space-y-4 flex-1">
              {/* Primary parameters cards layout */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-[#eff4ff] p-3 rounded-lg border border-[#e4beba]/10">
                  <span className="text-[10px] font-bold text-[#545f73] block uppercase">Location City</span>
                  <span className="text-base font-bold text-[#0b1c30] font-mono block mt-0.5">
                    {selectedClient.city}
                  </span>
                </div>
                <div className="bg-[#eff4ff] p-3 rounded-lg border border-[#e4beba]/10">
                  <span className="text-[10px] font-bold text-[#545f73] block uppercase">Weekly Volume</span>
                  <span className="text-base font-bold text-[#0b1c30] font-mono block mt-0.5">
                    {selectedClient.parcelVolume} /wk
                  </span>
                </div>
                <div className="bg-[#eff4ff] p-3 rounded-lg border border-[#e4beba]/10 col-span-2">
                  <span className="text-[10px] font-bold text-[#545f73] block uppercase">LOGISTICS PARTNER PROVIDER</span>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm font-bold text-[#0b1c30]">{selectedClient.provider}</span>
                    <span className="text-[9px] font-extrabold bg-[#ffe4e6] text-[#8d0012] px-2 py-0.5 rounded-full uppercase shrink-0">
                      {selectedClient.efficiency}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status information check logs */}
              <div className="bg-[#f8f9ff] p-3 rounded-lg border border-[#e4beba]/10 text-xs text-[#5b403e] space-y-2">
                <div className="font-bold text-[#0b1c30] flex items-center gap-1 text-[10px]">
                  <Sparkles className="w-3.5 h-3.5 text-[#8d0012]" />
                  <span>REPORT STATUS MATRIX</span>
                </div>
                <div className="flex justify-between">
                  <span>Audit report status:</span>
                  <span className="font-bold text-[#006760] flex items-center gap-1 font-mono">
                    <CheckCircle className="w-3.5 h-3.5" />
                    SUBMITTED
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Contracts:</span>
                  <span className="font-semibold text-[#0b1c30]">{selectedClient.activeContracts} active agreements</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Checked:</span>
                  <span className="font-light text-[#5b403e]">{selectedClient.lastUpdated}</span>
                </div>
              </div>

              {/* Interactive Remarks form to override notes in parent */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0b1c30] flex justify-between">
                  <span>CRM SURVEY REMARKS NOTES</span>
                  <span className="text-[10px] font-light text-[#5b403e]">Auto-saved locally</span>
                </label>
                <textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="e.g. Needs immediate review or transit optimization update..."
                  className="w-full p-3 border border-[#e4beba] rounded-lg text-sm text-[#0b1c30] resize-none focus:outline-hidden focus:border-[#8d0012]"
                  rows={3}
                />
              </div>
            </div>

            {/* Bottom Panel Drawer save changes widget */}
            <div className="px-5 py-3 bg-[#f8f9ff] border-t border-[#e4beba]/10 flex gap-2 shrink-0">
              <button
                onClick={() => setSelectedClient(null)}
                className="flex-1 h-10 rounded-lg text-xs font-bold text-[#5b403e] border border-[#e4beba] cursor-pointer hover:bg-white"
              >
                Close Profile
              </button>
              <button
                onClick={handleSaveNotes}
                className="flex-1 h-10 rounded-lg text-xs font-bold text-white bg-[#8d0012] hover:bg-[#b51621] flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

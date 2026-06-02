import { useState, useEffect } from 'react';
import { Award, BarChart3, Building, Coins, CornerRightDown, DollarSign, Folders, Landplot, MapPin, Package, Plane, TrendingUp, Truck } from 'lucide-react';
import { Client, AppStats } from '../types';

interface AnalyticsScreenProps {
  stats: AppStats;
  clients: Client[];
}

export default function AnalyticsScreen({ stats, clients }: AnalyticsScreenProps) {
  const [animate, setAnimate] = useState(false);

  // Trigger animations shortly after mounting
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 150);
    return () => clearTimeout(timer);
  }, []);

  // Compute dynamic stats from current clients array to show live-updating analytics
  const totalsByCity = {
    NY: 0,
    LA: 0,
    CHI: 0,
    HOU: 0,
    PHX: 0,
  };

  const totalsByType = {
    'E-commerce': 0,
    Manufacturing: 0,
    Wholesale: 0,
    Retail: 0,
  };

  // Seed baseline metrics that represent our 1,284 clients, then add our live array
  const baseCityCounts = { NY: 320, LA: 210, CHI: 430, HOU: 140, PHX: 184 };
  const baseTypeCounts = { 'E-commerce': 480, Manufacturing: 320, Wholesale: 242, Retail: 242 };

  clients.forEach((c) => {
    if (totalsByCity[c.city] !== undefined) {
      totalsByCity[c.city] += 1;
    }
    if (totalsByType[c.businessType] !== undefined) {
      totalsByType[c.businessType] += 1;
    }
  });

  const cityData = {
    NY: baseCityCounts.NY + totalsByCity.NY,
    LA: baseCityCounts.LA + totalsByCity.LA,
    CHI: baseCityCounts.CHI + totalsByCity.CHI,
    HOU: baseCityCounts.HOU + totalsByCity.HOU,
    PHX: baseCityCounts.PHX + totalsByCity.PHX,
  };

  const typeData = {
    'E-commerce': baseTypeCounts['E-commerce'] + totalsByType['E-commerce'],
    Manufacturing: baseTypeCounts.Manufacturing + totalsByType.Manufacturing,
    Wholesale: baseTypeCounts.Wholesale + totalsByType.Wholesale,
    Retail: baseTypeCounts.Retail + totalsByType.Retail,
  };

  const totalCalculated = Object.values(cityData).reduce((a, b) => a + b, 0);

  // Percentages for Cities (Max is CHI, scale relative to CHI's value to align with chart screenshot)
  const maxCityVal = Math.max(...Object.values(cityData));
  const getCityHeight = (val: number) => {
    const ratio = maxCityVal > 0 ? (val / maxCityVal) * 92 : 0;
    return `${Math.max(ratio, 15)}%`; // Keep a minimum 15% height for visibility
  };

  // Percentages for Business types
  const getBusinessPercentage = (val: number) => {
    if (totalCalculated === 0) return 0;
    return Math.round((val / totalCalculated) * 100);
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in" id="analytics-screen-root">
      {/* Overview Intro */}
      <section className="space-y-1">
        <h2 className="text-[#0b1c30] font-sans text-[22px] font-bold">Analytics Overview</h2>
        <p className="text-sm text-[#5b403e]">
          Real-time logistics performance and distribution metrics.
        </p>
      </section>

      {/* Stats Bento Grid Items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3" id="analytics-metrics-grid">
        {/* Total Clients Cards */}
        <div className="bg-[#eff4ff] p-5 rounded-xl border border-[#e4beba]/30 flex flex-row items-center justify-between h-32 hover:bg-[#dce9ff] transition-all group">
          <div className="flex flex-col justify-between h-full">
            <span className="text-xs font-semibold text-[#545f73]">Total Clients</span>
            <div>
              <div className="text-3xl font-extrabold text-[#0b1c30] tracking-tight">
                {stats.totalClients.toLocaleString()}
              </div>
              <div className="text-[11px] text-[#006760] font-bold flex items-center gap-0.5 mt-0.5">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+12% from last month</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-[#e4beba]/20 text-[#8d0012] group-hover:scale-105 transition-transform shrink-0 shadow-xs">
            <TrendingUp strokeWidth={2.5} className="w-5 h-5" />
          </div>
        </div>

        {/* Avg parcel Volume */}
        <div className="bg-[#eff4ff] p-5 rounded-xl border border-[#e4beba]/30 flex flex-row items-center justify-between h-32 hover:bg-[#dce9ff] transition-all group">
          <div className="flex flex-col justify-between h-full">
            <span className="text-xs font-semibold text-[#545f73]">Avg. Volume</span>
            <div>
              <div className="text-3xl font-extrabold text-[#0b1c30] tracking-tight">
                {stats.avgVolume} <span className="text-xs font-medium text-[#5b403e]">/wk</span>
              </div>
              <div className="text-[11px] text-[#5b403e] font-medium leading-relaxed">
                Consistent logistics demand
              </div>
            </div>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-[#e4beba]/20 text-[#8d0012] group-hover:scale-105 transition-transform shrink-0 shadow-xs">
            <Package strokeWidth={2} className="w-5 h-5" />
          </div>
        </div>

        {/* Revenue opportunity */}
        <div className="bg-[#b51621] p-5 rounded-xl flex flex-row items-center justify-between h-32 shadow-sm transition-all hover:bg-[#a00c14] group">
          <div className="flex flex-col justify-between h-full text-white">
            <span className="text-xs font-medium text-[#ffc6c1]">Revenue Opportunity</span>
            <div>
              <div className="text-3xl font-extrabold text-white tracking-tight">
                ${stats.revenueOpportunity.toFixed(1)}M
              </div>
              <div className="text-[11px] text-[#ffc6c1]/90 font-light">
                Estimated monthly gross
              </div>
            </div>
          </div>
          <div className="bg-white/10 p-2.5 rounded-lg text-white group-hover:scale-105 transition-transform shrink-0">
            <Coins strokeWidth={2} className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Dynamic visualizations Layout: 2-column or stack responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3" id="charts-container-grid">
        {/* Bar Chart Panel: Clients by City */}
        <div className="bg-white p-5 rounded-xl border border-[#e4beba]/25 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#0b1c30] tracking-tight">Clients by City</h3>
              <p className="text-[10px] text-[#5b403e]">Relative active survey footprint</p>
            </div>
            <MapPin className="w-4.5 h-4.5 text-[#5b403e]" />
          </div>

          <div className="flex items-end justify-between h-44 gap-3 pt-4 px-1" id="city-bars-container">
            {Object.entries(cityData).map(([city, count]) => {
              const barHeight = animate ? getCityHeight(count) : '0%';
              const isEven = city === 'NY' || city === 'CHI' || city === 'PHX';
              return (
                <div key={city} className="flex-1 flex flex-col items-center gap-1.5 group select-none">
                  {/* Tooltip on Hover */}
                  <div className="opacity-0 group-hover:opacity-100 ease-out transition-opacity absolute -translate-y-12 bg-[#0b1c30] text-white text-[10px] px-2 py-1 rounded shadow-md pointer-events-none z-10 font-mono">
                    {count} clients
                  </div>
                  {/* Actual Animated Bar */}
                  <div className="w-full relative bg-[#eff4ff] rounded-t-lg overflow-hidden h-32 flex flex-col justify-end">
                    <div
                      className={`w-full rounded-t-md transition-all duration-1000 ease-out cursor-pointer hover:brightness-110 ${
                        isEven ? 'bg-[#b51621]' : 'bg-[#ffb3ad]'
                      }`}
                      style={{ height: barHeight }}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-[#5b403e]">{city}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Business Type proportions */}
        <div className="bg-white p-5 rounded-xl border border-[#e4beba]/25 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#0b1c30] tracking-tight">Business Type</h3>
              <p className="text-[10px] text-[#5b403e]">Corporate classification ratio</p>
            </div>
            <Folders className="w-4.5 h-4.5 text-[#5b403e]" />
          </div>

          <div className="space-y-4">
            {Object.entries(typeData).map(([type, count]) => {
              const percent = getBusinessPercentage(count);
              const barWidth = animate ? `${percent}%` : '0%';
              
              // Colors matching the original stylesheet
              let barColor = 'bg-[#8d0012]'; // e-commerce
              if (type === 'Manufacturing') barColor = 'bg-[#006760]';
              if (type === 'Wholesale') barColor = 'bg-[#545f73]';
              if (type === 'Retail') barColor = 'bg-[#e4beba]';

              return (
                <div key={type} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-[#0b1c30]">
                    <span>{type}</span>
                    <span className="font-mono">{percent}%</span>
                  </div>
                  <div className="w-full bg-[#f0f4ff] h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${barColor} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: barWidth }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Logistics Providers list */}
      <div className="bg-white p-5 rounded-xl border border-[#e4beba]/25 shadow-xs">
        <h3 className="text-sm font-bold text-[#0b1c30] mb-4 uppercase tracking-wider">
          Top Logistics Providers
        </h3>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Main vertical data listings */}
          <div className="flex-1 space-y-3">
            {/* Provider 1 */}
            <div className="flex items-center justify-between p-3.5 bg-[#eff4ff] rounded-xl border border-transparent hover:border-[#ffb3ad] transition-all cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-[#e4beba]/20 text-[#8d0012] shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0b1c30] group-hover:text-[#8d0012] transition-colors">
                    SwiftTrans Logistics
                  </div>
                  <div className="text-xs text-[#5b403e]">342 active contracts</div>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#9cf2e8] text-[#00504a]">
                High Efficiency
              </span>
            </div>

            {/* Provider 2 */}
            <div className="flex items-center justify-between p-3.5 bg-[#eff4ff] rounded-xl border border-transparent hover:border-[#ffb3ad] transition-all cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-[#e4beba]/20 text-[#8d0012] shrink-0">
                  <Plane className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0b1c30] group-hover:text-[#8d0012] transition-colors">
                    Global SkyLink
                  </div>
                  <div className="text-xs text-[#5b403e]">215 active contracts</div>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#d8e3fb] text-[#3c475a]">
                Premium Service
              </span>
            </div>

            {/* Provider 3 */}
            <div className="flex items-center justify-between p-3.5 bg-[#eff4ff] rounded-xl border border-transparent hover:border-[#ffb3ad] transition-all cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-[#e4beba]/20 text-[#8d0012] shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0b1c30] group-hover:text-[#8d0012] transition-colors">
                    IronTrack Freight
                  </div>
                  <div className="text-xs text-[#5b403e]">188 active contracts</div>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#d3e4fe] text-[#5b403e]">
                Cost Leader
              </span>
            </div>
          </div>

          {/* Graphical decorative node side panel */}
          <div className="w-full md:w-56 h-40 md:h-auto rounded-xl overflow-hidden relative group shrink-0">
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkldt4r546nOH7me-8y_vN2JEWw_ZnyUEYoEtWBR4_rfOZd8mHGluXxbBz8xItADbpgq8tI2l2FrCf4OGBeol5ZKaeSCqLb15kUpziFcQFRGTjemzaN0m5TASGKzWpi8olR77d11e7GxSNXf_f_UOhHDcy4SlB79UOpo31J0naZxvjm4mzzoNBsOKoFG4YaFidxeZENQOW1s9iU1coW_3gPtody0cbuoGwGP5HczXlWeM6DBET1SEyVbW2P74g0264xydj5zJ3Bnw"
              alt="Logistics Distribution Sunset"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#8d0012]/80 to-transparent flex flex-col justify-end p-4">
              <p className="text-white font-bold text-xs">Regional Reach</p>
              <p className="text-white/80 text-[10px]">Updated hourly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

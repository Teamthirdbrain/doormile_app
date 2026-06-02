export type CityCode = 'NY' | 'LA' | 'CHI' | 'HOU' | 'PHX';
export type BusinessType = 'E-commerce' | 'Manufacturing' | 'Wholesale' | 'Retail';
export type ClientStatus = 'NEW' | 'PENDING' | 'COMPLETED' | 'UPDATED';

export interface Client {
  id: string;
  name: string;
  city: CityCode;
  businessType: BusinessType;
  parcelVolume: number; // Avg weekly parcel volume
  activeContracts: number;
  provider: 'SwiftTrans Logistics' | 'Global SkyLink' | 'IronTrack Freight' | string;
  efficiency: 'High Efficiency' | 'Premium Service' | 'Cost Leader' | string;
  status: ClientStatus;
  lastUpdated: string;
  surveySubmitted: boolean;
  notes?: string;
}

export interface Activity {
  id: string;
  clientName: string;
  action: string;
  timeSnippet: string;
  status?: 'NEW' | 'PENDING' | 'COMPLETED';
  icon: 'shipping' | 'call' | 'edit';
}

export interface AppStats {
  totalClients: number;
  avgVolume: number;
  revenueOpportunity: number; // in Millions of $ (e.g. 2.4)
  todayEntries: number;
  pendingFollowups: number;
}

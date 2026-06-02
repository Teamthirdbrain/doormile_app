import { Client, Activity, AppStats } from './types';

export const INITIAL_STATS: AppStats = {
  totalClients: 1284,
  avgVolume: 452,
  revenueOpportunity: 2.4, // in Millions
  todayEntries: 42,
  pendingFollowups: 18
};

export const INITIAL_CLIENTS: Client[] = [
  {
    id: 'c1',
    name: 'Global Logistics Inc.',
    city: 'NY',
    businessType: 'E-commerce',
    parcelVolume: 620,
    activeContracts: 24,
    provider: 'SwiftTrans Logistics',
    efficiency: 'High Efficiency',
    status: 'NEW',
    lastUpdated: '2 hours ago',
    surveySubmitted: true,
    notes: 'Handles major consumer electronics fulfillment. Extremely satisfied with current transit times.'
  },
  {
    id: 'c2',
    name: 'Swift-Cargo Co.',
    city: 'CHI',
    businessType: 'Manufacturing',
    parcelVolume: 410,
    activeContracts: 15,
    provider: 'Global SkyLink',
    efficiency: 'Premium Service',
    status: 'PENDING',
    lastUpdated: '4 hours ago',
    surveySubmitted: false,
    notes: 'Requires critical air-freight updates. Next check-in is scheduled for today at 4:00 PM.'
  },
  {
    id: 'c3',
    name: 'Mainline Distributors',
    city: 'PHX',
    businessType: 'Wholesale',
    parcelVolume: 280,
    activeContracts: 8,
    provider: 'IronTrack Freight',
    efficiency: 'Cost Leader',
    status: 'UPDATED',
    lastUpdated: '1 day ago',
    surveySubmitted: true,
    notes: 'Distribution routes updated to optimize midwest regions. Monitored by Rep Sarah.'
  },
  {
    id: 'c4',
    name: 'Apex Retail Services',
    city: 'LA',
    businessType: 'Retail',
    parcelVolume: 512,
    activeContracts: 19,
    provider: 'SwiftTrans Logistics',
    efficiency: 'High Efficiency',
    status: 'COMPLETED',
    lastUpdated: '2 days ago',
    surveySubmitted: true,
    notes: 'Retail footprint expanding in Southern California. Standard local parcel agreement.'
  },
  {
    id: 'c5',
    name: 'Omni Retail Group',
    city: 'HOU',
    businessType: 'Retail',
    parcelVolume: 340,
    activeContracts: 12,
    provider: 'SwiftTrans Logistics',
    efficiency: 'High Efficiency',
    status: 'COMPLETED',
    lastUpdated: '3 days ago',
    surveySubmitted: true,
    notes: 'Focus on brick and mortar supply chains. Standard retail distribution.'
  },
  {
    id: 'c6',
    name: 'Horizon Wholesale',
    city: 'CHI',
    businessType: 'Wholesale',
    parcelVolume: 480,
    activeContracts: 14,
    provider: 'IronTrack Freight',
    efficiency: 'Cost Leader',
    status: 'COMPLETED',
    lastUpdated: '4 days ago',
    surveySubmitted: true
  },
  {
    id: 'c7',
    name: 'Pinnacle E-Commerce',
    city: 'NY',
    businessType: 'E-commerce',
    parcelVolume: 850,
    activeContracts: 38,
    provider: 'Global SkyLink',
    efficiency: 'Premium Service',
    status: 'NEW',
    lastUpdated: '5 days ago',
    surveySubmitted: true
  },
  {
    id: 'c8',
    name: 'Texan Parts Manufacturing',
    city: 'HOU',
    businessType: 'Manufacturing',
    parcelVolume: 290,
    activeContracts: 9,
    provider: 'IronTrack Freight',
    efficiency: 'Cost Leader',
    status: 'COMPLETED',
    lastUpdated: '1 week ago',
    surveySubmitted: true
  }
];

export const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 'a1',
    clientName: 'Global Logistics Inc.',
    action: 'Survey submitted 2h ago',
    status: 'NEW',
    icon: 'shipping'
  },
  {
    id: 'a2',
    clientName: 'Swift-Cargo Co.',
    action: 'Follow-up scheduled for 4 PM',
    status: 'PENDING',
    icon: 'call'
  },
  {
    id: 'a3',
    clientName: 'Mainline Distributors',
    action: 'Profile updated by Sarah',
    icon: 'edit'
  }
];

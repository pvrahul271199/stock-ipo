import { IPODetails } from './types';
import { mockIPODetails } from './mock-data';

export async function fetchIPODetails(symbol: string, series: string): Promise<IPODetails> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock data
  const mockData = mockIPODetails[symbol];
  if (!mockData) {
    throw new Error('IPO details not found');
  }
  
  return mockData;
}
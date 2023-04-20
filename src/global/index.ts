export enum Criticality {
  SAFE = '#00BF54',
  MEDIUM = '#FAC848',
  MAJOR = '#E17538',
  CRITICAL = '#ED3445',
}

export function stringToCriticality(key: string | undefined): Criticality {
  if (!key) return Criticality.SAFE;
  switch (key.toLowerCase()) {
    case 'safe':
      return Criticality.SAFE;
    case 'medium':
      return Criticality.MEDIUM;
    case 'major':
      return Criticality.MAJOR;
    case 'critical':
      return Criticality.CRITICAL;
  }
  return Criticality.SAFE;
}

export function getCriticalityFromValue(value: number): Criticality {
  if (value > 80) {
    return Criticality.CRITICAL;
  } else if (value > 60) {
    return Criticality.MAJOR;
  } else if (value > 40) {
    return Criticality.MEDIUM;
  } else {
    return Criticality.SAFE;
  }
}

export enum DeviceReachability {
  REACHABLE = 'REACHABLE',
  UNREACHABLE = 'UNREACHABLE',
}

export type TableDataType = 'STATUS' | 'NUMBER' | 'STRING' | string;

export type TableHeadType = {
  title: string;
  data_type: TableDataType;
  property: string;
  sortable?: boolean;
};

export type TableRowItemType = { value: any; type: TableDataType; criticality?: Criticality };

export type TableRowDataType = { [key: string]: TableRowItemType }[];

export const API_URL = import.meta.env.VITE_API_URL;
export const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;

export const headers = {
  Authorization: `Basic ${AUTH_TOKEN}`,
};

export interface FetchData {
  Text: string;
  Value: string;
}

export interface FetchPanelData {
  title: string;
  sub_title: string;
  columns: TableHeadType[];
  data: { [key: string]: any }[];
  status: { [key: string]: any }[];
}

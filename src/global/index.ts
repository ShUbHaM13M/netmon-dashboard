export enum Criticality {
  SAFE = '#00BF54',
  MEDIUM = '#FAC848',
  MAJOR = '#E17538',
  CRITICAL = '#ED3445',
}

export enum DeviceReachability {
  REACHABLE = 'REACHABLE',
  UNREACHABLE = 'UNREACHABLE',
}

export type TableDataType = 'STATUS' | 'NUMBER' | 'STRING' | string;

export type TableHeadType = {
  title: string;
  dataType: TableDataType;
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
  columns: { title: string; data_type: string }[];
  data: { [key: string]: any }[];
}

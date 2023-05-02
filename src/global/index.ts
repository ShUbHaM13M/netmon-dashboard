import { MatcherFn, Path } from 'wouter';
import makeMatcher from 'wouter/matcher';

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

export function getFormatedDate(timeInEpoch: number) {
  const date = new Date(timeInEpoch);
  const formattedDate = `${date.getFullYear()}-${date.getMonth() - 1}-${date.getDate()} ${new Date(
    timeInEpoch,
  ).toLocaleTimeString('en-GB')}`;
  return formattedDate;
}

export const dateFormatter = new Intl.DateTimeFormat('en', {
  day: '2-digit',
  month: '2-digit',
  year: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

const defaultMatcher = makeMatcher();

export const multipathMatcher: MatcherFn = (patterns: Path, path: Path) => {
  for (const pattern of [patterns].flat()) {
    const [match, params] = defaultMatcher(pattern, path);
    if (match) return [match, params];
  }

  return [false, null];
};

export const getArrayAsString = (arr: any[], key: string) => arr.map((v) => v[key]).join(',');

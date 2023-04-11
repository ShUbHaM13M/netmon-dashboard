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

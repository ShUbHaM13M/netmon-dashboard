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

export type TableDataType = 'STATUS' | 'NUMBER' | 'STRING';

export type TableRowItemType = { value: any; type: TableDataType; criticality?: Criticality };

export type TableRowDataType = Array<TableRowItemType>;

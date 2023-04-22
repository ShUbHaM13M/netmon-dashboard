import { FetchPanelData } from '../../../global';

const interfaceSummaryColumns = ['hostname', 'bandwidth_mbps', 'interface', 'color'];
const rxUtilColumns = [
  'rx_95pct_util',
  'rx_95_kbps',
  'rx_avg_util',
  'rx_avg_kbps',
  'rx_min_kbps',
  'rx_max_kbps',
];
const txUtilColumns = [
  'tx_95pct_util',
  'tx_95_kbps',
  'tx_avg_util',
  'tx_avg_kbps',
  'tx_min_kbps',
  'tx_max_kbps',
];

export function getInterfaceStatsSummary(interfaceStatsData: FetchPanelData | undefined) {
  const interfaceSummaryData: any = {
    columns: [],
    data: [],
  };
  const rxUtilData: any = {
    columns: [],
    data: [],
  };
  const txUtilData: any = {
    columns: [],
    data: [],
  };

  interfaceStatsData?.columns.forEach((c) => {
    if (interfaceSummaryColumns.includes(c.property)) {
      interfaceSummaryData.columns.push({ ...c, sortable: false });
    }
    if (rxUtilColumns.includes(c.property)) {
      rxUtilData.columns.push({ ...c, sortable: false });
    }
    if (txUtilColumns.includes(c.property)) {
      txUtilData.columns.push({ ...c, sortable: false });
    }
  });

  interfaceStatsData?.data.forEach((d) => {
    const interfaceData: { [key: string]: any } = {};
    const rxData: { [key: string]: any } = {};
    const txData: { [key: string]: any } = {};
    Object.entries(d).forEach(([key, value]) => {
      if (interfaceSummaryColumns.includes(key)) {
        interfaceData[key] = value;
      }
      if (rxUtilColumns.includes(key)) {
        rxData[key] = value;
      }
      if (txUtilColumns.includes(key)) {
        txData[key] = value;
      }
    });
    interfaceSummaryData.data.push(interfaceData);
    rxUtilData.data.push(rxData);
    txUtilData.data.push(txData);
  });
  return { interfaceSummaryData, rxUtilData, txUtilData };
}

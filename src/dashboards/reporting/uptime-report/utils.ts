import { API_URL, FetchData, headers } from '../../../global';

export function getReportKeys(report: FetchData | undefined) {
  if (!report) return;
  const siteReportKeyURL = `${API_URL}/vars?name=uptime-report-site-key&filter-name=uptime-report-display-name&filter-value=${report.Value}`;
  const linkReportKeyURL = `${API_URL}/vars?name=uptime-report-link-key&filter-name=uptime-report-display-name&filter-value=${report.Value}`;

  return Promise.allSettled([
    fetch(siteReportKeyURL, { headers })
      .then((res) => res.json())
      .then((data) => data),
    fetch(linkReportKeyURL, { headers })
      .then((res) => res.json())
      .then((data) => data),
  ]).then((results) => {
    const allValues = (
      results.filter((c) => c.status === 'fulfilled') as PromiseFulfilledResult<FetchData[]>[]
    ).map((data) => data.value[0].Value);
    return allValues;
  });
}

export async function getLinkAvailability(
  selectedSite: string,
  selectedDevices: string,
  selectedColors: string,
  selectedProviders: string,
  reportSiteKey: string,
  reportLinkKey: string,
) {
  const linkAvailabilityURL = `${API_URL}/panel/report/uptime/link/summary?site=${selectedSite}&device=${selectedDevices}&colors=${selectedColors}&service-providers=${selectedProviders}&site-report-key=${reportSiteKey}&link-report-key=${reportLinkKey}&ver=v2`;

  const res = await fetch(linkAvailabilityURL, { headers });
  const data = res.json();
  return data;
}

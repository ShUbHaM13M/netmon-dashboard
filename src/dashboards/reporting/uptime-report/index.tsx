import { createContext, useCallback, useEffect, useState } from 'react';
import { MultiSelectDropdown, SingleSelectDropdown } from '../../../components';
import { API_URL, FetchData, headers } from '../../../global';
import useFetch from '../../../hooks/useFetch';
import { getReportKeys } from './utils';
import LinkAvailability from './LinkAvailability';
import LinkDowntime from './LinkDowntime';
import SiteDowntime from './SiteDowntime';
import SiteAvailability from './SiteAvailability';
import ReportSummary from './ReportSummary';

type ReportKey = {
  reportSiteKey: string;
  reportLinkKey: string;
};

interface DefaultProps {
  selectedSite?: FetchData | undefined;
  selectedDevices?: FetchData[] | undefined;
  selectedColors?: FetchData[] | undefined;
  selectedProviders?: FetchData[] | undefined;
  reportKeys?: ReportKey | null;
}

export const UptimeReportContext = createContext<DefaultProps>({});

const UptimeReport = () => {
  const [reportKeys, setReportKeys] = useState<ReportKey>({
    reportSiteKey: '',
    reportLinkKey: '',
  });

  const [selectedSite, setSelectedSite] = useState<FetchData>();
  const [selectedDevices, setSelectedDevices] = useState<FetchData[]>();
  const [selectedColors, setSelectedColors] = useState<FetchData[]>();
  const [selectedProviders, setSelectedProviders] = useState<FetchData[]>();

  const reportOptionsURL = `${API_URL}/vars?name=uptime-report-display-name`;
  const { data: reportOptions } = useFetch<FetchData[]>(reportOptionsURL, { headers });

  const handleReportChange = useCallback(async (selectedReport: FetchData) => {
    if (!selectedReport) return;
    const [reportSiteKey, reportLinkKey] = await getReportKeys(selectedReport)!;
    setReportKeys({ reportLinkKey, reportSiteKey });
  }, []);

  const siteOptionsURL = `${API_URL}/vars?name=site&filter-name=site-name&filter-value=All`;
  const { data: siteOptions, loading } = useFetch<FetchData[]>(siteOptionsURL, { headers });

  const deviceOptionsURL = `${API_URL}/vars?name=device&filter-name=site-name&filter-value=${
    selectedSite ? selectedSite.Text : 'All'
  }`;
  const { data: deviceOptions } = useFetch<FetchData[]>(deviceOptionsURL, { headers });

  const colorOptionURL = `${API_URL}/vars?name=color&filter-name=hostname&filter-value=`;
  const { data: colorOptions } = useFetch<FetchData[]>(colorOptionURL, { headers });

  const serviceProviderOptionsURL = `${API_URL}/vars?name=service-provider`;
  const { data: serviceProviderOptions } = useFetch<FetchData[]>(serviceProviderOptionsURL, {
    headers,
  });

  useEffect(() => {
    reportOptions && handleReportChange(reportOptions[0]);
  }, [reportOptions, handleReportChange]);

  useEffect(() => {
    siteOptions && setSelectedSite(siteOptions[0]);
  }, [siteOptions]);

  if (loading && !siteOptions) return <div>Loading...</div>;

  return (
    <UptimeReportContext.Provider
      value={{
        selectedColors,
        selectedProviders,
        selectedDevices,
        selectedSite,
        reportKeys,
      }}
    >
      <div className='flex flex-col pb-6 gap-6'>
        <div className='flex flex-col gap-4 sm:gap-6 z-10 text-icon-white'>
          <div className='w-full md:w-fit'>
            <SingleSelectDropdown
              label='Report'
              options={reportOptions || []}
              onValueChange={(data) => {
                handleReportChange(data);
              }}
              showSearchbar
            />
            <input type='hidden' name='report-site-key' defaultValue={reportKeys.reportSiteKey} />
            <input type='hidden' name='report-link-key' defaultValue={reportKeys.reportLinkKey} />
          </div>
          <div className='flex flex-col xl:flex-row gap-4 sm:gap-6'>
            <div className='flex flex-col md:flex-row gap-4 sm:gap-6'>
              <div className='w-full md:w-[240px]'>
                <SingleSelectDropdown
                  label='Site'
                  options={siteOptions || []}
                  onValueChange={(value) => setSelectedSite(value)}
                  showSearchbar
                />
              </div>
              <div className='w-full md:w-[240px]'>
                <MultiSelectDropdown
                  label='Device'
                  options={deviceOptions || []}
                  defaultValue={deviceOptions && deviceOptions[0]}
                  onValueChange={(value) => setSelectedDevices(value)}
                />
              </div>
            </div>
            <div className='flex flex-col md:flex-row gap-4 sm:gap-6'>
              <div className='w-full md:w-[240px]'>
                <MultiSelectDropdown
                  label='Color'
                  options={colorOptions || []}
                  onValueChange={(value) => setSelectedColors(value)}
                />
              </div>
              <div className='w-full md:w-[240px]'>
                <MultiSelectDropdown
                  label='Service Provider'
                  options={serviceProviderOptions || []}
                  onValueChange={(value) => setSelectedProviders(value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='h-[210px]'>
          <ReportSummary />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6'>
          <div className='h-[210px]'>
            <SiteAvailability />
          </div>
          <div className='h-[210px]'>
            <SiteDowntime />
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6'>
          <div className='h-[210px]'>
            <LinkAvailability />
          </div>
          <div className='h-[210px]'>
            <LinkDowntime />
          </div>
        </div>
      </div>
    </UptimeReportContext.Provider>
  );
};

export default UptimeReport;

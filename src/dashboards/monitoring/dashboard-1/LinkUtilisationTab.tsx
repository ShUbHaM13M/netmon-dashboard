import { useState } from 'react';
import {
  DownloadLinkUtilizationPanel,
  MultiSelectDropdown,
  SingleSelectDropdown,
  UploadLinkUtilizationPanel,
} from '../../../components';

import { API_URL, headers, FetchData } from '../../../global';
import useFetch from '../../../hooks/useFetch';

const percentileURL = `${API_URL}/vars?name=config&filter-value=percentile`;
const siteURL = `${API_URL}/vars?name=site&filter-name=site-name&filter-value=All`;

const LinkUtilisationTab = () => {
  const { data: percentileOptions } = useFetch<FetchData[]>(percentileURL, { headers });
  const { data: siteOptions } = useFetch<FetchData[]>(siteURL, { headers });

  const [selectedPercentile, setSelectedPercentile] = useState(95);

  if (!percentileOptions && !siteOptions) return null;

  return (
    <>
      <div className='flex gap-6 mb-6'>
        <div className='w-2/4 sm:w-[140px] z-[20]'>
          <SingleSelectDropdown
            options={percentileOptions ?? []}
            label='Percentile'
            onValueChange={(data) => setSelectedPercentile(data.Value)}
          />
        </div>
        <div className='w-2/4 sm:w-[240px] z-[20]'>
          <MultiSelectDropdown
            options={siteOptions ?? []}
            label='SITE'
            onValueChange={(_) => ({})}
          />
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pb-6'>
        <div className='h-[490px] sm:max-h-[590px]'>
          <DownloadLinkUtilizationPanel percentile={selectedPercentile} />
        </div>
        <div className='h-[490px] sm:max-h-[590px]'>
          <UploadLinkUtilizationPanel percentile={selectedPercentile} />
        </div>
      </div>
    </>
  );
};

export default LinkUtilisationTab;

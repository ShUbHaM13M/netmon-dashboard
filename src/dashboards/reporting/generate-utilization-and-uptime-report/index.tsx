import { useCallback, useEffect, useState } from 'react';
import { MultiSelectDropdown, SingleSelectDropdown, StatPanelContainer } from '../../../components';
import { useUserContext } from '../../../context/UserContext';
import {
  API_BASE,
  API_URL,
  FetchData,
  dateFormatter,
  downloadDataAsCSV,
  getTimeInSeconds,
  headers,
} from '../../../global';
import useFetch from '../../../hooks/useFetch';
import useDebouce from '../../../hooks/useDebounce';
import { IDropdownOption } from '../../../components/dropdown/SingleSelectDropdown';

const bussStartHrsURL = `${API_URL}/vars?name=config&filter-value=buss_start_hrs`;
const bussEndHrsURL = `${API_URL}/vars?name=config&filter-value=buss_end_hrs`;
const weeklyHolidayURL = `${API_URL}/vars?name=config&filter-value=weekly_holiday`;
const percentileURL = `${API_URL}/vars?name=config&filter-value=percentile`;

const GenerateUtilizationAndUptimeReport = () => {
  const { timestamp } = useUserContext();

  const { data: bussStartHrs } = useFetch<FetchData[]>(bussStartHrsURL, { headers });
  const { data: bussEndHrs } = useFetch<FetchData[]>(bussEndHrsURL, { headers });
  const { data: weeklyHolidayOptions } = useFetch<FetchData[]>(weeklyHolidayURL, { headers });
  const { data: percentileOptions } = useFetch<FetchData[]>(percentileURL, { headers });

  const [selectedBussHrs, setSelectedBussHrs] = useState({
    start: '09:00:00',
    end: '21:00:00',
  });
  const [selectedHolidays, setSelectedHolidays] = useState<IDropdownOption[]>([]);
  const [selectedPercentile, setSelectedPercentile] = useState<IDropdownOption>();

  const debouncedSelectedBussHrs = useDebouce(selectedBussHrs, 1500);

  useEffect(() => {
    if (!bussEndHrs || !bussStartHrs) return;
    setSelectedBussHrs({
      start: bussStartHrs[0].Value,
      end: bussEndHrs[0].Value,
    });
  }, [bussEndHrs, bussStartHrs]);

  const onInputValueChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'startHrs')
      setSelectedBussHrs((prev) => ({ ...prev, start: e.target.value }));
    else setSelectedBussHrs((prev) => ({ ...prev, end: e.target.value }));
  }, []);

  const generateReportURL = `${API_BASE}/ldap/report/availability-reports?start=${getTimeInSeconds(
    timestamp.from.getTime(),
  )}&end=${getTimeInSeconds(timestamp.to.getTime())}&start_hrs=${
    debouncedSelectedBussHrs.start
  }&end_hrs=${debouncedSelectedBussHrs.end}&holidays=${selectedHolidays
    .map((holiday) => holiday.Value)
    .join(',')}&percentile=${selectedPercentile?.Value}`;

  useEffect(() => {
    if (percentileOptions) setSelectedPercentile(percentileOptions[0]);
  }, [percentileOptions]);

  useEffect(() => {
    if (weeklyHolidayOptions) setSelectedHolidays([]);
  }, [weeklyHolidayOptions]);

  const onGenerateReportClick = useCallback(async () => {
    const res = await fetch(generateReportURL, {
      headers,
    });
    const data = await res.text();
    downloadDataAsCSV(`utlilization-uptime-report.csv`, data);
  }, [generateReportURL]);

  return (
    <div className='flex flex-col pb-6 gap-6'>
      <div className='flex flex-col lg:flex-row gap-4 sm:gap-6 flex-wrap'>
        <div className='flex flex-col sm:flex-row gap-4 sm:gap-6'>
          <div className='w-full sm:w-[240px]'>
            <label htmlFor='startHrs' className='caps-1 text-icon-dark-grey whitespace-nowrap'>
              Start Service Hours
            </label>
            <input
              className='mt-1.5 w-full bg-card-light rounded-sm py-1.5 pl-2 hover:bg-[#3E404D] text-sm text-icon-grey outline-none placeholder:text-icon-dark-grey'
              id='startHrs'
              value={selectedBussHrs.start}
              placeholder='Enter Start Service Hours'
              name='startHrs'
              onChange={onInputValueChanged}
            />
          </div>
          <div className='w-full sm:w-[240px]'>
            <label htmlFor='endHrs' className='caps-1 text-icon-dark-grey whitespace-nowrap'>
              End Service Hours
            </label>
            <input
              className='mt-1.5 w-full bg-card-light rounded-sm py-1.5 pl-2 hover:bg-[#3E404D] text-sm text-icon-grey outline-none placeholder:text-icon-dark-grey'
              id='endHrs'
              value={selectedBussHrs.end}
              placeholder='Enter End Service Hours'
              name='endHrs'
              onChange={onInputValueChanged}
            />
          </div>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 sm:gap-6'>
          <div className='w-full sm:w-[240px]'>
            <MultiSelectDropdown
              label='Weekly Holiday'
              options={weeklyHolidayOptions || []}
              onValueChange={(value) => setSelectedHolidays(value)}
            />
          </div>
          <div className='w-full sm:w-[240px]'>
            <SingleSelectDropdown
              label='Percentile'
              options={percentileOptions || []}
              onValueChange={(value) => setSelectedPercentile(value)}
            />
          </div>
        </div>
      </div>

      <div className='h-[210px] text-lg text-icon-white'>
        <StatPanelContainer
          label='Generate Report'
          description='Click on the link to generate a report'
        >
          <div className='p-4'>
            <button
              onClick={onGenerateReportClick}
              className='underline font-semibold text-brand-orange'
            >
              Click Here
            </button>
            &nbsp; to generate utilization and uptime report for &nbsp;
            {dateFormatter.format(timestamp.from)} to &nbsp;
            {dateFormatter.format(timestamp.to)}
            <br />
            Service Hours: {debouncedSelectedBussHrs.start} to {debouncedSelectedBussHrs.end}
          </div>
        </StatPanelContainer>
      </div>
    </div>
  );
};

export default GenerateUtilizationAndUptimeReport;

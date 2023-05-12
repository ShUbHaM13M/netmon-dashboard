import { API_URL, FetchPanelData, dateFormatter, headers } from '../../../global';
import useFetch from '../../../hooks/useFetch';
import { createContext, useEffect, useState } from 'react';
import TeamDeviceDetail from './TeamDeviceDetail';
import TeamDashboardDetail from './TeamDashboardDetail';
import { createPortal } from 'react-dom';
import TeamUserDetail from './TeamUserDetail';
import { Toast, Modal } from '../../../components';
import { ToastType } from '../../../components/toast';
import { ModalState } from '../../../components/modal/modal';

interface ParamType {
  name: string;
}

export const TeamDetailContext = createContext<{
  teamData: FetchPanelData | null;
  setSelectedEntity: React.Dispatch<React.SetStateAction<ModalState | null>>;
  setMessages: React.Dispatch<React.SetStateAction<ToastType[]>>;
}>({
  teamData: null,
  setSelectedEntity: () => ({}),
  setMessages: () => ({}),
});

const TeamDetail = ({ params }: { params: ParamType }) => {
  const [messages, setMessages] = useState<ToastType[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<ModalState | null>(null);

  const teamDataURL = `${API_URL}/admin/team?team-name=${params.name}&ver=v2`;
  const { data: teamData, loading, error } = useFetch<FetchPanelData>(teamDataURL, { headers });

  useEffect(() => {
    document.body.style.overflow = selectedEntity ? 'hidden' : 'auto';
  }, [selectedEntity]);

  if (loading) return <div className='text-icon-white text-center mt-4'>Loading...</div>;

  if (error || !teamData)
    return (
      <div className='text-icon-white text-center mt-4'>
        No Team with team name: {params.name} was found
      </div>
    );

  return (
    <TeamDetailContext.Provider value={{ teamData, setSelectedEntity, setMessages }}>
      <div className='text-icon-white flex flex-col mt-2 gap-4 pb-6'>
        <div>
          <h3>{params.name}</h3>
          <p className='text-sm text-icon-grey mt-2'>{teamData.data[0].desc}</p>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='flex gap-1 text-sm'>
            <span className='text-icon-grey'>Last updated by</span>
            <span className='text-icon-grey'> : </span>
            <span>{teamData.data[0].last_updated_user}</span>
          </p>
          <p className='flex gap-1 text-sm'>
            <span className='text-icon-grey'>Last Updated</span>
            <span className='text-icon-grey'> : </span>
            <span>{dateFormatter.format(teamData.data[0].last_activity)}</span>
          </p>
        </div>
        <hr className='border-icon-dark-grey bg-icon-dark-grey bg-opacity-20 border-opacity-20' />
        <div className='flex flex-col lg:flex-row gap-4'>
          <TeamUserDetail />
          <TeamDashboardDetail />
        </div>
        <TeamDeviceDetail />
      </div>

      {/* Showing modal for confirming the removal of entity from team */}
      {selectedEntity &&
        createPortal(
          <Modal onCancelCallback={() => setSelectedEntity(null)} {...selectedEntity} />,
          document.body,
        )}
      <Toast toastList={messages} autoDeleteTime={2000} />
    </TeamDetailContext.Provider>
  );
};

export default TeamDetail;

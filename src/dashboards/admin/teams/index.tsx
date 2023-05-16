import { Button, StatPanelContainer, Table } from '../../../components';
import { API_URL, FetchPanelData, headers } from '../../../global';
import useFetch from '../../../hooks/useFetch';
import Like from '../../../assets/images/like.svg';
import { useState } from 'react';
import CreateTeamForm from './CreateTeamForm';
import { useLocation } from 'wouter';
import IconEdit from '../../../assets/icons/edit';

export type TeamData = {
  id: number;
  name: string;
  desc: string;
  active: boolean;
  last_updated: Date;
  last_updated_user: string;
  action?: any;
};

const teamsDataURL = `${API_URL}/admin/teams?ver=v2`;

const TeamActionFormatter = (value: any) => {
  return (
    <a
      className='stroke-icon-white hover:stroke-brand-orange w-10 h-8 flex items-center justify-center'
      onClick={(e) => e.stopPropagation()}
      href={`/admin/teams/edit/${value}`}
    >
      <IconEdit />
    </a>
  );
};

const TeamsTab = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [refetchTeamData, setRefetchTeamData] = useState(false);
  const [_, setLocation] = useLocation();

  const { data: teamsData, loading } = useFetch<FetchPanelData>(
    teamsDataURL,
    {
      headers,
    },
    refetchTeamData,
  );

  if (loading) return <div>Loading...</div>;
  if (!teamsData) return null;

  teamsData.data.forEach((data, index) => {
    teamsData.data[index]['action'] = data.name;
  });

  return (
    <div className='flex flex-col gap-4 sm:gap-6 relative'>
      <div className='self-end'>
        <Button primary onClick={() => setShowCreateModal(true)}>
          Create New Team
        </Button>
      </div>
      <div className='h-[410px]'>
        <StatPanelContainer label='Teams' description='List of all the teams'>
          <Table
            headers={[
              ...teamsData.columns,
              { title: 'actions', sortable: false, data_type: 'string', property: 'action' },
            ]}
            data={teamsData.data}
            emptyStateData={{
              icon: Like,
              title: 'No Teams Found',
              subtitle: 'No teams found',
            }}
            columnFormatters={{
              action: TeamActionFormatter,
            }}
            onRowClick={(row) => {
              setLocation(`/admin/teams/${(row as TeamData).name}`);
            }}
          />
        </StatPanelContainer>
      </div>
      <CreateTeamForm
        showForm={showCreateModal}
        setShowForm={setShowCreateModal}
        onFormSubmit={() => setRefetchTeamData((prev) => !prev)}
      />
    </div>
  );
};

export default TeamsTab;

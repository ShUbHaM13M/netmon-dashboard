import { Button, StatPanelContainer, Table } from '../../../components';
import { API_URL, headers } from '../../../global';
import useFetch from '../../../hooks/useFetch';
import Like from '../../../assets/images/like.svg';
import { useState } from 'react';
import CreateTeamForm from './CreateTeamForm';
import { Link, useLocation } from 'wouter';

export type TeamData = {
  id: number;
  name: string;
  desc: string;
  active: boolean;
  last_updated: Date;
  last_updated_user: string;
  action?: any;
};

const teamsDataURL = `${API_URL}/admin/teams`;
const teamsTabHeaders = [
  { title: 'ID', data_type: 'int', property: 'id' },
  { title: 'Name', data_type: 'string', property: 'name' },
  { title: 'Description', data_type: 'string', property: 'desc' },
  { title: 'last updated', data_type: 'epoch_ms', property: 'last_updated' },
  { title: 'last updated user', data_type: 'string', property: 'last_updated_user' },
  { title: 'actions', sortable: false, data_type: 'string', property: 'action' },
];

const TeamActionFormatter = (value: any) => {
  return (
    <Link
      onClick={(e) => e.stopPropagation()}
      className='underline'
      href={`/admin/teams/edit/${value}`}
    >
      Edit
    </Link>
  );
};

const TeamsTab = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [refetchTeamData, setRefetchTeamData] = useState(false);
  const [_, setLocation] = useLocation();

  const { data: teamsData } = useFetch<TeamData[]>(
    teamsDataURL,
    {
      headers,
    },
    refetchTeamData,
  );

  teamsData?.forEach((data, index) => {
    teamsData[index]['action'] = data.name;
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
            headers={teamsTabHeaders}
            data={teamsData || []}
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

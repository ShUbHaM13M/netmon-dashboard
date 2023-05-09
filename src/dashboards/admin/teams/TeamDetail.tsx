import { TeamData } from '.';
import { API_URL, headers } from '../../../global';
import useFetch from '../../../hooks/useFetch';

interface ParamType {
  name: string;
}

const TeamDetail = ({ params }: { params: ParamType }) => {
  const teamDataURL = `${API_URL}/admin/team?team-name=${params.name}`;
  const { data: teamData, loading, error } = useFetch<TeamData[]>(teamDataURL, { headers });

  if (loading) return <div className='text-icon-white text-center mt-4'>Loading...</div>;
  if (error || !teamData)
    return (
      <div className='text-icon-white text-center mt-4'>
        No User with username {params.name} was found
      </div>
    );

  return (
    <div className='text-icon-white flex flex-col mt-6'>
      Showing Team Data for {teamData[0].name}
      <pre className='w-96'>{JSON.stringify(teamData, null, ' ')}</pre>
    </div>
  );
};

export default TeamDetail;

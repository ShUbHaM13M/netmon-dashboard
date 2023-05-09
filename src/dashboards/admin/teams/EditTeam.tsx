import { API_URL, headers } from '../../../global';
import useFetch from '../../../hooks/useFetch';
import { TeamData } from '.';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Button, SingleSelectDropdown } from '../../../components';
import { useUserContext } from '../../../context/UserContext';
import { useLocation } from 'wouter';

interface ParamType {
  name: string;
}

const teamStatusOptions = [
  { Text: 'Active', Value: true },
  { Text: 'Inactive', Value: false },
];

const editTeamURL = `${API_URL}/admin/team`;

const EditTeam = ({ params }: { params: ParamType }) => {
  const { currentUser } = useUserContext();
  const [_, setLocation] = useLocation();

  const teamDataURL = `${API_URL}/admin/team?team-name=${params.name}`;
  const { data: teamData, loading, error } = useFetch<TeamData[]>(teamDataURL, { headers });

  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [teamActive, setTeamActive] = useState(true);

  useEffect(() => {
    if (!teamData?.length) return;
    setTeamActive(teamData[0].active);
  }, [teamData]);

  const handleEditTeamSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!nameInputRef.current || !descriptionRef.current || !currentUser || !teamData?.length)
        return;

      const res = await fetch(editTeamURL, {
        method: 'PUT',
        body: JSON.stringify({
          id: teamData![0].id,
          name: nameInputRef.current.value,
          desc: descriptionRef.current.value,
          active: teamActive,
          last_updated_user: currentUser.username,
          last_updated: new Date().getTime(),
        }),
        headers,
      });
      if (res.ok) {
        setLocation('/admin');
      }
    },
    [currentUser, setLocation, teamActive, teamData],
  );

  if (loading) return <div className='text-icon-white text-center mt-4'>Loading...</div>;
  if (error || !teamData)
    return (
      <div className='text-icon-white text-center mt-4'>
        No User with username {params.name} was found
      </div>
    );

  return (
    <div className='text-icon-white flex flex-col mt-6'>
      <form
        onSubmit={handleEditTeamSubmit}
        className='bg-card-grey p-6 mx-auto rounded-md w-full sm:w-fit shadow-medium flex flex-col gap-6'
      >
        <h3 className='text-center'>Edit Team</h3>
        <hr className='border-icon-dark-grey bg-icon-dark-grey' />
        <div className='w-full sm:w-[340px]'>
          <label htmlFor='name' className='caps-1 text-icon-dark-grey whitespace-nowrap'>
            Name
          </label>
          <input
            // onChange={onInputChange}
            ref={nameInputRef}
            className='mt-1.5 w-full bg-card-light rounded-sm py-1.5 pl-2 hover:bg-[#3E404D] text-sm text-icon-grey outline-none placeholder:text-icon-dark-grey'
            id='name'
            placeholder='Enter name'
            name='name'
            defaultValue={teamData[0].name}
          />
        </div>

        <div className='w-full sm:w-[340px]'>
          <label htmlFor='description' className='caps-1 text-icon-dark-grey whitespace-nowrap'>
            Description
          </label>
          <textarea
            // onChange={onInputChange}
            ref={descriptionRef}
            style={{
              height: '100px',
            }}
            className='mt-1.5 w-full bg-card-light rounded-sm py-1.5 pl-2 hover:bg-[#3E404D] text-sm text-icon-grey outline-none placeholder:text-icon-dark-grey resize-none'
            id='description'
            placeholder='Enter description'
            name='description'
            defaultValue={teamData[0].desc}
          ></textarea>
        </div>

        <div className='w-full sm:w-[340px]'>
          <SingleSelectDropdown
            label='Active'
            options={teamStatusOptions}
            onValueChange={(data) => setTeamActive(data.Value)}
            showSearchbar={false}
          />
        </div>

        <Button primary>Edit Team</Button>
      </form>
    </div>
  );
};

export default EditTeam;

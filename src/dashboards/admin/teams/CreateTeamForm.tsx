import { FormEvent, useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../../../components';
import { API_URL, headers } from '../../../global';
import { useUserContext } from '../../../context/UserContext';

const createTeamURL = `${API_URL}/admin/team?ver=v2`;

interface CreateTeamFormProps {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  onFormSubmit: () => void;
}

const CreateTeamForm = ({ setShowForm, showForm, onFormSubmit }: CreateTeamFormProps) => {
  const { currentUser } = useUserContext();

  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleModalClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    if (formRef.current && formRef.current.contains(event.target as Node)) {
      event.stopPropagation();
      return;
    }
    setShowForm(false);
  };

  const onInputChange = useCallback(() => {
    if (!nameInputRef.current || !descriptionRef.current) return;
    if (nameInputRef.current.value.length && descriptionRef.current.value.length)
      setSubmitDisabled(false);
    else setSubmitDisabled(true);
  }, []);

  const onCreateFormSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!nameInputRef.current || !descriptionRef.current || !currentUser) return;

      // TODO: Need to add error handling
      await fetch(createTeamURL, {
        method: 'POST',
        body: JSON.stringify({
          name: nameInputRef.current.value,
          desc: descriptionRef.current.value,
          last_updated_user: currentUser.username,
        }),
        headers,
      });

      onFormSubmit();
      setShowForm(false);
    },
    [currentUser, onFormSubmit, setShowForm],
  );

  return createPortal(
    <div
      role='presentation'
      onClick={handleModalClick}
      className={`absolute z-50 inset-0 h-screen w-screen bg-[#2E2F33EE] p-6 rounded-md grid place-items-center gap-6 transition-opacity duration-300 ease-out
        ${showForm ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}
    >
      <form
        ref={formRef}
        className='bg-card-grey p-6 rounded-md flex flex-col gap-6 w-full sm:w-fit shadow-medium'
        onSubmit={onCreateFormSubmit}
      >
        <h3 className='text-icon-white text-center'>Create New Team</h3>
        <hr className='border-icon-dark-grey bg-icon-dark-grey' />
        <div className='w-full sm:w-[340px]'>
          <label htmlFor='name' className='caps-1 text-icon-dark-grey whitespace-nowrap'>
            Name
          </label>
          <input
            onChange={onInputChange}
            ref={nameInputRef}
            className='mt-1.5 w-full bg-card-light rounded-sm py-1.5 pl-2 hover:bg-[#3E404D] text-sm text-icon-grey outline-none placeholder:text-icon-dark-grey'
            id='name'
            placeholder='Enter name'
            name='name'
          />
        </div>
        <div className='w-full sm:w-[340px]'>
          <label htmlFor='description' className='caps-1 text-icon-dark-grey whitespace-nowrap'>
            Description
          </label>
          <textarea
            onChange={onInputChange}
            ref={descriptionRef}
            style={{
              height: '100px',
            }}
            className='mt-1.5 w-full bg-card-light rounded-sm py-1.5 pl-2 hover:bg-[#3E404D] text-sm text-icon-grey outline-none placeholder:text-icon-dark-grey resize-none'
            id='description'
            placeholder='Enter description'
            name='description'
          ></textarea>
        </div>

        <Button primary type='submit' title='Create new team' disabled={submitDisabled}>
          Create
        </Button>
      </form>
    </div>,
    document.body,
  );
};

export default CreateTeamForm;

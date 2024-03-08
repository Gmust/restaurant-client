import { IUser } from '@/@types/user';

type UserInfoProps = Pick<IUser, 'email' | 'firstName' | 'secondName' | 'receiveNews'>

export const UserInfo = ({ email, receiveNews, secondName, firstName }: UserInfoProps) => {
  return (
    <div className='flex flex-col'>
      <h2>Email: {email}</h2>
      <p>Name: {firstName}</p>
      <p>Surname: {secondName}</p>
    </div>
  );
};


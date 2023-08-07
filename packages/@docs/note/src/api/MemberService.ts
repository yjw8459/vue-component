import { Member, StandardMember } from '@/types/service/exercise';

export const getMember: () => Member = () => {
  const member: Member = {
    id: 1,
    name: '멤버이름1',
    age: 27,
    email: 'jwyoo@osstem.com'
  };
  return member;
};

export const getStandarMember: () => StandardMember = () => {
  const standardMember: StandardMember = {
    id: 1,
    name: '멤버이름1',
    age: 27,
    email: 'jwyoo@osstem.com'
  };
  return standardMember;
};

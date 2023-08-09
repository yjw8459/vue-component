import { WritableComputedRef, computed, ref } from 'vue';
import { Member } from '@/types/service/exercise';

type MemberService = {
  member?: WritableComputedRef<Member>;
  memberName: WritableComputedRef<Member['name']>;
  memberEmail?: WritableComputedRef<Member['email']>;
  memberInitialize: (initialize?: Member) => Member;
};

export const memberService: () => MemberService = () => {
  const data = ref<Member>({});
  const member: MemberService['member'] = computed({
    get: () => data.value as Member,
    set: newValue => {
      data.value = newValue;
    }
  });
  const memberName: MemberService['memberName'] = computed({
    get: () => data.value.name,
    set: newValue => {
      data.value.name = newValue;
    }
  });
  const memberEmail = computed({
    get: () => data.value.email,
    set: newValue => {
      data.value.email = newValue;
    }
  });

  // default Settings
  const memberInitialize: MemberService['memberInitialize'] = initialize => {
    const state: Member = {
      name: '',
      email: '',
      ...initialize
    };
    return state;
  };

  return {
    member,
    memberInitialize,
    memberName,
    memberEmail
  };
};

import { WritableComputedRef, computed, ref } from 'vue';
import { Member } from '@/types/service/exercise';

type MemberService = {
  member?: WritableComputedRef<Member>;
  memberName?: WritableComputedRef<Member['name']>;
  memberEmail?: WritableComputedRef<Member['email']>;
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
  return {
    member,
    memberName,
    memberEmail
  };
};

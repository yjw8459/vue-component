// Utilities
import { defineStore } from 'pinia';
import { Member } from '@/types/service/dto';

interface State {
  member: Member;
  name: string;
  age: number;
}

export const useAppStore = defineStore('store', {
  // actions: {
  //   initialState() {
  //     const memberDummy: { data: Member } = {
  //       data: {
  //         id: 'testId',
  //         pw: 'testPw',
  //         email: 'jwyoo@osstem.com'
  //       }
  //     };
  //     const { data: member } = memberDummy;
  //     this.member = member;
  //     const nameDummy: { data: string } = { data: '유종원' };
  //     const ageDummy: { data: number } = { data: 29 };
  //     const { data: name } = nameDummy;
  //     const { data: age } = ageDummy;
  //     this.name = name;
  //     this.age = age;
  //   }
  // },
  // getters: {
  //   getMember() {
  //     return (member: Member) => member;
  //   },
  //   getName() {
  //     return (name: string) => name;
  //   },
  //   getAge() {
  //     return (age: number) => age;
  //   }
  // },
  // // state
  // state: (): State => {
  //   return {
  //     member: {} as Member,
  //     name: '',
  //     age: 0
  //   };
  // }
});

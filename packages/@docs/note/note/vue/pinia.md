# Pinia

## Pinia의 구성요소

- State

  - store 하나에 하나만 보유 가능
  - 해당 store에서 관리 될 상태 값의 집합

- Actions

  - state를 변환할 때 사용하는 함수의 집합
  - 비동기 처리가 가능하며, vuex와는 다르게 직접 state의 값을 제어할 수 있음.

- Getter
  - state 값을 단순히 반환하기만 하는 함수의 집합
  - state 값의 수정이 불가능하며, 특정 규치에 따라 필터링 된 state를 얻을 때 요긴하게 사용

Vuex와 다르게 mutation이 제거되고 actions에서 상태를 모두 제어한다.

```typescript
export const useCart = defineStore("cart", () => {
  const items: ItemType[] = reactive([]);
  /**
   * items 배열에 item을 추가합니다.
   * @param item
   */
  const addItem = (item: ItemType) => {
    items.push(item);
  };
  /**
   * items 배열에 들어있는 item을 name을 기준으로 변경합니다.
   * count 프로퍼티는 예외적으로 기존 값에 추가됩니다.
   * @param name
   * @param item
   * @returns
   */
  const updateByName = (name: string, item: ItemType) => {
    const index = items.findIndex((i) => i.name === name);
    if (index <= -1) {
      return;
    }
    const original = items[index];
    items.splice(index, 1, {
      ...original,
      ...item,
      count: original.count + item.count,
    });
  };
  return {
    items,
    addItem,
    updateByName,
  };
});
```

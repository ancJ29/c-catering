import {
  getAllInventories,
  Inventory,
  Material,
  updateInventory,
} from "@/services/domain";
import useMaterialStore from "@/stores/material.store";
import {
  convertAmountBackward,
  convertAmountForward,
  createStore,
} from "@/utils";

type State = {
  currents: Record<string, Inventory>;
  amounts: Record<string, number>;
  updated: boolean;
  cateringId: string | null;
  key: number;
  isSelectAll: boolean;
  selectedItemsCount: number;
};

enum ActionType {
  RESET = "RESET",
  SET_INVENTORY = "SET_INVENTORY",
  SET_AMOUNT = "SET_AMOUNT",
  SET_IS_SELECTED = "SET_IS_SELECTED",
  SET_MEMO = "SET_MEMO",
  SET_IS_SELECT_ALL = "SET_IS_SELECT_ALL",
}

type Action = {
  type: ActionType;
  cateringId?: string | null;
  inventories?: Inventory[];
  amount?: number;
  materialId?: string;
  isSelect?: boolean;
  memo?: string;
};

const defaultState: State = {
  currents: {},
  amounts: {},
  updated: false,
  cateringId: null,
  key: new Date().getTime(),
  isSelectAll: false,
  selectedItemsCount: 0,
};

const { dispatch, ...store } = createStore<State, Action>(reducer, {
  ...defaultState,
});

export default {
  ...store,
  reset() {
    dispatch({ type: ActionType.RESET });
  },
  async setCateringId(cateringId: string) {
    const inventories = await getAllInventories(cateringId);
    dispatch({
      type: ActionType.SET_INVENTORY,
      cateringId,
      inventories,
    });
  },
  getIsSelect(materialId: string) {
    const state = store.getSnapshot();
    return state.currents[materialId]?.others.isAudited || false;
  },
  getAmountAfterAudit(materialId: string) {
    const state = store.getSnapshot();
    return state.currents[materialId]?.others.amountAfterAudit || 0;
  },
  getAmountShippedAfterAudit(materialId: string) {
    const state = store.getSnapshot();
    return (
      state.currents[materialId]?.others.amountShippedAfterAudit || 0
    );
  },
  getAmountReceivedAfterAudit(materialId: string) {
    const state = store.getSnapshot();
    return (
      state.currents[materialId]?.others.amountReceivedAfterAudit || 0
    );
  },
  getSystemAmount(materialId: string) {
    const state = store.getSnapshot();
    return state.currents[materialId]?.amount || 0;
  },
  getAmount(materialId: string) {
    const state = store.getSnapshot();
    return state.amounts[materialId] || 0;
  },
  getDifference(materialId: string) {
    const state = store.getSnapshot();
    return (
      state.amounts[materialId] -
        state.currents[materialId]?.amount || 0
    );
  },
  getMemo(materialId: string) {
    const state = store.getSnapshot();
    return state.currents[materialId]?.others.memo || "";
  },
  setAmount(materialId: string, amount: number) {
    dispatch({ type: ActionType.SET_AMOUNT, materialId, amount });
  },
  setMemo(materialId: string, memo: string) {
    dispatch({ type: ActionType.SET_MEMO, materialId, memo });
  },
  setIsSelect(materialId: string, isSelect: boolean) {
    dispatch({
      type: ActionType.SET_IS_SELECTED,
      materialId,
      isSelect,
    });
  },
  setIsSelectAll(isSelect: boolean) {
    dispatch({ type: ActionType.SET_IS_SELECT_ALL, isSelect });
  },
  async save() {
    const state = store.getSnapshot();
    const { materials } = useMaterialStore.getState();
    await updateInventory(
      Object.values(state.currents).map((e) => {
        const material = materials.get(e.materialId);
        const isAudited = e.others.isAudited || false;
        const amount = state.amounts[e.materialId] || 0;
        return {
          ...e,
          amount: convertAmountForward({
            material,
            amount,
          }),
          others: {
            ...e.others,
            amountAfterAudit: convertAmountForward({
              material,
              amount: isAudited ? 0 : e.others.amountAfterAudit,
            }),
            amountShippedAfterAudit: convertAmountForward({
              material,
              amount: isAudited
                ? 0
                : e.others.amountShippedAfterAudit,
            }),
            amountReceivedAfterAudit: convertAmountForward({
              material,
              amount: isAudited
                ? 0
                : e.others.amountReceivedAfterAudit,
            }),
          },
        };
      }),
    );
  },
};

function reducer(action: Action, state: State): State {
  const { materials } = useMaterialStore.getState();
  switch (action.type) {
    case ActionType.RESET:
      return { ...defaultState };
    case ActionType.SET_INVENTORY:
      if (action.cateringId && action.inventories) {
        const currents = initInventories(
          action.inventories,
          materials,
        );
        const amounts = Object.fromEntries(
          Object.keys(currents).map((materialId) => {
            const inventory = currents[materialId];
            return [materialId, inventory.amount];
          }),
        );
        return {
          ...state,
          cateringId: action.cateringId,
          currents,
          amounts,
          key: Date.now(),
        };
      }
      break;
    case ActionType.SET_AMOUNT:
      if (action.materialId && action.amount) {
        state.amounts[action.materialId] = action.amount;
        return {
          ...state,
          updated: true,
          key: Date.now(),
        };
      }
      break;
    case ActionType.SET_MEMO:
      if (action.materialId && action.memo) {
        state.currents[action.materialId].others.memo = action.memo;
        return {
          ...state,
          updated: true,
        };
      }
      break;
    case ActionType.SET_IS_SELECTED:
      if (action.materialId && action.isSelect !== undefined) {
        state.currents[action.materialId].others.isAudited =
          action.isSelect;
        const selectedItemsCount = action.isSelect
          ? state.selectedItemsCount + 1
          : state.selectedItemsCount - 1;
        return {
          ...state,
          selectedItemsCount,
          updated: true,
        };
      }
      break;
    case ActionType.SET_IS_SELECT_ALL:
      if (action.isSelect !== undefined) {
        Object.keys(state.currents).forEach((materialId) => {
          state.currents[materialId].others.isAudited =
            action.isSelect || false;
        });
        return {
          ...state,
          isSelectAll: action.isSelect,
          selectedItemsCount: action.isSelect
            ? Object.keys(state.currents).length
            : 0,
          updated: true,
          key: Date.now(),
        };
      }
      break;
  }
  return state;
}

function initInventories(
  inventories: Inventory[],
  materials: Map<string, Material>,
) {
  const currents: Record<string, Inventory> = {};
  inventories.forEach((inventory) => {
    const material = materials.get(inventory.materialId);
    currents[inventory.materialId] = {
      ...inventory,
      amount: convertAmountBackward({
        material,
        amount: inventory.amount,
      }),
      others: {
        ...inventory.others,
        amountAfterAudit: convertAmountBackward({
          material,
          amount: inventory.others.amountAfterAudit,
        }),
        amountShippedAfterAudit: convertAmountBackward({
          material,
          amount: inventory.others.amountShippedAfterAudit,
        }),
        amountReceivedAfterAudit: convertAmountBackward({
          material,
          amount: inventory.others.amountReceivedAfterAudit,
        }),
      },
    };
  });
  return currents;
}

import { Material } from "@/services/domain";
import { DataGridColumnProps } from "@/types";
import { numberWithDelimiter } from "@/utils";
import {
  Center,
  Checkbox,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import store from "./_inventory.store";
import NumberInput from "./components/NumberInput";

export const configs = (
  t: (key: string) => string,
  isSelectAll: boolean,
): DataGridColumnProps[] => {
  return [
    {
      key: "name",
      sortable: true,
      header: t("Material name"),
      width: "15%",
      defaultVisible: true,
    },
    {
      key: "unit",
      width: "5%",
      textAlign: "center",
      header: t("Unit"),
      defaultVisible: true,
      renderCell: (_, row: Material) => {
        return row.others?.unit?.name || "N/A";
      },
    },
    {
      key: "amountAfterAudit",
      header: t("Amount after audit"),
      textAlign: "right",
      width: "8%",
      renderCell: (_, row: Material) => {
        return numberWithDelimiter(store.getAmountAfterAudit(row.id));
      },
    },
    {
      key: "amountShippedAfterAudit",
      header: t("Amount shipped after audit"),
      textAlign: "right",
      width: "8%",
      renderCell: (_, row: Material) => {
        return numberWithDelimiter(
          store.getAmountShippedAfterAudit(row.id),
        );
        return 0;
      },
    },
    {
      key: "amountReceivedAfterAudit",
      header: t("Amount received after audit"),
      textAlign: "right",
      width: "8%",
      renderCell: (_, row: Material) => {
        return numberWithDelimiter(
          store.getAmountReceivedAfterAudit(row.id),
        );
      },
    },
    {
      key: "systemAmount",
      header: t("System amount"),
      width: "8%",
      textAlign: "right",
      renderCell: (_, row: Material) => {
        return numberWithDelimiter(store.getSystemAmount(row.id));
      },
    },
    {
      key: "physicalAmount",
      header: t("Physical amount"),
      textAlign: "right",
      width: "10%",
      renderCell: (_, row: Material) => {
        return (
          <NumberInput
            key={row.id}
            value={store.getAmount(row.id)}
            onChangeValue={(value) =>
              store.setAmount(row.id, parseFloat(value.toString()))
            }
            allowDecimal={row?.others.unit?.allowFloat || false}
            allowNegative={false}
            style={{ paddingLeft: "2rem" }}
          />
        );
      },
    },
    {
      key: "difference",
      header: t("Difference"),
      textAlign: "right",
      width: "8%",
      renderCell: (_, row: Material) => {
        return numberWithDelimiter(store.getDifference(row.id));
      },
    },
    {
      key: "memo",
      header: t("Memo"),
      headerStyle: {
        paddingLeft: "0.8rem",
      },
      width: "15%",
      renderCell: (_, row: Material) => {
        return (
          <TextInput
            key={row.id}
            defaultValue={store.getMemo(row.id)}
            onChange={(e) => store.setMemo(row.id, e.target.value)}
            style={{ paddingLeft: "1rem" }}
          />
        );
      },
    },
    {
      key: "checked",
      header: (
        <Stack gap={5} align="center">
          <Text fw="bold">{t("Checked")}</Text>
          <Checkbox
            checked={isSelectAll}
            color="white"
            iconColor="primary"
            onChange={(value) =>
              store.setIsSelectAll(value.target.checked)
            }
          />
        </Stack>
      ),
      headerMobile: t("Checked"),
      width: "6%",
      textAlign: "center",
      renderCell: (_, row: Material) => {
        return (
          <Center w="full">
            <Checkbox
              key={row.id}
              defaultChecked={store.getIsSelect(row.id)}
              onChange={(value) =>
                store.setIsSelect(row.id, value.target.checked)
              }
            />
          </Center>
        );
      },
    },
  ];
};

export enum CheckType {
  ALL = "All",
  CHECKED = "Checked",
  NOT_CHECKED = "Not Checked",
}

export type FilterType = {
  type: string;
  group: string;
  checkType: CheckType;
};

export const defaultCondition: FilterType = {
  type: "",
  group: "",
  checkType: CheckType.ALL,
};

export function filter(m: Material, condition?: FilterType) {
  if (condition?.group && m.others.group !== condition.group) {
    return false;
  }
  if (condition?.type && m.others.type !== condition.type) {
    return false;
  }
  if (condition?.checkType === CheckType.CHECKED) {
    return store.getIsSelect(m.id);
  }
  if (condition?.checkType === CheckType.NOT_CHECKED) {
    return !store.getIsSelect(m.id);
  }
  return true;
}

import { Customer, Material, Product } from "@/services/domain";
import { DataGridColumnProps } from "@/types";
import { numberWithDelimiter } from "@/utils";
import { Center, Checkbox, Flex, NumberInput } from "@mantine/core";
import store from "../../_export.store";

export const dailyMenuConfigs = (
  t: (key: string) => string,
  products: Map<string, Product>,
  customers: Map<string, Customer>,
): DataGridColumnProps[] => {
  return [
    {
      key: "productName",
      header: t("Product Name"),
      width: "30%",
      defaultVisible: true,
      renderCell: (_, row: MenuItem) => {
        return products.get(row.productId)?.name || "N/A";
      },
    },
    {
      key: "quantity",
      header: t("Quantity"),
      textAlign: "center",
      width: "15%",
      renderCell: (_, row: MenuItem) => {
        return numberWithDelimiter(row.quantity);
      },
    },
    {
      key: "shift",
      header: t("Meal shift"),
      textAlign: "center",
      width: "15%",
      renderCell: (_, row: MenuItem) => {
        return row.shift;
      },
    },
    {
      key: "customerName",
      header: t("Customer"),
      textAlign: "center",
      width: "20%",
      renderCell: (_, row: MenuItem) => {
        return customers.get(row.customerId)?.name || "N/A";
      },
    },
    {
      key: "targetName",
      header: t("Customer type"),
      width: "20%",
      textAlign: "center",
      renderCell: (_, row: MenuItem) => {
        return row.targetName;
      },
    },
  ];
};

export const materialConfigs = (
  t: (key: string) => string,
  materials: Map<string, Material>,
): DataGridColumnProps[] => {
  return [
    {
      key: "materialName",
      header: t("Material name"),
      width: "30%",
      defaultVisible: true,
      renderCell: (_, row: MenuMaterial) => {
        return materials.get(row.materialId)?.name || "N/A";
      },
    },
    {
      key: "unit",
      header: t("Unit"),
      width: "20%",
      textAlign: "center",
      defaultVisible: true,
      renderCell: (_, row: MenuMaterial) => {
        return (
          materials.get(row.materialId)?.others.unit?.name || "N/A"
        );
      },
    },
    {
      key: "inventory",
      header: t("Inventory"),
      width: "15%",
      textAlign: "right",
      renderCell: (_, row: MenuMaterial) => {
        return store.getInventory(row.materialId);
      },
    },
    {
      key: "quantity",
      header: t("Quantity"),
      width: "15%",
      textAlign: "right",
      renderCell: (_, row: MenuMaterial) => {
        return row.amount;
      },
    },
    {
      key: "exportQuantity",
      header: t("Export quantity"),
      width: "20%",
      textAlign: "right",
      renderCell: (_, row: MenuMaterial) => {
        return (
          <Flex ml={16}>
            <NumberInput
              value={store.getExportAmount(row.materialId)}
              onChange={(value) =>
                store.setExportAmount(row.materialId, value)
              }
              allowDecimal={
                materials.get(row.materialId)?.others.unit
                  ?.allowFloat || false
              }
              allowNegative={false}
              max={store.getInventory(row.materialId)}
              styles={{
                input: {
                  color: row.exportAmount < row.amount ? "black" : "",
                  backgroundColor:
                    row.exportAmount < row.amount
                      ? "var(--mantine-color-red-1)"
                      : undefined,
                },
              }}
            />
          </Flex>
        );
      },
    },
    {
      key: "checked",
      header: "",
      width: "10%",
      textAlign: "right",
      renderCell: (_, row: MenuMaterial) => {
        return (
          <Center w="full">
            <Checkbox
              key={row.materialId}
              defaultChecked={store.isSelectMenuMaterial(
                row.materialId,
              )}
              onChange={(evt) =>
                store.setSelectMenuMaterial(
                  row.materialId,
                  evt.currentTarget.checked,
                )
              }
            />
          </Center>
        );
      },
    },
  ];
};

export type MenuItem = {
  productId: string;
  quantity: number;
  shift: string;
  customerId: string;
  targetName: string;
  date: Date;
  name: string;
};

export type MenuMaterial = {
  materialId: string;
  name: string;
  amount: number;
  exportAmount: number;
};

import { lazy } from "react";
import { Navigate } from "react-router-dom";

type GenericProps = Record<string, unknown>;
type RFC = (props?: GenericProps) => React.JSX.Element;
type NoPropsRFC = () => React.JSX.Element;
type Wrapper = React.LazyExoticComponent<RFC>;
type LazyExoticComponent = React.LazyExoticComponent<NoPropsRFC>;
type Config = {
  path: string;
  element: string | (() => JSX.Element);
  wrapper?: {
    element: Wrapper;
    props?: GenericProps;
  };
};

// prettier-ignore
const ServiceWrapper = lazy(() => import("@/layouts/Admin/ServiceWrapper"));
// prettier-ignore
const componentMap: Record<string, LazyExoticComponent> = {
  Dashboard: lazy(() => import("@/routes/dashboard")),
  Profile: lazy(() => import("@/routes/profile")),
  UserManagement: lazy(() => import("@/routes/user-management")),
  CustomerManagement: lazy(() => import("@/routes/customer-management")),
  CustomerProductManagement: lazy(() => import("@/routes/customer-management/product")),
  CustomerTargetManagement: lazy(() => import("@/routes/customer-management/target")),
  CateringManagement: lazy(() => import("@/routes/catering-management")),
  CateringSupplierManagement: lazy(() => import("@/routes/catering-management/supplier")),
  ProductManagement: lazy(() => import("@/routes/product-management")),
  MaterialManagement: lazy(() => import("@/routes/material-management")),
  MaterialSupplierManagement: lazy(() => import("@/routes/material-management/supplier")),
  UnitManagement: lazy(() => import("@/routes/unit-management")),
  SupplierManagement: lazy(() => import("@/routes/supplier-management")),
  SupplierMaterialManagement: lazy(() => import("@/routes/supplier-management/material")),
  SupplierCateringManagement: lazy(() => import("@/routes/supplier-management/catering")),
  MenuManagement: lazy(() => import("@/routes/menu-management")),
  InventoryManagement: lazy(() => import("@/routes/inventory-management")),
  CheckInventory: lazy(() => import("@/routes/check-inventory")),
  MenuManagementDetail: lazy(() => import("@/routes/menu-management/detail")),
  BomManagement: lazy(() => import("@/routes/bom-management")),
  PurchaseRequestManagement: lazy(() => import("@/routes/purchase-request-management")),
  PurchaseRequestDetail: lazy(() => import("@/routes/purchase-request-management/detail")),
  AddPurchaseRequest: lazy(() => import("@/routes/purchase-request-management/add")),
  PurchaseOrderManagement: lazy(() => import("@/routes/purchase-order-management")),
  PurchaseOrderDetail: lazy(() => import("@/routes/purchase-order-management/detail")),
  PurchaseCoordinationManagement: lazy(() => import("@/routes/purchase-coordination-management")),
  PurchaseCoordinationDetail: lazy(() => import("@/routes/purchase-coordination-management/detail")),
  PurchaseInternalManagement: lazy(() => import("@/routes/purchase-internal-management")),
  PurchaseInternalDetail: lazy(() => import("@/routes/purchase-internal-management/detail")),
  SupplyCoordination: lazy(() => import("@/routes/supply-coordination")),
  SupplyCoordinationDetail: lazy(() => import("@/routes/supply-coordination/detail")),
  MealManagement: lazy(() => import("@/routes/meal-management")),
  DeviationAdjustmentManagement: lazy(() => import("@/routes/deviation-adjustment-management")),
  DeviationAdjustmentDetail: lazy(() => import("@/routes/deviation-adjustment-management/detail")),
  InventoryTransactionDetails: lazy(() => import("@/routes/inventory-transaction-details")),
  WarehouseManagement: lazy(() => import("@/routes/warehouse-management")),
  WarehouseDetailManagement: lazy(() => import("@/routes/warehouse-management/detail")),
  ExternalWareHouseEntry: lazy(() => import("@/routes/external-warehouse-entry")),
  ExternalWarehouseImportDetail: lazy(() => import("@/routes/external-warehouse-entry/detail")),
  InternalWareHouseEntry: lazy(() => import("@/routes/internal-warehouse-entry")),
  InternalWarehouseImportDetail: lazy(() => import("@/routes/internal-warehouse-entry/detail")),
  ExportManagement: lazy(() => import("@/routes/export-management")),
  ExportInventory: lazy(() => import("@/routes/export-inventory")),
  QuotationManagement: lazy(() => import("@/routes/quotation-management")),
  QuotationHistoryManagement: lazy(() => import("@/routes/quotation-history-management")),
  BlankPage: lazy(() => import("@/routes/blank-page")),
};

const configs: Config[] = [
  {
    path: "/*",
    element: () => <Navigate to="/dashboard" />,
  },
  {
    path: "/dashboard",
    element: "Dashboard",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        // routeGroup:  "dashboard",
        title: "Dashboard",
      },
    },
  },
  {
    path: "/user-management",
    element: "UserManagement",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "user",
        title: "User Management",
      },
    },
  },
  {
    path: "/Menu-management",
    element: "MenuManagement",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "menu-management",
        title: "Menu Management",
      },
    },
  },
  {
    path: "/menu-management/:customerName/:targetName/:shift/:timestamp",
    element: "MenuManagementDetail",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "menu-management",
        title: "Menu Management",
      },
    },
  },
  {
    path: "/unit-management",
    element: "UnitManagement",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "unit",
        title: "Unit Management",
      },
    },
  },
  {
    path: "/bom-management",
    element: "BomManagement",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "bom",
        title: "BOM Management",
      },
    },
  },
  {
    path: "/customer-management",
    element: "CustomerManagement",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "customer",
        title: "Customer Management",
      },
    },
  },
  {
    path: "/customer-management/product/:customerId",
    element: "CustomerProductManagement",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "customer",
        title: "Customer Management",
      },
    },
  },
  {
    path: "/customer-management/target/:customerId",
    element: "CustomerTargetManagement",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "customer",
        title: "Customer Management",
      },
    },
  },
  {
    path: "/catering-management",
    element: "CateringManagement",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "catering",
        title: "Catering Management",
      },
    },
  },
  {
    path: "/catering-management/supplier/:cateringId",
    element: "CateringSupplierManagement",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "catering",
        title: "Catering Management",
      },
    },
  },
  {
    path: "/product-management",
    element: "ProductManagement",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "product",
        title: "Product Management",
      },
    },
  },
  {
    path: "/material-management",
    element: "MaterialManagement",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "material",
        title: "Material Management",
      },
    },
  },
  {
    path: "/material-management/supplier/:materialId",
    element: "MaterialSupplierManagement",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "material",
        title: "Material Management",
      },
    },
  },
  {
    path: "/supplier-management",
    element: "SupplierManagement",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "supplier",
        title: "Supplier Management",
      },
    },
  },
  {
    path: "/supplier-management/material/:supplierId",
    element: "SupplierMaterialManagement",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "supplier",
        title: "Supplier Management",
      },
    },
  },
  {
    path: "/supplier-management/catering/:supplierId",
    element: "SupplierCateringManagement",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "supplier",
        title: "Supplier Management",
      },
    },
  },
  {
    path: "/profile",
    element: "Profile",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "*",
        title: "Profile",
      },
    },
  },
  {
    path: "/inventory-management",
    element: "InventoryManagement",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "inventory",
        title: "Inventory List",
      },
    },
  },
  {
    path: "/check-inventory",
    element: "CheckInventory",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "check-inventory",
        title: "Check Inventory",
      },
    },
  },
  {
    path: "/purchase-request-management",
    element: "PurchaseRequestManagement",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "purchase-request",
        title: "Purchase Request Management",
      },
    },
  },
  {
    path: "/purchase-request-management/:purchaseRequestId",
    element: "PurchaseRequestDetail",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "purchase-request",
        title: "Purchase Request Detail",
      },
    },
  },
  {
    path: "/purchase-request-management/add",
    element: "AddPurchaseRequest",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "purchase-request",
        title: "Add Purchase Request",
      },
    },
  },
  {
    path: "/supply-coordination",
    element: "SupplyCoordination",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "supply-coordination",
        title: "Supply Coordination",
      },
    },
  },
  {
    path: "/supply-coordination/:purchaseRequestId",
    element: "SupplyCoordinationDetail",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "supply-coordination",
        title: "Purchase Request Detail",
      },
    },
  },
  {
    path: "/purchase-order-management",
    element: "PurchaseOrderManagement",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "purchase-order",
        title: "Purchase Order Management",
      },
    },
  },
  {
    path: "/purchase-order-management/:purchaseOrderId",
    element: "PurchaseOrderDetail",
  },
  {
    path: "/purchase-internal-management",
    element: "PurchaseInternalManagement",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "purchase-internal",
        title: "Purchase Internal Management",
      },
    },
  },
  {
    path: "/purchase-internal-management/:purchaseInternalId",
    element: "PurchaseInternalDetail",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "purchase-internal",
        title: "Purchase Internal Detail",
      },
    },
  },
  {
    path: "/purchase-coordination-management",
    element: "PurchaseCoordinationManagement",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "purchase-coordination",
        title: "Purchase Coordination Management",
      },
    },
  },
  {
    path: "/purchase-coordination-management/:purchaseCoordinationId",
    element: "PurchaseCoordinationDetail",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "purchase-coordination",
        title: "Purchase Coordination Detail",
      },
    },
  },
  {
    path: "/meal-management",
    element: "MealManagement",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "meal",
        title: "Meal Management",
      },
    },
  },
  {
    path: "/deviation-adjustment-management",
    element: "DeviationAdjustmentManagement",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "deviation-adjustment",
        title: "Deviation Adjustment Management",
      },
    },
  },
  {
    path: "/deviation-adjustment-management/:purchaseOrderId",
    element: "DeviationAdjustmentDetail",
  },
  {
    path: "/inventory-transaction-details",
    element: "InventoryTransactionDetails",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "inventory-transaction-details",
        title: "Inventory Transaction Details",
      },
    },
  },
  {
    path: "/warehouse-management",
    element: "WarehouseManagement",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "warehouse",
        title: "Warehouse Management",
      },
    },
  },
  {
    path: "/warehouse-management/:warehouseId",
    element: "WarehouseDetailManagement",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "warehouse",
        title: "Warehouse Receipt Detail",
      },
    },
  },
  {
    path: "/external-warehouse-entry",
    element: "ExternalWareHouseEntry",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "external-warehouse-entry",
        title: "External Warehouse Entry",
      },
    },
  },
  {
    path: "/external-warehouse-entry/:purchaseOrderId",
    element: "ExternalWarehouseImportDetail",
  },
  {
    path: "/internal-warehouse-entry",
    element: "InternalWareHouseEntry",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "internal-warehouse-entry",
        title: "Internal Warehouse Entry",
      },
    },
  },
  {
    path: "/internal-warehouse-entry/:purchaseInternalId",
    element: "InternalWarehouseImportDetail",
  },
  {
    path: "/export-management",
    element: "ExportManagement",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "export-management",
        title: "Export List",
      },
    },
  },
  {
    path: "/export-inventory",
    element: "ExportInventory",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "export-inventory",
        title: "Export Inventory",
      },
    },
  },
  {
    path: "/quotation-management",
    element: "QuotationManagement",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "quotation-management",
        title: "Quotation Management",
      },
    },
  },
  {
    path: "/quotation-history-management",
    element: "QuotationHistoryManagement",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        routeGroup: "quotation-history-management",
        title: "Quotation History Management",
      },
    },
  },
];

export default configs.map(_buildRouteConfig);

function _buildRouteConfig(config: Config) {
  const Component =
    typeof config.element === "string"
      ? componentMap[config.element]
      : config.element;

  return {
    path: config.path,
    element: config.wrapper ? (
      <config.wrapper.element {...config.wrapper.props}>
        <Component />
      </config.wrapper.element>
    ) : (
      <Component />
    ),
  };
}

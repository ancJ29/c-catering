import { Actions } from "@/auto-generated/api-configs";
import AddButton from "@/components/c-catering/AddButton";
import DataGrid from "@/components/common/DataGrid";
import useOnMounted from "@/hooks/useOnMounted";
import useTranslation from "@/hooks/useTranslation";
import callApi from "@/services/api";
import { loadAll } from "@/services/data-loaders";
import { GenericObject } from "@/types";
import { Button, Flex, Stack, Text, TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useCallback, useMemo, useState } from "react";
import { User, UserRequest, configs } from "./_configs";
import AddUserForm from "./components/AddUserForm";
import UpdateUserForm from "./components/UpdateUserForm";

const UserManagement = () => {
  const t = useTranslation();
  const [users, setUsers] = useState<User[]>([]);
  const [data, setData] = useState<User[]>([]);
  const dataGridConfigs = useMemo(() => configs(t), [t]);

  const [filter, setFilter] = useState({ keyword: "" });

  const _reload = useCallback(async (noCache?: boolean) => {
    loadAll<User>({
      key: "users",
      noCache,
      action: Actions.GET_USERS,
    }).then((users) => {
      setUsers(users);
      setData(users);
    });
    modals.closeAll();
  }, []);

  const search = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!filter.keyword) {
        return;
      }
      const keyword = filter.keyword.toLowerCase();
      setData(
        users.filter((user) => {
          if (keyword) {
            if (user.fullName.toLocaleLowerCase().includes(keyword)) {
              return true;
            }
            if (user.userName.toLocaleLowerCase().includes(keyword)) {
              return true;
            }
            if (user.email?.toLocaleLowerCase().includes(keyword)) {
              return true;
            }
            return false;
          }
          return true;
        }),
      );
    },
    [filter.keyword, users],
  );

  useOnMounted(_reload);

  const onDelete = useCallback(
    (user?: GenericObject) => {
      modals.openConfirmModal({
        title: `${t("Deactivate user")}: ${user?.fullName || ""}`,
        children: (
          <Text size="sm">
            {t("Are you sure you want to deactivate this user?")}
          </Text>
        ),
        labels: { confirm: "OK", cancel: t("Cancel") },
        onConfirm: async () => {
          await callApi({
            action: Actions.DISABLE_USERS,
            params: { ids: [user?.id] },
          }).then(() => _reload(true));
        },
      });
    },
    [_reload, t],
  );

  const handleKeywordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const keyword = e.target?.value.trim() || "";
      if (keyword !== filter.keyword) {
        setFilter({ keyword });
        if (!keyword) {
          setData(users);
        }
      }
    },
    [filter.keyword, users],
  );

  const addUser = useCallback(
    (values?: UserRequest) => {
      modals.open({
        title: t("Add user"),
        classNames: { title: "c-catering-font-bold" },
        centered: true,
        size: "lg",
        children: (
          <AddUserForm
            initValues={values}
            reOpen={addUser}
            onSuccess={_reload.bind(null, true)}
          />
        ),
      });
    },
    [_reload, t],
  );

  const updateUser = useCallback(
    (user: User) => {
      modals.open({
        title: user.fullName,
        classNames: { title: "c-catering-font-bold" },
        centered: true,
        size: "lg",
        children: (
          <UpdateUserForm
            onSuccess={_reload.bind(null, true)}
            reOpen={updateUser}
            user={user}
          />
        ),
      });
    },
    [_reload],
  );

  return (
    <Stack gap={10} pos="relative">
      <AddButton onClick={() => addUser()} label="Add user" />
      <Flex w="100%" justify="end" align="center" gap={10}>
        <form
          onSubmit={search}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 5,
          }}
        >
          <TextInput
            value={filter.keyword}
            onChange={handleKeywordChange}
          />
          <Button
            ml={10}
            w={110}
            type="submit"
            disabled={!filter.keyword}
          >
            {t("Search")}
          </Button>
        </form>
      </Flex>
      <DataGrid
        onRowClick={updateUser}
        hasOrderColumn
        columns={dataGridConfigs}
        data={data}
        hasActionColumn
        actionHandlers={{
          onDelete,
          deletable: (user) => user?.active === true,
        }}
      />
    </Stack>
  );
};

export default UserManagement;

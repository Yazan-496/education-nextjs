import UsersComponent from "components/Pages/Users";
import React from "react";
import { TransServer } from "components/@core/Language/TransServer";

const Users = async () => {
  const { users, roles } = await getData();
  return (
    <div className={"w-full h-[93vh] p-[2vh]"}>
      <div
        className={
          "h-[4vh] w-full bg-transparent flex justify-start content-center items-start p-0 mb-[2vh] animate-PageTitle"
        }
      >
        <div
          className={
            "flex text-[2vh] font-[700] text-[#4677ef] line-[2vh]"
          }
        >
          {TransServer("user.users_management")}
          <div
            className={
              "text-[2vh] font-[700] text-[#727272] ml-[1vh] line-[2vh]"
            }
          ></div>
        </div>
      </div>
      <UsersComponent
        users={users}
        roles={roles}
      />
    </div>
  );
};
export default Users;

async function getData() {
  const users = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}auth/ `,
    { cache: "no-cache" }
  ).then((res) => res.json());
  const rolesRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}auth/roles`,
    { cache: "no-cache" }
  ).then((res) => res.json());
  const rolesAsync = rolesRes.map((role) => {
    return {
      label: role.name,
      value: role.id,
    };
  });
  return {
    users,
    roles: rolesAsync,
  };
}

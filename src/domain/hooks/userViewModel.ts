import { UserData } from "../model";
import { registerUserAPI } from "backendApi";
import { atom, useRecoilState } from "recoil";
import { ChangeEvent } from "react";

export const useUserViewModel = () => {
  const [userData, setUserData] = useRecoilState(userDataState);

  const handleUpdateUserId = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setUserData({
      ...userData,
      userId: e.target.value,
    });
  };
  const handleUpdatePassword = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setUserData({
      ...userData,
      password: e.target.value,
    });
  };

  const createUser = async () => {
    await registerUserAPI(userData);
  };
  return {
    userData,
    handleUpdateUserId,
    handleUpdatePassword,
    createUser,
  };
};

const userDataState = atom<UserData>({
  key: "userData",
  default: {
    userId: "",
    password: "",
  },
});

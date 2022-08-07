import { AouthToken, SignInOrUpFlag, UserData } from "../model";
import { registerUserAPI, signInUserAPI } from "backendApi";
import { atom, useRecoilState } from "recoil";
import { ChangeEvent } from "react";

export const useUserViewModel = () => {
  const [userData, setUserData] = useRecoilState(userDataState);
  const [token, setToken] = useRecoilState(aouthTokenState);
  const [isSignIn, setIsSignIn] = useRecoilState(isSignInState);

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

  const resetUserIdAndPassword = () => {
    setUserData({
      userId: "",
      password: "",
    });
  };

  const toSignIn = () => {
    setIsSignIn(!isSignIn);
  };

  const toSignUp = () => {
    resetUserIdAndPassword();
    setIsSignIn(!isSignIn);
  };

  const signInUser = async () => {
    const token = await signInUserAPI(userData);
    setToken(token);
  };

  const createUser = async () => {
    await registerUserAPI(userData);
  };

  return {
    token,
    userData,
    isSignIn,
    handleUpdateUserId,
    handleUpdatePassword,
    toSignIn,
    toSignUp,
    createUser,
    signInUser,
  };
};

const userDataState = atom<UserData>({
  key: "userData",
  default: {
    userId: "",
    password: "",
  },
});

const aouthTokenState = atom<AouthToken>({
  key: "aouthToken",
  default: "",
});

const isSignInState = atom<SignInOrUpFlag>({
  key: "isSignIn",
  default: true,
});

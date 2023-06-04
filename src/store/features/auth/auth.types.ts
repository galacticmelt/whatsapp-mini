export type AuthState = {
  idInstance: string;
  apiTokenInstance: string;
  authLoading: boolean;
  authError: {
    status: boolean;
    value: null | string;
  };
};

export interface StateTypes {
  error: string;
  isLoading: boolean;
  user: Record<string, any> | null;
}

export interface ActionTypes {
  payload: any;
  type: string;
  error?: boolean;
}

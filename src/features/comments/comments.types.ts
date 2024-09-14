export interface StateTypes {
  isLoading: boolean;
  error: string;
  comments: Record<string, any>[];
}

export interface CommentPropsTypes {
  data: Record<string, any>;
  isReply?: boolean;
}

export interface ActionTypes {
  payload: any;
  type: string;
  error?: boolean;
}

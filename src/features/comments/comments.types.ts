export interface StateTypes {
  isLoading: boolean;
  error: string;
  comments: Record<string, any>[];
}
export interface ActionTypes {
  payload: any;
  type: string;
  error?: boolean;
}
export interface CommentPropsTypes {
  data: Record<string, any>;
  isCurrentUser: boolean;
  isReply?: boolean;
}

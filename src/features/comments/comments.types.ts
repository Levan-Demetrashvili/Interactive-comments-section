export interface StateTypes {
  isLoading: boolean;
  error: string;
  comments: Record<string, any>[];
}
export interface ActionTypes {
  payload: any;
  type: string;
  error?: boolean;
  meta?: number;
}
export interface CommentPropsTypes {
  data: Record<string, any>;
  isCurrentUser: boolean;
  isReply?: boolean;
}

export interface ContentTextPropsTypes {
  data: Record<string, any>;
  isReply: boolean;
  isEditable: boolean;
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>;
}

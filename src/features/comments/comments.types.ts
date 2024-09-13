export interface StateTypes {
  isLoading: boolean;
  error: string;
  comments: Record<string, any>[];
}

export interface CommentPropsTypes {
  data: Record<string, any>;
}

export interface ResponseComment<T> {
  data: T;
  count: number;
}

export interface IResponseJson<T> {
  data: T;
  message?: string;
}

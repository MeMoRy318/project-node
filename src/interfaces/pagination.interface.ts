interface IQuery {
  page: string;
  limit: string;
  sortedBy: string;

  [key: string]: string;
}

interface IPaginationResponse<T> {
  page: number | string;
  limit: number | string;
  itemsFound: number;
  data: T[];
}
export type { IQuery, IPaginationResponse };

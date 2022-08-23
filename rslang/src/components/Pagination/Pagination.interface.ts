import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IPaginationProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  onPageChange: (value: number) => void;
  pageSize: number;
  total: number;
  currentPage: number;
  siblingCount?: number;
}

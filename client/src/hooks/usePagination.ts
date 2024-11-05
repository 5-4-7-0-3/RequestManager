import { useState } from "react";

interface UsePaginationProps {
  totalItems: number;
  itemsPerPageOptions?: number[];
  defaultItemsPerPage?: number;
}

const usePagination = ({
  totalItems,
  itemsPerPageOptions = [5, 10, 25],
  defaultItemsPerPage = 10,
}: UsePaginationProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultItemsPerPage);

  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedResults = (items: any[]) => {
    return items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  };

  return {
    page,
    rowsPerPage,
    totalPages,
    handleChangePage,
    handleChangeRowsPerPage,
    paginatedResults,
    itemsPerPageOptions,
  };
};

export default usePagination;

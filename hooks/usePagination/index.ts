import { useState } from "react";

interface UsePaginationProps {
  totalCount: number;
  limit: number;
}

export const usePagination = ({ totalCount, limit }: UsePaginationProps) => {
  const [page, setPage] = useState(1);

  const paginationHandler = (action: "first" | "last" | "next" | "prev") => {
    const totalPages = Math.ceil(totalCount / limit);

    switch (action) {
      case "first":
        setPage(1);
        break;
      case "last":
        setPage(totalPages);
        break;
      case "next":
        if (page < totalPages) {
          setPage(page + 1);
        }
        break;
      case "prev":
        if (page > 1) {
          setPage(page - 1);
        }
        break;
    }
  };

  return {
    page,
    setPage,
    paginationHandler,
  };
};

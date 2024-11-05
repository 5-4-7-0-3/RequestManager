import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import usePagination from "../hooks/usePagination";

interface ResultListProps {
  results: number[];
}

const ResultList: React.FC<ResultListProps> = ({ results }) => {
  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    paginatedResults,
    itemsPerPageOptions,
  } = usePagination({ totalItems: results.length });

  return (
    <Paper
      elevation={3}
      style={{ padding: "16px", marginTop: "16px", width: "100%" }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Response Index</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedResults(results).map((result, index) => (
              <TableRow key={index}>
                <TableCell>{result}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={itemsPerPageOptions}
        component="div"
        count={results.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => handleChangePage(newPage)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ResultList;

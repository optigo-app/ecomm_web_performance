import React, { useState } from 'react';
import { Pagination, PaginationItem, TextField, Box, useMediaQuery } from '@mui/material';

const EditablePagination = ({ totalItems, pageSize, currPage, setCurrPage }) => {
  const [inputPage, setInputPage] = useState(currPage); // Editable page number state
  const afterFilterCount = totalItems; // The number of items after any filtering
  const totalPages = Math.ceil(afterFilterCount / pageSize); // Calculate total pages

  // Check if the screen size is small
  const maxwidth464px = useMediaQuery('(max-width:464px)');

  // Handle page change using Pagination component
  const handlePageChange = (event, value) => {
    setCurrPage(value);
    setInputPage(value); // Update the input field to match the page number
  };

  // Handle page change using the editable input
  const handleInputChange = (event) => {
    const value = event.target.value;
    if (value === '' || /^[0-9]+$/.test(value)) {
      setInputPage(value); // Only set the input if it's a number
    }
  };

  // Handle blur (when user leaves the input field)
  const handleBlur = () => {
    let newPage = parseInt(inputPage, 10);
    if (newPage < 1) newPage = 1; // Ensure the page is at least 1
    if (newPage > totalPages) newPage = totalPages; // Ensure the page doesn't exceed total pages
    setCurrPage(newPage);
    setInputPage(newPage); // Update the input field as well
  };

  return (
    <Box display="flex" alignItems="center">
      <Pagination
        count={totalPages}
        page={currPage}
        size={maxwidth464px ? 'small' : 'large'} // Conditionally set the size
        shape="circular"
        onChange={handlePageChange}
        showFirstButton
        showLastButton
        renderItem={(item) => (
          <PaginationItem
            {...item}
            sx={{
              pointerEvents: item.page === currPage ? 'none' : 'auto', // Disable pointer events on the current page
            }}
          />
        )}
      />
      <TextField
        type="number"
        value={inputPage}
        onChange={handleInputChange}
        onBlur={handleBlur}
        inputProps={{ min: 1, max: totalPages }}
        label="Page Number"
        variant="outlined"
        sx={{ marginLeft: 2, width: 80 }}
      />
    </Box>
  );
};

export default EditablePagination;

import React, { useState } from 'react';
import { Box, Pagination, PaginationItem, TextField, Typography } from '@mui/material';

const EditablePagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  inputPage,
  setInputPage,
  handlePageInputChange,
  maxwidth464px,
  totalPages,
  currPage,
  isShowButton,
}) => {
  const dstCount = totalItems; 

  return (
    <Box display="flex" alignItems="center" className="main_pagination_portion">
      <Pagination
        count={Math.ceil(dstCount / itemsPerPage)}
        page={currentPage}
        size={maxwidth464px ? 'small' : 'large'}
        shape="circular"
        showFirstButton={isShowButton ? true : false}
        showLastButton={isShowButton ? true : false}
        onChange={onPageChange}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            sx={{
              pointerEvents: item.page === currentPage ? 'none' : 'auto',
            }}
          />
        )}
      />

      {/* Label "Go to Page" */}
      <Box className="main_editable_pagination" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography className="main_pagiantion_input" sx={{ marginLeft: 2 }} variant="body1">
          Go to Page:
        </Typography>

        {/* TextField to enter page number */}
        <TextField
          type="text"
          className="main_pagiantion_input"
          value={inputPage}
          onBlur={() => {
            // Check if the input is empty, and if so, set the page to the currentPage
            if (!inputPage) {
              setInputPage(currPage); // Reset to the current page if the input is empty
            }
          }}
          onChange={(event) => setInputPage(event.target.value)}
          onKeyDown={handlePageInputChange}  // Attach the keydown handler to check for "Enter"
          inputProps={{ min: 1, max: totalPages }}
          variant="outlined"
          sx={{
            marginLeft: 1,
            width: 60,
            '& .MuiInputBase-input': {
              paddingBlock: '5.5px',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default EditablePagination;

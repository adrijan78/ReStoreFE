import { Box, Typography, Pagination } from "@mui/material"
import { ProductParams } from "../../models/product"

interface Props{
    productParams:ProductParams,
    onPageChange:(page:number)=>void
}

const AppPagination = ({productParams,onPageChange}:Props) => {
    const {pageNumber,pageSize,totalCount,totalPages}=productParams
  return (
    <Box display="flex" justifyContent="space-between" alignItems='center'>
          <Typography>
            Displaying {(pageNumber-1)* pageSize+1} -
             {pageNumber*pageSize >totalCount ? totalCount:pageNumber*pageSize} of {totalCount} items
          </Typography>
          <Pagination
           color='secondary'
           size='large'
           count={totalPages}
           page={pageNumber}
           onChange={(e,page)=>onPageChange(page)}
          />
        </Box>
  )
}

export default AppPagination
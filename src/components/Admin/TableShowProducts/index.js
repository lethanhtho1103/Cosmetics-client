import {
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Edit, Close, ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import productService from '~/services/productService';

function TableShowProducts({ categories }) {
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isShowDeleteDialog, setIsShowDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('product_name');
  const [selectedCategory, setSelectedCategory] = useState(''); // Selected category state

  useEffect(() => {
    if (selectedCategory) {
      handleGetAllProducts();
    }
  }, [selectedCategory]);

  const handleShowDeleteDialog = (product) => {
    setIsShowDeleteDialog(true);
    setSelectedProduct(product);
  };

  const handleCloseDeleteDialog = () => {
    setIsShowDeleteDialog(false);
    setSelectedProduct(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAscending = orderBy === property && order === 'asc';
    setOrder(isAscending ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortComparator = (a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  };

  const sortedRows = rows.slice().sort((a, b) => {
    if (orderBy === 'price') {
      const aPrice = parseInt(a[orderBy].replace(/,/g, ''), 10);
      const bPrice = parseInt(b[orderBy].replace(/,/g, ''), 10);
      return order === 'asc' ? sortComparator(aPrice, bPrice) : sortComparator(bPrice, aPrice);
    }
    return order === 'asc' ? sortComparator(a[orderBy], b[orderBy]) : sortComparator(b[orderBy], a[orderBy]);
  });

  const filteredRows = sortedRows.filter((row) =>
    Object.values(row).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const handleGetAllProducts = async () => {
    const res = await productService.getAllProductByCategoryName({
      categoryName: selectedCategory,
    });
    setRows(res.data);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value); // Update selected category
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <FormControl variant="outlined" size="small" style={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select label="Category" value={selectedCategory} onChange={handleCategoryChange}>
            {categories?.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          style={{ marginRight: '10px', color: '#fff', backgroundColor: 'green' }}
          onClick={() => console.log('Add product')}
        >
          Add Product
        </Button>
        <TextField
          label="Search..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: '250px' }}
          placeholder="Search across all fields"
        />
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Button
                  onClick={() => handleRequestSort('product_name')}
                  style={{ textTransform: 'none', display: 'flex', alignItems: 'center' }}
                >
                  Product Name
                  {orderBy === 'product_name' &&
                    (order === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />)}
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleRequestSort('category')}
                  style={{ textTransform: 'none', display: 'flex', alignItems: 'center' }}
                >
                  Category
                  {orderBy === 'category' &&
                    (order === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />)}
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleRequestSort('brand')}
                  style={{ textTransform: 'none', display: 'flex', alignItems: 'center' }}
                >
                  Brand
                  {orderBy === 'brand' &&
                    (order === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />)}
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleRequestSort('price')}
                  style={{ textTransform: 'none', display: 'flex', alignItems: 'center' }}
                >
                  Price
                  {orderBy === 'price' &&
                    (order === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />)}
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleRequestSort('stock')}
                  style={{ textTransform: 'none', display: 'flex', alignItems: 'center' }}
                >
                  Stock
                  {orderBy === 'stock' &&
                    (order === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />)}
                </Button>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor: '#f5f5f5' }}>
            {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.product_name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <IconButton
                    style={{
                      marginRight: '8px',
                      backgroundColor: '#5E5DF0',
                      color: '#fff',
                      '&:hover': { backgroundColor: '#4A4AD4' },
                    }}
                    onClick={() => console.log('Edit product')}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    style={{
                      backgroundColor: '#D32F2F',
                      color: '#fff',
                      '&:hover': { backgroundColor: '#C62828' },
                    }}
                    onClick={() => handleShowDeleteDialog(product)}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Modal open={isShowDeleteDialog} onClose={handleCloseDeleteDialog}>
        <Paper style={{ padding: '20px', margin: '50px auto', maxWidth: '400px' }}>
          <h3>Are you sure you want to delete?</h3>
          <p>Product: {selectedProduct?.product_name}</p>
          <Button variant="contained" color="primary" onClick={handleCloseDeleteDialog}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => console.log('Delete product')}
            style={{ marginLeft: '10px' }}
          >
            Delete
          </Button>
        </Paper>
      </Modal>
    </>
  );
}

export default TableShowProducts;

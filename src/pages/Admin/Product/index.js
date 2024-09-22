import TableShowProducts from '~/components/Admin/TableShowProducts';
import AdminLayout from '~/layouts/AdminLayout';
import './Product.scss';
import { useEffect, useState } from 'react';
import shopService from '~/services/shopService';

function ProductsManagement() {
  const [categories, setCategories] = useState();
  const handleGetAllCategories = async () => {
    const res = await shopService.getAllCategories();
    setCategories(res);
  };

  useEffect(() => {
    handleGetAllCategories();
  }, []);

  return (
    <AdminLayout>
      <h1 className="title-management">Products Management</h1>
      <TableShowProducts categories={categories} />
    </AdminLayout>
  );
}

export default ProductsManagement;

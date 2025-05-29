import { useModal } from '../../../hooks/useModal';
import PageBreadcrumb from '../components/common/PageBreadCrumb';
import PageMeta from "../../components/PageMeta";
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../components/ui/table';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Actions, OrderResponse } from '../../../lib/types';
import { useOrdersPage } from '../../../context/OrdersPageContext';
import PaginationControls from '../components/common/PaginationControls';
import { Link, useNavigate  } from 'react-router';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import OrderModal from './OrdersModal';
import { useState } from 'react';
import Badge from '../components/ui/badge/Badge';

export default function Orders() {
  const [ activeOrder, setActiveOrder ] = useState<OrderResponse | undefined>();
  const { isOpen, openModal, closeModal } = useModal();
  const { control,  register, handleSubmit } = useForm<OrderResponse>()
  const {
    handleChangePage,
    createOrder,
    deleteOrder,
    editOrder,
    currentPage,
    ordersData,
    totalOrders,
    totalPages,
    action,
    setAction
  } = useOrdersPage();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<OrderResponse> = (formData) => {
    if (action === 'EDIT') {
      editOrder(formData);
    } else if (action === 'DELETE') {
      deleteOrder(activeOrder.slug);
    } else if (action === 'CREATE') {
      createOrder(formData);
    }
    closeModal();
    return navigate('/admin/orders')
  }
  const handleOpenModal = (modalAction: Actions, Order?:OrderResponse) => {
    return () => {
      setAction(modalAction);
      setActiveOrder(Order);
      openModal();
    }
  };

  return (
    <>
      <PageMeta
        title="Admin Orders"
        description="Admin Orders Template"
      />
      <div className="grid">
      <PageBreadcrumb pageTitle="Orders" />
      <div className="flex items-center justify-between mb-6">
        <button
            onClick={handleOpenModal('CREATE')}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                fill=""
              />
            </svg>
          Add Order
        </button>
        {isOpen && ( <OrderModal action={action} activeOrder={activeOrder} setActiveOrder={setActiveOrder} isOpen={isOpen}  closeModal={closeModal} onSubmit={onSubmit} handleSubmit={handleSubmit}  control={control} register={register}/> )}
      </div>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="max-w-full overflow-x-auto">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Order {totalOrders > 0 ? `(${totalOrders})` : ''}
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Url
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Status
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {ordersData && ordersData.map((Order) => (
                  <TableRow key={Order.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-full">
                        <div className="w-10 h-10 overflow-hidden rounded-full text-center flex items-center justify-center bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-white/90">
                          {Order.id}
                        </div>
                        </div>
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {Order.id}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {/* <Link to={`http://localhost:5173/${Order.id}`} target='_black'>{Order.id}</Link> */}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {/* {Order.isActive? (
                          <Badge size="sm" color="success">
                            Active
                          </Badge>
                        ) : (
                          <Badge size="sm" color="error">
                            Inactive
                          </Badge>
                        )} */}
                    </TableCell>
                    <TableCell className="flex w-full gap-2 px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {/* TODO: add */}
                      <button
                        onClick={handleOpenModal('EDIT', Order)}
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={handleOpenModal('DELETE', Order)}
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                      >
                        <DeleteIcon/>
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="max-w-full overflow-x-auto">
            <PaginationControls totalNumberOfPages={totalPages} currentPage={currentPage} onClick={handleChangePage} />
          </div>
        </div>
      </div>
    </>
  );
}

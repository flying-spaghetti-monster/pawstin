import { Table, TableBody, TableCell, TableHeader, TableRow } from '../components/ui/table';
import PaginationControls from '../components/common/PaginationControls';
import { useCustomersPage } from '../../../context/CustomersPageContext';
import PageBreadcrumb from '../components/common/PageBreadCrumb';
import PageMeta from "../components/common/PageMeta";

export default function Customers() {
  const {
    currentPage,
    usersData,
    totalUsers,
    totalPages,
    handleChangePage,
  } = useCustomersPage();

  return (
    <>
      <PageMeta
        title="Admin Customers"
        description="Admin Customers Template"
      />
      <PageBreadcrumb pageTitle="Customers" />
      <div className="grid">
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
                    User {totalUsers > 0 ? `(${totalUsers})` : ''}
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Role
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
                    Address
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {usersData && usersData.map((user) => (
                  <TableRow key={user.email}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-full text-center flex items-center justify-center bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-white/90">
                          {(user.first_name.charAt(0) + ' ' + user.last_name.charAt(0)).toUpperCase()}
                        </div>
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {user.first_name} {user.last_name}
                          </span>
                          <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {user.role}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <div className="flex -space-x-2">
                        {user.isActive ? (
                          <Badge size="sm" color="success">
                            Active
                          </Badge>
                        ) : (
                          <Badge size="sm" color="error">
                            Inactive
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <div className="flex flex-col">
                        {user.address && (
                          <span className="font-medium text-gray-800 dark:text-white/90">
                            <span>{user.address}</span>
                            <span>{user.city}, {user.region}</span>
                            <span>{user.postal_code}, {user.country}</span>
                            <span>{user.phone}</span>
                          </span>
                        )}
                      </div>
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

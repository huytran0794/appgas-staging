import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./Pages/Login/LoginPage";
import PrivateRoutes from "./core/routes/PrivateRoutes/PrivateRoutes";
import CustomLayout from "./core/Layout/CustomLayout";
import CustomerManagementPage from "./Pages/CustomerManagement/CustomerManagementPage";
import CustomerDetail from "./Pages/CustomerManagement/Detail/CustomerDetail";
import EditCustomerPage from "./Pages/CustomerManagement/Edit/EditCustomerPage";
import AddCustomerPage from "./Pages/CustomerManagement/Add/AddCustomerPage";
import AddUserPage from "./Pages/CustomerManagement/Add/AddUserPage";
import CustomerListPage from "./Pages/CustomerManagement/CustomerListPage";
import UserManagePage from "./Pages/UserManagement/UserManagePage";
import EditUserPage from "./Pages/UserManagement/Edit/EditUserPage";
import UserDetail from "./Pages/UserManagement/Detail/UserDetail";
import UserTaskPage from "./Pages/UserTaskAssignment/UserTaskPage";
import UserTaskAssign from "./Pages/UserTaskAssignment/Admin/TaskAssignment/UserTaskAssign";
import UserTaskTrackingPage from "./Pages/UserTaskAssignment/UserTaskTrackingPage";
import UserTaskDetail from "./Pages/UserTaskAssignment/TaskDetail/UserTaskDetail";
import OrderDetail from "./Pages/CustomerManagement/Detail/OrderDetail";
import AddAdminPage from "./Pages/AdminManagement/AddAdminPage";
import AdminManagePage from "./Pages/AdminManagement/AdminManagePage";
import EditAdminPage from "./Pages/AdminManagement/Edit/EditAdminPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CustomLayout />}>
          <Route path="login" element={<LoginPage />} />
          {/* Private routes */}
          <Route element={<PrivateRoutes />}>
            <Route index element={<CustomerListPage />} />
            <Route path="/manager" element={<CustomerManagementPage />} />
            <Route path="/admin/user-management" element={<UserManagePage />} />
            <Route path="/admin/add-user" element={<AddUserPage />} />

            <Route path="admin/user/view/:id" element={<UserDetail />} />
            <Route path="admin/user/edit/:id" element={<EditUserPage />} />

            <Route
              path="admin/user/task-management"
              element={<UserTaskPage />}
            />
            <Route
              path="admin/user/task-assign/:id"
              element={<UserTaskAssign />}
            />
            <Route
              path="user/task-tracking"
              element={<UserTaskTrackingPage />}
            />
            <Route
              path="user/task-tracking/detail/:id"
              element={<UserTaskDetail />}
            />
            <Route path="customer/view/:id" element={<CustomerDetail />} />
            <Route path="customer/edit/:id" element={<EditCustomerPage />} />
            <Route path="customer/add-customer" element={<AddCustomerPage />} />

            <Route
              path="customer/view/:customer_id/order-history/:id"
              element={<OrderDetail order={1} />}
            />
            <Route path="master/admin/add-admin" element={<AddAdminPage />} />
            <Route
              path="master/admin/admin-management"
              element={<AdminManagePage />}
            />

            <Route path="master/admin/edit/:id" element={<EditAdminPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

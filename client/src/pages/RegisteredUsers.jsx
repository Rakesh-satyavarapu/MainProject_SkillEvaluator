import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminUserStore } from "../store/useAdminUserStore";
import { motion } from "framer-motion";
import { Users, Mail, Shield, Calendar, Trash2, ArrowRight, Eye } from "lucide-react";
import { cn } from "../lib/utils";

const RegisteredUsers = () => {
  const navigate = useNavigate();
  const { users, fetchAllUsers, deleteUser, isLoading, isProcessing } = useAdminUserStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Registered Users</h1>
              <p className="text-gray-600 mt-1">Manage all registered users efficiently</p>
            </div>
          </div>
        </motion.div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
        >
          {users.length === 0 ? (
            <div className="text-center py-16">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No registered users found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-primary-50 to-secondary-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Registered On</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <motion.tr
                      key={user._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/admin/user/${user._id}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-semibold">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-gray-900">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="h-4 w-4" />
                          <span>{user.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium",
                          user.role === 'admin' 
                            ? "bg-purple-100 text-purple-700" 
                            : "bg-blue-100 text-blue-700"
                        )}>
                          <Shield className="h-3 w-3 inline mr-1" />
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => navigate(`/admin/user/${user._id}`)}
                            className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            disabled={isProcessing}
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
                                deleteUser(user._id);
                              }
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Delete User"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RegisteredUsers;





// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAdminUserStore } from "../store/useAdminUserStore";

// const RegisteredUsers = () => {
//   const navigate = useNavigate();
//   const { users, fetchAllUsers, deleteUser, isLoading, isProcessing } = useAdminUserStore();

//   useEffect(() => {
//     fetchAllUsers();
//   }, [fetchAllUsers]);

//   if (isLoading) return <div className="loading-text">Loading users...</div>;

//   return (
//     <div className="users-container">
//       <div className="users-header">
//         <h2>Registered Users</h2>
//         <p className="subtitle">Manage all registered users efficiently</p>
//       </div>

//       <div className="table-wrapper">
//         <table className="users-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Registered On</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.length === 0 ? (
//               <tr>
//                 <td colSpan="5" className="no-data">No registered users found</td>
//               </tr>
//             ) : (
//               users.map((user) => (
//                 <tr key={user._id}>
//                   <td onClick={() => navigate(`/admin/user/${user._id}`)}>{user.name}</td>
//                   <td onClick={() => navigate(`/admin/user/${user._id}`)}>{user.email}</td>
//                   <td>{user.role}</td>
//                   <td>{new Date(user.createdAt).toLocaleDateString()}</td>
//                   <td>
//                     <button
//                       className="delete-btn"
//                       disabled={isProcessing}
//                       onClick={() => {
//                         if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
//                           deleteUser(user._id);
//                         }
//                       }}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       <style>{`
//         .users-container {
//           width: 90%;
//           margin: 3rem auto;
//           padding: 2rem;
//           background: #ffffff;
//           border-radius: 16px;
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
//           font-family: 'Inter', sans-serif;
//         }

//         .users-header {
//           text-align: center;
//           margin-bottom: 2rem;
//         }

//         .users-header h2 {
//           font-size: 1.8rem;
//           font-weight: 700;
//           color: #1e293b;
//           margin-bottom: 0.25rem;
//         }

//         .subtitle {
//           color: #64748b;
//           font-size: 0.95rem;
//         }

//         .table-wrapper {
//           overflow-x: auto;
//         }

//         .users-table {
//           width: 100%;
//           border-collapse: collapse;
//           font-size: 0.95rem;
//         }

//         .users-table th {
//           background: #f8fafc;
//           color: #475569;
//           text-align: left;
//           padding: 12px 15px;
//           border-bottom: 2px solid #e2e8f0;
//           font-weight: 600;
//         }

//         .users-table td {
//           padding: 12px 15px;
//           border-bottom: 1px solid #f1f5f9;
//           color: #334155;
//         }

//         .users-table tr:last-child td {
//           border-bottom: none;
//         }

//         .users-table tr:hover td {
//           background: #f9fafb;
//         }

//         .delete-btn {
//           background: #ef4444;
//           color: white;
//           border: none;
//           padding: 6px 12px;
//           border-radius: 6px;
//           font-weight: 500;
//           cursor: pointer;
//           transition: background 0.2s ease;
//         }

//         .delete-btn:hover {
//           background: #dc2626;
//         }

//         .no-data {
//           text-align: center;
//           padding: 2rem;
//           color: #94a3b8;
//           font-style: italic;
//         }

//         .loading-text {
//           text-align: center;
//           font-size: 1.1rem;
//           margin-top: 5rem;
//           color: #64748b;
//         }

//         @media (max-width: 768px) {
//           .users-container {
//             width: 95%;
//             padding: 1.5rem;
//           }

//           .users-header h2 {
//             font-size: 1.5rem;
//           }

//           .users-table th,
//           .users-table td {
//             padding: 10px 8px;
//             font-size: 0.9rem;
//           }
//         }

//         @media (max-width: 480px) {
//           .users-header h2 {
//             font-size: 1.3rem;
//           }

//           .users-table th,
//           .users-table td {
//             font-size: 0.85rem;
//             padding: 8px 6px;
//           }

//           .delete-btn {
//             width: 100%;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default RegisteredUsers;

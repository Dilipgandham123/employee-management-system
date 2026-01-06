"use client";

import React, { useState, useMemo } from "react";
import { Plus, Search, Filter, Printer, Edit, Trash2 } from "lucide-react";
import { useEmployees } from "@/context/EmployeeContext";
import { Employee } from "@/types/employee";
import { INDIAN_STATES } from "@/lib/mockEmployees";
import { EmployeeFormDialog } from "./EmployeeFormDialog";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { useToast } from "@/components/Toast";

export default function EmployeesPage() {
  const { employees, deleteEmployee } = useEmployees();
  const { show } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [stateFilter, setStateFilter] = useState<string>("all");

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch = emp.fullName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesGender =
        genderFilter === "all" || emp.gender === genderFilter;
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" ? emp.isActive : !emp.isActive);
      const matchesState = stateFilter === "all" || emp.state === stateFilter;

      return matchesSearch && matchesGender && matchesStatus && matchesState;
    });
  }, [employees, searchQuery, genderFilter, statusFilter, stateFilter]);

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteEmployee(deleteId);
      show({ title: "Employee deleted", type: "success" });
      setDeleteId(null);
    }
  };

  const handlePrintSingle = (employee: Employee) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Employee Details - ${employee.fullName}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            .header { text-align: center; margin-bottom: 30px; }
            .profile-img { width: 120px; height: 120px; border-radius: 50%; margin: 0 auto 20px; display: block; }
            h1 { color: #4f46e5; margin: 10px 0; }
            .details { max-width: 600px; margin: 0 auto; }
            .detail-row { display: flex; padding: 12px; border-bottom: 1px solid #e5e7eb; }
            .detail-label { font-weight: bold; width: 150px; color: #6b7280; }
            .detail-value { flex: 1; color: #1f2937; }
            .status { display: inline-block; padding: 4px 12px; border-radius: 4px; font-size: 14px; }
            .active { background-color: #dcfce7; color: #166534; }
            .inactive { background-color: #fee2e2; color: #991b1b; }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="${employee.profileImage}" alt="${
      employee.fullName
    }" class="profile-img" />
            <h1>${employee.fullName}</h1>
            <p style="color: #6b7280;">${employee.id}</p>
          </div>
          <div class="details">
            <div class="detail-row">
              <span class="detail-label">Full Name:</span>
              <span class="detail-value">${employee.fullName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Employee ID:</span>
              <span class="detail-value">${employee.id}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Gender:</span>
              <span class="detail-value">${employee.gender}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Date of Birth:</span>
              <span class="detail-value">${new Date(
                employee.dateOfBirth
              ).toLocaleDateString()}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">State:</span>
              <span class="detail-value">${employee.state}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Status:</span>
              <span class="detail-value">
                <span class="status ${
                  employee.isActive ? "active" : "inactive"
                }">
                  ${employee.isActive ? "Active" : "Inactive"}
                </span>
              </span>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Employee List</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #4f46e5; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #4f46e5; color: white; }
            tr:nth-child(even) { background-color: #f9fafb; }
            .status { padding: 4px 8px; border-radius: 4px; font-size: 12px; }
            .active { background-color: #dcfce7; color: #166534; }
            .inactive { background-color: #fee2e2; color: #991b1b; }
          </style>
        </head>
        <body>
          <h1>Employee List</h1>
          <p>Total Employees: ${filteredEmployees.length}</p>
          <p>Generated on: ${new Date().toLocaleDateString()}</p>
          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Full Name</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>State</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredEmployees
                .map(
                  (emp) => `
                <tr>
                  <td>${emp.id}</td>
                  <td>${emp.fullName}</td>
                  <td>${emp.gender}</td>
                  <td>${new Date(emp.dateOfBirth).toLocaleDateString()}</td>
                  <td>${emp.state}</td>
                  <td>
                    <span class="status ${
                      emp.isActive ? "active" : "inactive"
                    }">
                      ${emp.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  const clearFilters = () => {
    setSearchQuery("");
    setGenderFilter("all");
    setStatusFilter("all");
    setStateFilter("all");
  };

  type Column = {
    key: string;
    header: React.ReactNode;
    cell: (row: Employee) => React.ReactNode;
    cellClassName?: string;
  };

  const StatusBadge: React.FC<{ active: boolean }> = ({ active }) => (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded-full ${
        active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}
    >
      {active ? "Active" : "Inactive"}
    </span>
  );

  const ActionButtons: React.FC<{ emp: Employee }> = ({ emp }) => (
    <div className="flex justify-end gap-2">
      <button
        onClick={() => handleEdit(emp)}
        className="text-indigo-600 hover:text-indigo-900 p-1 hover:bg-indigo-50 rounded"
        title="Edit"
      >
        <Edit className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleDelete(emp.id)}
        className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
        title="Delete"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );

  const columns: Column[] = [
    { key: "id", header: "Employee ID", cell: (r) => r.id },
    {
      key: "profile",
      header: "Profile",
      cell: (r) => (
        <img
          src={r.profileImage}
          alt={r.fullName}
          className="w-10 h-10 rounded-full"
        />
      ),
    },
    { key: "fullName", header: "Full Name", cell: (r) => r.fullName },
    { key: "gender", header: "Gender", cell: (r) => r.gender },
    {
      key: "dateOfBirth",
      header: "Date of Birth",
      cell: (r) => new Date(r.dateOfBirth).toLocaleDateString(),
    },
    { key: "state", header: "State", cell: (r) => r.state },
    {
      key: "status",
      header: "Status",
      cell: (r) => <StatusBadge active={r.isActive} />,
    },
    {
      key: "actions",
      header: <div className="text-right">Actions</div>,
      cell: (r) => <ActionButtons emp={r} />,
      cellClassName: "text-right",
    },
  ];

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Employees</h1>
            <p className="text-gray-600 mt-1">
              Manage your workforce - {filteredEmployees.length} of{" "}
              {employees.length} employees
            </p>
          </div>
          <button
            onClick={() => {
              setEditingEmployee(null);
              setIsFormOpen(true);
            }}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            <Plus className="w-5 h-5" />
            Add Employee
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Search & Filter
            </h3>
            <div className="flex gap-2">
              <button
                onClick={clearFilters}
                className="text-sm text-gray-600 hover:text-gray-800 px-3 py-1 border rounded-lg"
              >
                Clear Filters
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg transition"
              >
                <Printer className="w-4 h-4" />
                Print List
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>

            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            >
              <option value="all">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            >
              <option value="all">All States</option>
              {INDIAN_STATES.map((state: string) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <tr>
                {columns.map((col) => (
                  <TableHead
                    key={col.key}
                    className={col.key === "actions" ? "text-right" : undefined}
                  >
                    {col.header}
                  </TableHead>
                ))}
              </tr>
            </TableHeader>

            <TableBody>
              {filteredEmployees.map((emp) => (
                <TableRow key={emp.id}>
                  {columns.map((col) => (
                    <TableCell key={col.key} className={col.cellClassName}>
                      {col.cell(emp)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <EmployeeFormDialog
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingEmployee(null);
        }}
        employee={editingEmployee}
      />

      <DeleteConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

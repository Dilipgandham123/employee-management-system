'use client';

import React from 'react';
import { Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEmployees } from '@/context/EmployeeContext';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  bgColor: string;
  textColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  bgColor, 
  textColor 
}) => (
  <Card className={`${bgColor}`}>
    <CardContent>
      <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
      <p className={`text-3xl font-bold ${textColor} mb-1`}>{value}</p>
      {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
    </CardContent>
  </Card>
);


export const DashboardContent: React.FC = () => {
  const router = useRouter();
  const { employees } = useEmployees();

  const employeeStats = {
    total: employees.length,
    active: employees.filter(emp => emp.isActive).length,
    inactive: employees.filter(emp => !emp.isActive).length,
    male: employees.filter(emp => emp.gender === 'Male').length,
    female: employees.filter(emp => emp.gender === 'Female').length,
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, Administrator! 👋
          </h1>
          <p className="text-gray-600">
            {"Here's an overview of your employee management system"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Employees"
            value={employeeStats.total}
            subtitle="All registered employees"
            bgColor="bg-blue-50"
            textColor="text-blue-600"
          />
          <StatCard
            title="Active Employees"
            value={employeeStats.active}
            subtitle="Currently active"
            bgColor="bg-green-50"
            textColor="text-green-600"
          />
          <StatCard
            title="Inactive Employees"
            value={employeeStats.inactive}
            subtitle="Currently inactive"
            bgColor="bg-orange-50"
            textColor="text-orange-600"
          />
          <StatCard
            title="Total Male/Female"
            value={`${employeeStats.male}/${employeeStats.female}`}
            subtitle="Gender distribution"
            bgColor="bg-purple-50"
            textColor="text-purple-600"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => router.push('/employees')}
              className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition"
            >
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-800">Add Employee</p>
                <p className="text-xs text-gray-500">Create new employee record</p>
              </div>
            </button>
            <button 
              onClick={() => router.push('/employees')}
              className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition"
            >
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-800">View Employees</p>
                <p className="text-xs text-gray-500">Browse all employees</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-800">Reports</p>
                <p className="text-xs text-gray-500">Generate employee reports</p>
              </div>
            </button>
          </div>
        </div>

        {employeeStats.total === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Employees Yet</h3>
            <p className="text-gray-500 mb-6">
              Get started by adding your first employee to the system
            </p>
            <button 
              onClick={() => router.push('/employees')}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Add First Employee
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
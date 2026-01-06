"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Employee, EmployeeFormData } from "@/types/employee";
import { INITIAL_EMPLOYEES } from "@/lib/mockEmployees";

export interface EmployeeContextType {
  employees: Employee[];
  addEmployee: (employee: EmployeeFormData) => void;
  updateEmployee: (id: string, employee: EmployeeFormData) => void;
  deleteEmployee: (id: string) => void;
  getEmployeeById: (id: string) => Employee | undefined;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined
);

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployees must be used within EmployeeProvider");
  }
  return context;
};

export const EmployeeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("employees");
      if (stored) {
        setEmployees(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to hydrate employees from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("employees");
    if (stored) setEmployees(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (data: EmployeeFormData) => {
    setEmployees((prev) => [
      ...prev,
      {
        ...data,
        id: `EMP${String(prev.length + 1).padStart(3, "0")}`,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const updateEmployee = (id: string, employeeData: EmployeeFormData) => {
    const updated = employees.map((emp) =>
      emp.id === id ? { ...emp, ...employeeData } : emp
    );
    setEmployees(updated);
    localStorage.setItem("employees", JSON.stringify(updated));
  };

  const deleteEmployee = (id: string) => {
    const updated = employees.filter((emp) => emp.id !== id);
    setEmployees(updated);
    localStorage.setItem("employees", JSON.stringify(updated));
  };

  const getEmployeeById = (id: string) => {
    return employees.find((emp) => emp.id === id);
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        getEmployeeById,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

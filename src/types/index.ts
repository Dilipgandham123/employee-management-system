export interface User {
  username: string;
  name: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => AuthResult;
  logout: () => void;
  isLoading: boolean;
}

export interface AuthResult {
  success: boolean;
  message: string;
}

export interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active: boolean;
}

export interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  bgColor: string;
  textColor: string;
}

export interface EmployeeStats {
  total: number;
  active: number;
  inactive: number;
  male: number;
  female: number;
}
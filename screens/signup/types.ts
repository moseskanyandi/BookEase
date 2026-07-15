import { UserRole } from '@/types';

/** Shape of the Signup form's field values. */
export interface SignupFormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

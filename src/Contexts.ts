import { createContext } from 'react';

export const UserContext = createContext<any>(null);
export const UserLoadingContext = createContext<boolean>(true);
export const AdminContext = createContext<boolean>(false);
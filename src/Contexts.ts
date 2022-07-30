import { createContext } from 'react';

export const UserContext = createContext<any>(null);
export const UserLoadingContext = createContext<boolean>(true);
// null  -> loading
// true  -> admin
// false -> not admin
export const AdminContext = createContext<boolean | null>(null);
export const UserResponseContext = createContext<boolean>(false);

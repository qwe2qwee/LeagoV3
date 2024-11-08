import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

type User = {
    id: number;
    name: string;
    email: string
}

type GlobalContextType = {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    user: User | null;
    setUser: (user: User | null) => void;
    isLoading: boolean;
}

type GlobalProviderProps = {
    children: any;
}

const GlobalContext = createContext(undefined);
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children } : GlobalProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const getUser = async () => {
            // Dummy Function to sumulate fetching user data
            return Promise.resolve<User | null>({
                id: 1,
                name: "أحمد" ,
                email: "ahmed@leago.com"
            })
        }

        getUser()
            .then((res) => {
                if (res) {
                    setIsLoggedIn(true);
                    setUser(res);
                } else {
                    setIsLoggedIn(false);
                    setUser(null)
                }
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])
    return (
       <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading,
            }}
       >
        {children}
       </GlobalContext.Provider>
    )
}

export default GlobalProvider
import { createContext, useContext, useState } from 'react';

    const EmailContext = createContext();
const EmailProvider = ({ children }) =>
    {
        const [userEmail, setUserEmail] = useState('');
        return (
            <EmailContext.Provider value = {[ userEmail, setUserEmail]}>
                { children }
            </EmailContext.Provider>
        )
    }

const useEmail = () => useContext(EmailContext)

export { EmailProvider, useEmail };


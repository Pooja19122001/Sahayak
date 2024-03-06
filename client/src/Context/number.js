import { createContext, useContext, useState } from 'react';


    const NumberContext = createContext();
const NumberProvider = ({ children }) =>
    {
        const [numbers, setNumbers] = useState([]);
        return (
            <NumberContext.Provider value = {[ numbers, setNumbers]}>
                { children }
            </NumberContext.Provider>
        )
    }


const useNumbers = () => useContext(NumberContext)

export { NumberProvider, useNumbers };



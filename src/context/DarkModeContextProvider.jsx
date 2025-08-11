import {createContext,useState,useContext} from 'react'

const DarkModeContainer = createContext();  


export const useDarkMode=()=>{
    return useContext(DarkModeContainer)
}  

export function DarkModeContextProvider({children}) {
    // Create a  dark mode or no
    const [darkMode, setDarkMode] = useState(false);  
    //toggle btw light and dark  
    function toggleDarkMode(){
        setDarkMode(prevMode => !prevMode);     
    }
  return (
    <DarkModeContainer.Provider value={{darkMode, setDarkMode, toggleDarkMode}} >
      {children}
    </DarkModeContainer.Provider>
  )
}


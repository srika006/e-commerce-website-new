
import { createContext,useState} from "react"

export const PageContainer = createContext();

export function PageContextProvider({children}){
    const[pageNum,setPageNum] = useState(1);

    const[pageSize,setPageSize] = useState(5);


  return (
    <div>
      <PageContainer.Provider value={{
        pageNum,
        pageSize,
        setPageNum,
        setPageSize
      }}>
        {children}
      </PageContainer.Provider>
    </div>
  )
}
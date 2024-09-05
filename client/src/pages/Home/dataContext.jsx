import React, { createContext, useState,useContext } from "react";

const DataContext = createContext();

export const DataProvider = ({children})=>{
    const [data,setData] = useState([]);

    const fetchData = async ()=>{
        try{
            const response = await fetch(`http://localhost:8080/repos/${localStorage.getItem("UserId")}`,{
                method:"GET",
                headers: {
                  'Authorization': window.localStorage.getItem("token"),
                }
              });
            const result = await response.json();
            setData(result.repos || []);

        }catch(error){
            console.log(error);
            setData([]);
        }
    }
    return (
        <DataContext.Provider value={{data,setData,fetchData}}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = ()=>{
    return useContext(DataContext);
}
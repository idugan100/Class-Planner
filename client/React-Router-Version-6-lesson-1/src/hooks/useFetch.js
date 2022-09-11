import {useContext, useState, useEffect,} from "react"
import { AuthContext } from "../context/AuthContext";



export const useFetch = (url, method="GET") => {
  const{token}=useContext(AuthContext)
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [options,setOptions]=useState(null);
  const postData=(postData)=>{
    setOptions({
      method: "POST",
      headers:{
        "Content-type":"application/json",
        "token":token
      },
      body:JSON.stringify(postData)
    })
  }

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async (options) => {
      setIsPending(true)
      
      try {
        const res = await fetch(url, { ...options, signal: controller.signal })
        if(!res.ok) {
          
          throw new Error(res.statusText)
          
        }
        const data = await res.json()

        setIsPending(false)
        setData(data)
        setError(null)
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("the fetch was aborted")
        } else {
          setIsPending(false)
          setError(err.message)
        }
      }
    }
    if(method==='GET'){
      fetchData()
    }
    if(method==='POST'&& options){
      fetchData(options);

    }

    return () => {
      controller.abort()
    }

  }, [url,method,options])

  return { data, isPending, error, postData}
}
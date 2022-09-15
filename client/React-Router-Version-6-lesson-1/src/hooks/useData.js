import {useContext, useState, useEffect,} from "react"
import { AuthContext } from "../context/AuthContext";



export const useData = (url) => {
  const{token}=useContext(AuthContext)
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [options,setOptions]=useState(null);
  

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      setIsPending(true)
      
      try {
        const res = await fetch(url, { headers:{"Content-type":"application/json",
        "token":token}, signal: controller.signal })
        if(!res.ok) {
          
          throw new Error(res.statusText)
          
        }
        const data = await res.json()

        setIsPending(false)
        setData(data)
        console.log(data)
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
    fetchData()

    return () => {
      controller.abort()
    }

  }, [url,token])

  return { data, isPending, error}
}
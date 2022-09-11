import { useState, useEffect,} from "react"



export const useFetch = (url, method="GET") => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [options,setOptions]=useState(null);
  const postData=(postData)=>{
    setOptions({
      method: "POST",
      headers:{
        "Content-type":"application/json"
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
import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null );
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const abortConst = new AbortController();

        fetch(url, { signal: abortConst.signal })
            .then(res => {
                if(!res.ok){
                    throw new Error('Cannot fetch the data');
                }
                return res.json();
            })
            .then(data =>{
                setError(null);
                setData(data);
                setIsPending(false);
            })
            .catch( err =>{
                if (err.name === 'AbortError'){
                    console.log('Fetch aborted');
                }
                else {
                    setIsPending(false);
                    setError(err.message);
                }
                
            })
            return (()=> abortConst.abort() )
    }, []);

    return ( {data, isPending, error}    );
}

export default useFetch;

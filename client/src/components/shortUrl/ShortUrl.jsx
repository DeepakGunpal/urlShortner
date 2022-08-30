import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ShortUrl = () => {
    const { urlCode } = useParams();
    const [result, setResult] = useState("");

    const sUrl = async () => {
        const data = await fetch(`https://urlshortnerdg.herokuapp.com/url/${urlCode}`, {
            method: "post"
        })
        const jsonData = await data.json()
        setResult(jsonData);
    }

    useEffect(() => {
        sUrl();
    }, [urlCode])

    return (
        <div style={{fontSize:'50px'}}>
            <p>redirect to : </p><a href={result.longUrl}>{result.longUrl}</a>
        </div>
    )
}

export default ShortUrl
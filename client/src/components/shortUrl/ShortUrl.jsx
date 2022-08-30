import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ShortUrl = () => {
    const { urlCode } = useParams();
    const [result, setResult] = useState("");
    const navigate = useNavigate();

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
        <>
            <p>redirect to : </p><a href={result.longUrl}>{result.longUrl}</a>
        </>
    )
}

export default ShortUrl
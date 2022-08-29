import React from 'react'
import './Result.css'

const Result = ({ result }) => {
    return (
        <div className='result_container'>
            <p>URL Code : {result.data.urlCode}</p>
            <p>LongUrl : <a href={result.data.longUrl} target='_blank' rel="noreferrer">{result.data.longUrl}</a></p>
            <p>shortUrl : <a href={result.data.shortUrl} target='_blank' rel="noreferrer">{result.data.shortUrl}</a> </p>
        </div>
    )
}

export default Result
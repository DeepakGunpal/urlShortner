import React from 'react'
import './Result.css'

const Result = ({ result }) => {
    return (
        <div className='result_container'>
            <p>URL Code : {result.urlCode}</p>
            <p>LongUrl : <a href={result.longUrl} target='_blank' rel="noreferrer">{result.longUrl}</a></p>
            <p>shortUrl : <a href={result.shortUrl} target='_blank' rel="noreferrer">{result.shortUrl}</a> </p>
        </div>
    )
}

export default Result
import React from 'react'
import './Socials.css'
import dg from './favicon.ico'
import { BsLinkedin } from 'react-icons/bs'
import { FaGithubSquare, FaTwitterSquare, FaInstagramSquare } from 'react-icons/fa'

const Socials = () => {
    return (
        <div className='socials'>

            <a href='https://www.linkedin.com/in/deepak-gunpal-45186b233/' target="_blank" rel="noreferrer"><BsLinkedin /></a>
            <a href='https://twitter.com/deepakgunpal_?s=09' target="_blank" rel="noreferrer"><FaTwitterSquare /></a>
            <a href='https://www.deepakgunpal.com' target="_blank" rel="noreferrer"><img src={dg} /></a>
            <a href='https://github.com/DeepakGunpal' target="_blank" rel="noreferrer"><FaGithubSquare /></a>
            <a href='https://www.instagram.com/gunpal.deepak?r=nametag' target="_blank" rel="noreferrer"><FaInstagramSquare /></a>
        </div>
    )
}

export default Socials

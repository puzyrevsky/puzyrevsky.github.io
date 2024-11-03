import React from 'react';
import {useNavigate} from 'react-router-dom';

import Button from '@mui/material/Button';

import { Context } from "../App";

function NotFound() {

    const {data} = React.useContext(Context)

    const navigate = useNavigate();



    return (
        <div style={{overflow: 'hidden', padding: '45vh 15px 0 15px', height: '55vh', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#282c34',}}>
            <h2 style={{color: 'white', margin: '0 0 13px 0', textAlign: 'center', fontSize: '28px'}}>{data.notFound.errorText}</h2>
            <p style={{color: 'white', margin: '0', textAlign: 'center'}}>{data.notFound.errorDescription[0]}</p>
            <p style={{color: 'white', margin: '0 0 20px 0', textAlign: 'center'}}>{data.notFound.errorDescription[1]}</p>
            <Button sx={{color: '#ffffffcc', transition: '0.39s', fontSize: '14px', fontWeight: 'bold', backgroundColor: '#66CDAA', '&:hover': {backgroundColor: '#57b293', transition: '0.39s'},}} onClick={() => navigate(-1)} variant="contained">{data.notFound.buttonBack}</Button>
        </div>
    )
}

export default NotFound;
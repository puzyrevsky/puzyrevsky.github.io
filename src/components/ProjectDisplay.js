import React, {useEffect} from 'react';

import styles from './ProjectDisplay.module.css';

import { arrayContentPortfolio } from '../data/ArrayPortfolio';

import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Context } from '../App';

import Button from '@mui/material/Button';


function ProjectDisplay() {

    const { projectName } = useParams();

    const selectedProjects = arrayContentPortfolio.find(item => item.pathname === projectName);

    const history = useNavigate();

    const handleClickBack = (e) => {
        e.preventDefault();
        history('/portfolio/projects');
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const {data} = React.useContext(Context);

    return (
        <div style={{paddingTop: '130px', margin: '0'}}>
            {!selectedProjects ? 
            <div className={styles.project__not_found__container}>
                <p className={styles.project__not_found__text}>{data.projects.projectNotFound[0]} <span className={styles.name__project_not__found}>"{projectName}"</span> {data.projects.projectNotFound[1]}</p>
                <Button variant="contained" onClick={handleClickBack} sx={{ marginBottom: '13px', color: '#ffffffcc', transition: '0.39s', fontSize: '14px', fontWeight: 'bold', backgroundColor: '#66CDAA', '&:hover': {backgroundColor: '#57b293', transition: '0.39s'}, }}>{data.projects.buttonTextBack}</Button>
            </div>
            :
            <div>
                <Button variant="contained" onClick={handleClickBack} sx={{ marginBottom: '13px', color: '#ffffffcc', transition: '0.39s', fontSize: '14px', fontWeight: 'bold', backgroundColor: '#66CDAA', '&:hover': {backgroundColor: '#57b293', transition: '0.39s'}, }}>{data.projects.buttonTextBack}</Button>
                <h2 className={styles.text__display_project}>{data.projects.projectDisplayTitle} <span className={styles.name__project_not__found}>{selectedProjects.name}</span></h2>
                <div className={styles.image__container}>
                <img src={selectedProjects.imageFull} alt={`layout ${projectName}`} style={{maxWidth: '900px', marginBottom: '20px',}} />
                </div>
                <Button variant="contained" onClick={handleClickBack} sx={{ marginBottom: '13px', color: '#ffffffcc', transition: '0.39s', fontSize: '14px', fontWeight: 'bold', backgroundColor: '#66CDAA', '&:hover': {backgroundColor: '#57b293', transition: '0.39s'}, }}>{data.projects.buttonTextBack}</Button>
            </div>}
        </div>
    )
}

export default ProjectDisplay;
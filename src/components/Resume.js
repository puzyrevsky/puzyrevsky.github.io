import React, {useEffect, useState, useRef} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import html2pdf from 'html2pdf.js';

import { Context } from "../App";
import styles from './Resume.module.css';

import Button from '@mui/material/Button';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import Alert from '@mui/material/Alert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import ItemResume from './ItemResume';
import AnimatedElement from './AnimatedElement';


function Resume({widthWrapperApp, language}) {

// function copy email

const [handlerNotificationCopyEmail, setHandlerNotificationCopyEmail] = useState(false);
const [handlerSuccessfullyCopyEmail, setHandlerSuccessfullyCopyEmail] = useState(true);

function copyToClipboard(text) {
navigator.clipboard.writeText(text)
    .then(() => {
    setHandlerNotificationCopyEmail(true);
    setHandlerSuccessfullyCopyEmail(true);
    // Запускаем таймер для успешного копирования
    const timeoutSuccessfully = setTimeout(() => {
        setHandlerNotificationCopyEmail(false);
    }, 1500);

    return () => clearTimeout(timeoutSuccessfully); // Очистка таймера
    })
    .catch(err => {
    setHandlerNotificationCopyEmail(true);
    setHandlerSuccessfullyCopyEmail(false);
    // Запускаем таймер для неудачного копирования
    const timeoutUnsuccessfully = setTimeout(() => {
        setHandlerNotificationCopyEmail(false);
    }, 1500);

    return () => clearTimeout(timeoutUnsuccessfully); // Очистка таймера
    });
}

//

const resumeRef = useRef();


const [handlerIconForButtonDownload, setHandlerIconForButtonDownload] = useState('download');

const handleDownload = () => {
    const element = resumeRef.current;
    html2pdf()
        .set({
            margin: [1, 0.2, 0.2, 0.5],
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 1 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        })
        .from(element)
        .save()
        .then(() => {
            setHandlerIconForButtonDownload('done');
        });
};

const history = useNavigate();

const handleButtonBack = () => {
    history('/portfolio/about')
}

const {data} = React.useContext(Context)

    return (
        <div className={styles.resume__geleral_container}>
            {handlerNotificationCopyEmail && <Alert sx={{position: 'fixed', top: '65px', left: '50%', transform: 'translate(-50%, 0%)', zIndex: '100'}} severity={handlerSuccessfullyCopyEmail ? 'success' : 'error'} icon={handlerSuccessfullyCopyEmail ? <ContentCopyIcon fontSize="inherit" /> : <ErrorOutlineIcon fontSize="inherit" />}>{handlerSuccessfullyCopyEmail ? data.alertTextResultCopyEmail.successfully : data.alertTextResultCopyEmail.unsuccessfully}</Alert>}
            <div className={styles.wrap}>
                <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                    <h1 className={styles.resume__title}>{data.resume.resumeTitle}</h1>
                </AnimatedElement>
                <div ref={resumeRef} className={styles.resume__container}>
                    <div className={`${styles.resume__column_container}`}>
                        <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.1">
                            <div className={styles.about__resume_container}>
                                <ul className={styles.list__about_resume}>
                                    <li className={styles.item__about_resume}><h2 className={styles.name__resume}>{data.resume.cardResume.name}</h2></li>
                                    <li className={styles.item__about_resume}><p className={styles.text__about_resume}>{data.resume.cardResume.position}</p></li>
                                    <li className={styles.item__about_resume}><p className={styles.text__about_resume}>{data.resume.cardResume.location}</p><a className={styles.link__about_resume} href="https://yandex.by/maps/geo/53177019/?ll=27.727503%2C53.882847&z=11.48" target="_blank">{data.resume.cardResume.city}</a></li>
                                    <li className={styles.item__about_resume}>
                                        <p className={styles.text__about_resume}>Email:</p>
                                        <a className={styles.link__about_resume} 
                                            href="mailto:puzyrevsky.andrei@mail.ru"
                                            target="_blank"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                copyToClipboard('puzyrevsky.andrei@mail.ru');
                                                setTimeout(() => {
                                                window.location.href = 'mailto:puzyrevsky.andrei@mail.ru';
                                                }, 800);    
                                            }}
                                        >puzyrevsky.andrei@mail.ru</a></li>
                                    <li className={styles.item__about_resume}><p className={styles.text__about_resume}>Linkedin:</p><a className={styles.link__about_resume} href="https://www.linkedin.com/in/puzyrevsky/" target="_blank">Puzyrevsky</a></li>
                                </ul>
                            </div>
                        </AnimatedElement>
                        <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.1">
                            <h2 className={styles.title__section}>{data.resume.education.title}</h2>
                        </AnimatedElement>
                        <ItemResume title={data.resume.education.educationOne.name} time={data.resume.education.educationOne.time} position={data.resume.education.educationOne.position} description={data.resume.education.educationOne.description} />
                        <ItemResume title={data.resume.education.educationTwo.name} time={data.resume.education.educationTwo.time} position={data.resume.education.educationTwo.position} description={data.resume.education.educationTwo.description} />
                    
                        <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.1">
                            <h2 className={`${styles.title__section} ${widthWrapperApp <= 830 && styles.page__break}`}>{data.resume.professionalDevelopment.title}</h2>
                        </AnimatedElement>
                        <ItemResume title={data.resume.professionalDevelopment.name} list={data.resume.professionalDevelopment.courses} />
                        <ItemResume title={data.resume.educationalProjects.name} language={language} widthWrapperApp={widthWrapperApp} lineHeight='max-size' list={data.resume.educationalProjects.projects} />
                    </div>
                    <div className={`${styles.resume__column_container}`}>
                        <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.1">
                            <h2 style={{marginTop: widthWrapperApp > 768 ? '0px' : '35px', lineHeight: '24px',}} className={styles.title__section}>{data.resume.technicalSkills.title}</h2>
                        </AnimatedElement>
                        <ItemResume title={data.resume.technicalSkills.nameProgrammingLanguages} list={data.resume.technicalSkills.programmingLanguages} />
                        <ItemResume title={data.resume.technicalSkills.nameFrameworksLibraries} list={data.resume.technicalSkills.frameworksLibraries} />
                        <ItemResume title={data.resume.technicalSkills.nameMarkupStyling} list={data.resume.technicalSkills.markupStyling} />
                        <ItemResume title={data.resume.technicalSkills.nameToolsPlatforms} list={data.resume.technicalSkills.toolsPlatforms} />
                        <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.1">
                            <h2 className={`${styles.title__section} ${widthWrapperApp <= 830 && styles.page__break}`}>{data.resume.professionalExperience.title}</h2>
                        </AnimatedElement>
                        <ItemResume title={data.resume.professionalExperience.ExoDigital.position} time={data.resume.professionalExperience.ExoDigital.time} position={data.resume.professionalExperience.ExoDigital.name} description={data.resume.professionalExperience.ExoDigital.description} />
                        <ItemResume title={data.resume.professionalExperience.geltung.position} time={data.resume.professionalExperience.geltung.time} position={data.resume.professionalExperience.geltung.name} description={data.resume.professionalExperience.geltung.description} />
                        <ItemResume title={data.resume.professionalExperience.ArtKlen.position} time={data.resume.professionalExperience.ArtKlen.time} position={data.resume.professionalExperience.ArtKlen.name} description={data.resume.professionalExperience.ArtKlen.description} />
                        <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.1">
                            <h2 className={styles.title__section}>{data.resume.aboutMe.title}</h2>
                        </AnimatedElement>
                        <ItemResume title={data.resume.aboutMe.name} list={data.resume.aboutMe.quality} />
                    </div>
                </div>
            </div>
            <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.1">
                <Button sx={{transition: '0.3s', color: '#66CDAA', marginBottom: '10px', borderColor: '#66CDAA', '&:hover': {transition: '0.3s', borderColor: '#57b293', backgroundColor: '#66cdaa4a',}}} variant="outlined" onClick={handleDownload} endIcon={handlerIconForButtonDownload === 'download' && <FileDownloadIcon /> || handlerIconForButtonDownload === 'done' && <FileDownloadDoneIcon />}>{data.resume.buttonTextDownload}</Button>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.1">
                <Button sx={{color: '#ffffffcc', transition: '0.39s', fontSize: '14px', fontWeight: 'bold', backgroundColor: '#66CDAA', '&:hover': {backgroundColor: '#57b293', transition: '0.39s'},}} variant="contained" onClick={handleButtonBack}>{data.projects.buttonTextBack}</Button>
            </AnimatedElement>
        </div>
    )
}

export default Resume;
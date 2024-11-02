import React, {useState, useEffect} from 'react';
import styles from './TermsUse.module.css';

import { Context } from "../App";

import {useNavigate} from 'react-router-dom';

import AnimatedElement from './AnimatedElement';

import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
    

function TermsUse({previousPageAdress, namePreviousPageButton}) {


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


    const {data} = React.useContext(Context);

    let history = useNavigate();

    const handlerClickOnPageBack = (e) => {
        e.preventDefault();
        history(previousPageAdress);
    }

    return (
        <div className={styles.terms__use_container}>
            {handlerNotificationCopyEmail && <Alert sx={{position: 'fixed', top: '65px', left: '50%', transform: 'translate(-50%, 0%)', zIndex: '100'}} severity={handlerSuccessfullyCopyEmail ? 'success' : 'error'} icon={handlerSuccessfullyCopyEmail ? <ContentCopyIcon fontSize="inherit" /> : <ErrorOutlineIcon fontSize="inherit" />}>{handlerSuccessfullyCopyEmail ? data.alertTextResultCopyEmail.successfully : data.alertTextResultCopyEmail.unsuccessfully}</Alert>}
            <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                <h1 className={styles.title}>{data.pageUsage.title}</h1>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                <h2 className={styles.subtitle}>{data.pageUsage.introductionTitle}</h2>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.3">
                <p className={styles.text}>{data.pageUsage.introductionText}</p>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                <h2 className={styles.subtitle}>{data.pageUsage.usingSiteTitle}</h2>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                <h3 className={styles.name__text}>{data.pageUsage.usingSiteTitleSubtitle}</h3>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.3">
                <p className={styles.text}>{data.pageUsage.usingSiteText}</p>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                <h3 className={styles.name__text}>{data.pageUsage.informationOnSiteTitle}</h3>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.3">
                <p className={styles.text}>{data.pageUsage.informationOnSiteText}</p>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                <h2 className={styles.subtitle}>{data.pageUsage.disclaimerResponsibilityTitle}</h2>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                <h3 className={styles.name__text}>{data.pageUsage.thirdPartySitesSubtitle}</h3>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.3">
                <p className={styles.text}>{data.pageUsage.thirdPartySitesText}</p>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                <h3 className={styles.name__text}>{data.pageUsage.disclaimerSubtitle}</h3>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.3">
                <p className={styles.text}>{data.pageUsage.disclaimerText}</p>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                <h2 className={styles.subtitle}>{data.pageUsage.сhangesTermsUseTitle}</h2>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.3">
                <p className={styles.text}>{data.pageUsage.сhangesTermsUseText}</p>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                <h2 className={styles.subtitle}>{data.pageUsage.contactsInfoTitle}</h2>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.3">
                <p className={styles.text}>{data.pageUsage.contactsInfoText}</p>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                <h3 className={styles.name__text}>{data.pageUsage.autorName}</h3>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.3">
                <div className={styles.contacts__email_container}>
                    <p className={`${styles.email__text} ${styles.text}`}>{data.pageUsage.emailText}</p>
                    <a href="mailto:puzyrevsky.andrei@mail.ru"
                        target="_blank"
                        onClick={(e) => {
                            e.preventDefault();
                            copyToClipboard('puzyrevsky.andrei@mail.ru');
                            setTimeout(() => {
                            window.location.href = 'mailto:puzyrevsky.andrei@mail.ru';
                            }, 800);    
                        }} 
                        className={styles.email}
                    >{data.pageUsage.email}</a>
                </div>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.3">
                <p className={styles.text}>{data.pageUsage.dateText}</p>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.3">
                <Button sx={{color: '#ffffffcc', transition: '0.39s', fontSize: '14px', fontWeight: 'bold', backgroundColor: '#66CDAA', '&:hover': {backgroundColor: '#57b293', transition: '0.39s'}, }} variant="contained" onClick={handlerClickOnPageBack}>{data.pageUsage.buttonBack} {namePreviousPageButton.textNav}</Button>
            </AnimatedElement>
        </div>
    )
}

export default TermsUse;
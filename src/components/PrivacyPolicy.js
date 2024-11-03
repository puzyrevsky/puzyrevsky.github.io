import React, {useState, useEffect} from 'react';
import styles from './PrivacyPolicy.module.css';

import {useNavigate} from 'react-router-dom';

import { Context } from "../App";

import AnimatedElement from './AnimatedElement';

import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';



function PrivacyPolicy({previousPageAdress, namePreviousPageButton}) {

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

    return(
        <div className={styles.privacy__policy_container}>
            {handlerNotificationCopyEmail && <Alert sx={{position: 'fixed', top: '65px', left: '50%', transform: 'translate(-50%, 0%)', zIndex: '100'}} severity={handlerSuccessfullyCopyEmail ? 'success' : 'error'} icon={handlerSuccessfullyCopyEmail ? <ContentCopyIcon fontSize="inherit" /> : <ErrorOutlineIcon fontSize="inherit" />}>{handlerSuccessfullyCopyEmail ? data.alertTextResultCopyEmail.successfully : data.alertTextResultCopyEmail.unsuccessfully}</Alert>}
            <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                <h1 className={styles.title}>{data.pagePrivacy.title}</h1>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                <h2 className={styles.subtitle}>{data.pagePrivacy.introductionTitle}</h2>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.3">
                <p className={styles.text}>{data.pagePrivacy.introductionText}</p>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                <h2 className={styles.subtitle}>{data.pagePrivacy.collectionInformationTitle}</h2>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                <h3 className={styles.name__text}>{data.pagePrivacy.collectionInformationSubtitle}</h3>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.3">
                <p className={styles.text}>{data.pagePrivacy.collectionInformationTextPartOne}</p>
            </AnimatedElement>
            <ul className={styles.list__container}>
                <AnimatedElement initialTransform="translateX(100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                    <li className={styles.list__item}>{data.pagePrivacy.collectionInformationItemOne}</li>
                </AnimatedElement>
                <AnimatedElement initialTransform="translateX(100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                    <li className={styles.list__item}>{data.pagePrivacy.collectionInformationItemTwo}</li>
                </AnimatedElement>
            </ul>
            <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.3">
                <p className={styles.text}>{data.pagePrivacy.collectionInformationTextPartTwo}</p>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                <h2 className={styles.subtitle}>{data.pagePrivacy.useInformationTitle}</h2>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                <h3 className={styles.name__text}>{data.pagePrivacy.useInformationSubtitle}</h3>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.3">
                <p className={styles.text}>{data.pagePrivacy.useInformationText}</p>
            </AnimatedElement>
            <ul className={styles.list__container}>
                <AnimatedElement initialTransform="translateX(100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                    <li className={styles.list__item}>{data.pagePrivacy.useInformationItemOne}</li>
                </AnimatedElement>
                <AnimatedElement initialTransform="translateX(100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                    <li className={styles.list__item}>{data.pagePrivacy.useInformationItemTwo}</li>
                </AnimatedElement>
                <AnimatedElement initialTransform="translateX(100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                    <li className={styles.list__item}>{data.pagePrivacy.useInformationItemThree}</li>
                </AnimatedElement>
            </ul>
            <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                <h2 className={styles.subtitle}>{data.pagePrivacy.localStorageTitle}</h2>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.3">
                <p className={styles.text}>{data.pagePrivacy.localStorageText}</p>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                <h2 className={styles.subtitle}>{data.pagePrivacy.thirdServicesTitle}</h2>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.3">
                <p className={styles.text}>{data.pagePrivacy.thirdServicesText}</p>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                <h2 className={styles.subtitle}>{data.pagePrivacy.dataSecurityTitle}</h2>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.3">
                <p className={styles.text}>{data.pagePrivacy.dataSecurityText}</p>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                <h2 className={styles.subtitle}>{data.pagePrivacy.yourRightsTitle}</h2>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                <h3 className={styles.name__text}>{data.pagePrivacy.yourRightsSubtitle}</h3>
            </AnimatedElement>
            <ul className={styles.list__container}>
                <AnimatedElement initialTransform="translateX(100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                    <li className={styles.list__item}>{data.pagePrivacy.yourRightsItemOne}</li>
                </AnimatedElement>
                <AnimatedElement initialTransform="translateX(100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                    <li className={styles.list__item}>{data.pagePrivacy.yourRightsItemTwo}</li>
                </AnimatedElement>
            </ul>
            <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.3">
                <p className={styles.text}>{data.pagePrivacy.yourRightsText}</p>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                <h2 className={styles.subtitle}>{data.pagePrivacy.policyChangesTitle}</h2>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.3">
                <p className={styles.text}>{data.pagePrivacy.policyChangesText}</p>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                <h2 className={styles.subtitle}>{data.pagePrivacy.contactsInfoTitle}</h2>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.3">
                <p className={styles.text}>{data.pagePrivacy.contactsInfoText}</p>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                <h3 className={styles.name__text}>{data.pagePrivacy.autorName}</h3>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.3">
                <div className={styles.contacts__email_container}>
                    <p className={`${styles.email__text} ${styles.text} `}>{data.pagePrivacy.emailText}</p>
                    <a href='mailto:puzyrevsky.andrei@mail.ru' 
                        target="_blank"
                        onClick={(e) => {
                            e.preventDefault();
                            copyToClipboard('puzyrevsky.andrei@mail.ru');
                            setTimeout(() => {
                            window.location.href = 'mailto:puzyrevsky.andrei@mail.ru';
                            }, 800);    
                        }} 
                        className={styles.email}
                    >{data.pagePrivacy.email}</a>
                </div>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.3">
                <p className={styles.text}>{data.pagePrivacy.dateText}</p>
            </AnimatedElement>
            <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.3">
                <Button sx={{color: '#ffffffcc', transition: '0.39s', fontSize: '14px', fontWeight: 'bold', backgroundColor: '#66CDAA', '&:hover': {backgroundColor: '#57b293', transition: '0.39s'},}} variant="contained" onClick={handlerClickOnPageBack}>{data.pagePrivacy.buttonBack} {namePreviousPageButton.textNav}</Button>
            </AnimatedElement>
        </div>
    )
}

export default PrivacyPolicy;
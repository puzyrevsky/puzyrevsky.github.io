import React, {useState, useEffect} from "react";
import { useLocation, useNavigate, Link, Outlet, NavLink } from 'react-router-dom';
import styles from "./Layout.module.css";
import { Context } from './App';
import Logo from "./components/Logo";

import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import Alert from '@mui/material/Alert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import AnimatedElement from "./components/AnimatedElement";

import linkedin from './img/linkedin.png';
import telegram from './img/telegram.png';
import mail from './img/mail.png';
import resume from './img/resume.png';


function Layout({language, prob, setLocation, secureBlockSortContainer, handlerHidingSortBlock, handlerDescriptionSite, setPreviousPageAdress, previousPageAdress, links, namePreviousPageButton, setNamePreviousPageButton, widthWrapperApp, handlerSavedCompletedAssessment, handlerShowAdvice, handlerClickButtonView, handlerTurnOnReminderEvaluate, handlerShowModalWindow, setHandlerShowModalWindow,}) {

    const [handlerMenuMobile, setHandlerMenuMobile] = useState(false);

    useEffect(() => {
        if(handlerShowAdvice && !handlerClickButtonView) {
            setHandlerMenuMobile(false);
        }
    }, [handlerShowAdvice, handlerClickButtonView]);


    const {data} = React.useContext(Context);

    let location = useLocation();

    const navigate = useNavigate();
    useEffect(() => {
        setLocation(location.pathname)
    }, [location.pathname])


    // 
    const arrayNamesButtonsBack = [...links, {link: '/portfolio/about/resume', textNav: data.resume.resumeTitle}];

    useEffect(() => {
        setNamePreviousPageButton(arrayNamesButtonsBack.find((item) => item.link === previousPageAdress))
    }, [language])

    // 

    useEffect(() => {
        setPreviousPageAdress(location.pathname == '/portfolio/privacy-policy' || location.pathname == '/portfolio/terms-use' ? previousPageAdress : location.pathname );
    }, [location.pathname]); // namePreviousPageButton
    

// className for About
    let classNameForResume;
    let classNameForResumeFooter;

    if(location.pathname === '/portfolio/about/resume' && widthWrapperApp >= 768) {
        classNameForResume = styles.nav__link
        classNameForResumeFooter = styles.footer__link
    }
    else if(location.pathname === '/portfolio/about/resume' && widthWrapperApp <= 768) {
        classNameForResume = styles.active__for_resume__not_line
        classNameForResumeFooter = styles.active__footer_link
    }
    else {
        classNameForResume = styles.active
        classNameForResumeFooter = styles.active__footer_link
    }

//

useEffect(() => {
    if(handlerMenuMobile === true) {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflowY = 'hidden';
    } else {
        document.body.style.overflow = '';
        document.documentElement.style.overflowY = '';
    }
}, [handlerMenuMobile]);

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


    return (
        <div style={{paddingRight: handlerDescriptionSite !== null || handlerShowModalWindow == true || handlerShowAdvice ? '12px' : ''}} className={styles.layout__container}>
            <div className={styles.wrapper}>
                <nav className={`${location.pathname == '/portfolio/projects' && !secureBlockSortContainer ? styles.nav__for_secure__block_sort__container : ''} ${!secureBlockSortContainer && handlerHidingSortBlock ? styles.nav__for_handler__hiding_sort__block : ''}`}>
                    <div style={{marginRight: handlerDescriptionSite !== null ? '12px' : ''}}> 
                        <ul style={{position: 'relative'}}>
                            <li style={{position: 'absolute', top: '-10px'}}>
                                <Logo />
                            </li>
                            <li>
                                <NavLink style={{marginLeft: '210px'}} to='/' className={styles.nav__link}>{data.layoutNav.home}</NavLink>
                            </li>
                            <li className={styles.link__nav_item}>
                                <NavLink to='about' className={({ isActive }) => isActive ? classNameForResume : styles.nav__link}>{data.layoutNav.about}</NavLink>
                            </li>
                            <li className={styles.link__nav_item}>
                                <NavLink to='projects' className={({ isActive }) => isActive ? styles.active : styles.nav__link}>{data.layoutNav.projects}</NavLink>
                            </li>
                            <li className={styles.link__nav_item}>
                                <NavLink to='achievements' className={({ isActive }) => isActive ? styles.active : styles.nav__link}>{data.layoutNav.achievements}</NavLink>
                            </li>
                            <li className={styles.link__nav_item} style={{paddingRight: '0px'}}>
                                <NavLink to='contacts' className={({ isActive }) => isActive ? styles.active : styles.nav__link}>{data.layoutNav.contact}</NavLink>
                            </li>
                            <li className={styles.link__nav_item__burger_container}>
                                {handlerTurnOnReminderEvaluate && !handlerSavedCompletedAssessment ?
                                    <div className={`${handlerMenuMobile ? styles.burger__container__active_menu : styles.burger__container}`} onClick={() => setHandlerMenuMobile((prev) => !prev)}>
                                        <div className={`${!handlerMenuMobile ? styles.line__tab_container : styles.line__tab_container__not_see}`}>
                                            <span className={styles.dot__tab}></span>
                                            <span className={styles.line__top_burger__with_tab}></span>
                                        </div>
                                        <span className={`${handlerMenuMobile ? styles.line__middle_burger__active_menu : styles.line__middle_burger}`}></span>
                                        <span className={`${handlerMenuMobile ? styles.line__bottom_burger__active_menu : styles.line__bottom_burger}`}></span>
                                    </div>
                                :
                                <div className={`${handlerMenuMobile ? styles.burger__container__active_menu : styles.burger__container}`} onClick={() => setHandlerMenuMobile((prev) => !prev)}>
                                    <span className={`${handlerMenuMobile ? styles.line__top_burger__active_menu : styles.line__top_burger}`}></span>
                                    <span className={`${handlerMenuMobile ? styles.line__middle_burger__active_menu : styles.line__middle_burger}`}></span>
                                    <span className={`${handlerMenuMobile ? styles.line__bottom_burger__active_menu : styles.line__bottom_burger}`}></span>
                                </div>}
                            </li>
                        </ul>
                    </div>
                </nav>
                {handlerNotificationCopyEmail && <Alert sx={{position: 'fixed', top: '65px', left: '50%', transform: 'translate(-50%, 0%)', zIndex: '100'}} severity={handlerSuccessfullyCopyEmail ? 'success' : 'error'} icon={handlerSuccessfullyCopyEmail ? <ContentCopyIcon fontSize="inherit" /> : <ErrorOutlineIcon fontSize="inherit" />}>{handlerSuccessfullyCopyEmail ? data.alertTextResultCopyEmail.successfully : data.alertTextResultCopyEmail.unsuccessfully}</Alert>}
                <div className={`${handlerMenuMobile ? styles.menu__container_active : styles.menu__container_no__active}`}>
                    <ul className={styles.list__links_menu__burger}>
                        <li className={styles.link__nav_item__menu}>
                            <NavLink to='/' onClick={() => setHandlerMenuMobile(false)} className={styles.nav__link_menu__burger}>{data.layoutNav.home}</NavLink>
                        </li>
                        <li className={styles.link__nav_item__menu}>
                            <NavLink to='about' onClick={() => setHandlerMenuMobile(false)} className={({ isActive }) => isActive ? classNameForResume : styles.nav__link_menu__burger}>{data.layoutNav.about}</NavLink>
                        </li>
                        <li className={styles.link__nav_item__menu}>
                            <NavLink to='projects' onClick={() => setHandlerMenuMobile(false)} className={({ isActive }) => isActive ? styles.active : styles.nav__link_menu__burger}>{data.layoutNav.projects}</NavLink>
                        </li>
                        <li className={styles.link__nav_item__menu}>
                            <NavLink to='achievements' onClick={() => setHandlerMenuMobile(false)} className={({ isActive }) => isActive ? styles.active : styles.nav__link_menu__burger}>{data.layoutNav.achievements}</NavLink>
                        </li>
                        <li className={styles.link__nav_item__menu} style={{paddingRight: '0px'}}>
                            <NavLink to='contacts' onClick={() => setHandlerMenuMobile(false)} className={({ isActive }) => isActive ? styles.active : styles.nav__link_menu__burger}>{data.layoutNav.contact}</NavLink>
                        </li>
                    </ul>
                    {handlerTurnOnReminderEvaluate && !handlerSavedCompletedAssessment &&
                        <Badge badgeContent={<StarHalfIcon sx={{fontSize: '22px', color: '#FFD700',}} />} color="secondary" sx={{'& .MuiBadge-badge': {
                            backgroundColor: "#FF4500",
                            width: '30px', // Ширина бейджа
                            height: '30px', // Высота бейджа
                            borderRadius: '50%', // Сделать круг
                            padding: '5px', // Добавить внутренние отступы для иконки
                            }, marginTop: '50px', marginLeft: '43%', '@media (max-width: 500px)': {marginLeft: '40%',},}} anchorOrigin={{vertical: 'top', horizontal: 'right',}}>
                                <Button variant='contained' sx={{backgroundColor: '#425063',}} onClick={() => {
                                    setHandlerShowModalWindow(true);
                                    setHandlerMenuMobile(false);
                                }}>{data.modalWindowEvaluation.rateButton}</Button>
                        </Badge>
                    }
                </div>
                <Outlet style={{zIndex: '30'}} />
                <footer style={{backgroundColor: '#3a3f4a', borderRadius: '13px 13px 0 0', marginTop: '80px', padding: '50px 50px 30px 50px', }}>
                    <div className={styles.footer__container}>
                        <div className={styles.footer__logo_container}>
                            <Logo />
                        </div>
                        <div className={styles.footer__content_container}>
                            <AnimatedElement initialTransform="translateY(27px)" finalTransform="translateY(0)" rootMargin="7px 0px -7px 0px" threshold="0.1">
                                <div>
                                    <ul style={{display: 'flex', flexDirection: 'column'}}>
                                        <li>
                                            <NavLink to='/' className={styles.footer__link}>{data.layoutNav.home}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to='about' className={({ isActive }) => isActive ? classNameForResumeFooter : styles.footer__link}>{data.layoutNav.about}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to='projects' className={({ isActive }) => isActive ? styles.active__footer_link : styles.footer__link}>{data.layoutNav.projects}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to='achievements' className={({ isActive }) => isActive ? styles.active__footer_link : styles.footer__link}>{data.layoutNav.achievements}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to='contacts' className={({ isActive }) => isActive ? styles.active__footer_link : styles.footer__link}>{data.layoutNav.contact}</NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </AnimatedElement>
                            <AnimatedElement initialTransform="translateY(27px)" finalTransform="translateY(0)" rootMargin="7px 0px -7px 0px" threshold="0.1">
                                <div>
                                    <ul>
                                        <li>
                                            <a href="https://t.me/Puzyrevsky" target="_blank" className={styles.link__icon}>
                                                <img src={telegram} alt='Telegram' title='Telegram' className={styles.img__icon}/>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.linkedin.com/in/puzyrevsky/" target="_blank" className={styles.link__icon}>
                                                <img src={linkedin} alt='Linkedin' title='Linkedin' className={styles.img__icon}/>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="mailto:puzyrevsky.andrei@mail.ru"
                                                className={styles.link__icon}
                                                target="_blank"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    copyToClipboard('puzyrevsky.andrei@mail.ru');
                                                    setTimeout(() => {
                                                    window.location.href = 'mailto:puzyrevsky.andrei@mail.ru';
                                                    }, 800);    
                                                }}
                                            >
                                                <img src={mail} alt='Mail' title='E-mail' className={styles.img__icon}/>
                                            </a>
                                        </li>
                                        <li>
                                            <Link to="about/resume" className={styles.link__icon}>
                                                <img src={resume} alt='Resume' title='Resume' className={styles.img__icon}/>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </AnimatedElement>
                            <AnimatedElement initialTransform="translateY(27px)" finalTransform="translateY(0)" rootMargin="7px 0px -7px 0px" threshold="0.1">
                                <div>
                                    <ul className={styles.rules__list}>
                                        <li className={styles.rules__item}>
                                            <NavLink to="privacy-policy" onClick={() => setNamePreviousPageButton(arrayNamesButtonsBack.find((item) => item.link === previousPageAdress))} className={({ isActive }) => isActive ? styles.active__footer_link : styles.footer__link}>
                                                {data.footer.privacy}
                                            </NavLink>
                                        </li>
                                        <li className={styles.rules__item}>
                                            <NavLink to="terms-use" onClick={() => setNamePreviousPageButton(arrayNamesButtonsBack.find((item) => item.link === previousPageAdress))} className={({ isActive }) => isActive ? styles.active__footer_link : styles.footer__link}>
                                                {data.footer.terms}
                                            </NavLink>
                                        </li>
                                    
                                    </ul>
                                </div>
                            </AnimatedElement>
                        </div>
                    </div>
                    <AnimatedElement initialTransform="scale(0.8)" finalTransform="scale(1)" rootMargin="-70px 0px -55px 0px" threshold="0.1">
                        <div className={styles.rights__container}>
                            <p className={styles.rights__text}>{data.footer.created}</p>
                        </div>
                    </AnimatedElement>
                </footer>
            </div>
            
        </div>
    )
}

export default Layout;
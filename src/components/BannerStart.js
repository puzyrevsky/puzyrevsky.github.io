import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Link, Route, Routes } from "react-router-dom";
import { useInView } from 'react-intersection-observer';
import Layout from "../Layout";

import moment from 'moment';

import Slider from "react-slick";

import InfoDisplay from './InfoDisplay';

import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import styles from "./BannerStart.module.css"

import avatar from "../img/ava3.webp";
import user from '../img/user.png';
import linkedin from '../img/linkedin.png';
import telegram from '../img/telegram.png';
import mail from '../img/mail.png';
import resume from '../img/resume.png';
import rocket from '../img/cursor-rocket.png'

import Star from './Star';

import { Context } from "../App";

import { statistics, skills, reviews, services, projects, partners } from '../data/ArrayBannerInfo';



function BannerStart({prob, setProb, widthWrapperApp, language, links}) {

const {data, toggleLanguage} = React.useContext(Context);

const navigate = useNavigate();

const [turnOnLoading, setTurnOnLoading] = useState(false);

const messageTextAnswer = [data.messageOfClient.about, data.messageOfClient.portfolio, data.messageOfClient.achievements, data.messageOfClient.contacts];

const delayTransition = (event, index) => {
  event.preventDefault(); // Предотвращаем стандартное действие
  setTimeout(() => navigate(links[index].link), 2500); // Используем setTimeout для задержки
  setHandlerStyleMessangeAnswer(true);
  setHandlerVisibilityNav(false); // ?
  setIndexTextAnswer(index);
  setTurnOnLoading(true);

  setProb(prev => !prev);
}

    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);
    const [showCursor, setShowCursor] = useState(true);
    const [indexTextAnswer, setIndexTextAnswer] = useState(null);


    const [handlerStylesMessage, setHandlerStylesMessage] = useState(false);
    const [handlerStyleMessangeAnswer, setHandlerStyleMessangeAnswer] = useState(false);
    const [handlerVisibilityNav, setHandlerVisibilityNav] = useState(false);

    useEffect(() => {
        let timer;
        let cursorTimer = setTimeout(() => setShowCursor(!showCursor), 180);
    
        const currentText = data.messageOfDeveloper.listServices[currentIndex];
        
        
        if (isDeleting) {
          timer = setTimeout(() => {
            setText(currentText.substring(0, text.length - 1));
            setTypingSpeed(30); //30
          }, typingSpeed);
        } else {
          timer = setTimeout(() => {
            setText(currentText.substring(0, text.length + 1));
            setTypingSpeed(150); //200
          }, typingSpeed);
        }
    
        if (!isDeleting && text === currentText) {
          setTimeout(() => setIsDeleting(true), 500);
        } else if (isDeleting && text === '') {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % data.messageOfDeveloper.listServices.length);
          setTypingSpeed(150);
        }
    
        return () => {
          clearTimeout(timer);
          clearTimeout(cursorTimer);
        };
    }, [text, isDeleting, currentIndex, typingSpeed, showCursor]);

    useEffect(() => {
      setTimeout(() => {
        setHandlerStylesMessage(true);
      }, 250);
        setHandlerVisibilityNav(true);
    }, []);


    const [timeSendingMessageDeveloper, setTimeSendingMessageDeveloper] = useState('');

    useEffect(() => {
      setTimeSendingMessageDeveloper(moment().format('HH:mm'))
    }, []);


    const [timeSendingMessageUser, setTimeSendingMessageUser] = useState('');

    useEffect(() => {
      setTimeSendingMessageUser(moment().format('HH:mm'))
    }, [handlerStyleMessangeAnswer]);

    //

    const [quantityStarArray, setQuantityStarArray] = useState([]);

    //

    const [writeAnimationMessage, setWriteAnimationMessage] = useState(false);

    useEffect(() => {
      let timer; 

      timer = setTimeout(() => {
        setWriteAnimationMessage(true);
      }, 2000);

      return () => clearTimeout(timer);
    }, [])

    const [movementPen, setMovementPen] = useState(true);

    useEffect(() => {
      let interval;

      interval = setInterval(() => {
        setMovementPen(value => !value);
      }, 200);

      return () => clearInterval(interval);
    }, [])
    
    //

    useEffect(() => {
        let newRestrictions;

        if(widthWrapperApp >= 1800) {
            newRestrictions = {min: 1, max: 125};
        }
        if(widthWrapperApp >= 1200 && widthWrapperApp < 1800) {
            newRestrictions = {min: 1, max: 90};
        }
        if(widthWrapperApp >= 600 && widthWrapperApp < 1200) {
            newRestrictions = {min: 1, max: 60};
        }
        if(widthWrapperApp < 600) {
            newRestrictions = {min: 1, max: 30}; 
        } 

        const starts = []
        for(let i = newRestrictions.min; i <= newRestrictions.max; i++ ) {
            starts.push(i);
        }
        setQuantityStarArray(starts)
    }, [widthWrapperApp]);


const [isHovered, setIsHovered] = useState(false);


useEffect(() => {
  if(isHovered) {
    document.body.style.overflowY = 'hidden';
    setTimeout(() => {
      setIsHovered(false);
    }, 15000);
  } else {
    document.body.style.overflowY = 'hidden';
  }
}, [isHovered])

const [startTop, setStartTop] = useState(`${10 + Math.random() * 70}%`);
const [endTop, setEndTop] = useState(`${10 + Math.random() * 70}%`);


const wreckageQuantity = 150;
const [color, setColor] = useState(['black', 'rgb(65, 65, 127)', 'brown']);

//

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};

const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 992);
  };

  handleResize(); // Проверяем начальное состояние
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);


const [refElementStart, inViewElementStart] = useInView({
  threshold: 0.9,
});

const [refElementEnd, inViewElementEnd] = useInView({
  threshold: 0.9,
});

const [handlerViewTranslucency, setHandlerViewTranslucency] = useState(0);

useEffect(() => {
  if(inViewElementStart) {
    setHandlerViewTranslucency((prev) => {
      const result = prev +1;
      return result;
    });
  }
}, [inViewElementStart]);




const contentWindowWrapperRef = useRef(null);
const [scrollPosition, setScrollPosition] = useState(0);
const [handlerScrollManuallyUser, setHandlerScrollManuallyUser] = useState(false);
const intervalTime = 1500;
let sectionWidthPercent = 1;

const updateScrollPercentage = () => {
  if(window.innerWidth < 768) {
    sectionWidthPercent = 10;
  } else if(window.innerWidth < 820 && widthWrapperApp >= 768) {
    sectionWidthPercent = 3;
  } else if (window.innerWidth >= 820 && widthWrapperApp < 860) {
    sectionWidthPercent = 2;
  } else if (window.innerWidth >= 860 && widthWrapperApp < 880) {
    sectionWidthPercent = 1;
  } else if (window.innerWidth >= 880) {
    sectionWidthPercent = 0;
  }
}

const autoScroll = () => {
  if(!handlerScrollManuallyUser && contentWindowWrapperRef.current) {
    const container = contentWindowWrapperRef.current;
    const currentScrollLeft = container.scrollLeft;
    const containerWidth = container.scrollWidth;
    const viewportWidth = container.clientWidth;

    let newScrollLeft = currentScrollLeft + (sectionWidthPercent / 100) * containerWidth;
    
    if (Math.abs(newScrollLeft - scrollPosition) > 1) {
      if (newScrollLeft >= container.scrollWidth - viewportWidth) {
        setScrollPosition(0);
        container.scrollTo({
          left: container.scrollWidth - viewportWidth,
          behavior: 'smooth' // Плавная прокрутка
        });

        // Пауза 2 секунды, затем возвращаемся к началу
        const timeout = setTimeout(() => {
          container.scrollTo({
            left: 0,
            behavior: 'smooth',
          });
        }, 4500);

        // Очищаем таймер при повторном вызове функции
        return () => clearTimeout(timeout);


      
      } else {
        setScrollPosition(newScrollLeft);
        container.scrollTo({
          left: newScrollLeft,
          behavior: 'smooth',
        });
      }
    }
  }
};



const handleUserInteraction = () => {
  setHandlerScrollManuallyUser(true);
  setTimeout(() => {
    setHandlerScrollManuallyUser(false);
  }, 4500);
};

useEffect(() => {
  updateScrollPercentage();

  const interval = setInterval(autoScroll, intervalTime);

  return () => clearInterval(interval);

}, [handlerScrollManuallyUser])



useEffect(() => {
  const container = contentWindowWrapperRef.current;

  if(container) {
    container.addEventListener('scroll', handleUserInteraction);
    container.addEventListener('touchstart', handleUserInteraction);
    container.addEventListener('wheel', handleUserInteraction);
    container.addEventListener('mousedown', handleUserInteraction);
  }

  return () => {
    if(container) {
      container.removeEventListener('scroll', handleUserInteraction);
      container.removeEventListener('touchstart', handleUserInteraction);
      container.removeEventListener('wheel', handleUserInteraction);
      container.removeEventListener('mousedown', handleUserInteraction);
    }
  };
}, []);


const [transfusion, setTransfusion] = useState(true);

useEffect(() => {
  const interval = setInterval(() => {
    setTransfusion((prev) => !prev);
  }, 9000);

  return () => clearInterval(interval);
}, [])

// function copy email

const [handlerNotificationCopyEmail, setHandlerNotificationCopyEmail] = useState(false);
const [handlerSuccessfullyCopyEmail, setHandlerSuccessfullyCopyEmail] = useState(true);

// console.log('handlerSuccessfullyCopyEmail:', handlerSuccessfullyCopyEmail);

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


useEffect(() => {
  const timeout = setTimeout(() => {
    document.documentElement.style.backgroundColor = '';
  }, 1000);

  return () => {
    clearTimeout(timeout)
  };
}, [])

    return (
        <div className={styles.banner} >
          <div className={styles.wrapper__star}>
            <div className={styles.window__container}>
                <div className={styles.line__top_window}></div>
                <div className={`${transfusion ? styles.transfusion__effect : styles.transfusion__no_effect}`}></div>
                <div className={styles.profile__developer_container}>
                  <div style={{maxWidth: '240px', display: 'flex', alignItems: 'center', flexDirection: 'column', }}>
                    <img className={styles.avatar__developer} src={avatar} alt="avatar__developer" />
                    <h1 className={styles.name__text_developer}>{data.messageOfDeveloper.nameDeveloper}</h1>
                    <p className={styles.profession__text_developer}>{data.messageOfDeveloper.profession}</p>
                  </div>
                  <div className={styles.chat__container}>
                    <div className={`${styles.message__developer} ${!writeAnimationMessage ? styles.message__developer_height__smoll : styles.message__developer_height__big}`}>
                      {writeAnimationMessage ? 
                        <div style={{backgroundColor: '#333645', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                          <p className={styles.text__message_developer}>{data.messageOfDeveloper.messageGreetings}</p> 
                          <div className={styles.text__typing_message__container}>
                            <p className={styles.preview__text_typing__message}>{data.messageOfDeveloper.servicesName}</p>
                            <div className={styles.text__typing_message__cursor_container}>
                              <span className={styles.text__typing_message}>{text}</span>
                              <span style={{ opacity: showCursor ? 1 : 0, transition: '0.5s', color: "white", marginLeft: '2px', fontSize: '14px',}}>|</span>
                            </div>
                          </div>
                          <p className={styles.text__message_developer}>{data.messageOfDeveloper.messageInvitationVisit}</p>
                          <p className={styles.time__message_developer}>{timeSendingMessageDeveloper}</p>
                      </div> : <div className={styles.write__message_sample}><p className={styles.text__write_message__sample}>{data.messageOfDeveloper.writes}</p> <CreateIcon sx={{transform: movementPen ? 'translateX(8px)' : 'translateX(0px)', transition: 'transform 0.2s', color: '#939393'}} /></div>}
                    </div>
                    {handlerStyleMessangeAnswer && <div className={styles.message__client_container}>
                        <p className={styles.text__answer}>{messageTextAnswer[indexTextAnswer]}</p>
                        <div className={styles.time__avatar_container}>
                          <i className={styles.numbers__time_message}>{timeSendingMessageUser}</i>
                          <div className={styles.avatar__user_container}>
                            <img src={user} alt="avatar" className={styles.avatar} />
                          </div>
                        </div>
                    </div>}
                  </div>
                </div>
                <div className={styles.info__window_container}>
                  {turnOnLoading && <div className={styles.loading__container}>
                    <Box sx={{ display: 'flex' }}>
                      <CircularProgress />
                    </Box>
                  </div>}
                  {writeAnimationMessage && <div className={styles.quick__answers_section__container}>
                    <div className={styles.empty__block_for__space}></div>
                      {handlerVisibilityNav && <div className={styles.clue__answer_container}>
                        {links.map((link, index) =>  (
                          <Button variant="contained" sx={{borderRadius: '13px 13px 0 13px', marginLeft: '23px', color: '#D3D3D3', backgroundColor: '#5A4B4B', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)', '&:hover': {backgroundColor: '#6A5C5C', color: '#FFFFFF'}, '@media (max-width: 916px)': {marginLeft: '10px', fontSize: '12px',}, '@media (max-width: 524px)': {padding: '3px 7px'}, '@media (max-width: 440px)': {flexBasis: '40%', marginLeft: '0px',},}} key={index} onClick={(event) => {delayTransition(event, index);}}>{link.textNav}</Button>
                        ))}
                      </div>}
                  </div>}
                  <div className={styles.content__window_wrapper}>
                    <p className={styles.motto__text}>{data.bannerWindowInfo.motto}</p>
                    <div className={styles.content__wrapper}>
                      {!inViewElementStart && handlerViewTranslucency < 2 && <div className={styles.block__translucency_before}></div>}
                      {!inViewElementEnd && handlerViewTranslucency < 2 && <div className={styles.block__translucency_after}></div>}
                      <div ref={contentWindowWrapperRef} className={styles.content__window}>
                        <div style={{maxWidth: '830px', width: '100%', whiteSpace: 'nowrap'}}>
                          <div style={{whiteSpace: 'nowrap', display: 'flex'}}>
                              <div className={styles.content__window_mini__container_one}>
                                  <div className={styles.portfolio__services_container}>
                                      <InfoDisplay language={language} width='200px' height='100px' title={data.bannerWindowInfo.titleInfoDisplay[0]} size='double' array={partners} time={1500}>
                                          <p style={{margin: 0}}>Логотипы</p>
                                      </InfoDisplay>
                                      <InfoDisplay language={language} width='100px' height='100px' title={data.bannerWindowInfo.titleInfoDisplay[1]} size='smoll' array={statistics} time={2000} number={true}>
                                          <p style={{margin: 0}}>Портфолио в числах</p>
                                      </InfoDisplay>
                                  </div>
                                  <div ref={refElementStart} className={styles.companies__reviews_container}>
                                      <InfoDisplay language={language} width='100px' height='100px' title={data.bannerWindowInfo.titleInfoDisplay[2]} size='smoll' array={services} time={1800}>
                                          <p style={{margin: 0}}>Услуги</p>
                                      </InfoDisplay>
                                      <InfoDisplay language={language} width='200px' height='100px' title={data.bannerWindowInfo.titleInfoDisplay[3]} size='middle' array={reviews} time={3000}>
                                          <p style={{margin: 0}}>Отзывы</p>
                                      </InfoDisplay>
                                  </div>
                              </div>
                              <div style={{display: 'flex'}}>
                                  <div className={styles.projects_container}>
                                      <InfoDisplay language={language} width='350px' height='220px' title={data.bannerWindowInfo.titleInfoDisplay[4]} size='big' array={projects} time={4000}>
                                          <p style={{margin: 0}}>Проекты</p>
                                      </InfoDisplay>
                                  </div>
                                  <div ref={refElementEnd} className={styles.skills__contacts_container}>
                                      <InfoDisplay language={language} width='100px' height='100px' title={data.bannerWindowInfo.titleInfoDisplay[5]} size='smoll' array={skills} time={2600} technologies={true}>
                                          <p style={{margin: 0}}>Навыки</p>
                                      </InfoDisplay>
                                      <div className={styles.img__icon_container}>
                                          <div className={styles.icon__container_line__one}>
                                              <a href="https://t.me/Puzyrevsky" target="_blank" className={styles.link__icon}>
                                                  <img src={telegram} title='Telegram' alt="Telegram" className={styles.img__icon} />
                                              </a>
                                              <a href="https://www.linkedin.com/in/puzyrevsky/" target="_blank" className={styles.link__icon}>
                                                  <img src={linkedin} title='Linkedin' alt="Linkedin" className={styles.img__icon} />
                                              </a>
                                          </div>
                                          <div className={styles.icon__container_line__two}>
                                              <a href="mailto:puzyrevsky.andrei@mail.ru" target="_blank" onClick={(e) => {
                                                e.preventDefault();
                                                copyToClipboard('puzyrevsky.andrei@mail.ru');
                                                setTimeout(() => {
                                                  window.location.href = 'mailto:puzyrevsky.andrei@mail.ru';
                                                }, 800);
                                              }} 
                                              className={styles.link__icon}>
                                                  <img src={mail} title='E-mail' alt="Mail" className={styles.img__icon} />
                                              </a>
                                              <Link to="portfolio/about/resume" className={styles.link__icon}>
                                                  <img src={resume} title='Resume' alt="Resume" className={styles.img__icon} />
                                              </Link>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
           
          </div>
          {handlerNotificationCopyEmail && <Alert sx={{position: 'fixed', top: '5px', zIndex: '100'}} severity={handlerSuccessfullyCopyEmail ? 'success' : 'error'} icon={handlerSuccessfullyCopyEmail ? <ContentCopyIcon fontSize="inherit" /> : <ErrorOutlineIcon fontSize="inherit" />}>{handlerSuccessfullyCopyEmail ? data.alertTextResultCopyEmail.successfully : data.alertTextResultCopyEmail.unsuccessfully}</Alert>}
          <div className={styles.window__location_container}>
          </div>
          </div>
          {quantityStarArray.map((star, index) => (
              <Star key={index} />
          ))}            
        </div>
    )
}

export default BannerStart;
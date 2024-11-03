import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';



import { Context } from "../App";

import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { StyleTwoTone } from '@mui/icons-material';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CircularProgress from '@mui/material/CircularProgress';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';


import AnimatedElement from './AnimatedElement';

import styles from './Projects.module.css'

import { arrayNamesSortPortfolio, arrayContentPortfolio, arrayContentPersonalProjects } from '../data/ArrayPortfolio';
import { green, grey } from '@mui/material/colors';


function Projects ({language, handlerDescriptionSite, setHandlerDescriptionSite, handlerHidingSortBlock, setHandlerHidingSortBlock, secureBlockSortContainer, setSecureBlockSortContainer, handlerClickButtonView, setHandlerClickButtonView, handlerShowAdvice, setHandlerShowAdvice, handlerScrollAfterAdvice, setHandlerScrollAfterAdvice, timerTransitionLink, setTimerTransitionLink, location, widthWrapperApp}) {

// loading spiner 

const [loadingSpiner, setLoadingSpiner] = useState(true);

useEffect(() => {
    const timer = setTimeout(() => {
        setLoadingSpiner(false);
    }, 300);
    setHandlerDescriptionSite(null);
}, [])

// 

const {ref: refLastBlockPortfolio, inView: inViewLastBlockPortfolio} = useInView({threshold: 0.5, rootMargin: '0px 0px 0px 0px',});

const {ref: refPersonalProjects, inView: inViewPersonalProjects} = useInView({threshold: 0.1, rootMargin: '0px 0px 0px 0px',});


const [animationPushUpSortingBlock, setAnimationPushUpSortingBlock] = useState(false)


useEffect(() => {
    if(inViewLastBlockPortfolio == false && inViewPersonalProjects == true) {
        setAnimationPushUpSortingBlock(true)
        setTimeout(() => {
            setHandlerHidingSortBlock(true);
        }, 80);
    } else {
        setAnimationPushUpSortingBlock(false)
        setTimeout(() => {
        setHandlerHidingSortBlock(false);
            
        }, 80);
    }
}, [inViewLastBlockPortfolio, inViewPersonalProjects])
// 

// sort block commit handler
const {ref: refPortfolioProjects, inView: inViewPortfolioProjects} = useInView({threshold: 0.1, rootMargin: '-4px 0px 0px 0px',});

const [loadingStyleForSecureBlockSort, setLoadingStyleForSecureBlockSort] = useState(false);


useEffect(() => {
    setSecureBlockSortContainer(inViewPortfolioProjects) 
}, [inViewPortfolioProjects])


useEffect(() => {
    setTimeout(() => {
        setLoadingStyleForSecureBlockSort(true);
    }, 100);
}, [])

// 

const [handlerForContentOnButtonsSorting, setHandlerForContentOnButtonsSorting] = useState(true)

useEffect(() => {
    const timer = setTimeout(() => {
        setHandlerForContentOnButtonsSorting(inViewPortfolioProjects);
      }, 80);
  
      return () => clearTimeout(timer);
}, [inViewPortfolioProjects])


    const [animationOverflowAdvice, setAnimationOverflowAdvice] = useState(false);
    const [delayAppearanceContentAdvice, setDelayAppearanceContentAdvice] = useState(false);
    const [handlerIsDisabledClickOverlayAdvice, setHandlerIsDisabledClickOverlayAdvice] = useState(true);
    
    useEffect(() => {

        let timeoutDelay;
        let timeoutAnimation;
        let timeoutIsDisabled;

        if(handlerShowAdvice && !handlerClickButtonView) {
            document.body.style.pointerEvents = 'none';

            timeoutDelay = setTimeout(() => {
                setDelayAppearanceContentAdvice(true);
            }, 20);

            timeoutAnimation = setTimeout(() => {
                setAnimationOverflowAdvice(true);
            }, 350);

            timeoutIsDisabled = setTimeout(() => {
                setHandlerIsDisabledClickOverlayAdvice(false);
                document.body.style.pointerEvents = 'auto';
            }, 1200);
        }
    
        return () => {
            document.body.style.pointerEvents = '';
            clearTimeout(timeoutDelay);
            clearTimeout(timeoutAnimation);
            clearTimeout(timeoutIsDisabled);
        }
    }, [handlerShowAdvice, handlerClickButtonView])

// handler animation for change view miniature and devaises 
    const [animatedElementOff, setAnimatedElementOff] = useState(false);

    useEffect(() => {
        if(animatedElementOff) {
            setTimeout(() => {
                setAnimatedElementOff(false);
            }, 700);
        }
    }, [animatedElementOff])
// 

// handler start advice
    const storedData = localStorage.getItem('handlerStartAdvice');
    const handlerStartAdvice = JSON.parse(storedData);

    useEffect(() => {
        
        if(handlerStartAdvice == null) {
            let interval;
            if(location === '/portfolio/projects' && timerTransitionLink < 3) {
                interval = setInterval(() => {
                    setTimerTransitionLink(prev => prev + 0.5);
                }, 500);
            } 

            return () => clearInterval(interval);
        }
        

    }, [handlerStartAdvice, location, timerTransitionLink]);

// 

    const [sortTypeProjects, setSortTypeProjects] = useState('all');

    const [lookOnDevaises, setLookOnDevaises] = useState(false);

    const [buttonIsInactive, setButtonIsInactive] = useState(false);
    const [handlerAnimationDevaiseMiniature, setHandlerAnimationDevaiseMiniature] = useState('miniature');
    const [animationMiniatureRenderingStart, setAnimationMiniatureRenderingStart] = useState(false);
    const [animationDevaiseStart, setAnimationDevaiseStart] = useState(false);
    const [animationDevaiseFinish, setAnimationDevaiseFinish] = useState(false);
    const [animationMiniatureStart, setAnimationMiniatureStart] = useState(false);
    const [animationMiniatureFinish, setAnimationMiniatureFinish] = useState(false);

    const [deviceApproachAnimation, setDeviceApproachAnimation] = useState(false);

// 

    const changePortfolioView = () => {
        
        window.scrollTo({top: secureBlockSortContainer ? 0 : 123});

        setAnimatedElementOff(true);

        setHandlerClickButtonView(true);
        setButtonIsInactive(true);
        setTimeout(() => {
            setLookOnDevaises(prevState => !prevState);
            setDeviceApproachAnimation(true);
        }, 500);
        setHandlerAnimationDevaiseMiniature(handlerAnimationDevaiseMiniature === 'miniature' ? 'devaise' : 'miniature');
        if(handlerAnimationDevaiseMiniature === 'miniature') {
            setAnimationMiniatureFinish(true);
            setTimeout(() => {
                setAnimationMiniatureFinish(false);
                setAnimationDevaiseStart(true);
            }, 500);
            setTimeout(() => {
                setAnimationDevaiseStart(false);
                setButtonIsInactive(false);
            }, 1000);
        } 


        if(handlerAnimationDevaiseMiniature === 'devaise') {
            setAnimationDevaiseFinish(true);
            setTimeout(() => {
                setAnimationDevaiseFinish(false)
                setAnimationMiniatureStart(true);
            }, 500);
            setTimeout(() => {
                setAnimationMiniatureStart(false);
                setButtonIsInactive(false);
            }, 1000);
        } 
        
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimationMiniatureRenderingStart(false);
        }, 700);

        return () => clearTimeout(timer);
    }, [])
 
    useEffect(() => {
        if (handlerDescriptionSite !== null) {
            document.body.classList.add('no__scroll');
            document.documentElement.classList.add('no__scroll');
        } else {
            document.body.classList.remove('no__scroll');
            document.documentElement.classList.remove('no__scroll');
        }
    
        return () => {
            document.body.classList.remove('no__scroll');
            document.documentElement.classList.remove('no__scroll');
        };
    }, [handlerDescriptionSite]);


    useEffect(() => {
        
        let timeout;

        if(handlerShowAdvice && !handlerClickButtonView) {
            document.documentElement.style.overflow = 'hidden';
        }

        if(handlerShowAdvice && !handlerClickButtonView && handlerDescriptionSite == null && timerTransitionLink == 3 ) {
            timeout = setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth" // для мгновенной прокрутки
                  });     
            }, 120);
            
        }

        if(handlerScrollAfterAdvice) {
            document.body.style.height = '';
        }

        return () => {
            document.body.style.height = '';
            document.documentElement.style.overflow = '';
            clearTimeout(timeout);
        }
    }, [handlerShowAdvice, handlerClickButtonView, timerTransitionLink])


    useEffect(() => {
        if(lookOnDevaises === true) {
            setSortTypeProjects('all');
        };
        if(lookOnDevaises === false) {
            setSortTypeProjects('all');
        };
    }, [lookOnDevaises])


    const filteredArrayContentPortfolio = arrayContentPortfolio.filter((item) => item.type === sortTypeProjects )

    
    const {data} = React.useContext(Context);

// Personal projects start

useEffect(() => {
    // Функция, которая вызывается при изменении видимости вкладки
    const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
            setHandlerClickButtonCardProjects(arrayContentPersonalProjects.map(() => false))
        } 
    };

    // Добавление слушателя событий на изменение видимости вкладки
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Очистка слушателя при размонтировании компонента
    return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
}, []);


const [handlerClickButtonCardProjects, setHandlerClickButtonCardProjects] = useState(arrayContentPersonalProjects.map(() => false))


const toggleCardVisibility = (index) => {
    setHandlerClickButtonCardProjects(
        handlerClickButtonCardProjects.map((item, idx) => (idx === index ? !item : false))
    )
} 


const [numberImageDescriptionProjects, setNumberImageDescriptionProjects] = useState({imageActiv: 0, imageMaxNumber: 0});


const [startSwitchingImageDescription, setStartSwitchingImageDescription] = useState(false);

useEffect(() => {
    if (handlerClickButtonCardProjects.some(item => item)) {
        setStartSwitchingImageDescription(true);
    } else {
        setStartSwitchingImageDescription(false);
    }
}, [handlerClickButtonCardProjects]);


useEffect(() => {
    const maxNumber = numberImageDescriptionProjects.imageMaxNumber - 1;
    let timer;

    const updateImage = () => {
        setNumberImageDescriptionProjects(prevState => ({
            ...prevState,
            imageActiv: prevState.imageActiv === maxNumber ? 0 : prevState.imageActiv + 1
        }));
    };

    if (startSwitchingImageDescription) {
        clearInterval(timer);
        timer = setInterval(updateImage, 7000);
    } else {
        clearInterval(timer);  // Очищаем таймер при остановке анимации
    }

    return () => clearInterval(timer);  // Очищаем таймер при размонтировании компонента
}, [startSwitchingImageDescription, numberImageDescriptionProjects.imageMaxNumber]);


// 

const [progress, setProgress] = useState(0);

useEffect(() => {
    const intervalTime = 7000;
    const updateInterval = 100; // Обновляем прогресс каждые 100 мс
    let timer = null;

    if (startSwitchingImageDescription) {
        // Установка начального значения прогресса при смене карточки
        setProgress(0);
        timer = setInterval(() => {
            setProgress(oldProgress => {
                const newProgress = oldProgress + (updateInterval / intervalTime) * 100;
                return newProgress >= 100 ? 0 : newProgress;
            });
        }, updateInterval);
        return () => clearInterval(timer);
    } else {
        clearInterval(timer);
        setProgress(0);
    }

    return () => clearInterval(timer);
}, [startSwitchingImageDescription, numberImageDescriptionProjects.imageMaxNumber]);

    const [handlerOpenCardProjects, setHandlerOpenCardProjects] = useState(false);

    const opaningCardProjects = (index) => {
        setHandlerOpenCardProjects(prevState => !prevState); // Если это состояние должно переключаться
        setNumberImageDescriptionProjects(prevState => ({
            ...prevState,
            imageActiv: 0,
        }));
        setProgress(0); // Сброс прогресса
        setStartSwitchingImageDescription(true); // Перезапуск процесса показа изображений
    };

    const resetAndRestartTimer = () => {
        setStartSwitchingImageDescription(false); // Остановить таймер
        setTimeout(() => {
            setStartSwitchingImageDescription(true); // Перезапустить таймер
        }, 0);
    }

    const [showButtonTransitionImage, setShowButtonTransitionImage] = useState(false);
    const [timerId, setTimerId] = useState(null);

    const handleButtonClick = () => {
        // Очищаем текущий таймер, если он существует
        if (timerId) {
            clearTimeout(timerId);
        }

        // Показываем кнопки
        setShowButtonTransitionImage(true);

        // Запускаем таймер для скрытия кнопок через 3 секунды и сохраняем его идентификатор
        const newTimerId = setTimeout(() => {
            setShowButtonTransitionImage(false);
            setTimerId(null); // Очищаем ID таймера в состоянии после его выполнения
        }, 3000);

        setTimerId(newTimerId);
    };

    // Очистка таймера при размонтировании компонента
    useEffect(() => {
        return () => {
            if (timerId) {
                clearTimeout(timerId);
            }
        };
    }, [timerId]);

// 

    const history = useNavigate();
    const processingTransitionToProject = (link, e) => {
        e.preventDefault();
        history(link);
    }

// 
    
return (
    <div className={styles.wrapper__projects}>
        {loadingSpiner && <div className={styles.spiner__container} > 
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <CircularProgress />
                <p className={styles.text__loading}>{data.projects.loadingText}</p>
            </Box>
        </div>}
        
        <div className={styles.wrapper__projects_content} style={{opacity: !loadingSpiner ? 1 : 0}}>
            {handlerShowAdvice && !handlerClickButtonView && 
                <div className={styles.overlay__for_advice}
                    style={{pointerEvents: handlerIsDisabledClickOverlayAdvice ? 'none' : 'auto'}}
                    onClick={() => {
                        setHandlerShowAdvice(false);
                        setHandlerScrollAfterAdvice(true);
                    }}>
                    {delayAppearanceContentAdvice && <div className={styles.overlay__for_advice__wrapper}>
                        {handlerShowAdvice && !handlerClickButtonView && 
                            <div className={styles.instruction__advice_container}> 
                                <div className={styles.wrapper__icon_visibility__overlay}> 
                                    <VisibilityIcon sx={{color: '#3f495b', fontSize: '32px', cursor: 'pointer',  pointerEvents: 'none'}} />
                                </div>
                            
                                <div className={`${styles.advice__container} ${animationOverflowAdvice && styles.animation__advice_container}`}>
                                    <div className={`${styles.finger__icon_container} ${animationOverflowAdvice && styles.animation__finger_icon__container}`}>
                                        <PanToolAltIcon sx={{color: 'white'}} />
                                    </div>
                                    <p className={styles.advice__text}>
                                        {data.advice.adviceText}
                                    </p>
                                </div>
                            </div>
                        }
                        <p className={`${styles.text__exit_overlay} ${animationOverflowAdvice && styles.animation__text_exit}`}>{data.advice.adviceExit}</p>
                    </div>}
                </div>
            }
            <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                <h1 ref={refPortfolioProjects} className={styles.portfolio__title}>{data.projects.title}</h1>
            </AnimatedElement>
            {!handlerHidingSortBlock && <div className={handlerHidingSortBlock ? styles.hiding__sort_block : `${`${styles.types__view_portfolio__container} ${loadingStyleForSecureBlockSort && (!secureBlockSortContainer ? styles.titles__types_portfolio__container_fixed : '')}`}`} style={{zIndex: animationPushUpSortingBlock ? '12' : '65', top: animationPushUpSortingBlock ? '-41px' : '60px', transition: 'top 0.2s ease',}} > {/* !!! style={{position: handlerHidingSortBlock ? 'static' : ''}} display: handlerHidingSortBlock ? 'none' : '' // style={{ top: '10px', transition: 'top 5s ease-out' }} */}
                <div className={`${styles.titles__types_portfolio__container}`}>
                    <div className={styles.button__sorting_container}>
                        {arrayNamesSortPortfolio.map((item, index) => (
                        <AnimatedElement initialTransform={handlerForContentOnButtonsSorting ? 'scale(1.08)' : 'scale(1)'} finalTransform="scale(1)" rootMargin="50px 0px -25px 0px" threshold="0.3" key={index}>
                            <Chip 
                                label={handlerForContentOnButtonsSorting && widthWrapperApp > 630 ? data.projects.nameTypeProjects[index] : data.projects.iconTypeProjects[index].icon} 
                                onClick={() => {
                                    setSortTypeProjects(item.id);
                                    setDeviceApproachAnimation(false);
                                    setAnimatedElementOff(true);
                                    setTimeout(() => {
                                        setAnimatedElementOff(false);
                                    }, 450);
                                    if(sortTypeProjects !== item.id) {
                                        window.scrollTo({top: secureBlockSortContainer ? 122 : 123, left: 0, behavior: 'smooth',}); // доделать с сортировочными кнопками с текстом
                                    }
                                }} 
                                title={!secureBlockSortContainer ? data.projects.nameTypeProjects[index] : ''}
                                sx={{
                                    marginRight: '12px',
                                    backgroundColor: sortTypeProjects === item.id ? '#5F7389' : '#303846',
                                    color: sortTypeProjects === item.id ? '#E6E6E6' : '#A3B1C2',
                                    '&:hover': {
                                    backgroundColor: sortTypeProjects === item.id ? '#5F7389' : '#3B4048',
                                    color: '#BFCFDB',
                                    },
                                    fontFamily: '"Gothic A1", sans-serif',
                                    fontSize: '16px',
                                    lineHeight: '18px',
                                    minWidth: !secureBlockSortContainer ? '47px' : '52px',
                                    transition: 'min-width 0.35s ease-in-out',
                                    '@media (max-width: 334px)': {marginRight: '5px',},
                                }} 
                            />
                        </AnimatedElement>
                        ))}
                    </div>
                    <div className={`${styles.button__view_portfolio__container} ${buttonIsInactive ? styles.button__view_portfolio__container_inactive : ''}`} > 
                        <AnimatedElement initialTransform={handlerForContentOnButtonsSorting ? 'scale(1.08)' : 'scale(1)'} finalTransform="scale(1)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                            <VisibilityIcon sx={{transition: '0.3s', color: lookOnDevaises ? '#5F7389' : '#3f495b', fontSize: '32px', cursor: 'pointer','&:hover': {transition: '0.3s', color: handlerAnimationDevaiseMiniature === 'devaise' ? '#475564' : '#4d5666'}}} onClick={changePortfolioView} />
                        </AnimatedElement>
                    </div>
                </div>
            </div>}
            {lookOnDevaises === false ? 
                <div className={styles.cells__portfolio_container} style={{paddingTop: secureBlockSortContainer ? '13px' : '105px'}}>
                    {sortTypeProjects === 'all' ? arrayContentPortfolio.map((item, index) => (
                        <div ref={arrayContentPortfolio.length - 1 == index ? refLastBlockPortfolio : null} key={index} className={`${animationMiniatureStart ? styles.cell__portfolio_animation__start : ''} ${animationMiniatureFinish ? styles.cell__portfolio_animation__finish : ''} ${styles.block__container_card__portfolio}`}>
                            <AnimatedElement
                                initialTransform="translateY(30px)" 
                                finalTransform="translateY(0)" 
                                rootMargin="50px 0px -50px 0px" 
                                threshold="0.35"
                                className="styles.my__custom_class"
                                animatedElementOff={animatedElementOff}
                            >
                                <div className={styles.cell__portfolio} style={{backgroundImage: `url(${item.image})`}} onClick={() => setHandlerDescriptionSite(index)}>
                                    <div className={styles.transparency__cell_portfolio}></div>
                                    <h2 className={styles.cell__portfolio_name}>{item.name}</h2>
                                    <h3 className={styles.cell__portfolio_category}>{language === 'ru' ? item.categoryRu : item.categoryEn}</h3>
                                </div> 
                            </AnimatedElement>
                        </div>)) : filteredArrayContentPortfolio.map((item, index) => (
                        <div ref={filteredArrayContentPortfolio.length - 1 == index ? refLastBlockPortfolio : null} key={index} className={`${animationMiniatureRenderingStart ? styles.cell__portfolio_miniature__rendering_animation__start : ''} ${animationMiniatureStart ? styles.cell__portfolio_animation__start : ''} ${animationMiniatureFinish ? styles.cell__portfolio_animation__finish : ''} ${styles.block__container_card__portfolio}`}>
                            <AnimatedElement 
                                initialTransform="translateY(30px)" 
                                finalTransform="translateY(0)" 
                                rootMargin="50px 0px -50px 0px" 
                                threshold="0.35"
                                className="styles.my__custom_class"
                                animatedElementOff={animatedElementOff}
                            >
                                <div className={styles.cell__portfolio} style={{backgroundImage: `url(${item.image})`}} onClick={() => setHandlerDescriptionSite(index)}>
                                    <div className={styles.transparency__cell_portfolio}></div>
                                    <h2 className={styles.cell__portfolio_name}>{item.name}</h2>
                                    <h3 className={styles.cell__portfolio_category}>{language === 'ru' ? item.categoryRu : item.categoryEn}</h3>
                                </div> 
                            </AnimatedElement>
                        </div>
                    ))}
                </div> 
                :
                <div className={styles.wrapper__devaises}>
                    {sortTypeProjects === 'all' ?
                        <div className={styles.devaise__block} style={{paddingTop: !secureBlockSortContainer ? '105px' : '13px'}}>
                            {arrayContentPortfolio.map((item, index) => (
                                <div ref={arrayContentPortfolio.length - 1 == index ? refLastBlockPortfolio : null} key={index} className={`${animationDevaiseStart ? styles.cell__portfolio_animation__start : ''} ${animationDevaiseFinish ? styles.cell__portfolio_animation__finish : ''} ${styles.container__cell_portfolio__for_animation}`}>
                                    <AnimatedElement  
                                    initialTransform="translateY(30px)" 
                                    finalTransform="translateY(0)" 
                                    rootMargin="50px 0px -50px 0px" 
                                    threshold="0.35"
                                    className="styles.my__custom_class"
                                    animatedElementOff={animatedElementOff}
                                    >
                                        <div className={`${styles.container__devaise} `}>
                                            <div className={`${styles.imac_container} ${deviceApproachAnimation ? styles.imac__container_animation : styles.imac__container_animation__off}`}>
                                                <div className={styles.imac_chin}>
                                                    <div className={styles.imac_screen} style={{backgroundImage: `url(${item.image})`}}>
                                                    </div>
                                                </div>
                                                <div className={styles.nog__wrapper}>
                                                    <div className={styles.nog__container}>
                                                        <div className={styles.nog__top}></div>
                                                        <div className={styles.nog}></div>
                                                    </div>
                                                </div>
                                            </div>   
                                            <div className={`${styles.mobile__wrapper} ${deviceApproachAnimation ? styles.mobile__wrapper_animation : styles.mobile__wrapper_animation__off}`}>
                                                <div className={styles.buttonOne}></div>
                                                <div className={styles.buttonTwo}></div>
                                                <div className={styles.frame__mobile}>
                                                    <div className={styles.screen__mobile} style={{backgroundImage: `url(${item.imageMobile})`}}>
                                                        <div className={styles.camera__microfon_wrapper}><div className={styles.speaker}></div> <div className={styles.camera}></div></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> 
                                    </AnimatedElement>
                                </div>
                            ))}
                        </div>
                        :
                        <div className={styles.devaise__block} style={{paddingTop: !secureBlockSortContainer ? '105px' : '13px'}}>
                            {filteredArrayContentPortfolio.map((item, index) => (
                                <div ref={filteredArrayContentPortfolio.length - 1 == index ? refLastBlockPortfolio : null} key={index} className={`${animationDevaiseStart ? styles.cell__portfolio_animation__start : ''} ${animationDevaiseFinish ? styles.cell__portfolio_animation__finish : ''}`}>
                                <AnimatedElement  
                                    initialTransform="translateY(30px)" 
                                    finalTransform="translateY(0)" 
                                    rootMargin="50px 0px -50px 0px" 
                                    threshold="0.35"
                                    className="styles.my__custom_class"
                                    animatedElementOff={animatedElementOff}
                                >
                                    <div className={`${styles.container__devaise} `}>
                                        <div className={`${styles.imac_container} ${deviceApproachAnimation ? styles.imac__container_animation : styles.imac__container_animation__off}`}>
                                            <div className={styles.imac_chin}>
                                                <div className={styles.imac_screen} style={{backgroundImage: `url(${item.image})`}}></div>
                                            </div>
                                            <div className={styles.nog__wrapper}>
                                                <div className={styles.nog__container}>
                                                    <div className={styles.nog__top}></div>
                                                    <div className={styles.nog}></div>
                                                </div>
                                            </div>
                                        </div>   
                        
                                        <div className={`${styles.mobile__wrapper} ${deviceApproachAnimation ? styles.mobile__wrapper_animation : styles.mobile__wrapper_animation__off}`}>
                                            <div className={styles.buttonOne}></div>
                                            <div className={styles.buttonTwo}></div>
                                            <div className={styles.frame__mobile}>
                                                <div className={styles.screen__mobile} style={{backgroundImage: `url(${item.imageMobile})`}}>
                                                    <div className={styles.camera__microfon_wrapper}><div className={styles.speaker}></div> <div className={styles.camera}></div></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                </AnimatedElement>
                            </div>
                            ))}
                        </div>
                    }
                </div>
            }


        <div ref={refPersonalProjects}>
            <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="0px 0px -40px 0px" threshold="0.3" animatedElementOff={animatedElementOff}> 
                <h1 className={styles.progects__title}>{data.projects.titleProjects}</h1>
            </AnimatedElement>

            <div style={{marginTop: '45px'}}>
                {arrayContentPersonalProjects.map((item, index) => (
                    <AnimatedElement initialTransform="translateY(30px)" finalTransform="translateY(0)" rootMargin="50px 0px -25px 0px" threshold="0.2" key={index}>
                        <Card sx={{ width: "100%", borderRadius: "13px", marginBottom: index == arrayContentPersonalProjects.length - 1 ? '0px' : "30px", backgroundColor: 'rgb(51, 54, 64)'}}>
                            <div className={styles.card__projects_container}>
                                <Box sx={{position: handlerClickButtonCardProjects[index] ? 'relative' : 'static', width: '100%', height: 340, backgroundColor: widthWrapperApp >= 470 ? '' : '#f0f4f8',}}>  {/* для последующих проектов - сделать цвет фона динамический, в зависимости от фона приложения, чтобы подходил к фону скрина */}
                                    <CardMedia
                                        sx={{ width: '100%', height: '100%', objectFit: widthWrapperApp >= 470 ? 'cover' : 'contain' }}
                                        component="img"
                                        alt={item.title}
                                        image={widthWrapperApp >= 470
                                            ? (handlerClickButtonCardProjects[index] 
                                                ? item.imageDescription[numberImageDescriptionProjects.imageActiv] 
                                                : item.image)
                                            : (handlerClickButtonCardProjects[index] 
                                                ? item.imageDescriptionMobile[numberImageDescriptionProjects.imageActiv] 
                                                : item.imageMobile)
                                          }
                                    />
                                    { handlerClickButtonCardProjects[index] && (
                                        <div className={`${styles.button__back_image__card_projects} ${!showButtonTransitionImage ? styles.hide__button_back__image_card__projects : '' }`} onClick={() => {setNumberImageDescriptionProjects(prevState => ({
                                                ...prevState,
                                                imageActiv: prevState.imageActiv == 0 ? item.imageDescription.length -1 : prevState.imageActiv - 1,
                                                imageMaxNumber: item.imageDescription.length
                                            }));
                                            setProgress(0);
                                            resetAndRestartTimer();
                                            }}
                                        >
                                            <ChevronLeftIcon sx={{fontSize: '45px', position: 'absolute', left: '25px', top: '45%', color: 'white', backgroundColor: '#9898983d', borderRadius: '50px', '@media (min-width: 993px)': {backgroundColor: '#98989800', borderRadius: '0px',}, '@media (max-width: 576px)': {left: '15px',},}} />
                                        </div>
                                    )}
                                    { handlerClickButtonCardProjects[index] && (
                                        <div className={`${styles.button__next_image__card_projects} ${!showButtonTransitionImage ? styles.hide__button_next__image_card__projects : '' }`} onClick={() => {setNumberImageDescriptionProjects(prevState => ({
                                                ...prevState,
                                                imageActiv: prevState.imageActiv == item.imageDescription.length -1 ? 0 : prevState.imageActiv +1 ,
                                                imageMaxNumber: item.imageDescription.length
                                            }));
                                            setProgress(0);
                                            resetAndRestartTimer();
                                            }}
                                        >
                                            <ChevronRightIcon sx={{fontSize: '45px', position: 'absolute', right: '25px', top: '45%', color: 'white', backgroundColor: '#9898983d', borderRadius: '50px', '@media (min-width: 993px)': {backgroundColor: '#98989800', borderRadius: '0px',}, '@media (max-width: 576px)': {right: '15px',}}} />
                                        </div>
                                    )}  
                                </Box>
                                {handlerClickButtonCardProjects[index] && <CardContent sx={{display: 'flex'}}>
                                    {item.imageDescription.map((_, idx) => (
                                        <Box sx={{ width: '700px', margin: '0px 5px' }} key={idx}>
                                            <LinearProgress
                                            sx={{
                                                backgroundColor: '#555a63', // Цвет незагруженной части
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor: '#7294b5', // Цвет загруженной части
                                                }
                                            }}
                                                key={`progress-${numberImageDescriptionProjects.imageActiv}-${idx}`}
                                                variant="determinate"
                                                value={idx < numberImageDescriptionProjects.imageActiv ? 100 : idx === numberImageDescriptionProjects.imageActiv ? progress : 0}
                                            />
                                        </Box>
                                    ))}
                                </CardContent>}
                                <CardContent sx={{padding: '20px 15px 5px'}}>
                                    <Typography gutterBottom variant="h5" component="div" style={{marginBottom: '0', color: 'rgba(255, 255, 255, 0.9)'}}>
                                        {item.title}
                                    </Typography>
                                    {handlerClickButtonCardProjects[index] && <div style={{marginLeft: '7px'}}>
                                        <Typography variant="body4" sx={{color: grey[500], marginLeft: '-7px'}} >
                                            {language == 'ru' ? item.briefDescriptionTitleRu : item.briefDescriptionTitleEn}
                                        </Typography>
                                        <p style={{color: "#C0C0C0"}}>
                                            {language == 'ru' ? item.briefDescriptionRu : item.briefDescriptionEn}
                                        </p>
                                        <p style={{color: "#C0C0C0", fontSize: '18px'}}>
                                            {language == 'ru' ? item.descriptionTitleRu : item.descriptionTitleEn}
                                        </p>
                                        <ul style={{display: 'flex', flexDirection: 'column', paddingLeft: '25px'}}>
                                            {language == 'ru' ? (item.descriptionRu.map((paragraph, index) => (
                                                <li style={{fontSize: '16px', color: '#C0C0C0', marginBottom: '7px', paddingLeft: '0px', paddingRight: '0', listStyleType: 'disc'}} key={index}>{paragraph}</li>
                                            ))) : (item.descriptionEn.map((paragraph, index) => (
                                                <li style={{fontSize: '16px', color: '#C0C0C0', marginBottom: '7px', paddingLeft: '0px', paddingRight: '0', listStyleType: 'disc'}} key={index}>{paragraph}</li>
                                            )))}
                                        </ul>
                                        <p style={{color: "#C0C0C0", fontSize: '18px'}}>
                                            {language == 'ru' ? item.futureUpdatesTitleRu : item.futureUpdatesTitleEn}
                                        </p>
                                        <ul style={{display: 'flex', flexDirection: 'column', paddingLeft: '25px',}}>
                                            {language == 'ru' ? (item.futureUpdatesRu.map((paragraph, index) => (
                                                <li style={{fontSize: '16px', color: '#C0C0C0', marginBottom: '7px', paddingLeft: '0px', paddingRight: '0', listStyleType: 'disc'}} key={index}>{paragraph}</li>
                                            ))) : (item.futureUpdatesEn.map((paragraph, index) => (
                                                <li style={{fontSize: '16px', color: '#C0C0C0', marginBottom: '7px', paddingLeft: '0px', paddingRight: '0', listStyleType: 'disc'}} key={index}>{paragraph}</li>
                                            )))}
                                        </ul>
                                        <Typography variant="body2" sx={{color: grey[500], marginTop: '20px',}}>
                                            {language == 'ru' ? item.resumeRu : item.resumeEn}
                                        </Typography>
                                        <Button sx={{transition: '0.3s', marginTop: '10px', color: '#66CDAA', borderColor: '#66CDAA', '&:hover': {transition: '0.3s', borderColor: '#57b293', backgroundColor: '#e0f2f1',}}} variant="outlined" onClick={(e) => processingTransitionToProject(item.linkToProject, e)}>{language == 'ru' ? item.textButtonRu : item.textButtonEn}</Button>
                                    </div>}
                                </CardContent>
                                <CardActions sx={{padding: '10px 10px 10px'}}>
                                    <Button 
                                        onClick={() => {
                                            handleButtonClick();
                                            toggleCardVisibility(index);
                                            setNumberImageDescriptionProjects(prevState => ({
                                                ...prevState,
                                                imageActiv: 0,
                                                imageMaxNumber: item.imageDescription.length
                                            }));
                                            opaningCardProjects(numberImageDescriptionProjects.imageActiv)
                                        }} 
                                        size="small" sx={{color: 'rgb(224, 224, 204)'}}>
                                            {handlerClickButtonCardProjects[index] ? data.projects.buttonCardText[1] : data.projects.buttonCardText[0]}
                                    </Button>
                                </CardActions>
                            </div>
                        </Card>
                    </AnimatedElement>
                ))}
            </div>
        </div>

            {/* Description site start */}
            
            {handlerDescriptionSite !== null && 
                <div className={styles.overlay} onClick={() => setHandlerDescriptionSite(null)}>
                    {handlerDescriptionSite !== null && 
                        <div className={styles.description__site_container} onClick={(e) => e.stopPropagation()}>
                            <CloseIcon onClick={() => setHandlerDescriptionSite(null)} 
                                sx={{
                                    position: 'absolute', 
                                    top: '13px', 
                                    right: '13px', 
                                    cursor: 'pointer',
                                    transition: '0.3s',
                                    '&:hover': {
                                    color: '#979797',
                                    transition: '0.3s'
                                    },
                                }}
                            />
                            <div className={styles.description__site_image__container} style={{backgroundImage: sortTypeProjects == 'all' ? `url(${arrayContentPortfolio[handlerDescriptionSite].image})` : `url(${filteredArrayContentPortfolio[handlerDescriptionSite].image})`, backgroundPosition: 'top center'}}></div>
                            <h2 className={styles.title__description_site}>{sortTypeProjects == 'all' ? arrayContentPortfolio[handlerDescriptionSite].name : filteredArrayContentPortfolio[handlerDescriptionSite].name}</h2>
                            {language === 'ru' ? <p className={styles.description_category}>{sortTypeProjects == 'all' ? arrayContentPortfolio[handlerDescriptionSite].categoryRu : filteredArrayContentPortfolio[handlerDescriptionSite].categoryRu}</p> : <p className={styles.description_category}>{sortTypeProjects == 'all' ? arrayContentPortfolio[handlerDescriptionSite].categoryEn : filteredArrayContentPortfolio[handlerDescriptionSite].categoryEn}</p>}
                            <div className={styles.description__text_container}>
                                <div className={styles.titles__tasks_container}>
                                    {language === 'ru' ? <p className={styles.tasks__title_description}>{sortTypeProjects == 'all' ? arrayContentPortfolio[handlerDescriptionSite].descriptionTitleRu[0] : filteredArrayContentPortfolio[handlerDescriptionSite].descriptionTitleRu[0]}</p> : <p className={styles.tasks__title_description}>{sortTypeProjects == 'all' ? arrayContentPortfolio[handlerDescriptionSite].descriptionTitleEn[0] : filteredArrayContentPortfolio[handlerDescriptionSite].descriptionTitleEn[0]}</p>}
                                    {language === 'ru' ? <p className={styles.result__title_description}>{sortTypeProjects == 'all' ? arrayContentPortfolio[handlerDescriptionSite].descriptionTitleRu[1] : filteredArrayContentPortfolio[handlerDescriptionSite].descriptionTitleRu[1]}</p> : <p className={styles.result__title_description}>{sortTypeProjects == 'all' ? arrayContentPortfolio[handlerDescriptionSite].descriptionTitleEn[1] : filteredArrayContentPortfolio[handlerDescriptionSite].descriptionTitleEn[1]}</p>}
                                </div>
                                {sortTypeProjects == 'all' ? 
                                    <ul className={styles.item__tasks_text__container}>{language === 'ru' ? arrayContentPortfolio[handlerDescriptionSite].descriptionRu.map((item, index) => (
                                        <li className={styles.item__text_task} key={index}>
                                            <div className={styles.content_wrapper}>
                                                <span className={styles.item__text}>{item}</span>
                                                <CheckIcon sx={{color: '#80E27E'}} />
                                            </div>
                                        </li>
                                        )) : arrayContentPortfolio[handlerDescriptionSite].descriptionEn.map((item, index) => (
                                        <li className={styles.item__text_task} key={index}>
                                            <div className={styles.content_wrapper}>
                                                <span className={styles.item__text}>{item}</span>
                                                <CheckIcon sx={{color: '#80E27E'}} />
                                            </div>
                                        </li>
                                        ))}
                                    </ul> : 
                                    <ul className={styles.item__tasks_text__container}>{language === 'ru' ? filteredArrayContentPortfolio[handlerDescriptionSite].descriptionRu.map((item, index) => (
                                        <li className={styles.item__text_task} key={index}>
                                            <div className={styles.content_wrapper}>
                                                <span className={styles.item__text}>{item}</span>
                                                <CheckIcon sx={{color: '#80E27E'}} />
                                            </div>
                                        </li>
                                        )) : filteredArrayContentPortfolio[handlerDescriptionSite].descriptionEn.map((item, index) => (
                                        <li className={styles.item__text_task} key={index}>
                                            <div className={styles.content_wrapper}>
                                                <span className={styles.item__text}>{item}</span>
                                                <CheckIcon sx={{color: '#80E27E'}} />
                                            </div>
                                        </li>
                                        ))}
                                    </ul>
                                }
                              
                            </div>
                            {sortTypeProjects === 'all' ? <div> {language === 'ru' ? <p className={styles.description__info_link}>{arrayContentPortfolio[handlerDescriptionSite].descriptionInfoLinkRu}</p> : <p className={styles.description__info_link}>{arrayContentPortfolio[handlerDescriptionSite].descriptionInfoLinkEn}</p>} </div> : <div> {language === 'ru' ? <p className={styles.description__info_link}>{filteredArrayContentPortfolio[handlerDescriptionSite].descriptionInfoLinkRu}</p> : <p className={styles.description__info_link}>{filteredArrayContentPortfolio[handlerDescriptionSite].descriptionInfoLinkEn}</p>} </div>}
                            <Link 
                                onClick={() => setHandlerDescriptionSite(null)} 
                                to={sortTypeProjects === 'all' 
                                        ? `${arrayContentPortfolio[handlerDescriptionSite]?.pathname}` 
                                        : `${filteredArrayContentPortfolio[handlerDescriptionSite]?.pathname}`}
                                className={styles.description__link}
                            >
                                <div>
                                    {language === 'ru' 
                                        ? <span>{sortTypeProjects === 'all' 
                                            ? arrayContentPortfolio[handlerDescriptionSite]?.linkTextRu 
                                            : filteredArrayContentPortfolio[handlerDescriptionSite]?.linkTextRu}</span>
                                        : <span>{sortTypeProjects === 'all' 
                                            ? arrayContentPortfolio[handlerDescriptionSite]?.linkTextEn 
                                            : filteredArrayContentPortfolio[handlerDescriptionSite]?.linkTextEn}</span>
                                    }
                                </div>
                            </Link>
                        </div>
                    }
                </div>
            }
        </div>
    </div>
    )
}

export default Projects;
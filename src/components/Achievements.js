import React, { useState, useEffect, useRef, createRef } from 'react';
import { useInView } from 'react-intersection-observer';
import AnimatedElement from './AnimatedElement';
import styles from './Achievements.module.css'

import telegram from '../img/telegram.png';

import { Context } from "../App";
import { ArrayStatistics, ArrayReviews } from '../data/ArrayStatistics';


import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LocationOnIcon from '@mui/icons-material/LocationOn';


function Achievements({ language, widthWrapperApp}) {

    const {data} = React.useContext(Context);

    const [quantityStatistics, setQuantityStatistics] = useState(ArrayStatistics);
    const [numberStatistics, setNumberStatistics] = useState(quantityStatistics.map(() => 0));
    const [inViewStatisticsArray, setInViewStatisticsArray] = useState(quantityStatistics.map(() => false));


    // animation revievs start

    const [classReviewsText, setClassReviewsText] = useState('animation__title_smoll__reviews_and__text_off');
    const [classReviewsButton, setClassReviewsButton] = useState('animation__button_reviews__off');
    const [classReviewsImage, setClassReviewsImage] = useState('animation__widget_reviews__off');

    const {ref: refReviewsBlock, inView: inViewReviewsBlock, entry} = useInView({threshold: 0.3});

    useEffect(() => {
        if(entry) {
            const { boundingClientRect } = entry;

            if(inViewReviewsBlock) {
                setClassReviewsText('animation__title_smoll__reviews_and__text');
                setClassReviewsButton('animation__button_reviews');
                setClassReviewsImage('animation__widget_reviews');
            } else if(!inViewReviewsBlock && boundingClientRect.top > 0) {
                setClassReviewsText('animation__title_smoll__reviews_and__text_off');
                setClassReviewsButton('animation__button_reviews__off');
                setClassReviewsImage('animation__widget_reviews__off');
            }
        }
    }, [inViewReviewsBlock, entry]);

    //

    useEffect(() => {
        const intervals = [];

        inViewStatisticsArray.forEach((item, index) => {
            if(item) {
                    const max = quantityStatistics[index].quantity;
                    const time = max > 1000 ? 1 : (max > 10 ? 125 : 250);
                    const interval = setInterval(() => {
                        setNumberStatistics(prevState => {
                            const updatedNumberStatistics = [...prevState];
                            const numberAdd = max > 1000 ? 921 : 1
                            if (updatedNumberStatistics[index] < max) {
                                updatedNumberStatistics[index] += numberAdd;
                            }
                            return updatedNumberStatistics;
                        })
                    }, time);
                    
                    intervals.push(interval);
            } 
            else {
                setNumberStatistics(prevState => {
                    const updatedNumberStatistics = [...prevState];
                    updatedNumberStatistics[index] = 0;

                    return updatedNumberStatistics;
                })
            }
        })
        

        return () => {
            intervals.forEach((interval) => clearInterval(interval));
        }

    }, [inViewStatisticsArray, quantityStatistics])




    const [handlerSlideActive, setHandlerSlideActive] = useState(0);
    const [restartInreval, setRestartInreval] = useState(false);

    const prev = 'prev';
    const next = 'next';

    const changeActiveSlide = (direction) => {

        const quantity = ArrayReviews.length -1;

        if(direction === 'next') {
            if(handlerSlideActive < quantity) {
                setHandlerSlideActive(prev => prev +1)
            } 
        } else if(direction === 'prev') {
            if(handlerSlideActive > 0) {
                setHandlerSlideActive(prev => prev -1)
            } 
        } else {
            if(direction === handlerSlideActive) {
                return;
            }
            setHandlerSlideActive(direction)

            
        }
        setRestartInreval(prev => !prev);
    }
    
        const {ref: refWidgetsReviews, inView: inViewWidgetsReviews} = useInView({threshold: 0.45});

        const [startSwitchingReviews, setStartSwitchingReviews] = useState(false);


        useEffect(() => {
            if(inViewWidgetsReviews && !startSwitchingReviews) {
                setStartSwitchingReviews(true);
            }
        }, [inViewWidgetsReviews])



        useEffect(() => {

            if(!startSwitchingReviews) {return};

            let interval;

            const quantity = ArrayReviews.length -1;


            interval = setInterval(() => {
                setHandlerSlideActive(prev => prev < quantity ? prev + 1 : 0)
            }, 7000);
            

            return () => clearInterval(interval)

        }, [startSwitchingReviews, restartInreval]);


        const [handlerExtraSlide, setHandlerExtraSlide] = useState(widthWrapperApp > 576 ? [ArrayReviews.length -2, ArrayReviews.length -1] : [handlerSlideActive+1, handlerSlideActive+2,]);
// 
        useEffect(() => {
            setHandlerExtraSlide(() => {
                let extraSlideOne;
                let extraSlideTwo;

                if(widthWrapperApp >= 576) {
                    if(handlerSlideActive < 2 ) {
                        extraSlideOne = ArrayReviews.length -1;
                        extraSlideTwo = ArrayReviews.length -2;
                    } 
                    else if(handlerSlideActive > ArrayReviews.length -3) {
                        extraSlideOne = 0;
                        extraSlideTwo = 1 ;
                    } 
                    else if(handlerSlideActive >= 2 || handlerSlideActive <= ArrayReviews.length -3 ) {
                        extraSlideOne = handlerSlideActive +2;
                        extraSlideTwo = handlerSlideActive -2;
                    }
                } else {
                    if(handlerSlideActive == 0) {
                        extraSlideOne = handlerSlideActive +1;
                        extraSlideTwo = handlerSlideActive +2;
                    }
                    else if(handlerSlideActive == ArrayReviews.length -1) {
                        extraSlideOne = handlerSlideActive -1;
                        extraSlideTwo = handlerSlideActive -2;
                    }else if(handlerSlideActive !== 0 && handlerSlideActive !== ArrayReviews.length -1) {
                        extraSlideOne = handlerSlideActive -1;
                        extraSlideTwo = handlerSlideActive +1;
                    }
                }



                return [extraSlideOne, extraSlideTwo];
                

            })
        }, [handlerSlideActive, widthWrapperApp]);
          
    return (
        <div>
            <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                <h1 className={styles.statistics__title}>{data.achievements.statisticsTitle}</h1>
            </AnimatedElement>
            <div className={styles.statistics__block_container}> 
                {quantityStatistics.map((item, index) => (
                    <div key={index} className={styles.card__statistics_container}>
                        <AnimatedElement quantityStatistics={quantityStatistics} setQuantityStatistics={setQuantityStatistics} setInViewStatisticsArray={setInViewStatisticsArray} inViewStatisticsArray={inViewStatisticsArray} index={index} initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.37">
                            <div className={styles.statistics__block} style={{backgroundColor: '#333640'}}>
                                <div className={styles.image__statistics_block__container}>
                                    <img src={item.image} className={styles.image__statistics} alt={language === 'ru' ? item.titleRu : item.titleEn} />
                                </div>
                                <h2 className={styles.quantity__statistics}>{numberStatistics[index]}</h2>
                                <h3 className={styles.title__statistics}>{language === 'ru' ? item.titleRu : item.titleEn}</h3>
                            </div>
                        </AnimatedElement>
                    </div>
                ))}
            </div>
            <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                <h1 className={styles.reviews__title}>{data.achievements.reviewsTitle}</h1>
            </AnimatedElement>
                <div ref={refReviewsBlock} className={styles.container__slider}>
                    <div className={styles.cap__container_slider}>
                        <div style={{maxWidth: '580px'}}>
                            <h3 className={`${styles.title__smoll_reviews} ${styles[classReviewsText]}`}>{language === 'ru' ? ArrayReviews[handlerSlideActive].titleRu : ArrayReviews[handlerSlideActive].titleEn}</h3>
                            <p className={`${styles.text__reviews} ${styles[classReviewsText]}`}>{language === 'ru' ? ArrayReviews[handlerSlideActive].textRu : ArrayReviews[handlerSlideActive].textEn}</p>
                        </div>
                        <div className={`${styles[classReviewsButton]}`}>
                            <Box sx={{ '& > :not(style)': { m: 0.5 }}}>
                                <Fab sx={{width: '39px', height: '39px', zIndex: 5, backgroundColor: '#374151', '&:hover': {
                                backgroundColor: '#6d798b',
                                }, transition: 'background-color 0.3s ease, color 0.3s ease',}} aria-label="prev" onClick={() => changeActiveSlide(prev)} disabled={handlerSlideActive === 0}>
                                    <ArrowBackIosNewIcon sx={{marginRight: '3px', color: handlerSlideActive === 0 ? '#545454' : '#8cc1df'}} />
                                </Fab>
                                <Fab sx={{width: '39px', height: '39px', zIndex: 5, backgroundColor: '#374151', '&:hover': {
                                backgroundColor: '#6d798b',
                                }, transition: 'background-color 0.3s ease, color 0.3s ease',}}  aria-label="next" onClick={() => changeActiveSlide(next)} disabled={handlerSlideActive === ArrayReviews.length-1} >
                                    <ArrowForwardIosIcon sx={{marginLeft: '3px', color: handlerSlideActive === ArrayReviews.length-1 ? '#545454' : '#8cc1df'}} />
                                </Fab>
                            </Box>
                        </div>
                    </div>
                    <div ref={refWidgetsReviews} className={`${styles.photo__reviews_block__container} ${styles[classReviewsImage]}`} style={{display: 'flex', justifyContent: 'space-between'}}>
                        {ArrayReviews.map((block, index) => (
                            <div className={`${styles.photo__reviews_block__background}
                            ${(widthWrapperApp > 768) ? '' : ((widthWrapperApp > 576 && handlerExtraSlide.includes(index)) ? styles.extra__slide : '')}
                            ${widthWrapperApp <= 576 && !handlerExtraSlide.includes(index) && index !== handlerSlideActive ? styles.extra__slide : ''}
                            `}  key={index} style={{width: handlerSlideActive === index ? '300px' : '100px', boxShadow: handlerSlideActive === index ? '0 0 10px rgba(0, 0, 0, 0.85)' : '', transition: 'width 0.3s linear, transform 0.3s linear', transform: handlerSlideActive === index ? 'scale(1.02)': '', marginLeft: handlerSlideActive !== 0 && index === 0 && widthWrapperApp <= 768 && '5px', marginRight: handlerSlideActive !== ArrayReviews.length -1 && index === ArrayReviews.length -1 && widthWrapperApp <= 768 && '5px',}}>
                                <div className={`${styles.photo__reviews_block} ${index !== handlerSlideActive ? styles.photo__reviews_block__cursor : styles.photo__reviews_block__not_cursor}`} onClick={() => changeActiveSlide(index)} style={{
                                // Изменение ширины в зависимости от состояния
                                filter: handlerSlideActive === index ? 'grayscale(0%)' : 'grayscale(100%)',
                                // Плавный переход для ширины
                                backgroundImage: `url(${block.photo})`, 
                                }}>
                                    <h3 className={styles.name__user_reviews} style={{color: 'rgba(255, 255, 255, 0.9)', textAlign: 'start', marginBottom: '5px', opacity: handlerSlideActive === index ? 1 : 0, visibility: handlerSlideActive === index ? 'visible' : 'hidden', transition: 'opacity 0.3s, visibility 0.25s', marginTop: '0', paddingTop: '19px',}}>{language === 'ru' ? block.nameRu : block.nameEn}</h3>
                                    <div className={styles.location__container} style={{display: 'flex', alignItems: 'flex-end', opacity: handlerSlideActive === index ? 1 : 0, visibility: handlerSlideActive === index ? 'visible' : 'hidden', transition: 'opacity 0.3s, visibility 0.25s',}}>
                                        <LocationOnIcon sx={{marginRight: '3px', color: '#0096c7',}} />
                                        <p className={styles.country__text}>{language === 'ru' ? block.countryRu : block.countryEn}</p>
                                        <img src={block.flag} alt='' className={styles.country__image} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {widthWrapperApp <= 768 && <div className={styles.dot__container}>
                        {ArrayReviews.map((dot, index) => (
                            <div key={index} className={`${ index !== handlerSlideActive ? styles.dot__not_active : styles.dot__active}`}></div>
                        ))}
                    </div>}
                </div> 
                <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                    <div className={styles.leave__feedback_container}>
                        <div className={styles.link__telegram_text__container}>
                            <h3 className={styles.for__communication_text}>{data.achievements.leaveFeedbackText}
                                <span className={styles.link__icon_telegram__container}>
                                    <a href="https://t.me/Puzyrevsky" target="_blank" className={styles.telegram__link}>Telegram</a>
                                    <a href="https://t.me/Puzyrevsky" target="_blank" className={styles.link__icon_telegram}><img src={telegram} alt="Icon telegram" className={styles.telegram__icon} /></a>
                                </span>
                            </h3>
                        </div>
                        <h3 className={styles.wish__review_text}>{data.achievements.desireLeaveReview}</h3>
                    </div>
                </AnimatedElement>
                
        </div>
    )
}

export default Achievements;
import styles from './InfoDisplay.module.css'
import React, { useState, useEffect, useRef, createRef } from 'react';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function InfoDisplay({language, children, width, height, title, array, time, size, number, technologies}) {

    const [activSlide, setActivSlide] = useState(0);
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        let timer;
        let timerClass;

        setAnimationClass(styles.slideIn);

        timerClass = setTimeout(() => {
            setAnimationClass(styles.slideOut);
        }, time-500);

        timer = setTimeout(() => {
            setActivSlide(activSlide === 3 ? 0 : activSlide +1);
        }, time );

        return () => {
            clearTimeout(timer);
            clearTimeout(timerClass);
        };
    }, [activSlide]);

    const [handlerAppearanceBlockPartners, setHandlerAppearanceBlockPartners] = useState(false);

    useEffect(() => {
        let timer;

        timer = setTimeout(() => {
            setHandlerAppearanceBlockPartners(true);
        }, 280);
        
        return () => clearTimeout(timer);
    },[])

    const settings = {
        dots: false,
        arrows: false,
        draggable: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2, // Показывать по 2 слайда за раз
        slidesToScroll: 1, // Прокручивать по 1 слайду за раз
        autoplay: true,
        autoplaySpeed: 3500,
        cssEase: "linear",
        pauseOnHover: false,
    };

    return (
        <div className={styles.wrapper} style={{width: width, height: height,}}>
            {array && array.length > 0 && (
                <>
                    {size === 'smoll' && (<div className={animationClass} style={{justifyContent: technologies ? 'space-evenly' : 'space-between'}}>
                        <p className={`${title === 'Услуги' ? styles.name_services : styles.name}`} style={{lineHeight: (language === 'ru' ? array[activSlide].nameRu.length : array[activSlide].nameEn.length) <= 13 ? '30px' : '19px', marginTop: (language === 'ru' ? array[activSlide].nameRu.length : array[activSlide].nameEn.length) <= 13 ? '7px' : '9px',}}>{language == 'ru' ? array[activSlide].nameRu : array[activSlide].nameEn}</p>
                        {!technologies && <p className={styles.number} style={{marginTop: (language === 'ru' ? (array[activSlide].nameRu.length <= 13 && number) : (array[activSlide].nameEn.length <= 13 && number)) ? '9px' : '0px',}}>{array[activSlide].description}</p>}
                        {array[activSlide].image && <div style={{width: '35px', marginTop: (language === 'ru' ? array[activSlide].nameRu.length : array[activSlide].nameEn.length) <= 13 ? '7px' : '0px',}} className={`${title === 'Услуги' ? styles.image__container_services : styles.image__container} `}>
                            <img src={array[activSlide].image} style={{width: '35px',}} alt={array[activSlide].name} className={`${title === 'Услуги' ? styles.image__services : styles.image}`} />
                        </div>}
                    </div>)}
                    {size === 'middle' && <div  className={animationClass}>
                        <p className={`${styles.name} ${size === 'middle' && styles.reviews__text}`}>{language == 'ru' ? array[activSlide].nameRu : array[activSlide].nameEn}</p>
                        <div className={styles.author__reviews_container}>
                            {array[activSlide].image && <div className={styles.image__container}>
                                <img src={array[activSlide].image} alt={array[activSlide].name} className={styles.image} />
                            </div>}
                            <p className={styles.person__name}>{language == 'ru' ? array[activSlide].personNameRu : array[activSlide].personNameEn}</p>
                        </div>
                    </div>}
                    {size === 'big' && <div className={animationClass} style={{
                        width: '100%',
                        height: '100%',
                        }}>
                        <img src={array[activSlide].image} alt='image projects' style={{width: '100%', height: '100%', borderRadius: '15px',}} />
                    </div>}
                </>
            )}
            {size === 'double' && 
                <div style={{pointerEvents: 'none',}} className={`${handlerAppearanceBlockPartners ? styles.block__partner_container : styles.appearance__block_partner__container}`}> 
                    <Slider {...settings}>
                        {array.map((img, index) => (
                            <div key={index} className={styles.image__container_double}>
                                <img src={img} alt={`Slide ${index}`} style={{ borderRadius: index == 3 ? '0px' : '10px', width: '80%', height: '80px', marginTop: 'auto', userSelect: 'none', }} />
                            </div>
                        ))}
                    </Slider>
                </div>
            }
            <p className={styles.title} style={{top: width == '350px' ? '82%' : '65%'}}>{title}</p>
        </div>
    )
}

export default InfoDisplay;
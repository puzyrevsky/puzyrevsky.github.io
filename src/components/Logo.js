import React, { useState, useEffect, useRef, createRef } from 'react';

import { useNavigate } from 'react-router-dom';

import styles from './Logo.module.css'

function Logo() {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    };

    const [startAnimation, setStartAnimation] = useState(false);
    const [animation, setAnimation] = useState(false);
    const [timer, setTimer] = useState(0);

    const [directionTimer, setDirectionTimer] = useState('forward')

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => {
                if(prev < 16 && prev !== 0 && directionTimer !== 'back') {
                    setDirectionTimer('forward');
                    return prev +1;
                }

                if(prev === 16) {
                    setDirectionTimer('back')
                    return prev -1;
                }

                if(prev !== 16 && directionTimer === 'back' && prev !== 0) {
                    setDirectionTimer('back')
                    return prev -1;
                }

                if(prev === 0 ) {
                    setDirectionTimer('forward');
                    return prev +1;
                }
            })
        }, 620);

        return () => clearInterval(interval)
    }, [ directionTimer])

    useEffect(() => {
        if(timer < 11) { //12
            setAnimation(false);
        } else {
            setAnimation(true);
        }
    }, [timer])

    return (
        <div>
            <div className={styles.prob__cont}>
                <div className={styles.name__wrapper}>
                    <h1 onClick={handleClick}  className={`${styles.letter__name} ${animation ? styles.letter__name_animation : ''}`}>A</h1> 
                    <p className={`${styles.name__end} ${animation ? styles.name__end_animation : ''}`}>ndrei</p>
                </div>
                <div className={styles.last__name_wrapper}>
                    <h1 onClick={handleClick} className={`${styles.letter__last_name} ${animation ? styles.letter__last_name__animation : ''}`}>P</h1>
                    <p className={`${styles.last__name_end} ${animation ? styles.last__name_end__animation : ''}`}>uzyrevsky</p>
                </div>
            </div>
            
        </div>
        
    )
}

export default Logo;
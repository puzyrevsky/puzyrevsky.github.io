import styles from './ItemResume.module.css';
import {useRef, useEffect, useState} from 'react';

import AnimatedElement from './AnimatedElement';

function ItemResume({title, time, position, description, list, lineHeight, widthWrapperApp, language}) {

    

const [dynamicHeightLine, setDynamicHeightLine] = useState('315px');


useEffect(() => {
    if(widthWrapperApp <= 830) {
        setDynamicHeightLine('100%')
    } else {
        if(language === 'ru') {
            setDynamicHeightLine('315px');
        } else {
            setDynamicHeightLine('271px')
    
        }
    }
}, [widthWrapperApp, language])

    return (
        <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -70px 0px" threshold="0.1">
            <div className={styles.fon}>
                <div className={styles.marking__container}>
                    <div className={styles.circle}></div>
                    <div style={{height: widthWrapperApp > 768 && lineHeight ? dynamicHeightLine : '100%'}} className={styles.band} ></div>
                </div>
                <div className={styles.item__container}>
                    <h3 className={styles.title__item_resume}>{title}</h3>
                    {time && <p className={styles.time}>{time}</p>}
                    {position && <p className={styles.position}>{position}</p>}
                    {description && <p className={styles.description}>{description}</p>}
                    {list && 
                        <ul className={styles.list__container}>
                            {list.map((item, index) => (
                                <li className={styles.item__list} key={index}>{item}</li>
                            ))}
                        </ul>
                    }
                </div>
                
            </div>
        </AnimatedElement>
    )
}

export default ItemResume
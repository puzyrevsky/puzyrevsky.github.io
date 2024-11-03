import react, {useState, useEffect} from 'react';

import { useInView } from 'react-intersection-observer';

import styles from './CardSkillsAbout.module.css';

import AnimatedElement from './AnimatedElement';


function CardSkillsAbout({name, image, skill, numberPercentPartOne, id}) {

    const [numberPercent, setNumberPercent] = useState(0);

    const [slowDownLineProgress, setSlowDownLineProgress] = useState(false);

    const {ref, inView} = useInView({
        threshold: 0.6,
    })

    useEffect(() => {
        let interval;

        if(!inView) {
            setNumberPercent(0);
        }

        const timeout = setTimeout(() => {
            if(inView) {
            interval = setInterval(() => {
                setNumberPercent((prev) => {
                    let number = prev;

                    if(number < skill) {
                        number ++;
                    } 

                    return number;
                })
            }, 9);
            };
        }, 1000)

        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        }
    }, [inView]);

    useEffect(() => {
        let timeout;

        if(inView) {
            timeout = setTimeout(() => {
                setSlowDownLineProgress(true);
            }, 1000);
        } else {
            setSlowDownLineProgress(false);
        }

        return () => clearTimeout(timeout);
    }, [inView])


    return (
            <div ref={ref} className={`${styles.animation__activ} ${styles.animation__block5}`}>
                <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.37">
                <div className={styles.skill__container}>
                    <div className={styles.skill__photo_container}>
                        <img src={image} alt={name} className={styles.image__skill} />
                    </div>
                    <h3 className={styles.skill__name}>{name}</h3>
                    <div className={styles.lineprogress__number_container}>
                        <div className={styles.skill__line}><span style={{position: "absolute", left: 0, top: 0, height: "12px", width: slowDownLineProgress ? `${skill}%` : '8%', backgroundColor: "#add8e6", transition: slowDownLineProgress ? 'width 1s ease-in-out' : '', borderRadius: '10px'}}></span></div>
                        <p className={styles.number__progress}>{numberPercent}%</p>
                    </div>
                </div>
                </AnimatedElement>
            </div> 
    )
}

export default CardSkillsAbout;
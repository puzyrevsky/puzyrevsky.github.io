


import React, { useState, useEffect, useRef, createRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';


import { ArrayStack } from "../data/ArrayStack";
import { Context } from "../App";
import styles from "./About.module.css";
import child from '../img/child.jpg';
import currentPhoto from '../img/current-photo.jpg';
import { create } from '@mui/material/styles/createTransitions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



import AnimatedElement from './AnimatedElement';

import CardSkillsAbout from './CardSkillsAbout';


function About({language}) {

    const history = useNavigate();

    function handleClickToResume() {
        history('resume')
    }


//  desctop skills array animation start

    const arraySkillsForAnimationOne = ArrayStack.slice(0, 4);
    const arraySkillsForAnimationTwo = ArrayStack.slice(4, 8);


    const [inViewStartNumberOnePart, setInViewStartNumberOnePart] = useState(false);
    const [inViewStartNumberTwoPart, setInViewStartNumberTwoPart] = useState(false);


    const [numberPercentPartOne, setNumberPercentPartOne] = useState(arraySkillsForAnimationOne.map(() => 0));
    const [numberPercentPartTwo, setNumberPercentPartTwo] = useState(arraySkillsForAnimationTwo.map(() => 0));
    


    const [maxNumberPartOne, setMaxNumberPartOne] = useState(arraySkillsForAnimationOne.map((num) => num.skill));
    const [maxNumberPartTwo, setMaxNumberPartTwo] = useState(arraySkillsForAnimationTwo.map((num) => num.skill));


    useEffect(() => {
        let intervalId;
    
        if (inViewStartNumberOnePart) {
            const timeoutId = setTimeout(() => {
                intervalId = setInterval(() => {
                    setNumberPercentPartOne(prevState => {
                        const updatedNumbers = prevState.map((num, index) => {
                            const max = maxNumberPartOne[index];
                            return num < max ? num + 1 : num;
                        });
                        return updatedNumbers;
                    });
                }, 9);
            }, 1000);
            return () => {
                clearTimeout(timeoutId);
                clearInterval(intervalId);
            }
        } else {
            clearInterval(intervalId);
            setNumberPercentPartOne(arraySkillsForAnimationOne.map(() => 0));
        }

    }, [inViewStartNumberOnePart, maxNumberPartOne]);
 

    useEffect(() => {
        let intervalId;
    
        if (inViewStartNumberTwoPart) {
            const timeoutId = setTimeout(() => {
                intervalId = setInterval(() => {
                    setNumberPercentPartTwo(prevState => {
                        const updatedNumbers = prevState.map((num, index) => {
                            const max = maxNumberPartTwo[index];
                            return num < max ? num + 1 : num;
                        });
                        return updatedNumbers;
                    });
                }, 9);
            }, 1000);
            return () => {
                clearTimeout(timeoutId);
                clearInterval(intervalId);
            }
        } else {
            clearInterval(intervalId);
            setNumberPercentPartTwo(arraySkillsForAnimationTwo.map(() => 0));
        }

    }, [inViewStartNumberTwoPart, maxNumberPartTwo]);



    const [startAnimationSkillsPartOne, setStartAnimationSkillsPartOne] = useState(false);
    const [startAnimationSkillsPartTwo, setStartAnimationSkillsPartTwo] = useState(false);

    useEffect(() => {
        if(inViewStartNumberOnePart) {
            setTimeout(() => {
                setStartAnimationSkillsPartOne(true);
            }, 1010);
        } else {
            setStartAnimationSkillsPartOne(false);
        }
    }, [inViewStartNumberOnePart])

    useEffect(() => {
        if(inViewStartNumberTwoPart) {
            setTimeout(() => {
                setStartAnimationSkillsPartTwo(true);
            }, 1010);
        } else {
            setStartAnimationSkillsPartTwo(false);
        }
    }, [inViewStartNumberTwoPart])


    const {data} = React.useContext(Context);

    
        return (
            <div>
                <div>
                    <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                        <div>
                        {/* ref={ref5} className={inView5 ? styles.animation__activ_left : styles.animation__left_off} */}
                            <h1 className={styles.about__title}>{data.about.title}</h1>
                        </div>
                    </AnimatedElement>
                    <AnimatedElement initialTransform="scale(0.8)" finalTransform="scale(1)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                        <div>
                            {/* ref={ref1} className={inView1 ? `${styles.animation__activ} ${styles.animation__block1}` : styles.animation__off} */}
                            <p className={styles.text}>{data.about.preview}</p>
                        </div>
                    </AnimatedElement>
                    <div className={styles.section__photo_text_container}>
                        <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                            <div className={styles.my__photo_container__margin}>
                                <p className={styles.section__text}>{data.about.aboutLocation}</p>
                                <img src={child} alt='Andrei Puzyrevsky' className={styles.my__photo} />
                                <p className={styles.description__photo}>{data.about.descriptionPhotoChildhood}</p>
                            </div>
                        </AnimatedElement>
                        <AnimatedElement initialTransform="translateX(100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                            <div className={styles.my__photo_container}>
                                <p className={styles.description__photo}>{data.about.descriptionPhotoNow}</p>
                                <img src={currentPhoto} alt='Andrei Puzyrevsky' className={styles.my__photo} />
                                <p className={styles.section__text}>{data.about.aboutReact}</p>
                            </div>
                        </AnimatedElement>
                    </div>
                    
                    <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.3">
                        <div> 
                            <p className={styles.text}>{data.about.myQualities}</p>
                        </div>
                    </AnimatedElement>
                    <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.3">
                        <div> 
                            <Typography sx={{
                                color: '#C0C0C0',
                                fontSize: '20px',
                                fontFamily: 'Gothic A1, sans-serif',
                                margin: '0px',
                                padding: '0 0 45px 0',
                                '@media (max-width: 576px)': {padding: '0 0 30px 0',},
                            }}>
                                {data.about.resume}
                                <Button onClick={handleClickToResume} sx={{paddingTop: '8px', fontSize: '15px', color: '#FF6E6E', fontFamily: 'Gothic A1, sans-serif', transition: '0.3s', '&:hover': {transition: '0.3s', color: '#ffb0b0'}}} variant="text">{language === 'ru' ? 'резюме' : 'resume'}</Button>
                            </Typography>
                        </div>
                    </AnimatedElement>
                    <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.3">
                        <div> 
                            <p className={styles.text}>{data.about.hobbies}</p>
                        </div>
                    </AnimatedElement>
                    <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.3">
                        <div>
                            <p className={styles.text}>{data.about.offerToCommunicate}</p>
                        </div>
                    </AnimatedElement>
                </div>
                <div>
                    <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                        <div>
                            <h1 className={styles.skills__title}>{data.about.titleSkills}</h1>
                        </div>
                    </AnimatedElement>
                            <div className={styles.skills__container}>
                                {ArrayStack.map((item, index) => (
                                    <CardSkillsAbout key={index} name={item.name} image={item.img} skill={item.skill} numberPercentPartOne={numberPercentPartOne} id={item.id} />
                                ))}
                            </div> 
                </div>
            </div>
        )
}

export default About;
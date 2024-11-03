import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import styles from './AnimatedElement.module.css';



function AnimatedElement({ children, initialTransform, finalTransform, rootMargin, threshold, setInViewStartNumberOnePart, setInViewStartNumberTwoPart, className, animatedElementOff, inViewStatisticsArray, setInViewStatisticsArray, index, quantityStatistics, setQuantityStatistics, setHandlerInViewServices, indexServices, handlerInViewServices, allSpace }) {
    const { ref, inView, entry } = useInView({
        threshold: threshold,
        rootMargin: rootMargin,
    });


    const [style, setStyle] = useState({
        flexGrow: allSpace ? allSpace : '',
        transform: initialTransform,
        opacity: 0,
        transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
    });

    useEffect(() => {
        // Проверка на наличие entry, чтобы убедиться, что обсервер инициализирован
        if ( entry ) {
            const { boundingClientRect } = entry;

            if (inView) {
                // Элемент вошел в область видимости
                setStyle({
                    transform: finalTransform,
                    opacity: 1,
                    transition: 'transform 0.5s ease-in, opacity 0.3s ease-in'
                });
            } else if(!inView && boundingClientRect.top > 0) {
                // Элемент вышел из области видимости снизу
                setStyle({
                    transform: initialTransform,
                    opacity: 0,
                    transition: 'transform 0.5s ease-out, opacity 0.5s ease-out'
                });
            }
        }
    }, [inView, entry]);

    // 

    useEffect(() => {
        if(setInViewStartNumberOnePart) {
            setInViewStartNumberOnePart(inView);
        }
    }, [inView])

    useEffect(() => {
        if(setInViewStartNumberTwoPart) {
            setInViewStartNumberTwoPart(inView)
        }
    }, [inView])

    //

    useEffect(() => {
        if(setHandlerInViewServices && handlerInViewServices && typeof indexServices === 'number') {
            setHandlerInViewServices(prev => {
                const updated = [...prev]; 
                updated[indexServices] = inView;
                return updated
            });
        }
    }, [inView, setHandlerInViewServices, indexServices ]);


    useEffect(() => {
        if(setQuantityStatistics && quantityStatistics && typeof index === 'number') {
            setQuantityStatistics(prev => {
                const updatedInViewStatistics = [...prev];
                updatedInViewStatistics[index].handlerStartNumber = inView;
                return updatedInViewStatistics
            })
        }

        if(setInViewStatisticsArray) {
            setInViewStatisticsArray(prev => {
                const updatedInViewStatistics = [...prev];
                updatedInViewStatistics[index] = inView;
                return updatedInViewStatistics;
            });}
    }, [inView, index, setQuantityStatistics])

    
    return <div ref={ref} style={!animatedElementOff ? style : {}} className={className}>{children}</div>;
}

export default AnimatedElement;
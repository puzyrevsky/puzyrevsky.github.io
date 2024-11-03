import styles from './Star.module.css';
import React, {useState, useEffect} from 'react';

function Star() {

    const [size, setSize] = useState(0);

    const [locationStar, setLocationStar] = useState({left: 0, top: 0,})

    useEffect(() => {
        // Устанавливаем случайное число при монтировании компонента
        setSize(Math.floor(Math.random() * (5 - 2 + 1) + 2));
        
        const left = Math.floor(Math.random() * (99 - 1 +1) +1);
        const top = Math.floor(Math.random() * (99 - 1 +1) +1);

        setLocationStar({left: left, top: top,})
    }, []); // Пустой массив зависимостей означает, что эффект выполнится только при монтировании

    

    return (
        <div className={styles.star} style={{width: size, height: size, left: `${locationStar.left}%`, top: `${locationStar.top}%` }}>
        </div>
    )
}

export default Star;
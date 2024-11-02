import React, { useState, useEffect, useRef, createRef } from 'react';
import { useInView } from 'react-intersection-observer';
import AnimatedElement from "./AnimatedElement";
import { Context } from "../App";
import { services, russianAlphabet, englishAlphabet } from '../data/ArrayServices';
import {ContactsArray} from '../data/ArrayContacts';
import styles from './Contacts.module.css';
import location from '../img/locationContacts.png';
import mail from '../img/mailContacts.png';
import telegram from '../img/telegramContacts.png';
import linkedin from '../img/linkedinContacts.png';

import Logo from './Logo';

import emailjs from 'emailjs-com';


import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


function Contacts({language}) {

    const form = useRef();

    // 

    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        telegram: '',
        description: '',
    });

    const [formErrors, setFormErrors] = useState({})
    

    const handlerChange = (e) => {
        const {name, value} = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }))
    }


    const [sendingForm, setSendingForm] = useState(false);
    const [infoAboutSuccessfully, setInfoAboutSuccessfully] = useState(null);
    const [handlerQuantityErrorsAtSending, setHandlerQuantityErrorsAtSending] = useState(() => {
        const saved = localStorage.getItem('number');
        const initialValue = JSON.parse(saved);
        return initialValue || 0
    });


// saved value -handlerQuantityErrorsAtSending- in localStorage (handler errors sending)
    useEffect(() => {
        localStorage.setItem('number', JSON.stringify(handlerQuantityErrorsAtSending))
    }, [handlerQuantityErrorsAtSending])
// 

    useEffect(() => {
        let timer; 

        const time = infoAboutSuccessfully == 'errorAtSending' ? 12000 : 8000;

        if(infoAboutSuccessfully !== null) {
            timer = setTimeout(() => {
                setInfoAboutSuccessfully(null)
            }, time);
        }

        return () => clearTimeout(timer);

    }, [infoAboutSuccessfully])


    const isValidEmail = (email) => {
        // Проверка наличия текста и символа '@' в email
        const symbol = email.indexOf('@');
        const dot = email.indexOf('.', symbol);

        return symbol > 0 && dot > symbol + 1;
        // return email.length > 1 && email.includes('@');
      };

// 

    const validateForm = () => {
        let errors = {};

        if(!formValues.name) {errors.name = data.contacts.errorFormValidate};
        if(!isValidEmail(formValues.email)) {errors.email = data.contacts.errorFormEmailValidate};
        if(!formValues.description) {errors.description = data.contacts.errorFormValidate};
        
        setFormErrors(errors);

        return Object.keys(errors).length === 0;
    }

    useEffect(() => {
        if(Object.keys(formErrors).length !== 0) {
            validateForm()
        }
        
    }, [language]);

// 

    const sendEmail = (e) => {
        e.preventDefault();

        if(!validateForm()) {
            return;
        }
        setSendingForm(true);

        emailjs.sendForm('service_aciq71r', 'template_i32je1o', form.current, '_Zj-MH4pAqFBv6f2y')
          .then((result) => {
              setSendingForm(false);
              setInfoAboutSuccessfully(true);
              setHandlerQuantityErrorsAtSending(0);
              setFormValues({
                name: '',
                email: '',
                telegram: '',
                description: '',
              });
          }, (error) => {
              setSendingForm(false);
              setHandlerQuantityErrorsAtSending(prev => {
                const updated = prev +1;
                setInfoAboutSuccessfully(updated > 1 ? 'errorAtSending' : false);
                return updated;
              });
          });
      };



    const {data} = React.useContext(Context); 

    const [servicesArrayState, setServicesArrayState] = useState(services);

    const [handlerChangeLetterTitle, setHandlerChangeLetterTitle] = useState(services.map(() => 0));

    const [handlerInViewServices, setHandlerInViewServices] = useState(services.map(() => false));


    const [lineName, setLineName] = useState(servicesArrayState.map((item) => (
        language === 'ru' ? item.titleServicesRu.split('') : item.titleServicesEn.split('')
    )))
    const [lineNameNumber, setLineNameNumber] = useState(lineName.map(item => new Array(item.length).fill(0)))


useEffect(() => {

    const intervals = [];

    handlerChangeLetterTitle.forEach((number, index) => {
        if(handlerInViewServices[index]) {
            if(number < 55) {
                const interval = setInterval(() => {
                    setHandlerChangeLetterTitle((prev) => {
                        const updated = [...prev]; 
                        if(updated[index] < 55) {
                            updated[index] +=1;
                        }
                        return updated;
                    })
                }, 13);
                intervals.push(interval);
            }
            
        } else if(!handlerInViewServices[index]) {
            setHandlerChangeLetterTitle((prev) => {
                const updated = [...prev]; 
                updated[index] = 0;
                return updated;
            })
        }
    })

    return () => {
        intervals.forEach(clearInterval);
    }

}, [handlerInViewServices])


useEffect(() => {
    const min = 1;
    const max = language === 'ru' ? russianAlphabet.length - 1 : englishAlphabet.length - 1;
      
    setLineNameNumber(prev => {
        return prev.map(item => (
            item.map(number => Math.floor(Math.random() * (max - min + 1)) + min)
        ));
    });
}, [handlerChangeLetterTitle, language, russianAlphabet.length, englishAlphabet.length]);

//

  const textFieldRef = useRef(null);


  const [heightForm, setHeightForm] = useState(0);
  const [rowsTextField, setRowsTextField] = useState(4);
  const [width, setWidth] = useState(window.innerWidth);


  const handleResize = () => {
    setWidth(window.innerWidth);
    updateHeight();
  };

  const updateHeight = () => {
    if (textFieldRef.current) {
      setHeightForm(textFieldRef.current.offsetHeight - 32);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    updateHeight();
  }, [width]);

  useEffect(() => {
    const rows = Math.floor(heightForm / 23);
    setRowsTextField(rows);
  }, [heightForm]);

//   

const {ref: inViewRef, inView: inViewBigForm, entry } = useInView({
    threshold: "0.15",
    rootMargin: "50px 0px -50px 0px",
});

const setCombinedRef = (node) => {
    textFieldRef.current = node;
    inViewRef(node);
}
    
    const [stylesAnimationForm, setStylesAnimationForm] = useState({opacity: 0, transform: 'translateY(50px)', transition: 'transform 0.5s ease-out, opacity 0.5s ease-out'});

    useEffect(() => {
        if(entry) {
            const { boundingClientRect } = entry;
            if(inViewBigForm) {
                setStylesAnimationForm({
                    opacity: 1,
                    transform: "translateY(0)",
                    transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
                });
            } else if(boundingClientRect.top > 0 && !inViewBigForm) {
                setStylesAnimationForm({
                    opacity: 0,
                    transform: "translateY(50px)",
                    transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
                });
            }
        }
    }, [inViewBigForm, entry])
// 

// function copy email

const [handlerNotificationCopyEmail, setHandlerNotificationCopyEmail] = useState(false);
const [handlerSuccessfullyCopyEmail, setHandlerSuccessfullyCopyEmail] = useState(true);


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


    return (
        <div className={styles.contacts__wrapper}>
            {handlerNotificationCopyEmail && <Alert sx={{position: 'fixed', top: '65px', left: '50%', transform: 'translate(-50%, 0%)', zIndex: '100'}} severity={handlerSuccessfullyCopyEmail ? 'success' : 'error'} icon={handlerSuccessfullyCopyEmail ? <ContentCopyIcon fontSize="inherit" /> : <ErrorOutlineIcon fontSize="inherit" />}>{handlerSuccessfullyCopyEmail ? data.alertTextResultCopyEmail.successfully : data.alertTextResultCopyEmail.unsuccessfully}</Alert>}
            {infoAboutSuccessfully !== null && ( 
                <div className={styles.block__info_sending_form}> 
                    {infoAboutSuccessfully == 'errorAtSending' ? <Alert sx={{display: 'flex', alignItems: 'center'}} severity="info" action={<Button onClick={() => setInfoAboutSuccessfully(null)}>ok</Button>}>{language == 'ru' ? 'Форма временно недоступна. Приносим извинения за неудобства, скоро исправим! Оставьте заявку в ' : 'The form is temporarily unavailable. We apologize for the inconvenience and will fix it soon! Please leave your request on '}<a style={{color: '#374553', }} href='https://t.me/Puzyrevsky'>Telegram</a>.</Alert> : infoAboutSuccessfully == true ? <Alert sx={{display: 'flex', alignItems: 'center'}} severity="success" action={<Button onClick={() => setInfoAboutSuccessfully(null)}>ok</Button>}>{data.contacts.infoSendingSuccessfully}</Alert> : <Alert severity="error" sx={{display: 'flex', alignItems: 'center'}} action={<Button onClick={() => setInfoAboutSuccessfully(null)}>ok</Button>}>{data.contacts.infoSendingFailure}</Alert>}
                </div>
            )}
            <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                <h1 className={styles.services__title}>{data.contacts.servicesTitle}</h1>
            </AnimatedElement>
            <div className={styles.cards__services_container}>
                {services.map((item, index) => (
                    <div key={index} className={styles.service__container}>
                        <AnimatedElement indexServices={index} handlerInViewServices={handlerInViewServices} setHandlerInViewServices={setHandlerInViewServices} initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.37">
                            <div className={styles.card__service_container} style={{display: 'flex', flexDirection: 'column'}}>
                                <div className={styles.image__card_service__container}>
                                    <img className={styles.image__card_service} src={item.image} alt={language === 'ru' ? item.titleServicesRu : item.titleServicesEn} />
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column',}}>
                                    <div style={{display: 'flex', justifyContent: 'center',}}>
                                        {handlerChangeLetterTitle[index] < 55 ? (
                                            lineNameNumber[index].map((num, ind) => (
                                                <div style={{display: 'flex'}} key={`${index}-${ind}`}>
                                                    <h1 style={{fontFamily: 'Gothic A1, sans-serif', fontSize: '20px', color: '#add8e6', margin: '23px 0 0 0'}}>{language === 'ru' ? russianAlphabet[num] : englishAlphabet[num]}</h1>
                                                </div>
                                            ))
                                        ) : (
                                            <h1 style={{fontFamily: 'Gothic A1, sans-serif', textTransform: 'uppercase', fontSize: '20px', color: '#add8e6', margin: '23px 0 0 0'}}>{language === 'ru' ? item.titleServicesRu : item.titleServicesEn}</h1>
                                        )}
                                    </div>
                                    <p className={`${styles.description__services_text} ${handlerChangeLetterTitle[index] < 55 ? styles.disappearance__description_services__text : styles.appearance__description_services__text}`}>{language === 'ru' ? item.descriptionTextRu : item.descriptionTextEn}</p>
                                </div>
                            </div>
                        </AnimatedElement>
                    </div>
                ))}
            </div>
            <AnimatedElement initialTransform="translateX(-100px)" finalTransform="translateX(0px)" rootMargin="50px 0px -25px 0px" threshold="0.3">
                <h1 className={styles.contacts__title}>{data.contacts.contactsTitle}</h1>
            </AnimatedElement>
            <div className={styles.contacts__connection_block__container}>
                <div className={styles.contacts__blocks_container}>
                    {ContactsArray.map((contacts, index) => (
                        <div key={index} style={{marginBottom: ContactsArray.length-1 !== index ? '13px' : '0'}}>
                            <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.1">
                                <div className={styles.card__contacts_container}>
                                    <div>
                                        <h3 className={styles.card__contacts_title}>{data.contacts.contactsContentTitle[index]}</h3>
                                        <a className={styles.card__contacts_link} target="_blank" href={contacts.link} 
                                            onClick={(e) => {
                                                if(contacts.icon == mail) {
                                                    e.preventDefault();
                                                    copyToClipboard('puzyrevsky.andrei@mail.ru');
                                                    setTimeout(() => {
                                                    window.location.href = 'mailto:puzyrevsky.andrei@mail.ru';
                                                    }, 800);
                                                } else {
                                                    return;
                                                }     
                                            }}>{data.contacts.contactsTitleLink[index]}</a>
                                        <p className={styles.card__contacts_text__description}>{data.contacts.contactsTextDescription[index]}</p>
                                    </div>
                                    <div>
                                        <img className={styles.image__card_contact} src={contacts.icon} alt={data.contacts.contactsContentTitle[index]} />
                                    </div>
                                </div>
                            </AnimatedElement>
                        </div>
                    ))}
                </div>
                <div className={styles.form__container}>
            <form style={{display: 'flex', flexDirection: 'column', height: '100%'}} ref={form} onSubmit={sendEmail} noValidate>
                <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.1">
                <TextField
                    required
                    onChange={handlerChange}
                    value={formValues.name}
                    title={data.contacts.contactsWarningForm}
                    sx={{ marginBottom: '18px', width: '100%',
                    '& .MuiInputBase-input': {
                        color: '#C0C0C0', // Цвет текста в поле ввода
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.1)', // Цвет рамки по умолчанию
                            transition: '0.3s',
                            borderRadius: '13px',
                        },
                        '&:hover fieldset': {
                            transition: '0.3s',
                            borderColor: 'rgba(255, 255, 255, 0.5)', // Цвет рамки при наведении
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#708090', 

                        },},
                        '& .MuiInputLabel-root': {
                            color: 'rgba(255, 255, 255, 0.25)', // Цвет текста подсказки по умолчанию
                            '&.Mui-focused': {
                            color: '#708090', // Цвет текста подсказки в фокусе
                            },
                        },
                        '& .MuiFormLabel-root.Mui-error': {
                            color: '#b82f30', // Установите нужный цвет для label при ошибке
                        },
                    }}
                    autoComplete="off"
                    id="outlined-basicf"
                    label={data.contacts.contactsTitleFormLabel.name}
                    variant="outlined"
                    name="name"
                    error={!formValues.name && !!formErrors.name}
                    helperText={!formValues.name ? formErrors.name : ''}
                />
                </AnimatedElement>
            <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.1">
            <TextField
                required
                onChange={handlerChange}
                value={formValues.email}
                title={data.contacts.contactsWarningForm}
                sx={{ marginBottom: '18px', width: '100%',
                '& .MuiInputBase-input': {
                    color: '#C0C0C0', // Цвет текста в поле ввода
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.1)', // Цвет рамки по умолчанию
                        transition: '0.3s',
                        borderRadius: '13px',
                    },
                    '&:hover fieldset': {
                        transition: '0.3s',
                        borderColor: 'rgba(255, 255, 255, 0.5)', // Цвет рамки при наведении
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#708090', // Цвет рамки по умолчанию

                    },
                    },
                    '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.25)', // Цвет текста подсказки по умолчанию
                        '&.Mui-focused': {
                        color: '#708090', // Цвет текста подсказки в фокусе
                        },
                    },
                    '& .MuiFormLabel-root.Mui-error': {
                        color: '#b82f30', // Установите нужный цвет для label при ошибке
                    },
                }}
                autoComplete="off"
                id="outlined-basics"
                label={data.contacts.contactsTitleFormLabel.email}
                variant="outlined"
                name="email"
                error={!isValidEmail(formValues.email) && !!formErrors.email}
                helperText={ !isValidEmail(formValues.email) ? formErrors.email : ''}
            />
            </AnimatedElement>
            <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="50px 0px -50px 0px" threshold="0.1">
            <TextField
            onChange={handlerChange}
            value={formValues.telegram}
                title={data.contacts.contactsOptionalForm}
                sx={{ marginBottom: '18px', width: '100%', color: '#C0C0C0',
                    '& .MuiInputBase-input': {
                        color: '#C0C0C0', // Цвет текста в поле ввода
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.1)', // Цвет рамки по умолчанию
                            transition: '0.3s',
                            borderRadius: '13px',
                        },
                        '&:hover fieldset': {
                            transition: '0.3s',
                            borderColor: 'rgba(255, 255, 255, 0.5)', // Цвет рамки при наведении
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#708090', // Цвет рамки по умолчанию
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.25)', // Цвет текста подсказки по умолчанию
                        '&.Mui-focused': {
                        color: '#708090', // Цвет текста подсказки в фокусе
                        },
                    },
                }}
                autoComplete="off"
                id="outlined-basicb"
                label={data.contacts.contactsTitleFormLabel.telegram}
                variant="outlined"
                name="telegram"
            />
            </AnimatedElement>
            <TextField
                ref={setCombinedRef}
                label={data.contacts.contactsTitleFormLabel.description}
                multiline
                rows={rowsTextField}
                title={data.contacts.contactsWarningForm}
                required
                onChange={handlerChange}
                value={formValues.description}
                id="outlined-basicfwe"
                sx={{
                opacity: stylesAnimationForm.opacity, 
                transform: stylesAnimationForm.transform, 
                transition: stylesAnimationForm.transition,
                flexGrow: 1,
                marginBottom: '13px',
                width: '100%',
                minHeight: '200px',
                '& .MuiInputBase-root': {
                    height: !!formErrors.description && !formValues.description ? '95%' : '100%',
                    alignItems: 'flex-start',
                    paddingRight: '7px',
                },
                '& .MuiInputBase-inputMultiline': {
                    height: '100%',
                    overflow: 'auto',
                    color: '#C0C0C0',
                    paddingRight: '7px',
                    '&::-webkit-scrollbar': {
                        width: '9px', // Ширина скроллбара
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#C0C0C0', // Цвет бегунка скроллбара
                        borderRadius: '10px', // Закругление бегунка
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#a3a3a3', // Цвет бегунка при наведении
                        cursor: 'pointer',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Цвет трека скроллбара
                        borderRadius: '10px',
                    },
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.1)', // Цвет рамки по умолчанию
                        transition: '0.3s',
                        borderRadius: '13px',
                    },
                    '&:hover fieldset': {
                        transition: '0.3s',
                        borderColor: 'rgba(255, 255, 255, 0.5)', // Цвет рамки при наведении
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#708090', // Цвет рамки по умолчанию

                    },},
                    '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.25)', // Цвет текста подсказки по умолчанию
                        '&.Mui-focused': {
                        color: '#708090', // Цвет текста подсказки в фокусе
                        },
                    },
                    '& .MuiFormLabel-root.Mui-error': {
                        color: '#b82f30', // Установите нужный цвет для label при ошибке
                    },
                }}
                autoComplete="off"
                variant="outlined"
                fullWidth
                name="description"
                error={!formValues.description && !!formErrors.description}
                helperText={!formValues.description ? formErrors.description : ''}
            />
            <div className={styles.button__send_container}>
                <AnimatedElement initialTransform="translateY(50px)" finalTransform="translateY(0)" rootMargin="7px 0px -7px 0px" threshold="0.1">
                    <Button type="submit" sx={{maxWidth: '180px', color: '#ffffffcc', transition: '0.39s', fontSize: '14px', fontWeight: 'bold', backgroundColor: sendingForm ? '#66cdaa73' : '#66CDAA', '&:hover': {backgroundColor: sendingForm ? '#66cdaa73' : '#57b293', transition: '0.39s'}, '&.Mui-disabled': {
                    backgroundColor: '#66cdaa73', color: '#ffffffcc',
                    },}} disabled={sendingForm} variant="contained" endIcon={!sendingForm ? <SendIcon /> : <CircularProgress size={20} sx={{color: '#ffffffcc'}} />}>{!sendingForm ? data.contacts.buttonTextSend : data.contacts.buttonTextSending}</Button>
                </AnimatedElement>
            </div>
            </form>
        </div>
    </div>
</div>
    )
}

export default Contacts;
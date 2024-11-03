import { useState, createContext, useContext, useEffect, useRef, useLayoutEffect } from 'react';

import {useLocation} from 'react-router-dom';

import MobileDetect from 'mobile-detect';

import LanguageIcon from '@mui/icons-material/Language';

import ListIcon from '@mui/icons-material/List';
import AppsIcon from '@mui/icons-material/Apps';
import PersonIcon from '@mui/icons-material/Person';
import BarChartIcon from '@mui/icons-material/BarChart';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StarHalfIcon from '@mui/icons-material/StarHalf';


import CreditCardIcon from '@mui/icons-material/CreditCard';
import CloseIcon from '@mui/icons-material/Close';

import SourceIcon from '@mui/icons-material/Source';

import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import './App.css';
import BannerStart from './components/BannerStart';
import About from './components/About';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contacts from './components/Contacts';
import Layout from './Layout';
import Resume from './components/Resume';
import ProjectDisplay from './components/ProjectDisplay';
import NotFound from './components/NotFound';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsUse from './components/TermsUse';
import EduCals from './projectEduCals/EduCals';

import emailjs from 'emailjs-com';


export const Context = createContext();


function App() {

  const [handlerStartAdvice, setHandlerStartAdvice] = useState(() => {
    return JSON.parse(localStorage.getItem('handlerStartAdvice')) || false;
  });

  const [handlerShowAdvice, setHandlerShowAdvice] = useState(false);
  const [handlerScrollAfterAdvice, setHandlerScrollAfterAdvice] = useState(false);
  const [location, setLocation] = useState(null);
  const [timerTransitionLink, setTimerTransitionLink] = useState(0);
  const [handlerClickButtonView, setHandlerClickButtonView] = useState(false);



  const [handlerDescriptionSite, setHandlerDescriptionSite] = useState(null);

  const [delayTimeOfAdviceDuringDescription, setDelayTimeOfAdviceDuringDescription] = useState(false);

  const [previousPageAdress, setPreviousPageAdress] = useState(() => {
    const savedPreviousPageAdress = localStorage.getItem('adress');
    return savedPreviousPageAdress ? JSON.parse(savedPreviousPageAdress) : '/';
  });

  useEffect(() => {
    localStorage.setItem('adress', JSON.stringify(previousPageAdress))
  }, [previousPageAdress])

// saved local storage 
  const [namePreviousPageButton, setNamePreviousPageButton] = useState(() => {
    const savedNamePreviousPageButton = localStorage.getItem('name');
    return savedNamePreviousPageButton ? JSON.parse(savedNamePreviousPageButton) : null;
  });
  
  useEffect(() => {
    if (namePreviousPageButton !== undefined && namePreviousPageButton !== null) {
      localStorage.setItem('name', JSON.stringify(namePreviousPageButton));
    } else {
      localStorage.removeItem('name'); // Удалить, если значение `null` или `undefined`
    }
  }, [namePreviousPageButton]);


// logic width time and show advice start 
  useEffect(() => { 
      if (handlerDescriptionSite !== null) {
        setDelayTimeOfAdviceDuringDescription(true);
      }
        if(!handlerStartAdvice) {
          if(delayTimeOfAdviceDuringDescription == false && timerTransitionLink == 3) {
            setHandlerStartAdvice(true);
            if(!handlerClickButtonView) {
              setHandlerShowAdvice(true);
            }
            
            setTimeout(() => {
              setHandlerShowAdvice(false);
              setHandlerScrollAfterAdvice(true);
            }, 11000); // 11000
          }

          if(location !== '/portfolio/projects' && timerTransitionLink < 3) {
            setTimerTransitionLink(0);
          }

          let delayTimer = null;

          if(delayTimeOfAdviceDuringDescription == true && timerTransitionLink == 3) {
            if(handlerDescriptionSite == null) {
              delayTimer = setTimeout(() => {
                setHandlerStartAdvice(true);
                if(!handlerClickButtonView) {
                  setHandlerShowAdvice(true);
                }
                setTimeout(() => {
                      setHandlerShowAdvice(false);
                      setHandlerScrollAfterAdvice(true);
                    }, 11000); // 11000
                  // }
              }, 2000);
            } 
          } 
          
          return () => clearTimeout(delayTimer);
       
        }
      
    if (handlerStartAdvice) {
      localStorage.setItem('handlerStartAdvice', JSON.stringify(handlerStartAdvice));
    }

  }, [delayTimeOfAdviceDuringDescription, handlerDescriptionSite, handlerStartAdvice, setHandlerShowAdvice, setHandlerStartAdvice, location, timerTransitionLink, handlerClickButtonView]);


  useEffect(() => {
    if (location !== '/portfolio/projects' && timerTransitionLink <= 3) {
      setTimerTransitionLink(0);
    }
  }, [timerTransitionLink, location])
// 

// localStorage.clear(); // --- очистка localStorage, повторная подсказка после обновления // переделать чтобы исправить баг, когда невидно кнопки и указателя пальца

  const [language, setLanguage] = useState(() => {
    // Пытаемся получить язык из local storage, если его там нет, по умолчанию 'ru'
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'ru';
  });

  useEffect(() => {
    // Сохраняем язык в local storage при его изменении
    localStorage.setItem('language', language);
  }, [language]);

// 
  const russianData = {
    messageOfDeveloper: {
      nameDeveloper: 'Андрей Пузыревский',
      writes: 'Андрей печатает...',
      profession: 'Front-end разработчик',
      servicesName: 'Я могу сделать для вас: ',
      listServices: ['сайт-визитку.', 'сайт-портфолио.', 'персональный сайт.', 'одностраничное приложение.'],
      messageGreetings: 'Привет! Рад, что вы посетили мой сайт. Чем могу помочь?',
      messageInvitationVisit: 'Хотите узнать больше о моих проектах или познакомиться поближе? Кликните на интересующий вас раздел:',

    },
    bannerWindowInfo: {
      motto: 'Воплощаю ваши идеи в веб-приложения — для бизнеса, творчества и развития.',
      titleInfoDisplay: ['Клиенты', 'Итоги', 'Услуги', 'Отзывы', 'Проекты', 'Навыки',]
    },
    messageOfClient: {
      about: 'Расскажите о себе.',
      portfolio: 'Покажите Ваше портфолио.',
      achievements: 'Что говорят клиенты о Ваших работах?',
      contacts: 'Как с Вами связаться?',
    },
    modalWindowEvaluation: {
      title: 'Ваше мнение имеет значение!',
      description: 'Пожалуйста, оцените мой сайт по 5-балльной шкале. Каждая оценка помогает мне улучшить опыт пользователей.',
      laterButton: 'Позже',
      rateButton: 'Оценить',
      submissionButton: 'Отправка',
      gratitude: 'Большое спасибо помощь!',
    },
    alertTextResultCopyEmail: {
      successfully: 'Скопировано',
      unsuccessfully: 'Ошибка копирования',
    },
    navBanner: {
      about: 'О себе',
      projects: 'Проекты',
      achievements: 'Достижения',
      contact: 'Контакты',
    },
    layoutNav: {
      home: 'Главная',
      about: 'О себе',
      projects: 'Проекты',
      achievements: 'Достижения',
      contact: 'Контакты',
    },
    about: {
      title: 'Обо мне',
      descriptionPhotoChildhood: 'Это я несколько лет назад',
      descriptionPhotoNow: 'Сейчас я выгляжу примерно так',
      preview: 'Я вырос в небольшом городке в Беларуси. Начинал свой путь в веб-разработке с создания простых лендингов, не используя JavaScript. Однако моя страсть и интерес к программированию быстро выросли, и я вскоре перешёл к изучению JavaScript, что открыло передо мной захватывающий мир динамичных веб-приложений.',
      aboutLocation: 'Сейчас я живу в Минске и работаю фрилансером в области веб-разработки. Меня увлекает создание интерактивных, насыщенных эффектами веб-приложений, где я предпочитаю использовать React.',
      aboutReact: 'Этот инструмент позволяет мне создавать сложные, интуитивно понятные интерфейсы с акцентом на плавную анимацию и взаимодействие, гарантируя высокую производительность приложений.',
      myQualities: 'Мой путь к веб-разработке через самообучение научил меня ценить упорный труд, инициативность и неуклонное стремление к развитию. Эти качества, в сочетании с вниманием к деталям, умением работать в команде, стрессоустойчивостью и креативностью, помогают мне создавать уникальные решения для моих клиентов и поддерживать с ними продуктивное общение.',
      resume: 'Если вас интересует более подробная информация о моем опыте и профессиональном развитии, пожалуйста, ознакомьтесь с моим ',
      hobbies: 'Помимо работы, я люблю проводить время на природе и наслаждаться рыбалкой. Также я увлекаюсь спортом, что помогает мне оставаться в хорошей физической форме и поддерживать активный образ жизни.',
      offerToCommunicate: 'Если вам интересно обсудить проект или вы просто хотите пообщаться, я всегда открыт к новым знакомствам.',
      titleSkills: 'Мои навыки',
    },
    projects: {
      title: 'Портфолио',
      nameTypeProjects: ['Все', 'Сайт-визитка', 'Сайт-портфолио', 'Персональный сайт',],
      iconTypeProjects: [{icon: <AppsIcon sx={{fontSize: '23px', lineHeight: '32px'}} />}, {icon: <CreditCardIcon sx={{fontSize: '23px', lineHeight: '32px'}} />},{icon: <SourceIcon sx={{fontSize: '23px', lineHeight: '32px'}} />},{icon: <PersonIcon sx={{fontSize: '23px', lineHeight: '32px'}} />},],
      titleProjects: 'Персональные проекты',
      buttonCardText: ['Подробнее', 'Скрыть'],
      loadingText: 'Загрузка...',
      buttonTextBack: 'Назад',
      projectDisplayTitle: 'Отображение проекта:',
      projectNotFound: ['Проекта с названием', 'не существует'],
    },
    advice: {
      adviceText: 'Нажмите на эту кнопку для просмотра портфолио на устройствах',
      adviceExit: 'Нажмите, чтобы продолжить просмотр',
    }, 
    achievements: {
      statisticsTitle: 'Статистика',
      reviewsTitle: 'Отзывы',
      leaveFeedbackText: 'Хотите оставить отзыв? Свяжитесь со мной в',
      desireLeaveReview: 'Буду рад услышать ваше мнение!',
    },
    contacts: {
      servicesTitle: 'Услуги',
      contactsTitle: 'Контакты',
      contactsContentTitle: ['Местоположение', 'E-mail', 'Telegram', 'Linkedin'],
      contactsTextDescription: ['Нахожусь в Минске, но открыт для проектов из любой точки мира.', 'Напишите мне, если у вас есть вопросы или предложения.', 'Это самый быстрый способ получить ответ на короткий вопрос.', 'Давайте соединимся для профессионального общения и сотрудничества.'],
      contactsTitleLink: ['г. Минск', 'puzyrevsky.andrei@mail.ru', '@Puzyrevsky', 'Puzyrevsky'],
      contactsTitleFormLabel: {name: 'Имя', email: 'E-mail', telegram: 'Telegram', description: 'Описание заказа'},
      contactsWarningForm: 'Это поле обязательно к заполнению',
      contactsOptionalForm: 'Укажите ваш Telegram для удобства общения',
      buttonTextSending: 'Отправка',
      buttonTextSend: 'Отправить',
      infoSendingSuccessfully: 'Ваша заявка была успешно отправлена. Мы скоро свяжемся с вами.',
      infoSendingFailure: 'Произошла ошибка при отправке вашей заявки. Пожалуйста, попробуйте еще раз.',
      infoFormNotAvailable: 'Форма временно недоступна. Оставьте заявку в соцсетях, скоро исправим!',
      errorFormValidate: 'Заполните поле',
      errorFormEmailValidate: 'Введите корректный email с символами"@" и "."',
    },
    resume: {
      resumeTitle: 'Резюме',
      cardResume: {name: 'Андрей Пузыревский', position: 'Веб-разработчик / Frontend-разработчик', location: 'Местоположение:', city: 'г. Минск', },
      education: {title: 'Образование', educationOne: {name: 'РГУОР', time: '2018-2020', position: 'Тренер-преподаватель по спорту', description: 'Формирование навыков планирования, организации и проведения тренировочных процессов. Развитие коммуникативных навыков и умения работать в команде.'}, educationTwo: {name: 'БГУФК',  time: '2022-н.в.', position: 'Тренер-преподаватель по спорту', description: 'Хотя мое основное образование не связано с IT, я активно развиваю навыки, которые способствуют моей работе в команде, лидерстве и умении справляться с задачами под давлением — качества, необходимые для успешной карьеры в технологиях.'}},
      professionalDevelopment: {title: 'Профессиональное развитие', name: 'Курсы по веб-разработке', courses: ['HTML и CSS, webDev, 2020', 'JavaScript, Богдан Стащук (coursehunter), Владилен Минин, 2020', 'React, Богдан Стащук (coursehunter), 2022', 'Основы Figma, 2023']},
      educationalProjects: {name: 'Учебные проекты', projects: ['Landing Page - Разработка и реализация статичных страниц для маркетинговых целей.', 'Таск-менеджер - Создание приложения для управления задачами с использованием React.', 'Секундомер - Разработка функционального секундомера с базовыми возможностями управления временем.']},
      technicalSkills: {title: 'Технические навыки', nameProgrammingLanguages: 'Языки программирования', nameToolsPlatforms: 'Инструменты и платформы', nameMarkupStyling: 'Языки разметки и стилизации', nameFrameworksLibraries: 'Фреймворки и библиотеки', programmingLanguages: ['JavaScript',], frameworksLibraries: ['React, включая библиотеки и хуки (useState, useEffect, useContext, useRef)',], markupStyling: ['HTML', 'CSS'], toolsPlatforms: ['Figma', 'GitHub', 'Visual Studio Code']},
      professionalExperience: {title: 'Профессиональный опыт', geltung: {name: 'Geltung', position: 'Frontend-разработчик', time: '2023', description: 'Разработка интерфейсов для управления заказами, улучшение пользовательского опыта, оптимизация рабочих процессов.',}, ExoDigital: {name: 'EXO DIGITAL SOLUTIONS', position: 'HTML-верстальщик', time: '2020', description: 'Точная верстка макетов, соблюдение стандартов и удобство для пользователей.',}, ArtKlen: {name: 'ArtKlen', position: 'React-разработчик', time: '2024', description: 'Работа над созданием и поддержкой пользовательских интерфейсов для коммерческих веб-приложений. Внедрение передовых практик и технологий для улучшения пользовательского опыта.',}},
      aboutMe: {title: 'Обо мне', name: 'Личные качества', quality: ['Ответственность и надежность', 'Способность к быстрому обучению и адаптации', 'Сильные коммуникативные навыки и умение работать в команде']},
      buttonTextDownload: 'Скачать резюме в PDF',
    },
    footer: {
      privacy: 'Политика конфиденциальности',
      terms: 'Условия использования',
      created: 'Создано Андреем Пузыревским. Все права защищены © 2024.',
    },
    pagePrivacy: {
      title: 'Политика конфиденциальности',
      introductionTitle: 'Введение',
      introductionText: 'Добро пожаловать на сайт портфолио Андрея Пузыревского. В этой Политике конфиденциальности объясняется, как я собираю, использую и защищаю вашу личную информацию при посещении моего сайта. Используя этот сайт, вы соглашаетесь с условиями, изложенными в данной Политике конфиденциальности.',
      collectionInformationTitle: 'Сбор информации',
      collectionInformationSubtitle: 'Личная информация',
      collectionInformationTextPartOne: 'Я могу собирать личную информацию, которую вы добровольно предоставляете, когда:',
      collectionInformationItemOne: 'Связываетесь со мной через контактную форму',
      collectionInformationItemTwo: 'Оставляете отзывы или комментарии',
      collectionInformationTextPartTwo: 'Собираемая личная информация может включать ваше имя, адрес электронной почты, номер телефона и любую другую информацию, которую вы решите предоставить.',
      useInformationTitle: 'Использование информации',
      useInformationSubtitle: 'Личная информация',
      useInformationText: 'Предоставленная вами личная информация используется для следующих целей:',
      useInformationItemOne: 'Ответ на ваши запросы и предоставление информации о моих услугах',
      useInformationItemTwo: 'Улучшение моего сайта и услуг',
      useInformationItemThree: 'Понимание и анализ того, как вы используете мой сайт',
      localStorageTitle: 'Local Storage',
      localStorageText: 'Мой сайт может использовать local storage для сохранения пользовательских настроек и улучшения вашего опыта на сайте. В local storage могут сохраняться такие данные, как выбранный язык интерфейса или другие настройки, которые вы устанавливаете на сайте.',
      thirdServicesTitle: 'Сторонние службы',
      thirdServicesText: 'Я могу использовать сторонние службы, такие как инструменты аналитики, чтобы лучше понимать, как посетители используют мой сайт. Эти сторонние службы могут собирать и обрабатывать информацию в соответствии с их собственными политиками конфиденциальности.',
      dataSecurityTitle: 'Безопасность данных',
      dataSecurityText: 'Я принимаю разумные меры для защиты вашей личной информации от несанкционированного доступа, раскрытия или изменения. Однако, пожалуйста, помните, что ни одна передача данных через Интернет не может быть абсолютно безопасной, и я не могу гарантировать абсолютную безопасность вашей информации.',
      yourRightsTitle: 'Ваши права',
      yourRightsSubtitle: 'Вы имеете право на:',
      yourRightsItemOne: 'Доступ к личной информации, которую я храню о вас',
      yourRightsItemTwo: 'Запрос на исправление или удаление вашей личной информации',
      yourRightsText: 'Для реализации этих прав, пожалуйста, свяжитесь со мной, используя контактную информацию, предоставленную на моем сайте.',
      policyChangesTitle: 'Изменения в этой Политике конфиденциальности',
      policyChangesText: 'Я могу периодически обновлять эту Политику конфиденциальности. Любые изменения будут опубликованы на этой странице с обновленной датой пересмотра. Я рекомендую вам периодически просматривать эту Политику конфиденциальности, чтобы оставаться в курсе того, как я защищаю вашу информацию.',
      contactsInfoTitle: 'Контактная информация',
      contactsInfoText: 'Если у вас есть вопросы или опасения по поводу этой Политики конфиденциальности, пожалуйста, свяжитесь со мной по адресу:',
      autorName: 'Андрей Пузыревский',
      emailText: 'Электронная почта: ',
      email: ' puzyrevsky.andrei@mail.ru',
      dateText: 'Дата вступления в силу: Июнь, 2024',
      buttonBack: 'Назад, в раздел',
    },
    pageUsage: {
      title: 'Условия использования',
      introductionTitle: 'Введение',
      introductionText: 'Добро пожаловать на сайт портфолио Андрея Пузыревского. Пожалуйста, внимательно прочитайте эти Условия использования перед тем, как начать пользоваться сайтом. Используя этот сайт, вы соглашаетесь с данными Условиями использования. Если вы не согласны с этими условиями, пожалуйста, не используйте сайт.',
      usingSiteTitle: 'Использование сайта',
      usingSiteTitleSubtitle: 'Личная ответственность',
      usingSiteText: 'Вы несете личную ответственность за использование этого сайта. Вы обязуетесь использовать сайт исключительно в законных целях и не нарушать права третьих лиц.',
      informationOnSiteTitle: 'Информация на сайте',
      informationOnSiteText: 'Хотя я стремлюсь предоставлять точную и актуальную информацию на этом сайте, вся информация предоставляется "как есть" без каких-либо гарантий.',
      disclaimerResponsibilityTitle: 'Отклонение ответственности',
      thirdPartySitesSubtitle: 'Ссылки на сторонние сайты',
      thirdPartySitesText: 'Мой сайт может содержать ссылки на сторонние сайты. Я не несу ответственности за контент или политику конфиденциальности этих сайтов. Переходя по ссылкам на сторонние сайты, вы делаете это на свой страх и риск.',
      disclaimerSubtitle: 'Ограничение ответственности',
      disclaimerText: 'Пожалуйста, помните, что использование этого сайта осуществляется на ваш страх и риск. Я прилагаю все усилия для обеспечения точности и актуальности информации, представленной на этом сайте. Однако, я не могу гарантировать, что сайт будет всегда доступен и без ошибок. Я не несу ответственности за любые убытки, которые могут возникнуть из-за использования или невозможности использования сайта.',
      сhangesTermsUseTitle: 'Изменения в Условиях использования',
      сhangesTermsUseText: 'Я оставляю за собой право изменять эти Условия использования в любое время без предварительного уведомления. Изменения вступают в силу с момента их публикации на этой странице. Рекомендуется периодически просматривать эту страницу для ознакомления с актуальными условиями.',
      contactsInfoTitle: 'Контактная информация',
      contactsInfoText: 'Если у вас есть вопросы или комментарии по поводу этих Условий использования, пожалуйста, свяжитесь со мной:',
      autorName: 'Андрей Пузыревский',
      emailText: 'Электронная почта: ',
      email: ' puzyrevsky.andrei@mail.ru',
      dateText: 'Дата вступления в силу: Июнь, 2024',
      buttonBack: 'Назад, в раздел',
    },
    notFound: {
      errorText: 'Произошла ошибка',
      errorDescription: ['Не удалось загрузить страницу.', 'Возможно такой страницы не существует.',],
      buttonBack: 'Назад',
    },

  }

  const englishData = {
    messageOfDeveloper: {
      nameDeveloper: 'Andrey Puzyrevsky',
      writes: 'Andrey is typing...',
      profession: 'Front-end developer',
      servicesName: 'I can do it for you: ',
      listServices: ['landing page.', 'portfolio website.', 'personal website.', 'single page application.'],
      messageGreetings: 'Hello! I`m glad you visited my website. How can I help you?',
      messageInvitationVisit: 'Would you like to learn more about my projects or get to know me better? Click on the section that interests you:',
    },
    bannerWindowInfo: {
      motto: 'Bringing your ideas to life as web applications — for business, creativity, and growth.',
      titleInfoDisplay: ['Clients', 'Results', 'Services', 'Reviews', 'Projects', 'Skills',]
    },
    messageOfClient: {
      about: 'Tell us about yourself.',
      portfolio: 'Show us your portfolio.',
      achievements: 'What do clients say about your work?',
      contacts: 'How can we contact you?',
    },
    modalWindowEvaluation: {
      title: 'Your opinion matters!',
      description: 'Please rate my website on a 5-point scale. Every rating helps me enhance the user experience.',
      laterButton: 'Later',
      rateButton: 'Rate',
      submissionButton: 'Submission',
      gratitude: 'Thank you very much for your help!',
    },
    alertTextResultCopyEmail: {
      successfully: 'Copied',
      unsuccessfully: 'Copy Error',
    },
    navBanner: {
      about: 'About',
      projects: 'Projects',
      achievements: 'Achievements',
      contact: 'Contact',
    },
    layoutNav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      achievements: 'Achievements',
      contact: 'Contact',
    },
    about: {
      title: 'About me',
      descriptionPhotoChildhood: 'This is me a few years ago',
      descriptionPhotoNow: 'Now I look something like this',
      preview: 'I grew up in a small town in Belarus, starting my journey into web development by creating simple landing pages without using JavaScript. However, my passion and interest in programming quickly grew, leading me to dive into JavaScript, which opened up the fascinating world of dynamic web applications to me.',
      aboutLocation: 'Currently, I reside in Minsk and work as a freelance web developer. I am passionate about crafting interactive, effect-rich web applications, with a preference for using React.',
      aboutReact: 'This tool enables me to develop complex, intuitive interfaces with a focus on smooth animation and interaction, ensuring high application performance.',
      myQualities: 'My journey into web development through self-learning taught me to value hard work, initiative, and a constant drive for improvement. These qualities, combined with attention to detail, teamwork ability, resilience, and creativity, help me create unique solutions for my clients and maintain productive communication with them.',
      resume: 'If you are interested in more detailed information about my experience and professional development, please review my ',
      hobbies: 'Besides work, I enjoy spending time outdoors and fishing. I`m also passionate about sports, which helps me stay in good physical shape and maintain an active lifestyle.',
      offerToCommunicate: 'If you`re interested in discussing a project or just want to chat, I`m always open to new connections.',
      titleSkills: 'My Skills',
    },
    projects: {
      title: 'Portfolio',
      nameTypeProjects: ['All', 'Landing page', 'Portfolio website', 'Personal website',],
      iconTypeProjects: [{icon: <AppsIcon sx={{fontSize: '23px', lineHeight: '32px'}} />}, {icon: <CreditCardIcon sx={{fontSize: '23px', lineHeight: '32px'}} />},{icon: <SourceIcon sx={{fontSize: '23px', lineHeight: '32px'}} />},{icon: <PersonIcon sx={{fontSize: '23px', lineHeight: '32px'}} />},],
      titleProjects: 'Personal Projects',
      buttonCardText: ['Мore details', 'Hide'],
      loadingText: 'Loading...',
      buttonTextBack: 'Back',
      projectDisplayTitle: 'Project display:',
      projectNotFound: ['Project with the name', 'does not exist'],
    },
    advice: {
      adviceText: 'Press this button to view the portfolio on devices',
      adviceExit: 'Click to continue viewing',
    },
    achievements: {
      statisticsTitle: 'Statistics',
      reviewsTitle: 'Reviews',
      leaveFeedbackText: 'Want to leave a review? Contact me on',
      desireLeaveReview: 'I would be happy to hear your feedback!',
    },
    contacts: {
      servicesTitle: 'Services',
      contactsTitle: 'Сontacts',
      contactsContentTitle: ['Location', 'E-mail', 'Telegram', 'Linkedin'],
      contactsTextDescription: ['Based in Minsk, but open to projects from anywhere in the world.', 'Write to me if you have any questions or suggestions.', 'This is the fastest way to get an answer to a brief question.', 'Let`s connect for professional communication and collaboration.'],
      contactsTitleLink: ['city of Minsk', 'puzyrevsky.andrei@mail.ru', '@Puzyrevsky', 'Puzyrevsky'],
      contactsTitleFormLabel: {name: 'Name', email: 'E-mail', telegram: 'Telegram', description: 'Order description'},
      contactsWarningForm: 'This field is required',
      contactsOptionalForm: 'Please provide your Telegram handle for easier communication',
      buttonTextSending: 'Sending',
      buttonTextSend: 'Send',
      infoSendingSuccessfully: 'Your request has been successfully submitted. We will contact you shortly.',
      infoSendingFailure: 'There was an error submitting your request. Please try again.',
      errorFormValidate: 'Please fill in the field',
      errorFormEmailValidate: 'Please enter a valid email with "@" and "."',
    },
    resume: {
      resumeTitle: 'Resume',
      cardResume: {name: 'Andrei Puzyrevsky', position: 'Web-developer / Frontend-developer', location: 'Location:', city: 'Minsk', },
      education: {title: 'Education', educationOne: {name: 'RGUOR', time: '2018-2020', position: 'Sports Coach and Trainer', description: 'Developing skills in planning, organizing, and conducting training processes. Enhancing communication skills and the ability to work in a team.'}, educationTwo: {name: 'BSUPC',  time: '2022-Pres.', position: 'Sports Coach and Trainer', description: 'Although my primary education is not related to IT, I actively develop skills that enhance my teamwork, leadership, and ability to handle tasks under pressure—qualities essential for a successful career in technology.',}},
      professionalDevelopment: {title: 'Professional development', name: 'Web Development courses', courses: ['HTML and CSS, webDev, 2020', 'JavaScript, Bohdan Stashchuk (coursehunter), Vladilen Minin, 2020', 'React, Bohdan Stashchuk (coursehunter), 2022', 'Figma Basics, 2023']},
      educationalProjects: {name: 'Educational projects', projects: ['Landing Page - Development and implementation of static pages for marketing purposes.', 'Task Manager - Development of a task management application using React.', 'Stopwatch - Development of a functional stopwatch with basic time management features.']},
      technicalSkills: {title: 'Technical skills', nameProgrammingLanguages: 'Programming Languages', nameToolsPlatforms: 'Tools and Platforms', nameMarkupStyling: 'Markup and Styling Languages', nameFrameworksLibraries: 'Frameworks and Libraries', programmingLanguages: ['JavaScript',], frameworksLibraries: ['React, including libraries and hooks (useState, useEffect, useContext, useRef)',], markupStyling: ['HTML', 'CSS'], toolsPlatforms: ['Figma', 'GitHub', 'Visual Studio Code']},
      professionalExperience: { title: 'Professional Experience', geltung: { name: 'Geltung', position: 'Frontend Developer', time: '2023', description: 'Development of interfaces for order management, user experience improvement, and process optimization.' }, ExoDigital: { name: 'EXO DIGITAL SOLUTIONS', position: 'HTML Developer', time: '2020', description: 'Precise layout of mockups, standards compliance, and user convenience.' }, ArtKlen: { name: 'ArtKlen', position: 'React Developer', time: '2024', description: 'Work on the creation and maintenance of user interfaces for commercial web applications. Implementation of advanced practices and technologies to enhance user experience.' } },
      aboutMe: {title: 'About me', name: 'Personal qualities', quality: ['Responsibility and reliability', 'Ability to learn quickly and adapt', 'Strong communication skills and ability to work in a team']},
      buttonTextDownload: 'Download Resume as PDF',
    },
    footer: {
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
      created: 'Created by Andrey Puzyrevsky. All rights reserved © 2024.',
    },
    pagePrivacy: {
      title: 'Privacy Policy',
      introductionTitle: 'Introduction',
      introductionText: 'Welcome to Andrey Puzyrevsky\'s portfolio website. This Privacy Policy explains how I collect, use, and protect your personal information when you visit my website. By using this website, you agree to the terms outlined in this Privacy Policy.',
      collectionInformationTitle: 'Information Collection',
      collectionInformationSubtitle: 'Personal Information',
      collectionInformationTextPartOne: 'I may collect personal information that you voluntarily provide when:',
      collectionInformationItemOne: 'You contact me via the contact form',
      collectionInformationItemTwo: 'You leave feedback or comments',
      collectionInformationTextPartTwo: 'The personal information collected may include your name, email address, phone number, and any other information you choose to provide.',
      useInformationTitle: 'Use of Information',
      useInformationSubtitle: 'Personal Information',
      useInformationText: 'The personal information you provide is used for the following purposes:',
      useInformationItemOne: 'To respond to your inquiries and provide information about my services',
      useInformationItemTwo: 'To improve my website and services',
      useInformationItemThree: 'To understand and analyze how you use my website',
      localStorageTitle: 'Local Storage',
      localStorageText: 'My website may use local storage to save user settings and improve your experience on the site. Data such as the selected interface language or other settings you configure on the site may be stored in local storage.',
      thirdServicesTitle: 'Third-Party Services',
      thirdServicesText: 'I may use third-party services, such as analytics tools, to better understand how visitors use my website. These third-party services may collect and process information in accordance with their own privacy policies.',
      dataSecurityTitle: 'Data Security',
      dataSecurityText: 'I take reasonable measures to protect your personal information from unauthorized access, disclosure, or alteration. However, please be aware that no data transmission over the Internet can be completely secure, and I cannot guarantee the absolute security of your information.',
      yourRightsTitle: 'Your Rights',
      yourRightsSubtitle: 'You have the right to:',
      yourRightsItemOne: 'Access the personal information I hold about you',
      yourRightsItemTwo: 'Request the correction or deletion of your personal information',
      yourRightsText: 'To exercise these rights, please contact me using the contact information provided on my website.',
      policyChangesTitle: 'Changes to This Privacy Policy',
      policyChangesText: 'I may periodically update this Privacy Policy. Any changes will be posted on this page with an updated revision date. I encourage you to review this Privacy Policy periodically to stay informed about how I am protecting your information.',
      contactsInfoTitle: 'Contact Information',
      contactsInfoText: 'If you have any questions or concerns about this Privacy Policy, please contact me at:',
      autorName: 'Andrey Puzyrevsky',
      emailText: 'Email: ',
      email: ' puzyrevsky.andrei@mail.ru',
      dateText: 'Effective Date: June, 2024',
      buttonBack: 'Back to section',
    },
    pageUsage: {
      title: 'Terms of Use',
      introductionTitle: 'Introduction',
      introductionText: 'Welcome to the portfolio website of Andrey Puzyrevsky. Please read these Terms of Use carefully before you start using the website. By using this site, you agree to these Terms of Use. If you do not agree with these terms, please do not use the site.',
      usingSiteTitle: 'Use of the Website',
      usingSiteTitleSubtitle: 'Personal Responsibility',
      usingSiteText: 'You bear personal responsibility for the use of this website. You agree to use the site solely for lawful purposes and not to infringe on the rights of third parties.',
      informationOnSiteTitle: 'Information on the Website',
      informationOnSiteText: 'While I strive to provide accurate and up-to-date information on this website, all information is provided "as is" without any warranties.',
      disclaimerResponsibilityTitle: 'Disclaimer of Liability',
      thirdPartySitesSubtitle: 'Links to Third-Party Websites',
      thirdPartySitesText: 'My website may contain links to third-party websites. I am not responsible for the content or privacy policies of these websites. By following links to third-party websites, you do so at your own risk.',
      disclaimerSubtitle: 'Limitation of Liability',
      disclaimerText: 'Please be aware that the use of this website is at your own risk. I make every effort to ensure the accuracy and currency of the information presented on this site. However, I cannot guarantee that the site will always be available and error-free. I am not liable for any damages that may arise from the use or inability to use the site.',
      сhangesTermsUseTitle: 'Changes to the Terms of Use',
      сhangesTermsUseText: 'I reserve the right to modify these Terms of Use at any time without prior notice. Changes will take effect immediately upon posting on this page. It is recommended to periodically review this page to stay informed about the current terms.',
      contactsInfoTitle: 'Contact Information',
      contactsInfoText: 'If you have any questions or comments regarding these Terms of Use, please contact me:',
      autorName: 'Andrey Puzyrevsky',
      emailText: 'Email: ',
      email: ' puzyrevsky.andrei@mail.ru',
      dateText: 'Effective Date: June, 2024',
      buttonBack: 'Back to section',
    },
    notFound: {
      errorText: 'An error occurred',
      errorDescription: ['Failed to load the page.', 'The page may not exist.',],
      buttonBack: 'Back',
    },

  }

// 

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru');
  }
  
  const urlPath = useLocation();

  const arrayPathsProjects = ['/eduCals',];
  const translationButtonDisplayHandler = arrayPathsProjects.find((item) => item === urlPath.pathname);

// 

  const currentData = language === 'ru' ? russianData : englishData;

  const [handlerRotateIconLanguage, setHandlerRotateIconLanguage] = useState(null);

  const [handlerRotateIconStar, setHandlerRotateIconStar] = useState(false);
  const [handlerColorIconStar, setHandlerColorIconStar] = useState('#B0A080');

// path links and name links, for sections buttons on start banner

  const links = [{link: '/portfolio/about', textNav: currentData.navBanner.about}, {link: '/portfolio/projects',  textNav: currentData.navBanner.projects}, {link: '/portfolio/achievements',  textNav: currentData.navBanner.achievements}, {link: '/portfolio/contacts', textNav: currentData.navBanner.contact}];

// 

useEffect(() => {
  // Отключаем автоматическое восстановление скролла браузером
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }

  // Принудительно прокручиваем наверх после отрисовки страницы
  const timeout = setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);

  return () => {
    clearTimeout(timeout);
    // Восстанавливаем поведение по умолчанию при размонтировании компонента
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'auto';
    }
  };
}, [urlPath.pathname]);

// secure block sort container start

const [secureBlockSortContainer, setSecureBlockSortContainer] = useState(true);

// secure block sort container end

const [handlerHidingSortBlock, setHandlerHidingSortBlock] = useState(false);

// definition size window (div with className - wrapper__app)
const wrapperApp = useRef();
const [widthWrapperApp, setWidthWrapperApp] = useState(0);

useEffect(() => {
  if(wrapperApp.current) {
    const updateWidth = () => {
      setWidthWrapperApp(wrapperApp.current.offsetWidth)
    }

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(wrapperApp.current);

    return () => resizeObserver.disconnect()
  }
}, []);
// 

const [prob, setProb] = useState(true);


// Rating block logics start

const [counterTransitionPathUrl, setCounterTransitionPathUrl] = useState(0);

useEffect(() => {

  if(counterTransitionPathUrl >= 4 ) {
    return;
  }

  setCounterTransitionPathUrl(prevValue => prevValue + 1);
  
}, [urlPath.pathname]);



const [handlerTextModalWindowRating, setHandlerTextModalWindowRating] = useState(false);
const [inclusionProgressOnButtonSendRating, setInclusionProgressOnButtonSendRating] = useState(false);

const [ratingValue, setRatingValue] = useState(0);


const [handlerShowModalWindow, setHandlerShowModalWindow] = useState(false);


const [handlerTurnOnReminderEvaluate, setHandlerTurnOnReminderEvaluate] = useState(() => {
  const saved = localStorage.getItem('handlerTurnOnReminderEvaluate');
  return saved ? JSON.parse(saved) : false;
});

useEffect(() => {
  localStorage.setItem('handlerTurnOnReminderEvaluate', JSON.stringify(handlerTurnOnReminderEvaluate));
}, [handlerTurnOnReminderEvaluate]);

const switchStateReminderEvaluate = (value) => {
  setHandlerTurnOnReminderEvaluate(value);
}


const [handlerSavedCompletedAssessment, setHandlerSavedCompletedAssessment] = useState(() => {
  const saved = localStorage.getItem('handlerSavedCompletedAssessment');
  return saved ? JSON.parse(saved) : false; // Значение по умолчанию - false
});


useEffect(() => {
  localStorage.setItem('handlerSavedCompletedAssessment', JSON.stringify(handlerSavedCompletedAssessment));
}, [handlerSavedCompletedAssessment]);

const handleCompleteAssessment = () => {

  setHandlerTextModalWindowRating(true);

  const timeout = setTimeout(() => {
    setHandlerSavedCompletedAssessment(true);
    
  }, 3500);
};


useEffect(() => {

  let timeout; 
  let timeoutPageProject;

  if(counterTransitionPathUrl === 4 && !handlerSavedCompletedAssessment && !handlerTurnOnReminderEvaluate && !handlerShowModalWindow) {
    timeout = setTimeout(() => {
      if(urlPath.pathname == '/portfolio/projects') {
        if(handlerStartAdvice && !handlerShowAdvice) {
          timeoutPageProject = setTimeout(() => {
            setHandlerShowModalWindow(true);
          }, 3000);
        } else {
          return;
        }
      } else {
        setHandlerShowModalWindow(true);
      }
    }, 5000); // изменить на большое количество времени
  }

  return () => {
    clearTimeout(timeout);
    clearTimeout(timeoutPageProject);
  }

}, [handlerSavedCompletedAssessment, counterTransitionPathUrl, urlPath.pathname, handlerStartAdvice, handlerShowAdvice]);

//

  const [lc, setLc] = useState('');

  useEffect(() => {
    const fetchIpAddress = async () => {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            setLc(data.ip); 
        } 
        catch (error) {
            // console.error();
        }
    };

    fetchIpAddress();
}, []);

// 

const handlerRatingValue = (event, newValue) => {
  setRatingValue(newValue);
}

const [devaiceUser, setDevaiceUser] = useState({
  deviceType: null,
  deviceModel: null,

})

const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;
  let deviceType = 'Unknown';
  let deviceModel = 'Unknown';

  if (/android/i.test(userAgent)) {
      deviceType = 'Android';
      // Обновляем регулярное выражение для захвата модели устройства
      const match = userAgent.match(/Android\s[0-9.]+;\s?([^\s;]+)/);
      deviceModel = match ? match[1] : 'Unknown model';
  } else if (/iPad/i.test(userAgent)) {
      deviceType = 'iPad';
      deviceModel = 'iPad'; // Модели iPad могут быть получены по-другому, если необходимо
  } else if (/iPhone/i.test(userAgent)) {
      deviceType = 'iPhone';
      // Извлекаем модель устройства
      const match = userAgent.match(/iPhone\sOS\s([0-9_]+)/);
      deviceModel = match ? `iPhone ${match[1].replace(/_/g, '.')}` : 'Unknown model';
  } else if (/Windows/i.test(userAgent)) {
      deviceType = 'Windows';
  } else if (/Macintosh/i.test(userAgent)) {
      deviceType = 'Mac';
  }

  return { deviceType, deviceModel };
};


const handleSendEmail = (e) => {

  // Формируем данные для отправки
  const templateParams = {
      ratingValue: ratingValue,
      deviceType: devaiceUser.deviceType,
      deviceModel: devaiceUser.deviceModel,
      loc: lc,
  };


  // Отправляем данные через EmailJS
  emailjs.send('service_aciq71r', 'template_uyseda4', templateParams, '_Zj-MH4pAqFBv6f2y')
      .then((result) => {
        handleCompleteAssessment();
      }, (error) => {
          handleCompleteAssessment();
      });
};


const handleClick = (e) => {
  e.preventDefault();

  const { deviceType, deviceModel } = getDeviceInfo();
  setDevaiceUser({deviceType: deviceType, deviceModel: deviceModel});

  setInclusionProgressOnButtonSendRating(true);
};

useEffect(() => {
  if (devaiceUser.deviceType && devaiceUser.deviceModel) {
      handleSendEmail();
  }
}, [devaiceUser, lc]);


useEffect(() => {
  if(!handlerSavedCompletedAssessment && handlerShowModalWindow) {
    document.body.classList.add('no__scroll_for__modal_rating');
    document.documentElement.classList.add('no__scroll_for__modal_rating');
  } else {
    document.body.classList.remove('no__scroll_for__modal_rating');
    document.documentElement.classList.remove('no__scroll_for__modal_rating');
  }

  return () => {
    document.body.classList.remove('no__scroll_for__modal_rating');
    document.documentElement.classList.remove('no__scroll_for__modal_rating');
  }
}, [handlerSavedCompletedAssessment, handlerShowModalWindow])


const [valueTimer, setValueTimer] = useState(0);
const [timeTimer, setTimeTimer] = useState(3);

useEffect(() => {

  let interval;
  let intervalTimer;

  if(handlerTextModalWindowRating) {
    interval = setInterval(() => {
      setValueTimer((val) => {
        if(val >= 99) {
          return 100;
        }
        else {
          return val + 3;
        }
      });
    }, 90);

    intervalTimer = setInterval(() => {
      setTimeTimer(val => val - 1);
    }, 1000);

  } else {
    setValueTimer(0);
    setTimeTimer(3);
  }
}, [handlerTextModalWindowRating])

const [handlerDelayAppearanceAnimationModalWindow, setHandlerDelayAppearanceAnimationModalWindow] = useState(false);

useEffect(() => {
  let timeout;
  if(handlerShowModalWindow) {
    timeout = setTimeout(() => {
      setHandlerDelayAppearanceAnimationModalWindow(true);
      }, 20);
  } else {
    setHandlerDelayAppearanceAnimationModalWindow(false);
  }
  
  return () => clearTimeout(timeout);
}, [handlerShowModalWindow]);



  return (

      <Context.Provider value={{data: currentData, toggleLanguage}}>
        <div ref={wrapperApp} className='wrapper__app'>
          {(!handlerSavedCompletedAssessment && handlerShowModalWindow) &&
          <div className='modal__window_rating__container_overlay'>
            <div className={`${handlerDelayAppearanceAnimationModalWindow ? 'modal__window_rating__container' : 'modal__window_rating__container_transparency__not_view'}`}>
              {handlerTextModalWindowRating && <div className="button__pointer_close__modal_window__container">
                <Box sx={{position: 'relative', display: 'inline-flex', marginRight: '13px'}}>
                  <CircularProgress variant="determinate" sx={{color: 'rgba(133, 193, 233, 0.7)'}} size={30} value={valueTimer} />
                  <Box sx={{position: 'absolute', top: '2px', left: '0', right: '0', bottom: '0', display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
                    <Typography sx={{lineHeight: '30px', color: '#add8e6',}}>{timeTimer}</Typography>
                  </Box>
                </Box>
                <CloseIcon sx={{color: '#C0C0C0', cursor: 'pointer', transition: '0.3s', '&:hover': {color: '#A0D1E6', transition: '0.3s'}}} onClick={() => setHandlerShowModalWindow(false)} />
              </div>}
              <h3 className='text__modal_rating__title' style={{marginTop: handlerTextModalWindowRating ? '28px' : ''}}>{currentData.modalWindowEvaluation.title}</h3>
              {!handlerTextModalWindowRating ? <div className='text__buttons_modal__container'>
                <Stack spacing={1}>
                  <Rating disabled={inclusionProgressOnButtonSendRating} name="size-large" value={ratingValue} onChange={handlerRatingValue} size="large" />
                </Stack>
                <p className='text__modal_rating'>{currentData.modalWindowEvaluation.description}</p>
                <div className='buttons__modal_window__rating_container'>
                  <Button disabled={inclusionProgressOnButtonSendRating} sx={{transition: '0.3s', color: '#66CDAA', borderColor: '#66CDAA', '&:hover': {transition: '0.3s', borderColor: '#57b293',}}} onClick={() => {
                    setHandlerShowModalWindow(false);
                    switchStateReminderEvaluate(true);
                    }} variant="outlined">{currentData.modalWindowEvaluation.laterButton}</Button>
                  <Button sx={{color: '#ffffffcc', transition: '0.3s', fontSize: '14px', fontWeight: 'bold', backgroundColor: '#66CDAA', pointerEvents: !inclusionProgressOnButtonSendRating ? 'auto' : 'none', '&:hover': {backgroundColor: '#57b293', transition: '0.3s'},}} onClick={handleClick} disabled={!ratingValue} variant="contained" endIcon={!inclusionProgressOnButtonSendRating ? <BarChartIcon sx={{fontSize: '10px'}} /> : <CircularProgress size={20} sx={{color: '#ffffffcc'}} />} >{!inclusionProgressOnButtonSendRating ? currentData.modalWindowEvaluation.rateButton : currentData.modalWindowEvaluation.submissionButton}</Button>
                </div>
              </div>
              :
              <div className='gratitude__text_modal__container'>
                <p className='text__modal_rating'>{currentData.modalWindowEvaluation.gratitude}</p>
              </div>}
            </div>
          </div>}
          {!translationButtonDisplayHandler && 
          <div className={handlerRotateIconLanguage === true ? 'switching__language_button__container_activ' : 'switching__language_button__container'} onClick={() => {
            toggleLanguage();
              setHandlerRotateIconLanguage(true);
            setTimeout(()=> {
              setHandlerRotateIconLanguage(null);
            }, 800)
            }}> 
            <div className={handlerRotateIconLanguage === true ? 'icon__language_container__activ' : 'icon__language_container'}>
              <LanguageIcon style={{fontSize: handlerRotateIconLanguage === true ? '38px' : '45px',transition: '.2s' , color: '#282c34'}} className='icon__language'/>
            </div>
            <p className='text__language'>{language === 'ru' ? 'ru' : 'en'}</p> 
          </div>}
          {!translationButtonDisplayHandler && handlerTurnOnReminderEvaluate && !handlerSavedCompletedAssessment &&
          <div className={handlerRotateIconStar === true ? 'switching__star_button__container_activ' : 'switching__star_button__container'} onClick={() => {
            setHandlerRotateIconStar(true);
            setTimeout(()=> {
              setHandlerShowModalWindow(true);
              setHandlerRotateIconStar(false);
              setHandlerColorIconStar('#B0A080');
            }, 800)
            setTimeout(() => {
              setHandlerColorIconStar('#FFA500');
            }, 300);
            }}> 
            <div className={handlerRotateIconStar === true ? 'icon__star_container__activ' : 'icon__star_container'}>
              <StarHalfIcon style={{fontSize: handlerRotateIconStar === true ? '40px' : '45px', transition: '.2s' , color: '#282c34', color: handlerColorIconStar,}} />
            </div>
          </div>}
          <Routes>
            <Route path='/' element={<BannerStart prob={prob} setProb={setProb} links={links} language={language} widthWrapperApp={widthWrapperApp} />} />
              <Route path="/portfolio" element={<Layout language={language} prob={prob} handlerDescriptionSite={handlerDescriptionSite} setLocation={setLocation} handlerHidingSortBlock={handlerHidingSortBlock} secureBlockSortContainer={secureBlockSortContainer} setPreviousPageAdress={setPreviousPageAdress} previousPageAdress={previousPageAdress} links={links} namePreviousPageButton={namePreviousPageButton} setNamePreviousPageButton={setNamePreviousPageButton} widthWrapperApp={widthWrapperApp} handlerSavedCompletedAssessment={handlerSavedCompletedAssessment} handlerShowAdvice={handlerShowAdvice} handlerClickButtonView={handlerClickButtonView} handlerTurnOnReminderEvaluate={handlerTurnOnReminderEvaluate} handlerShowModalWindow={handlerShowModalWindow} setHandlerShowModalWindow={setHandlerShowModalWindow} />}>
                <Route path="about" element={<About language={language} />} />
                <Route path="projects" element={<Projects handlerDescriptionSite={handlerDescriptionSite} setHandlerDescriptionSite={setHandlerDescriptionSite} handlerHidingSortBlock={handlerHidingSortBlock} setHandlerHidingSortBlock={setHandlerHidingSortBlock} secureBlockSortContainer={secureBlockSortContainer} setSecureBlockSortContainer={setSecureBlockSortContainer} handlerClickButtonView={handlerClickButtonView} setHandlerClickButtonView={setHandlerClickButtonView} handlerShowAdvice={handlerShowAdvice} setHandlerShowAdvice={setHandlerShowAdvice} handlerScrollAfterAdvice={handlerScrollAfterAdvice} setHandlerScrollAfterAdvice={setHandlerScrollAfterAdvice} timerTransitionLink={timerTransitionLink} setTimerTransitionLink={setTimerTransitionLink} location={location} language={language} widthWrapperApp={widthWrapperApp} />} />
                <Route path="achievements" element={<Achievements language={language} widthWrapperApp={widthWrapperApp} />} />
                <Route path="contacts" element={<Contacts language={language} />} />
                <Route path="privacy-policy" element={<PrivacyPolicy previousPageAdress={previousPageAdress} namePreviousPageButton={namePreviousPageButton} />} />
                <Route path="terms-use" element={<TermsUse previousPageAdress={previousPageAdress} namePreviousPageButton={namePreviousPageButton} />} />
                <Route path="about/resume" element={<Resume widthWrapperApp={widthWrapperApp} language={language} />} />
                <Route path="projects/:projectName" element={<ProjectDisplay />} />
              </Route>
              <Route path="*" element={<NotFound />} />
              <Route path="eduCals" element={<EduCals />} />
          </Routes>
        </div>
      </Context.Provider>
  );
}


export default function RootApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}



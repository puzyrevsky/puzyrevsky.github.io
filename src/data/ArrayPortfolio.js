import christinaChekhov from '../img/christina-chekhov.webp';
import plitochka from '../img/plitochka.webp';
import webovio from '../img/webovio.webp';
import buildmaster from '../img/buildMaster.webp';
import languagesSchool from '../img/Languages-school.webp';
import creativeTechnologist from '../img/creative-technologist.webp';
import feather from '../img/feather.webp';
import evarugs from '../img/evarugs.webp';
import explorer from '../img/explorer.webp';
import portfolioCreator from '../img/portfolio-creator.webp';


import christinaChekhovMobile from '../img/christina-chekhovMobile.webp'
import plitochkaMobile from '../img/plitochkaMobile.webp';
import webovioMobile from '../img/webovioMobile.webp';
import buildmasterMobile from '../img/buildMasterMobile.webp';
import languagesSchoolMobile from '../img/Languages-schoolMobile.webp';
import creativeTechnologistMobile from '../img/creative-technologistMobile.webp';
import featherMobile from '../img/featherMobile.webp';
import evarugsMobile from '../img/evarugsMobile.webp';
import explorerMobile from '../img/explorerMobile.webp';
import portfolioCreatorMobile from '../img/portfolio-creatorMobile.webp';


import buildmasterFull from '../img/BuildMaster-full.webp';
import webovioFull from '../img/Webovio-full.webp';
import plitochkaFull from '../img/Plitochka-full.webp';
import christinaChekhovFull from '../img/ChristinaChekhov-full.webp';
import languagesSchoolFull from '../img/Languages-school-full.webp';
import creativeTechnologistFull from '../img/creativeTechnologist-full.webp';
import featherFull from '../img/feather-full.webp';
import evarugsFull from '../img/evarugs-full.webp';
import explorerFull from '../img/Explorer-full.webp';
import portfolioCreatorFull from '../img/portfolioCreator-full.webp';





import eduCalsOne from '../img/eduCals-one.png';
import eduCalsTwo from '../img/eduCals-two.webp';
import eduCalsThree from '../img/eduCals-three.webp';
import eduCalsFour from '../img/eduCals-four.webp';

import eduCalsOneMobile from '../img/eduCals-one-mobile.png';
import eduCalsTwoMobile from '../img/eduCals-two-mobile.webp';
import eduCalsThreeMobile from '../img/eduCals-three-mobile.webp';
import eduCalsFourMobile from '../img/eduCals-four-mobile.webp';



export const arrayNamesSortPortfolio = [{name: '', id: 'all',}, {name: '', id: 'lp',}, {name: '', id: 'pt',}, {name: '', id: 'pr',},];

export const arrayContentPortfolio = [
    {name: 'Christina Chekhov', image: christinaChekhov, imageFull: christinaChekhovFull, imageMobile: christinaChekhovMobile, categoryRu: 'Сайт-портфолио', categoryEn: 'Portfolio website', type: 'pt', link: '', 
    descriptionTitleRu:['Задачи', 'Результат'], 
    descriptionTitleEn: ['Tasks', 'Result'],
    descriptionRu: ['Адаптивный дизайн', 'Сверстать по макету', 'Добавить плавные переходы', 'Добавить секцию часто задаваемых вопросов', 'Добавить портфолио работ',], 
    descriptionEn: ['Responsive Design', 'Implement the Design from a Mockup', 'Add smooth transitions', 'Add a frequently asked questions section', 'Add a portfolio section',],
    descriptionInfoLinkRu: 'Проект без ссылки по желанию клиента.',
    descriptionInfoLinkEn: 'Project without a link at the client`s request.',
    linkTextRu: 'Перейти на макет',
    linkTextEn: 'Switch to layout',
    pathname: 'christinaChekhov',
    // index: 0,
    },


    {name: 'Plitochka', image: plitochka, imageFull: plitochkaFull, imageMobile: plitochkaMobile, categoryRu: 'Сайт-визитка', categoryEn: 'Landing page', type: 'lp', link: '',
    descriptionTitleRu:['Задачи', 'Результат'], 
    descriptionTitleEn: ['Tasks', 'Result'],
    descriptionRu: ['Адаптивный дизайн', 'Сверстать по макету', 'Добавить галерею фотографий', 'Добавить секции', 'Добавить преимущества компании',], 
    descriptionEn: ['Responsive Design', 'Implement the Design from a Mockup', 'Add a photo gallery', 'Add Sections', 'Add company advantages',],
    descriptionInfoLinkRu: 'Проект без ссылки по желанию клиента.',
    descriptionInfoLinkEn: 'Project without a link at the client`s request.',
    linkTextRu: 'Перейти на макет',
    linkTextEn: 'Switch to layout',
    pathname: 'plitochka',
    // index: 1,
    }, 


    {name: 'Webovio', image: webovio, imageFull: webovioFull, imageMobile: webovioMobile, categoryRu: 'Сайт-визитка', categoryEn: 'Landing page', type: 'lp', link: '',
    descriptionTitleRu:['Задачи', 'Результат'], 
    descriptionTitleEn: ['Tasks', 'Result'],
    descriptionRu: ['Адаптивный дизайн', 'Верстка по дизайну', 'Добавить всплывающее меню', 'Добавить секции', 'Добавить анимацию кнопок',], 
    descriptionEn: ['Responsive Design', 'Layout based on design', 'Add a dropdown menu', 'Add Sections', 'Add button animations',],
    descriptionInfoLinkRu: 'Проект без ссылки по желанию клиента.',
    descriptionInfoLinkEn: 'Project without a link at the client`s request.',
    linkTextRu: 'Перейти на макет',
    linkTextEn: 'Switch to layout',
    pathname: 'webovio',
    // index: 2,
    }, 


    {name: 'BuildMaster', image: buildmaster, imageFull: buildmasterFull, imageMobile: buildmasterMobile, categoryRu: 'Сайт-визитка', categoryEn: 'Landing page', type: 'lp', link: '',
    descriptionTitleRu:['Задачи', 'Результат'], 
    descriptionTitleEn: ['Tasks', 'Result'],
    descriptionRu: ['Добавить слайдер изображений', 'Сверстать по макету', 'Обратная форма связи на почту', 'Настроить форму связи', 'Сделать адаптивность на планшетах',], 
    descriptionEn: ['Add an image slider', 'Implement the Design from a Mockup', 'Feedback Form to Email', 'Set up a contact form', 'Ensure Tablet Responsiveness',], 
    descriptionInfoLinkRu: 'Проект без ссылки по желанию клиента.',
    descriptionInfoLinkEn: 'Project without a link at the client`s request.',
    linkTextRu: 'Перейти на макет',
    linkTextEn: 'Switch to layout',
    pathname: 'buildMaster',
    // index: 3,
    },


    {name: 'Languages School', image: languagesSchool, imageFull: languagesSchoolFull, imageMobile: languagesSchoolMobile, categoryRu: 'Сайт-визитка', categoryEn: 'Landing page', type: 'lp', link: '',
    descriptionTitleRu:['Задачи', 'Результат'], 
    descriptionTitleEn: ['Tasks', 'Result'],
    descriptionRu: ['Адаптивный дизайн', 'Сверстать по макету', 'Реализовать модальное окно', 'Добавить секции', 'Верстка с использованием flexbox',], 
    descriptionEn: ['Responsive Design', 'Implement the Design from a Mockup', 'Implement a modal window', 'Add Sections', 'Layout using flexbox',],
    descriptionInfoLinkRu: 'Проект без ссылки по желанию клиента.',
    descriptionInfoLinkEn: 'Project without a link at the client`s request.',
    linkTextRu: 'Перейти на макет',
    linkTextEn: 'Switch to layout',
    pathname: 'languagesSchool',
    // index: 4,
    }, 


    {name: 'Creative technologist', image: creativeTechnologist, imageFull: creativeTechnologistFull, imageMobile: creativeTechnologistMobile, categoryRu: 'Персональный сайт', categoryEn: 'Personal website', type: 'pr', link: '',
    descriptionTitleRu:['Задачи', 'Результат'], 
    descriptionTitleEn: ['Tasks', 'Result'],
    descriptionRu: ['Адаптивный дизайн', 'Сверстать по макету', 'Добавить портфолио работ', 'Добавить кнопку "Назад"', 'Добавить плавные переходы',], 
    descriptionEn: ['Responsive Design', 'Implement the Design from a Mockup', 'Add a portfolio section', 'Add a "Back" button', 'Add smooth transitions',],
    descriptionInfoLinkRu: 'Проект без ссылки по желанию клиента.',
    descriptionInfoLinkEn: 'Project without a link at the client`s request.',
    linkTextRu: 'Перейти на макет',
    linkTextEn: 'Switch to layout',
    pathname: 'creativeTechnologist',
    // index: 5,
    },


    {name: 'Feather', image: feather, imageFull: featherFull, imageMobile: featherMobile, categoryRu: 'Сайт-визитка', categoryEn: 'Landing page', type: 'lp', link: '',
    descriptionTitleRu:['Задачи', 'Результат'], 
    descriptionTitleEn: ['Tasks', 'Result'],
    descriptionRu: ['Адаптивный дизайн', 'Добавить блог с комментариями', 'Добавить раздел новостей', 'Добавить секции', 'Верстка по макету',], 
    descriptionEn: ['Responsive Design', 'Add a blog with comments', 'Add a news section', 'Add Sections', 'Layout according to the design',],
    descriptionInfoLinkRu: 'Проект без ссылки по желанию клиента.',
    descriptionInfoLinkEn: 'Project without a link at the client`s request.',
    linkTextRu: 'Перейти на макет',
    linkTextEn: 'Switch to layout',
    pathname: 'feather',
    // index: 6,
    },


    {name: 'Evarugs', image: evarugs, imageFull: evarugsFull, imageMobile: evarugsMobile, categoryRu: 'Сайт-визитка', categoryEn: 'Landing page', type: 'lp', link: '',
    descriptionTitleRu:['Задачи', 'Результат'], 
    descriptionTitleEn: ['Tasks', 'Result'],
    descriptionRu: ['Добавить анимацию кнопок', 'Сверстать по макету', 'Адаптировать сайт для мобильных устройств', 'Верстка с использованием flexbox', 'Сделать адаптивность на планшетах',], 
    descriptionEn: ['Add button animations', 'Implement the Design from a Mockup', 'Adapt the site for mobile devices', 'Layout using flexbox', 'Ensure Tablet Responsiveness',],
    descriptionInfoLinkRu: 'Проект без ссылки по желанию клиента.',
    descriptionInfoLinkEn: 'Project without a link at the client`s request.',
    linkTextRu: 'Перейти на макет',
    linkTextEn: 'Switch to layout',
    pathname: 'evarugs',
    // index: 7,
    }, 


    {name: 'Explorer', image: explorer, imageFull: explorerFull, imageMobile: explorerMobile, categoryRu: 'Персональный сайт', categoryEn: 'Personal website', type: 'pr', link: '',
    descriptionTitleRu:['Задачи', 'Результат'], 
    descriptionTitleEn: ['Tasks', 'Result'],
    descriptionRu: ['Добавить блог с комментариями', 'Сверстать по макету', 'Добавить раздел новостей', 'Добавить блок "Обо мне"', 'Сделать адаптивность на планшетах',], 
    descriptionEn: ['Add a blog with comments', 'Implement the Design from a Mockup', 'Add a news section', 'Add an "About Me" section', 'Ensure Tablet Responsiveness',],
    descriptionInfoLinkRu: 'Проект без ссылки по желанию клиента.',
    descriptionInfoLinkEn: 'Project without a link at the client`s request.',
    linkTextRu: 'Перейти на макет',
    linkTextEn: 'Switch to layout',
    pathname: 'explorer',
    // index: 8,
    },


    {name: 'Portfolio Creator', image: portfolioCreator, imageFull: portfolioCreatorFull, imageMobile: portfolioCreatorMobile, categoryRu: 'Сайт-портфолио', categoryEn: 'Portfolio website', type: 'pt', link: '', 
        descriptionTitleRu:['Задачи', 'Результат'], 
        descriptionTitleEn: ['Tasks', 'Result'],
        descriptionRu: ['Адаптивный дизайн', 'Сверстать по макету', 'Сделать фиксированную шапку', 'Создать выпадающий список', 'Добавить галерею фотографий',], 
        descriptionEn: ['Responsive Design', 'Implement the Design from a Mockup', 'Make a fixed header', 'Create a dropdown list', 'Add a photo gallery',],
        descriptionInfoLinkRu: 'Проект без ссылки по желанию клиента.',
        descriptionInfoLinkEn: 'Project without a link at the client`s request.',
        linkTextRu: 'Перейти на макет',
        linkTextEn: 'Switch to layout',
        pathname: 'portfolioCreator',
        // index: 9,
        },
]


export const arrayContentPersonalProjects = [
    {
        image: eduCalsOne,
        imageMobile: eduCalsOneMobile,
        imageDescription: [eduCalsOne, eduCalsTwo, eduCalsThree, eduCalsFour],
        imageDescriptionMobile: [eduCalsOneMobile, eduCalsTwoMobile, eduCalsThreeMobile, eduCalsFourMobile],
        title: 'EduCals',
        briefDescriptionTitleRu: 'Калькулятор среднего балла',
        briefDescriptionTitleEn: 'Grade Point Average Calculator',
        briefDescriptionRu: 'Вашему вниманию представлен новый инструмент для учителей - "Калькулятор среднего балла". Это удобное приложение, созданное специально для облегчения процесса выставления оценок. Просто введите текущие оценки учащихся, и калькулятор автоматически рассчитает средний балл, позволяя вам быстрее и эффективнее завершить аттестацию.',
        briefDescriptionEn: 'We are pleased to introduce a new tool for teachers - the "Grade Point Average Calculator." This convenient application is specifically designed to simplify the grading process. Simply enter the current grades of your students, and the calculator will automatically compute the average grade, allowing you to complete assessments more quickly and efficiently.',
        descriptionTitleRu: 'Основные функции приложения:',
        descriptionTitleEn: 'Key Features of the Application:',
        descriptionRu: ['Автоматический расчет среднего балла: Введите оценки, и система мгновенно выдаст итоговый результат, округляя его до ближайшего целого числа. Например, если средний балл составляет 5.4, итоговая оценка будет 5. Если же 5.5 и выше – оценка будет 6.', 'Контроль минимального количества оценок: Приложение уведомляет, если количество введенных оценок меньше установленного минимума. Например, если для аттестации требуется минимум 3 оценки, а введено только 2, вы получите уведомление о необходимости добавить еще одну оценку.', 'Просмотр введенных оценок: Вы всегда можете увидеть все текущие оценки, которые были введены, для удобного отслеживания процесса оценивания.', 'Управление оценками: Приложение предоставляет возможность удалить все введенные оценки одним кликом, а также легко удалить последнюю введенную оценку.', ],
        descriptionEn: ['Automatic Grade Calculation: Enter the grades, and the system will instantly provide the final result, rounding it to the nearest whole number. For example, if the average grade is 5.4, the final grade will be 5. If it`s 5.5 or higher, the grade will be 6.', 'Minimum Grade Count Control: The application alerts you if the number of entered grades is below the required minimum. For example, if a minimum of 3 grades is required for assessment and only 2 have been entered, you will receive a notification to add another grade.', 'View Entered Grades: You can always see all the grades that have been entered, allowing for easy tracking of the grading process.', 'Grade Management: The application allows you to delete all entered grades with a single click, as well as easily remove the last entered grade.'],
        futureUpdatesTitleRu: 'Будущие обновления:',
        futureUpdatesRu: ['Настройка округления: В ближайшее время будет добавлена функция отключения округления для более точного расчета среднего балла.', 'Выбор системы оценивания: В будущем планируется предоставить выбор между пятибальной и десятибальной системами оценивания. Пока что доступна только десятибальная система.',],
        futureUpdatesTitleEn: 'Future Updates:',
        futureUpdatesEn: ['Rounding Settings: A feature to disable rounding for more precise grade calculations will be added soon.', 'Grading System Selection: In the future, we plan to offer a choice between a five-point and a ten-point grading system. Currently, only the ten-point system is available.',],
        resumeRu: 'Этот калькулятор станет вашим надежным помощником, минимизируя рутинные задачи и позволяя сконцентрироваться на более важных аспектах обучения. Следите за обновлениями, чтобы воспользоваться новыми возможностями приложения и сделать процесс оценивания еще более гибким и удобным!',
        resumeEn: 'This calculator will become your reliable assistant, minimizing routine tasks and allowing you to focus on more important aspects of teaching. Stay tuned for updates to take advantage of new features and make the grading process even more flexible and convenient!',
        linkToProject: '/eduCals',
        textButtonRu: 'Перейти в проект',
        textButtonEn: 'Go to Project',
    }, 
]
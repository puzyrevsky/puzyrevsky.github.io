import styles from './EduCals.module.css'
import { useEffect, useState } from 'react';

import {useNavigate} from 'react-router-dom';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import SettingsIcon from '@mui/icons-material/Settings';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ButtonGroup from '@mui/material/ButtonGroup';
import BackspaceIcon from '@mui/icons-material/Backspace';

function EduCals() {


  const arrayNumberButton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const [arrayEstimates, setArrayEstimates] = useState([]);
  const [sum, setSum] = useState(null);
  const [result, setResult] = useState(null);

  const [updateDivision, setUpdateDivision] = useState(false);
  
  const dividingNumbers = arrayEstimates.length;

  const [lookSettings, setLookSettings] = useState(false);
  const [checked, setChecked] = useState(false);

  // 
const [handlerStyleBlockSettingsForRendering, setHandlerStyleBlockSettingsForRendering] = useState(false);
  // 

  const [valueForm, setValueForm] = useState('');
  const [roundUp, setRoundUp] = useState(true);

  useEffect(() => {
    if(valueForm !== ''){
      setValueForm(parseInt(valueForm));
    } 
  }, [valueForm])
  
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleRoundUp = (event) => {
    setRoundUp(event.target.roundUp);
  }

  useEffect(() => {
    if(dividingNumbers > 0) {
      const newResult = sum / dividingNumbers;
      if(roundUp) {
        setResult(Math.round(newResult));
      }  
    } else {
      setResult(null);
    }
  }, [sum, dividingNumbers, updateDivision])


  const addGrade = (number) => {
    setArrayEstimates(prev => {
      const updated = [...prev, number];
      setSum(prevSum => prevSum + number);
      return updated;
    });
  };

  const removeLastGrade = () => {
    setArrayEstimates(prev => {
      const updated = prev.slice(0, -1);
      setSum(updated.reduce((total, num) => total + num, 0));
      return updated;
    })
  }

// 
const history = useNavigate();

const clickButtonBack = (e) => {
  e.preventDefault();
  history('/portfolio/projects');
}
// 

  return (
    <div className={styles.app__wrapper}>
        <header>
            <div className={styles.wrapper}>
                <div className={styles.nav}>
                    <div className={styles.logo__nav}><h3 className={styles.logo__text}>EduCals</h3></div>
                    <SettingsIcon sx={{color: '#b0e0e6',}} onClick={() => {
                      setLookSettings(prevState => !prevState)
                      setHandlerStyleBlockSettingsForRendering(true);
                    }}
                    sx={{opacity: lookSettings ? '0.4' : '1', cursor: 'pointer', fontSize: '30px', color: '#b0e0e6',}} />
                </div>
            </div>
        </header>
        <div className={styles.container__notification}>
          {arrayEstimates.length > 0 && valueForm > arrayEstimates.length && checked && valueForm > 0 &&
          <Stack sx={{ width: '100%', position: 'absolute', top: '0px', }} spacing={2}>
            <Alert sx={{display: 'flex', justifyContent: 'center', backgroundColor: '#d7d7d7', color: '#4f4f4f', }} severity="info" >Текущих оценок {arrayEstimates.length}, а нужно не меньше {valueForm} </Alert>
          </Stack>}
        </div>
        <div className={`${lookSettings ? styles.menu__setting_container__visible : styles.menu__setting_container__not_visible} ${!handlerStyleBlockSettingsForRendering && styles.setting__container_off}`}>
            <div style={{borderTop: '1px solid grey', borderBottom: '1px solid grey', padding: '10px 0 10px 0', maxWidth: '900px', margin: '125px auto 0'}}>
                <div className='setting__title_container' onClick={() => setLookSettings(prevState => !prevState)} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', borderBottom: lookSettings ? '1px solid grey' : '', paddingBottom: lookSettings ? '10px' : '0px', paddingLeft: '13px',}}>
                    <p className='setting__title' style={{margin: '0', fontSize: '20px', color: '#b0e0e6'}}> Настройки</p>
                </div>
                <div className={styles.list__settings} style={{display: !lookSettings ? 'none' : 'flex', marginTop: '21px', flexDirection: 'column', alignItems: 'flex-start'}}>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '9px'}}>
                        <p style={{fontSize: '18px', margin: '0 13px 5px 0', color: 'white'}}>Уведомлять о малом количестве текущих оценок</p>
                        <Checkbox checked={checked} sx={{color: '#494949', transition: '0.3s', '&.Mui-checked': {color: '#333333',},'&.MuiCheckbox-root:hover': {backgroundColor: 'rgba(0,0,0,0.05)', transition: '0.3s',},}} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
                    </div>
                    <TextField value={valueForm} onChange={(event) => setValueForm(event.target.value)}  sx={{width: '145px', display: !checked ? 'none' : '', 
                      '& .MuiInputLabel-root': { // Цвет текста лейбла
                          color: '#494949', // Цвет лейбла по умолчанию
                      },
                      '& .MuiInputLabel-root.Mui-focused': { // Цвет текста лейбла при фокусе
                          color: 'white', // Цвет лейбла при фокусе
                      },
                      '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                              borderColor: '#494949', // Цвет рамки по умолчанию
                          },
                          '&:hover fieldset': {
                              borderColor: 'white', // Цвет рамки при наведении
                          },
                          '&.Mui-focused fieldset': {
                              borderColor: 'white', // Цвет рамки при фокусе
                          },
                      },
                      '& input[type=number]': {
                          '-moz-appearance': 'textfield',
                          '-webkit-appearance': 'none',
                          appearance: 'textfield',
                      },
                      '& input[type=number]::-webkit-outer-spin-button': {
                          '-webkit-appearance': 'none',
                          margin: 0,
                      },
                      '& input[type=number]::-webkit-inner-spin-button': {
                          '-webkit-appearance': 'none',
                          margin: 0,
                      },}} type='number' inputProps={{min: '1'}} 
                    id="outlined-basic" label="Введите число" variant="outlined" />
                    <div style={{display: 'flex', alignItems: 'center', marginTop: '30px', marginBottom: '9px', opacity: '0.4'}}>
                        <p style={{fontSize: '18px', margin: '0 13px 0 0'}}>Округлять</p>
                        <Checkbox checked={roundUp} disabled checked onChange={handleRoundUp} inputProps={{ 'aria-label': 'controlled' }} />
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.content__container}>
            <div className={styles.wrapper}>
                    <h1 className={styles.result__number}>{result === null ? 'Введите оценки' : result}</h1>
                    <ButtonGroup variant="contained" aria-label="Basic button group" sx={{ boxShadow: 'none', backgroundColor: '#E0E6ED', borderRadius: '0px', margin: '0 auto', maxWidth: '300px', display: 'flex', flexWrap: 'wrap', }}>
                    {arrayNumberButton.map((button, index) => (
                        <Button sx={{ backgroundColor: '#A7C796', color: '#3E5D33', border: '1px solid #f0f4f8 !important', borderRadius: '0px', padding: '20px 20px', fontWeight: 'bold', fontSize: '18px', flex: '1 0 30%', transition: '0.3s', '@media (max-width: 600px)': {padding: '20px 0'}, '&:hover': {backgroundColor: '#8EB28F', transition: '0.3s',}, }} key={index} onClick={() => {
                        addGrade(button);
                        lookSettings === true && setLookSettings(false)
                        }}>{button}</Button>
                    ))}
                    </ButtonGroup>
                    {arrayEstimates.length > 0 && 
                    <div className={styles.button__delete_container}>
                        <Button variant="contained" endIcon={<DeleteForeverIcon />} sx={{backgroundColor: '#E74C3C', transition: '0.3s', '&:hover': {backgroundColor: '#B8442D', transition: '0.3s'},}} onClick={() => {
                        setArrayEstimates([]);
                        setSum(null);
                        setResult(null);
                        }}>
                        Очистить все
                        </Button>
                        <Tooltip title="Delete" sx={{marginLeft: '21px'}}>
                            <IconButton onClick={() => removeLastGrade()}>
                              <BackspaceIcon sx={{color: '#4a4a4a',}} />
                            </IconButton>
                        </Tooltip>
                    </div>}
                    <div className={styles.all__assessments_enter} style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center',}}>
                        <h3 style={{ color: '#4A4A4A', margin: '13px 10px 0 0'}}>{arrayEstimates.length === 0 ? 'Текущих оценок нет' : 'Вы ввели оценки:'}</h3> 
                        {arrayEstimates.map((number, index) => (
                        <h3 style={{color: '#4A4A4A', margin: '13px 5px 0 5px'}} key={index}> {number}{arrayEstimates.length-1 !== index ? ',' : ''}</h3>
                        ))}
                        
                    </div>
                <div style={{position: 'absolute', bottom: '20px'}}>
                  <Button variant="contained" sx={{backgroundColor: '#e8eff6', color: '#1976d2', transition: '0.3s', boxShadow: 'none', '&:hover': {backgroundColor: '#d4dde5', boxShadow: 'none', transition: '0.3s'},}} onClick={clickButtonBack}>Назад к проектам</Button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default EduCals;

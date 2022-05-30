import { useState } from 'react';

export const useFormInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(value && value.length > 0 ? true : false)
  const handleUserInput = (min, max) => event => {
    const { target: { name, value } } = event;
    const isValid = validateInput(name, value);
    if(name.toLowerCase() === inputNames.quantity) {
      if(value !== '' && (max && value > max )) return;
    }
    if(max && value.length > max) return
    if(name.toLowerCase() === inputNames.password || name.toLowerCase() === inputNames.email) {
      setValue(value);
      setIsValid(isValid);
      setError(!isValid ? assignError(name) : '')
      return;
    }
    if(!isValid && value !== '' ) return;
    setValue(value);
    setIsValid(validateLength(value, min, max))
  };
  return { value, setValue, handleUserInput, error, setError, isValid }
}

export const useFileInput = () => {
  const [ file, setFile ] = useState(null);
  const [ fileUrl, setFileUrl ] = useState(null);
  const handleFile = (event) => {
    const { target: {  files } } = event;
    setFileUrl(URL.createObjectURL(files[0]));
    setFile(files[0])
  }
  return { handleFile, file, fileUrl }
}

export const inputNames = {
  email: 'email',
  password: 'password',
  phone: 'phone',
  date: 'date',
  subject: 'subject',
  message: 'message',
  account: 'account number',
  amount: 'amount',
  name: 'name',
  walletPin: 'wallet pin',
  quantity: 'quantity'
}

export const errorMessages = {
  email: "Email should contain '@' and at least one '.'",
  password: 'Password must be at least 8 characters, containing alphanumerics',
  name: "Name must contain only alphabelts",
  subject: 'Subject should contain only alphanumeric characters',
  message: 'Message should contain only alphaNumeric characters',
  date: 'Invalid date format!',
  phone: 'Incorrect phone number',
  account: 'Account number is invalid'
};


const validateInput = (name, key) => {
  const regex = {
    email: /^([a-zA-Z\d-\.\_]+)@([a-zA-Z\d-]+)\.([a-zA-Z]{2,8})(\.[a-zA-Z]{2,8})?$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d][\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{7,}$/,
    phone:/^[0-9\-\(\)\ \+]+$/,
    date:/^(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i,
    text: /^[a-zA-Z\ ]+$/,
    alphanumeric: /^[a-zA-Z0-9\,\ \.\_]+$/g,
    digits: /^\d+$/,
    money: /^\d\.\,+$/g,
  }
  let isValid;
  switch(name.toLowerCase()) {
    case inputNames.email:
      isValid = validateWithRegex(key, regex.email)
      return isValid
    case inputNames.name:
      isValid = validateWithRegex(key, regex.text)
      return isValid;
    case inputNames.subject:
      isValid = validateWithRegex(key, regex.alphanumeric)
      return isValid;
    case inputNames.password:
      isValid = validateWithRegex(key, regex.password)
      return isValid;
    case inputNames.phone:
      isValid = validateWithRegex(key, regex.phone)
      return isValid;
    case inputNames.date:
      isValid = validateWithRegex(key, regex.date)
      return isValid;
    case inputNames.account:
    case inputNames.walletPin:
    case inputNames.quantity:
      isValid = validateWithRegex(key, regex.digits) // set minimum and maximum of 10 for this
      return isValid;
    case inputNames.amount:
      isValid = validateWithRegex(key, regex.digits)
      return isValid;
    default:
      isValid = validateWithRegex(key, regex.alphanumeric)
      return isValid;
  }
}

const assignError = (name) => {
  switch(name.toLowerCase()) {
    case inputNames.email :
      return errorMessages.email
    case inputNames.name:
      return errorMessages.name;
    case inputNames.subject:
      return errorMessages.subject
    case inputNames.password:
      return errorMessages.password
    case inputNames.phone:
      return errorMessages.phone
    case inputNames.date:
      return errorMessages.date
    case inputNames.account:
      return errorMessages.account
    default:
      return `${name} is invalid`
  }
}
const validateWithRegex = (value, regex) => {
  const isValid = regex.test(value) 
  // && /^[A-Za-z0-9 _]/.test(value)
  return isValid
}

const validateLength = (value, min, max) => {
  if(min && max) return value.length > 0 && value.length >= min && value.length <= max;
  if (max) return value.length > 0 && value.length <= max;
  if(min) return value.length > 0 && value.length >= min;
  return value.length > 0
}

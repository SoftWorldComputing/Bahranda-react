import React, { useRef, useState, memo, useCallback } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import Select from 'react-select';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';

export const FormField = ({
  placeholder, label, value, onChange, err, name, type, className, isValid, disabled = false, min, max, ...rest
}) => {
  const inputRef = useRef();
  return (
    <label className={`d-flex column margin-bottom-sm ${className}`} style={{width: '100%'}}>
      <span className="font-md font-weight-500">{label ? label : placeholder}</span>
      <div className="d-flex input-container position-relative" style={{width: '100%'}}>
        <input
          type={type}
          name={name}
          ref={inputRef}
          value={value}
          onChange={onChange(min, max)}
          placeholder={placeholder}
          disabled={disabled}
          className={`border-r-5 padding-vertical-sm padding-horizontal-md font-weight-500 ${!disabled ? 'bg-white' : 'bg-gray'} slim-border font-sm`} {...rest} />
        <div className="field-check-icon">
          {isValid && <FaCheckCircle className="font-md  bg-white color1 fadeIn-animation" /> }
        </div>
      </div>
      <span className="font-xsm font-weight-600 danger-text">{err}</span>
    </label>
  )
}

export const PasswordField = ({
  placeholder, value, onChange, err, name, className = '', min, max,  ...rest
}) => {
  const inputRef = useRef();
  const [type, setType] = useState('password');
  return (
    <label className={`d-flex column margin-bottom-sm ${className}`} style={{width: '100%'}}>
      <span className="font-md">{placeholder}</span>
      <div className="d-flex input-container position-relative">
        <input
          type={type}
          name={name}
          ref={inputRef}
          value={value}
          onChange={onChange(min, max)}
          placeholder={placeholder}
          className="border-r-5 padding-md padding-horizontal-md font-weight-500 bg-white slim-border font-sm" {...rest} />
        <div className="field-check-icon">
          {type === 'password'
          ? <BsEyeSlash className="font-md color-gray fadeIn-animation" onClick={() => setType('text')} />
          : <BsEye className="font-md color-gray fadeIn-animation" onClick={() => setType('password')} />}
        </div>
      </div>
      <span className="font-xsm font-weight-600 danger-text">{err}</span>
    </label>
  )
}

export const QuantityInput = memo(({
   value, onChange, className, min = 1, max, placeholder, name, ...rest
}) => {
  return (
    <label className={`d-flex column margin-bottom-sm ${className}`} style={{width: '100%'}}>
      <div className="d-flex input-container" style={{width: '100%'}}>
        <input
          type={"numeric"}
          name={name}
          value={value}
          onChange={onChange(min, max)}
          placeholder={placeholder}
          className={`qty-input text-center border-r-5 padding-vertical-sm padding-horizontal-sm font-weight-500 slim-border font-sm`} {...rest} />
      </div>
    </label>
  )
})

export const useCheckbox = (bool = false) => {
  const [checked, setChecked] = useState(bool);
  const Checkbox = () => {
    return (
      <input type="checkbox" color="#000" checked={checked} onChange={() => setChecked(prev => !prev)} />
    )
  }
  return { checked, setChecked, Checkbox }
}

export const TextArea = ({
  placeholder, value, label, onChange, err, className, disabled, min = 1, max, ...rest
}) => {
  return (
    <label className={`d-flex column margin-bottom-sm ${className}`} style={{width: '100%'}}>
      <span className="font-md font-weight-500">{label}</span>
      <textarea value={value} {...rest} placeholder={placeholder} onChange={onChange(min, max)}
        className={`border-r-5 padding-md padding-horizontal-md font-weight-500 ${!disabled ? 'bg-white' : 'bg-gray'} slim-border font-sm`} {...rest} />
    </label>
  )
}

export const useSelectInput = (initialValue) => {
  const [value, setValue] = useState(initialValue ? {value: initialValue, label: initialValue} : undefined);
  const SelectInput = memo((props) => {
    const { label, name, options, placeholder, className = '', isSearchable=false, ...rest } = props;
    return (
      <label className={`d-flex column  ${className}`} style={{width: '100%'}}>
        <span className="font-md font-weight-500">{label}</span>
        <Select isSearchable={isSearchable}
          name={name}
          className="form-control font-weight-500 bg-white font-sm"
          value={value}
          options={options.map(value => ({value, label: value}))}
          placeholder={placeholder} onChange={setValue} {...rest}
        />
      </label>
    )
  })
  return { value, SelectInput }
}

export const RadioButton = ({ label, onChange, checked = false }) => {
  const setValue = useCallback(e => {
    const { checked } = e.target;
    onChange({ checked, label })
  }, [label, onChange])
  return (
    <label className="container d-flex align-items-center nowrap cursor-pointer margin-bottom-sm padding-left-md position-relative">
      <span className="font-sm">{label}</span>
      <input type="radio" checked={checked} label={label} name="radio" onChange={setValue} />
      <span className="checkmark border-r-circle"></span>
    </label>
  )
};

export const useRadioInputs = (initialValue) => {
  const [selectedValue, setSelectedValue] = useState(
    initialValue ? { value: initialValue, label: initialValue } : { value: '', label: '' }
  );

  const RadioInputs = ({ options, placeholder, className = '' }) => {
    const chevronRef = useRef(null);
    const dropdown = useRef(null);
    return (
      <div className={`radio-select-dropdown slim-border position-relative bg-white ${className}`}>
        <div onClick={() => dropdown.current.classList.toggle('open')}
          className="position-relative d-flex align-items-center justify-content-s-between padding-vertical-xsm padding-horizontal-sm border-r-5">
          <span className={`font-sm margin-right-sm ${!selectedValue ? 'color-gray' : ''}`}>
            {selectedValue ? selectedValue.label : placeholder}
          </span>
          <div className="chevron-icon" ref={chevronRef}>
            <MdKeyboardArrowDown className={"font-lg color-gray"}/>
          </div>
        </div>
        <div ref={dropdown} className="padding-sm input-dropdown bg-white">
          {options.map(option => {
            const { label } = option;
            return <RadioButton key={label} label={label} onChange={setSelectedValue} checked={selectedValue && selectedValue.label === label} />
          })}
        </div>
      </div>
    )
  }
  return { RadioInputs, selectedValue }
}

export const CurrencyInput = ({
  className = '',
  max = Number.MAX_SAFE_INTEGER,
  onValueChange,
  style = {},
  value,
  placeholder,
  label,
  disabled,
  err,
  ...rest
}) => {
  const valueAbsTrunc = Math.trunc(Math.abs(value));
  if (value !== valueAbsTrunc || !Number.isFinite(value) || Number.isNaN(value)) {
    throw new Error(`invalid value property`);
  }
  const handleKeyDown = useCallback(e => {
    e.preventDefault();
    const VALID_FIRST = /^[1-9]{1}$/;
    const VALID_NEXT = /^[0-9]{1}$/;
    const DELETE_KEY_CODE = 8;
    const { key, keyCode } = e;
    if (
      (value === 0 && !VALID_FIRST.test(key)) ||
      (value !== 0 && !VALID_NEXT.test(key) && keyCode !== DELETE_KEY_CODE)
    ) {
      return;
    }
    const valueString = value.toString();
    let nextValue;
    if (keyCode !== DELETE_KEY_CODE) {
      const nextValueString = value === 0 ? key : `${valueString}${key}`;
      nextValue = Number.parseInt(nextValueString, 10);
    } else {
      const nextValueString = valueString.slice(0, -1);
      nextValue = nextValueString === '' || undefined ? 0 : Number.parseInt(nextValueString, 10);
    }
    if (nextValue > max) {
      return;
    }
    //if(max && nextValue > max) return
    onValueChange(nextValue);
  }, [max, value, onValueChange]);
  const handleChange = useCallback(() => {
    // DUMMY TO AVOID REACT WARNING
  }, []);
  const valueDisplay = (value / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'NGN',
  });

  return (
    <label className={`d-flex column margin-bottom-sm ${className}`} style={{width: '100%'}}>
      <span className="font-md font-weight-500">{label ? label : placeholder}</span>
      <div className="d-flex input-container position-relative" style={{width: '100%'}}>
        <input
          placeholder={placeholder}
          disabled={disabled}
          className={`border-r-5 padding-vertical-sm padding-horizontal-md font-weight-500 ${!disabled ? 'bg-white' : 'bg-gray'} slim-border font-sm`}
          inputMode="numeric"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          style={style}
          value={valueDisplay}
          {...rest}
          name="hello"
          />
        <div className="field-check-icon">
          {!err && value.length > 0 && <FaCheckCircle className="font-md  bg-white color1 fadeIn-animation" /> }
        </div>
      </div>
      <span className="font-xsm font-weight-600 danger-text">{err}</span>
    </label>
  );
};


export const SubmitButton = ({ isLoading, text, action, disabled, className = '', ...rest }) => {
  const buttonRef = useRef(null);
  const preventBeforeFire = (e) => {
    e.preventDefault();
    action()
  }
  return (
    <button disabled={disabled} ref={buttonRef} onClick={e => preventBeforeFire(e)} style={{minWidth: '100px'}} {...rest}
      className={`submit d-flex flex-center btn margin-bottom-md ${disabled ? 'cursor-not-allowed bg-color1-opacity-2' : 'bg-color1 ripple'} ${className}`}>
     {!isLoading
      ? <span className="font-sm color-white font-weight-600">{text}</span>
      : <ClipLoader size={22} color="#fff" loading={isLoading} />}
    </button>
  )
}

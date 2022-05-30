import React, { useRef } from 'react';
import { Form } from '../../../components'
const { inputNames: { walletPin } } = Form;
const PinFields = ({ pinArray, setPinArray, label }) => {
  const firstTextInputRef = useRef(null);
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null);
  const fourthTextInputRef = useRef(null);
  const refCallback = textInputRef => node => {
    textInputRef.current = node;
  };

  const onOtpChange = index => {
    return e => {
      const { value } = e.target
      const pinArrayCopy = pinArray.concat();
      pinArrayCopy[index] = value.toString().slice(0, 1);
      setPinArray(pinArrayCopy);

      // auto focus to next InputText if value is not blank
      if (value !== '') {
        if (index === 0) {
          secondTextInputRef.current.focus();
        } else if (index === 1) {
          thirdTextInputRef.current.focus();
        } else if (index === 2) {
          fourthTextInputRef.current.focus();
        }
      }
    };
  };
  const onOtpKeyPress = index => {
    return ({ key: value }) => {
      // auto focus to previous InputText if value is blank and existing value is also blank
      if (value === 'Backspace' && pinArray[index] === '') {
        if (index === 1) {
          firstTextInputRef.current.focus();
        } else if (index === 2) {
          secondTextInputRef.current.focus();
        } else if (index === 3) {
          thirdTextInputRef.current.focus();
        }
      }
    };
};
  return (
    <label className={`d-flex column margin-bottom-md`} style={{width: '100%'}}>
      {label && <span className="font-md font-weight-500 margin-bottom-sm">{label}</span>}
      <div className="d-flex align-items-center justify-content-s-between nowrap" style={{width: '100%'}}>
        {[
          firstTextInputRef,
          secondTextInputRef,
          thirdTextInputRef,
          fourthTextInputRef,
        ].map((textInputRef, index) => (
          <div className="pin-field margin-right-sm" key={index}>
            <input
              style={{width: '100%'}}
              className="text-center border-r-5 slim-border padding-vertical-xsm"
              value={pinArray[index]}
              onKeyPress={onOtpKeyPress(index)}
              onChange={onOtpChange(index)}
              type="number"
              name={walletPin}
              maxLength={1}
              autoFocus={index === 0 ? true : undefined}
              ref={refCallback(textInputRef)}
              key={index}
              placeholder={0}
            />
          </div>
        ))}
      </div>
    </label>
  )
}

export default PinFields
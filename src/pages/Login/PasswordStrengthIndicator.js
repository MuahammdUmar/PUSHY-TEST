import React from 'react'

const PasswordStrengthIndicator = ({validity:{ minChar, number, specialChar,upperCase }}) => {
  return (
    <div className='password-meter text-left mb-4'>
        <p className='text-dark'>Password Must Contain:</p>
        <ul className='text-muted'>
            <PasswordStrengthIndicatorItem isvalid={minChar} text="Have at least 8 characters" />
            <PasswordStrengthIndicatorItem isvalid={upperCase} text="Have at least upperCase" />
            {console.log('8',minChar)}
            <PasswordStrengthIndicatorItem isvalid={number} text="Have at least 1 number" />
            <PasswordStrengthIndicatorItem isvalid={specialChar} text="Have at least 1 special character" />
        </ul>
    
    
    
    </div>
  )
};
const PasswordStrengthIndicatorItem =  ({isvalid,text}) => {
    console.log('8',text);
    const highlightClass = isvalid ? "text-success" : isvalid  !== null ? "text-danger" : "" ;
    return <li className={highlightClass}>{text}</li>;
};
export default PasswordStrengthIndicator
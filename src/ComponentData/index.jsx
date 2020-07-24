import React, { Component } from 'react';

class ComponentData extends Component{
render(){
    const{item: { Fullname, Email, Phone, Company, Address}}=this.props;
    return(
        <div className='formdata-main'>
        <input type='checkbox'/>
        <div className='formdata'>
            <span className='formdata'>Fullname :   {Fullname}</span>
            <span className='formdata'>E-mail   : {Email}</span>
            <span className='formdata'>Phone    :  {Phone}</span>
            <span className='formdata'>Company  :    {Company}</span>
            <span className='formdata'>Address  :    {Address}</span>            
        </div>
        <button value='clear' onClick={()=>this.props.click(this.props.item)} className='forminput'>EDIT</button>
        
        </div>
    )
}
}
export default ComponentData;
import React, { Component, Fragment } from 'react';
import ComponentData from '../ComponentData';
import './styles.css';

class FormCreation extends Component{
    constructor()
    {
        super();
        this.state={info:[{
            Fullname:'',
            Email:'',
            Phone:'',
            Company:'',
            Address:'',
        }],id:null
    }
    this.fullname=this.fullname.bind(this);
    this.email=this.email.bind(this);
    this.phone=this.phone.bind(this);
    this.company=this.company.bind(this);
    this.address=this.address.bind(this);
    this.dataClicked=this.dataClicked.bind(this);
    }
    fullname=(e)=>{
        this.setState({
            Fullname:e.target.value
        })
    }
    email(e){
        this.setState({
            Email:e.target.value
        })
    }
    phone(e){
        this.setState({
            Phone:e.target.value
        })
    }
    company(e){
        this.setState({
            Company:e.target.value
        })
    }
    address(e){
        this.setState({
            Address : e.target.value
        })
    }
    clear=()=>{
        this.setState(
            {
                Fullname:'',
                Email:'',
                Phone:'',
                Company:'',
                Address:'',
                id:null
            }
        )
    }
    delete=()=>{
        fetch('http://localhost:3000/data/'+this.state.id,
        {
            method:'DELETE',
            headers:
            {
                'content-type':'application/json'
            }
        }
        ).then(response=>response.json()).then(res=>
            {
                this.getAll()
                this.clear()
            })
    }
    addition=(e)=>{
        e.preventDefault();
        if(this.state.id===null)
        {
            fetch('http://localhost:3000/data/',
            {
                method:'POST',
                body:JSON.stringify({
                    'Fullname':this.state.Fullname,'Email':this.state.Email,
                    'Phone':this.state.Phone, 'Company':this.state.Company, 'Address':this.state.Address
                }),
                headers:{
                    'content-type':'application/json'
                }
            }).then(response=>response.json()).then(res=>{
                this.getAll()
                this.clear()
            })
            alert('Added Successfully');
        }
        else
        {
            fetch('http://localhost:3000/data/'+this.state.id,
            {
                method:'PUT',
                body:JSON.stringify({
                    'Fullname':this.state.Fullname,'Email':this.state.Email,
                    'Phone':this.state.Phone,'Company':this.state.Company, 'Address':this.state.Address
                }),
                headers:{
                    'content-type':'application/json'
                }
            }).then(response=>response.json()).then(res=>{
                this.getAll()
                this.clear()
            })
            alert('Updated Successfully')
        }
    }
    dataClicked=(info)=>{
        fetch('http://localhost:3000/data/'+info.id,
        {
        method:'GET',
        headers:{
            'content-type':'application/json'
        }
    }).then(response=>response.json()).then((info)=>{
        this.setState({
            Fullname : info.Fullname,
            Email : info.Email,
            Phone : info.Phone,
            Company : info.Company,
            Address : info.Address,
            id : info.id
        })
    })
    }
    render()
    {
        return(
            <Fragment>
                <div><input type='search' className='bio-search' placeholder='Search contacts' />
                <button value='submit' onClick={this.addition} className='bio-search'>+ Add Contact</button></div>
                <div className='forminput'>
                    Fullname : <input type='text' value={this.state.Fullname} onChange={this.fullname} className='forminput' />
                    Email : <input type='text' value={this.state.Email} onChange={this.email} className='forminput'/>
                    Phone : <input type='text' value={this.state.Phone} onChange={this.phone} className='forminput'/>
                    Company : <input type='text' value={this.state.Company} onChange={this.company} className='forminput'/>
                    Address : <input type='text' value={this.state.Address} onChange={this.address} className='forminput'/>                

                <div className='button-value'><button value='submit' onClick={this.addition} className='forminput'>UPDATE</button>
                
                <button value='delete' onClick={this.delete} className='forminput'>DELETE</button></div>
                </div>
                <div className='bio-card'>
                {
                    !this.state.info.length?<div>Loading...</div>:
                    this.state.info.map(item=><ComponentData item={item} click={this.dataClicked}/>)
                }
                </div>                
            </Fragment>
        )
    }
    getAll=()=>{
        let apiUrl = 'http://localhost:3000/data';
        fetch(apiUrl)
        .then(response=>response.json()).then(res=>
            {
                this.setState(
                    {
                        info:res
                    }
                )
            })
    }
    componentDidMount(){
        this.getAll();
    }
}
export default FormCreation;
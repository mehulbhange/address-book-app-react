import React, { Component } from 'react';
import './AddressForm.css';
import AddressBookService from '../../service/AddressBookService';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


class AddressForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            firstName:"",
            lastName:"",
            contactNo:"",
            email:"",
            city:"",
            state:"",
            zip:"",
            isUpdate: false,
        }
    }

    fetchData = (id) => {
        AddressBookService.getAddressBookById(id).then( response =>{
           
            this.setState({
                firstName: response.data.firstName,
                lastName : response.data.lastName,
                contactNo: response.data.contactNo,
                email: response.data.email,
                city: response.data.city,
                state: response.data.state,
                zip: response.data.zip,
                isUpdate : true, 
            })
        })
    }

    componentDidMount(){
        
        if(this.props.location.state){
            this.fetchData(this.props.location.state.id);
        }

    }

    onValueChange = (event) => {
        console.log(event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (event) =>{

        event.preventDefault();
        
        let person = {
            firstName: this.state.firstName,
            lastName:this.state.lastName,
            contactNo: this.state.contactNo,
            email: this.state.email,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
        }
        
        
        if(this.state.isUpdate){
            AddressBookService.updateAddressBook(this.props.location.state.id,person).then( (response) =>{
                console.log("Record updated Successfully!");
            }).catch( () => {
                console.log("Something went wrong! Record not updated");
            })    
        }else{
            AddressBookService.addAddressBook(person).then( (response) =>{
                console.log("Record added Successfully!");
            }).catch( () => {
                console.log("Something went wrong! Record not added");
            })
        }
        
    }
    
    onReset = () =>{
        this.setState({
            firstName:"",
            lastName:"",
            contactNo:"",
            email:"",
            city:"",
            state:"",
            zip:"",
            isUpdate: false,
        })
    }

    render() {
        return (
            <div>
                <div className="form-content">
                    <form action="#" className="form" onSubmit={this.onSubmit} onReset={this.onReset}>
                        <div className="form-head">
                            <h3 className="head-text">PERSON ADDRESS FORM</h3>
                            <div className="cancel-button">
                                <a href="/home"><ClearOutlinedIcon /></a>
                            </div>
                        </div>

                        <div className="form-body">
                            <div className="row-content">
                                <label htmlFor="name" className="label text">First Name</label>
                                <input onChange={this.onValueChange} value={this.state.firstName} type="text" className="input" id="firstName" name="firstName" required />
                                <error-output htmlFor="name" className="text-error" id="text-error"></error-output>
                                <label htmlFor="name" className="label text">Last Name</label>
                                <input onChange={this.onValueChange} value={this.state.lastName} type="text" className="input" id="lastName" name="lastName" required />
                                <error-output htmlFor="name" className="text-error" id="text-error"></error-output>
                                
                            </div>
                            <div className="row-content">
                                <label htmlFor="phone-number" className="label text">Phone Number</label>
                                <input onChange={this.onValueChange} value={this.state.contactNo} type="tel" className="input" id="contactNo" name="contactNo" required />
                                <error-output htmlFor="tel" className="tel-error" id="tel-error"></error-output>
                            </div>
                            <div className="row-content">
                                <label htmlFor="email" className="text">Email</label>
                                <input onChange={this.onValueChange} value={this.state.email} type="email" className="input" id="email" name="email" required />
                                
                            </div>
                            <div className="row-content inner-rows">
                                <div className="columns-content">
                                    <label htmlFor="city" className="label text">City</label>
                                    <select name="city" id="city" className="input" onChange={this.onValueChange} value={this.state.city}>
                                        <option value="0">Select City</option>
                                        <option value="Pune">Pune</option>
                                        <option value="Bangalore">Bangalore</option>
                                        <option value="Mumbai">Mumbai</option>
                                        <option value="Hyderabad">Hyderabad</option>
                                        <option value="Mysore">Mysore</option>
                                    </select>
                                </div>
                                <div className="columns-content">
                                    <label htmlFor="state" className="text label">State</label>
                                    <select name="state" id="state" className="input" onChange={this.onValueChange} value={this.state.state}>
                                        <option value="0">Select State</option>
                                        <option value="Maharashtra">Maharashtra</option>
                                        <option value="Karnataka">Karnataka</option>
                                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Goa">Goa</option>
                                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                                        <option value="Uttarakhand">Uttarakhand</option>
                                        <option value="West Bengal">West Bengal</option>
                                    </select>
                                </div>
                                <div className="columns-content zip">
                                    <label htmlFor="zip" className="text label">Zip Code</label>
                                    <input onChange={this.onValueChange} value={this.state.zip} type="Number" className="input" id="zip" name="zip" required/>
                                </div>
                            </div>
                            <div className="buttonParent">
                                <div className="submit-reset">
                                    {/* <button type="submit" className="submitButton button" id="submitButton">Submit</button> */}
                                    <Stack spacing={2} direction="row">
                                        <Button variant="outlined" className="button" size="medium" color="success" onClick={this.onSubmit}>Submit</Button>

                                        <Button variant="outlined" className="button" color="error" onClick={this.onReset}>Reset</Button>
                                    </Stack>
                                    {/* <button type="reset" className="resetButton button" id="resetButton" onclick="resetForm()">Reset</button> */}
                                </div>
                            </div>                    
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddressForm;
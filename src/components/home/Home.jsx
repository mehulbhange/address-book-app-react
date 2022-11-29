import React, { Component } from 'react';
import './Home.css'
import addIcon from '../../assets/add-24px.svg'
import deleteIcon from '../../assets/delete.svg'
import editIcon from '../../assets/edit.svg';
import AddressBookService from '../../service/AddressBookService';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            addressBookList : [],
        }

    }

    fetchData = () =>{
        AddressBookService.getAllAddressBook().then( (response) => {
            this.setState({
                addressBookList : response.data,
            })
        })
    }

    componentDidMount(){
        this.fetchData();
    }

    updateRecord = (id) => {
        this.props.history.push(`/addressbook-form/${id}`, id={id});
    }

    deleteRecord = (id) =>{
        AddressBookService.deleteAddressBook(id).then( ()=>{
            window.location.reload();
        })
    }


    render() {
        return (
            <div>
                <div className="main-content">
                    <div className="header-content">
                        <div className="person-detail-text">
                            Person Details
                        </div>
                        <a href="/addressbook-form" >
                            {/* <img src={addIcon} alt="Add User Logo" />Add
                            User */}
                            <Button variant='contained' startIcon={<PersonAddAlt1Icon />}>Add User</Button>
                        </a>
                    </div>
                
                    <div className="table-main">
                        <table id="table-display" class="table">
                            <tr>
                                
                                <th>Full Name</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Zip</th>
                                <th>Actions</th>
                            </tr>

                            {
                                this.state.addressBookList.map( (addBook) => (
                                    <tr key={addBook.id}>
                                        <td>{addBook.firstName} {addBook.lastName}</td>
                                        <td>{addBook.contactNo}</td>
                                        <td>{addBook.email}</td>
                                        <td>{addBook.city}</td>
                                        <td>{addBook.state}</td>
                                        <td>{addBook.zip}</td>
                                        <td>
                                            {/* <img id={addBook.id} onClick="remove(this)"
                                                src={DeleteOutlineIcon}
                                                alt="delete" /> */}
                                            <DeleteOutlineIcon 
                                                onClick={() => this.deleteRecord(addBook.id)}
                                            />
                                            &nbsp;
                                            {/* <img id={addBook.id} onClick={() => this.updateRecord(addBook.id)}
                                                src={editIcon} alt="edit" /> */}
                                            <EditIcon onClick={() => this.updateRecord(addBook.id)} />
                                        </td>
                                    </tr>
                                ) )
                            }
                            
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
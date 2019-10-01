import React, { Component } from 'react'
import { Modal, Button, Card } from 'react-bootstrap'
import Axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl'
import Footer from '../navBar/footer'

import './myprofile.css'

export default class MyProfile1 extends Component {

    constructor(props) {

        super(props);
        this.state = {
            email: JSON.parse(window.localStorage.getItem('beans')),
            userBean:'',
            show: false,
           // employeeName:'',
            //email:'',
           // designation:''

        }
      //  this.userBean = '';
        this.getProfile = this.getProfile.bind(this);


        console.log('bean inside constructor: ', this.state.email);

   } // End of constructor



    getProfile() {
        debugger
        console.log('inside get profile')
        if (JSON.parse(window.localStorage.getItem('isValid'))) {
            Axios.get('http://localhost:8080/user-profile?email='+this.state.email).then((response) => {

                if (response.data.message === 'Success') {
                     this.setState({
                         userBean:response.data.userBean[0],
                         })

                }
            }).catch((error) => {
                console.log('Error', error);
            })
        }// end of if
    } //End of getProfile


    componentDidMount() {
        this.getProfile();
    }

    editUser(bean) {

        this.setState({
            employeeName: '',
            email:'',
            designation:'',
            show: !this.state.show,
            employeeId: '',
            password: ''
        })
        console.log("updatedata", this.state.beans)
    }

    handleClose() {
        this.setState({ show: !this.state.show })
    }




    updateUserData() {
        const beans = this.state;
        const userData = beans;
        console.log('AccountData', userData);
        if (JSON.parse(window.localStorage.getItem('isValid'))) {
            Axios.put('http://localhost:8080/update-user', userData).then((response) => {
                console.log('Updated Successfully');
                this.handleClose();

            }).catch((error) => {
                console.log('Error', error);
            })
        }
    }

    render() {
        let cardStyle = {
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
            transition: '0.3s',
            width: '40%',
            marginLeft: '30%',
            marginTop: '5%'
        }

        let containerStyle = {
            padding: '2px 16px'
        }
        console.log("==================",this.state.userBean)

        return (
            <div>
                {/* <SearchNavabar /> */}
                <div class="container-fluid ">


                    <div style={{ textAlign: 'center' }}>

                        <div style={cardStyle}>
                            <div><b style={{ fontSize: '40px', color: 'gray' }}>Profile Details</b></div>
                            <hr></hr>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWn7BLocAz66HZJPCRcwrccj11-2uE61lyW4bGmlQWXOdAh-8R" style={{ width: '40%' }} />
                            <div style={containerStyle}>
                                <h4  ><b className="h4">{this.state.userBean.employeeId}</b></h4>
                                <h4 ><b className="h4" >{this.state.userBean.employeeName}</b></h4>

                                <h4 ><b className="h4">{this.state.userBean.email}</b></h4>
                                <h4 ><b className="h4"> {this.state.userBean.designation}</b></h4>
                            </div>
                            <hr></hr>
                            <button onClick={this.editUser.bind(this, this.state.beans)} className="btn btn-outline-success">Edit</button>
                            <hr></hr>
                        </div>
                    </div>


                    <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update User Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <div className="col">
                                    <label style={{ color: "gray" }}>Enter Name</label>
                                    <input type="text" onChange={(event) => { this.setState.userBean({ employeeName: event.target.value }) }}
                                        value={this.state.userBean.employeeName} className="form-control" placeholder="Employee Name" />
                                </div>

                                <div className="col">
                                    <label style={{ color: "gray" }}>Enter Email</label>
                                    <input type="text" onChange={(event) => { this.setState.userBean({ email: event.target.value }) }}
                                        value={this.state.userBean.email} className="form-control" placeholder="Email" />
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col">
                                    <label style={{ color: "gray" }}>Enter Designation</label>
                                    <input type="text" onChange={(event) => { this.setState.userBean({ designation: event.target.value }) }}
                                        value={this.state.userBean.designation} className="form-control" placeholder="Designation" />
                                </div>


                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-outline-danger" onClick={this.handleClose.bind(this)}>
                                Close
</button>
                            <button className="btn btn-outline-success" onClick={this.updateUserData.bind(this)}>
                                Save Changes
</button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <Footer />
            </div>
        )
    }
}




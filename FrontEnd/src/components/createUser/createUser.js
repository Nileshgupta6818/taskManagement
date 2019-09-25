import React, { Component } from 'react';
import $ from 'jquery'
import Axios from 'axios'
import './create.css'
import Footer from '../navBar/footer'
import SimpleNavBar from '../navBar/simpleNavBar';

export class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employeeId: '',
            employeeName: '',
            email: '',
            password: '',
            designation: '',
            showServerError: false,
            showExistEmail: false,
            showName: false,
            showEmail: false,
            showDesignation: false,
            showPassword: false,
            showConfirmPassword: false,
            showPasswordMismatch: false,
            showFieldsMadatory: false,
            showSuccess: false,
            type: 'password',
            typec: 'password'

        }
    }
    handleClick = () => this.setState(({ type }) => ({
        type: type === 'text' ? 'password' : 'text'
    }))
    handleClickConfirm = () => this.setState(({ typec }) => ({
        typec: typec === 'text' ? 'password' : 'text'
    }))


    cancel(e) {
        e.preventDefault();
        this.props.history.push('/');
    }
    create(e) {
        e.preventDefault();

        Axios.post('http://localhost:8080/create-user', this.state)
            .then((response) => {
                console.log(" details" + this.state.employeeId)

                console.log(response.data.message)
                if (response.data.statusCode === 201) {
                    this.setState({
                        showSuccess: true
                    })

                    setTimeout(() => {
                        this.props.history.push('/Login');
                    }, 3000)

                } else if (response.data.statusCode === 401) {
                    this.setState({ showExistEmail: true })
                    setTimeout(() => {
                        this.setState(this.setState({ showExistEmail: false }))
                    }, 3000);
                }

            }).catch((error) => {
                this.setState({ showServerError: true })
                setTimeout(() => {
                    this.setState(this.setState({ showServerError: false }))
                }, 3000);
                console.log(error);
            })
    }
    hideName = () => {
        this.setState({
            showName: false
        })
    }
    hideEmail = () => {
        this.setState({
            showEmail: false
        })
    }
    hideDesignation = () => {
        this.setState({
            showDesignation: false
        })
    }
    hidePassword = () => {
        this.setState({
            showPassword: false
        })
    }
    hideCPassword = () => {
        this.setState({
            showConfirmPassword: false
        })
    }

    componentDidMount() {

        var that = this;

        $(document).ready(function () {
            $('#submit').click(function (e) {

                var pass = (document.getElementById("password").value).trim();
                var rpass = (document.getElementById('password_confirmation').value).trim();
                var name = (document.getElementById("Name").value).trim();
                var designation = (document.getElementById("Designation").value).trim();
                var email = (document.getElementById("email").value).trim();

                if (pass !== rpass) {
                    that.setState({ showPasswordMismatch: true })
                    setTimeout(() => {
                        that.setState({
                            showPasswordMismatch: false
                        })
                    }, 3000);
                }
                if (rpass === "") {
                    that.setState({ showConfirmPassword: true })
                }
                if (pass === "") {
                    that.setState({ showPassword: true })
                }
                if (designation === "") {
                    that.setState({ showDesignation: true })
                }
                if (email === "") {
                    that.setState({ showEmail: true })
                }
                if (name === "") {
                    that.setState({ showName: true })
                }
                if (name === "" && designation === "" && email === "" && pass === "" && rpass === "") {
                    that.setState({ showFieldsMadatory: true })
                    setTimeout(() => {
                        that.setState({
                            showFieldsMadatory: false
                        })
                    }, 3000);

                }
                if (name !== "" && designation !== "" && email !== "" && (pass === rpass)) {
                    return true;
                }
                else {
                    return false;
                }
            });
        });

    }


    render() {
        return (
            <div >
                <SimpleNavBar />
                <div id="content-wrap" className="container-fluid mt-5">
                    {this.state.showServerError ? <div id="alertHead" className="alert alert-danger" role="alert" ><small className="font-weight-bold">Registration Failed Server Did Not Respond</small> </div> : null}
                    {this.state.showExistEmail ? <div id="alertHead" className="alert alert-danger" role="alert"><small className="font-weight-bold">Registration Failed Email Already Exist</small> </div> : null}
                    {this.state.showSuccess ? <div id="alertHead" className="alert alert-success" role="success" ><small className="font-weight-bold">Registration Success </small> </div> : null}
                    <div className="row">
                        <div id="container" className="col-auto container mt-5">
                            <div id="create" className="card shadow-lg">
                                <div id="cardHead" className="card-header">
                                    <legend className="text-center">Registration Form</legend>
                                </div>
                                <div className="card-body">
                                    <form id="apply-form" onSubmit={this.create.bind(this)}>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend ">
                                                <label className="input-group-text"><i className="fas fa-user" /></label>
                                            </div>
                                            <input autoComplete="off" className="form-control" onKeyPress={this.hideName} type="text" name="Name" title="Enter Name" id="Name" placeholder="Enter name of Employee" onChange={(event) => {
                                                this.setState({
                                                    employeeName: event.target.value
                                                })
                                            }} />
                                        </div>
                                        {this.state.showName ? <div id="errordiv" className="container-fluid">Please fill out Name field** </div> : null}
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text"><i className="fas fa-at" /></label>
                                            </div>
                                            <input autoComplete="off" className="form-control" onKeyPress={this.hideEmail} type="email" name="email" id="email" title="Enter Email" placeholder="Enter Email" onChange={(event) => {
                                                this.setState({
                                                    email: event.target.value
                                                })
                                            }} />
                                        </div>
                                        {this.state.showEmail ? <div id="errordiv" className="container-fluid" >Please fill out Email field**</div> : null}

                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text"><i className="fas fa-user-tie" /></label>
                                            </div>
                                            <input autoComplete="off" className="form-control" onKeyPress={this.hideDesignation} type="text" name="Designation" title="Enter Desination" id="Designation" placeholder="Enter Designation" onChange={(event) => {
                                                this.setState({
                                                    designation: event.target.value
                                                })
                                            }} />
                                        </div>
                                        {this.state.showDesignation ? <div id="errordiv" className="container-fluid" >Please fill out Designation field** </div> : null}

                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text"><i className="fas fa-key" /></label>
                                            </div>
                                            <input className="form-control border border-right-0" onKeyPress={this.hidePassword} type={this.state.type} name="password" title="Enter Password" id="password" placeholder="Enter Password" onChange={(event) => {
                                                this.setState({
                                                    password: event.target.value
                                                })
                                            }} />
                                            <div className="input-group-append btn" style={{borderRadius:'0px 5px 5px 0px' ,border:"1px solid #ced4da" }} onClick={this.handleClick}>{this.state.type === 'text' ? <i class="far fa-eye-slash mt-1"></i> : <i class="far fa-eye mt-1"></i>}</div>
                                        </div>
                                        {this.state.showPassword ? <div id="errordiv" className="container-fluid">Please fill out Password field**</div> : null}

                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <label className="form-control-plaintext input-group-text"><i className="fas fa-key" /></label>
                                            </div>
                                            <input className="form-control border border-right-0" onKeyPress={this.hideCPassword} type={this.state.typec} title="Confirm Password" name="password_confirmation" id="password_confirmation" placeholder="Confirm Password" />
                                            <div className="input-group-append btn " style={{borderRadius:'0px 5px 5px 0px' ,border:"1px solid #ced4da" }} onClick={this.handleClickConfirm}>{this.state.typec === 'text' ? <i class="far fa-eye-slash mt-1"></i> : <i class="far fa-eye mt-1"></i>}</div>
                                        </div>
                                        {this.state.showConfirmPassword ? <div id="errordiv" className="container-fluid">Please set Confirm Password**</div> : null}


                                        {this.state.showFieldsMadatory ? <div id="alert" className="alert alert-danger "><small><b>All fileds are mandatory</b></small></div> : null}
                                        {this.state.showPasswordMismatch ? <div id="alert" className="alert alert-danger" ><small><b>Passwords didn't match Try again</b></small></div> : null}

                                        <div className="input-group mb-3 container-fluid">
                                            <input type="reset" id="reset" title="reset" className="form-control-plaintext btn btn-outline-primary btn-sm" />

                                            <input type="submit" onSubmit={this.validate} id="submit" title="submit" className="form-control-plaintext btn btn-outline-success btn-sm" />
                                            <button type="cancel" id="cancel" title="cancel" className="form-control-plaintext btn btn-outline-info btn-sm" onClick={this.cancel.bind(this)}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
export default User

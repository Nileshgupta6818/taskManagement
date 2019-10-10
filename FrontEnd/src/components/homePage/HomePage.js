import React, { Component } from 'react';
import Axios from 'axios';
import './HomePage.css';
import {NavDropdown, Navbar, Nav, Button } from 'react-bootstrap'
import { NavLink,withRouter,Link } from 'react-router-dom';
import { Modal} from 'react-bootstrap'
import moment from 'moment';
import Footer from '../navBar/footer';
import '../login/welcom.css'
export class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            todo: [],
            complete: [],
            blocked: [],
            onProgress: [],
            containerName: '',
            showButton: false,
            isValid: JSON.parse(localStorage.getItem('isValid'))==='true'?true:false,
            show: false,
            popup: [],
            user: '',
            datas: [],
            mail: JSON.parse(window.localStorage.getItem('beans')),
            email : null,
            page:"To Me"
        }
      { this.state.userEmail=this.props.value

    }

    }
     
    onDragOver = (ev, a) => {
         var x = document.getElementById(a).id;
      this.setState({
            containerName: x
        }) 
        ev.preventDefault();
          }

    componentDidMount() {
        if(!this.props.value){
            let userData = JSON.parse(window.localStorage.getItem('beans')) 
            console.log("=mmmmmmm=============",userData)
            if(userData!=null){
                console.log("=========sdfdfs=====",userData)

            this.setState({
                email : userData.email
            },()=>{
                this.getTask()
            })
        }}else{
            this.setState({
                email : this.props.value
            },()=>{
                this.getTask()
            })
        }
    
    
        
    }

    
    getTask() {
        if (JSON.parse(window.localStorage.getItem('isValid'))) {
          Axios.get('http://localhost:8080/get-assigned-task?email='+this.state.email)
                .then((response) => {
                    if (response.data.statusCode === 201) {
                        localStorage.setItem("pages", JSON.stringify("To Me"));

                        //setstat
                        const state = {...this.state}
                        state.todo = response.data.taskBean.filter(item => item.status === 'todo');
                        state.blocked = response.data.taskBean.filter(item => item.status === 'blocked');
                        state.onProgress = response.data.taskBean.filter(item => item.status === 'onProgress');
                        this.setState({
                            ...state
                        })

                    }
                }).catch((error) => {
                    console.log(error)
                })
        } else {
            this.props.history.push('/')
        }
    }
    updateCompleted(a,b){

        var moment = require('moment');
        var moment= moment().format('YYYY-MM-DD');
        Axios.put('http://localhost:8080/update-task-completed-Date?taskId=' + a + '&status=' + b+ '&completedDate=' + moment)
        .then((response) => {
            if (response.data.statusCode === 201) {
                this.getTask();
                this.props.history.push('/homePage')
                this.getTask();

            }
        }).catch((error) => {
            console.log(error)
        })
}

    componentDidUpdate(prevProps, prevState) {
        console.log("===============****")
        console.log(prevState);
        console.log(this.state)
        console.log("=================*****")
    }
    
    update(a, b) {
        var c = this.state.containerName
        if (b === "todo") {
            b = "onProgress"
        } else if (b === "onProgress") {
            b = "blocked"
        }
        else if (b === "blocked") {
            b = "onProgress"
        }
        if (b === "onProgress" && c == "onProgress" || b === "blocked" && c == "blocked" || b === "completed") {
            Axios.put('http://localhost:8080/update-task-status?taskId=' + a + '&status=' + b)
                .then((response) => {
                    if (response.data.statusCode === 201) {
                        this.getTask();
                    }
                }).catch((error) => {
                    console.log(error)
                })
        }
    }

    showvis(item, userBean) {
        this.setState({
            popup: item,
            user: userBean,
            page:"To Me"

        })
        this.setState({ show: !this.state.show })
    }

    handleClose() {
        this.setState({ show: !this.state.show })
    }

   
    completedTask(e) {
        e.preventDefault();
        this.props.history.push('/completedTask')
    }
   
    pageName(data){
        if(data==="By Me"){
        this.setState({
            page:data
        })
        localStorage.setItem("pages", JSON.stringify("By Me"))

    }else{
        localStorage.setItem("pages", JSON.stringify("To Me"))

    }
    } 
    showMenu(){
        this.setState({
            showButton:this.state.showButton?false:true
        })
    }
   
    render() {
            debugger
            console.log(' this.state.onProgress', this.state.onProgress)
        return (
            <div id="page-container" >
                <Nav >
                    <NavDropdown   title={this.state.page} id="basic-nav-dropdown">
                        <NavLink onClick={this.props.clearSearch}   className="nav-link" onClick={(event) => { this.pageName("To Me") }}  to="/homePage"  >To Me</NavLink>
                        <NavLink  onClick={this.props.clearSearch} className="nav-link" onClick={(event) => { this.pageName("By Me") }}  to="/byme" onClick={this.props.byme} >By Me</NavLink>
                    </NavDropdown>
                

                    <Button type="button" variant="outline-primary" onClick={(e)=>{this.completedTask(e)}} className="com" style={{ marginLeft: '88%', marginTop: '-21px' }}>Completed Task</Button>
                  
                </Nav> 
                <div id="content-wrap" >
                    {console.log("============", this.props.value)}


 {/*  popUp */} 
                    <Modal size="sm" centered show={this.state.show} onHide={this.handleClose.bind(this)} >
                        <Modal.Header closeButton>
                            <Modal.Title>Task Details
 <div>subject {this.state.popup.subject}</div></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="input-group mb-3">
                                <textarea value={this.state.popup.description} type="text" className="form-control" placeholder="Designation" readOnly /> </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span style={{ width: '100% ' }} className="input-group-text" id="basic-addon1">Assigned by</span>
                                </div>

                                <input type="text"
                                    value={this.state.user.email} className="form-control" placeholder="Designation" readOnly /></div>


                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span style={{ width: '100% ' }} className="input-group-text" id="basic-addon1">Assign Date</span>
                                </div>

                                <input type="text"
                                    value={moment(this.state.popup.assignDate).format("DD-MM-YYYY")} className="form-control" placeholder="Password" readOnly /></div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span style={{ width: '100% ' }} className="input-group-text" id="basic-addon1">End Date</span>
                                </div>

                                <input type="text"
                                    value={moment(this.state.popup.endDate).format("DD-MM-YYYY")} className="form-control" placeholder="Email" readOnly /> </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span style={{ width: '100% ' }} className="input-group-text" id="basic-addon1">Priority</span>
                                </div>
                                <input type="text"
                                    value={this.state.popup.priority} className="form-control" readOnly /> </div>


                        </Modal.Body>
                        <Modal.Footer style={{ color: 'red' }} >
                            Number of days {moment(this.state.popup.endDate).diff(moment(this.state.popup.assignDate), 'days')}
                        </Modal.Footer>
                    </Modal>
{/* end of popup */}                    
             <div className="container-fluid">
                        <center>
                            <div className="row container">
                                <div className="col-lg-4 col-md-3 col-sm-3" id="todo" onDragOver={(e) => this.onDragOver(e, "todo")} >
                                    <div className="col-auto">
{/* ToDo */}
                                        <div id="card bg-default head" >
                                            <h5 id="card-header" className="card-header header">
                                                <center className="letter" >To Do</center>
                                            </h5>
                                        </div>
                                        <div className=" card-body cards">
                                            {this.state.todo.filter(item => item.priority === 'critical').map(item => {
                                                return (
                                                    <div className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}
                                                    >
                                                        <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                            <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                        </div>
                                                        <p id="drag1" draggable="true" className="prCri" >
                                                            < textarea id="d2" className="textarea" value={item.description} rows="5" readOnly></textarea> </p>
                                                    </div>
                                                )
                                            }
                                            )}
                                            {this.state.todo.filter(item => item.priority === 'high').map(item => {
                                                return (
                                                    <div className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}
                                                    >
                                                        <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                            <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                        </div>
                                                        <p id="drag1" draggable="true" className="prHigh" >
                                                            < textarea id="d2" className="textarea" value={item.description} rows="5" readOnly></textarea> </p>
                                                    </div>
                                                )
                                            }
                                            )}
                                            {this.state.todo.filter(item => item.priority === 'medium').map(item => {
                                                return (
                                                    <div className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}
                                                    >
                                                        <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                            <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                        </div>
                                                        <p div id="drag2" draggable="true" className="prInit" >
                                                            < textarea id="d2" className="textarea" value={item.description} rows="5" readOnly></textarea>
                                                        </p>
                                                    </div>
                                                )
                                            }
                                            )}
                                            {this.state.todo.filter(item => item.priority === 'low').map(item => {
                                                return (
                                                    <div className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}>
                                                        <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                            <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                        </div> <p id="drag3" draggable="true" className="prLow" >
                                                            < textarea id="d2" className="textarea" rows="5" value={item.description} readOnly></textarea>
                                                        </p>
                                                    </div>
                                                )
                                            }
                                            )}
                                        </div>
                                    </div>
                                </div>
{/*End of  ToDo */}
{/* onProgress */}
                                <div className="col-lg-4 col-md-3 col-sm-4 col-3" id="onProgress" onDragOver={(e) => this.onDragOver(e, "onProgress")}>
                                    <div className="col-auto">
                                        <div id="card bg-default head" >
                                            <h5 id="card-header" className="card-header header">
                                                <center className="letter" > In Progress </center>
                                            </h5>
                                        </div>
                                        <div className="card-body cards">
                                            {this.state.onProgress.filter(item => item.priority === 'critical').map(item => {
                                                return (
                                                    <div className="col-auto container" onDragEnd={() => this.update(item.taskId, item.status)}
                                                    >
                                                        <div className="cor" onClick={() => this.updateCompleted(item.taskId, "completed")}>
                                                            <i class="far fa-check-circle"></i></div>

                                                        <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                            <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                        </div>
                                                        <p id="drag6" draggable="true" class="prCri ">
                                                            < textarea id="d2" className="textarea" rows="5" cols="5" value={item.description} readOnly></textarea> </p>
                                                        <div class="container-fluid">
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            )}
                                            {this.state.onProgress.filter(item => item.priority === 'high').map(item => {
                                                return (
                                                    <div className="col-auto container" onDragEnd={() => this.update(item.taskId, item.status)}
                                                    >
                                                        <div className="cor" onClick={() => this.updateCompleted(item.taskId, "completed")}>
                                                            <i class="far fa-check-circle"></i></div>
                                                        <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                            <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                        </div>
                                                        <p id="drag6" draggable="true" class="prHigh ">
                                                            < textarea id="d2" className="textarea" rows="5" cols="5" value={item.description} readOnly></textarea> </p>
                                                        <div class="container-fluid">
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            )}
                                            {this.state.onProgress.filter(item => item.priority === 'medium').map(item => {
                                                return (
                                                    <div className="col-auto container" onDragEnd={() => this.update(item.taskId, item.status)}
                                                    >
                                                        <div className="cor" onClick={() => this.updateCompleted(item.taskId, "completed")}>
                                                            <i class="far fa-check-circle"></i></div>

                                                        <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                            <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                        </div>
                                                        <p id="drag6" draggable="true" class="prInit ">
                                                            <textarea id="d2" className="textarea" rows="5" cols="5" value={item.description} readOnly></textarea> </p>
                                                        <div class="container-fluid">
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            )}
                                            {this.state.onProgress.filter(item => (item.priority === 'low')).map(item => {
                                                return (
                                                    <div className="col-auto" draggable="true" onDragEnd={() => this.update(item.taskId, item.status)}
                                                    >

                                                        <div className="cor" onClick={() => this.updateCompleted(item.taskId, "completed")}>
                                                            <i class="far fa-check-circle"></i></div>
                                                        <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                            <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                        </div>
                                                        <p id="drag6" draggable="true" class="prLow ">
                                                            < textarea id="d2" className="textarea" rows="5" cols="5" value={item.description} readOnly></textarea> </p>
                                                    </div>
                                                )
                                            }
                                            )}
                                        </div>
                                    </div>
                                </div>

{/* End onProgress */}


{/* blocked */}

                                <div className="col-lg-4 col-md-3 col-sm-3" id="blocked" onDragOver={(e) => this.onDragOver(e, "blocked")}>
                                    <div className="col-auto">
                                        <div id="card bg-default head" >
                                            <h5 id="card-header" className="card-header header">
                                                <center className="letter"> Blocked </center>
                                            </h5>
                                        </div>
                                        <div className=" card-body cards">
                                            {this.state.blocked.filter(item => item.priority === 'critical').map(item => {
                                                return (
                                                    <div className="col-auto"
                                                        onDragEnd={() => this.update(item.taskId, item.status)} >
                                                        <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                            <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                        </div>
                                                        <p id="drag6" draggable="true" class="prCri ">
                                                            < textarea id="d2" className="textarea" rows="5" value={item.description} cols="5" readOnly></textarea> </p>
                                                    </div>
                                                )
                                            }
                                            )}
                                            {this.state.blocked.filter(item => item.priority === 'high').map(item => {
                                                return (
                                                    <div className="col-auto"
                                                        onDragEnd={() => this.update(item.taskId, item.status)}
                                                    >
                                                        <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                            <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                        </div>
                                                        <p id="drag6" draggable="true" class="prHigh ">
                                                            < textarea id="d2" className="textarea" rows="5" value={item.description} cols="5" readOnly></textarea> </p>
                                                    </div>
                                                )
                                            }
                                            )}
                                            {this.state.blocked.filter(item => item.priority === 'medium').map(item => {
                                                return (
                                                    <div className="col-auto" onDragEnd={() => this.update(item.taskId, item.status)}
                                                    >
                                                        <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                            <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                        </div>
                                                        <p id="drag6" draggable="true" class="prInit ">
                                                            < textarea id="d2" className="textarea" value={item.description} rows="5" cols="5" readOnly></textarea> </p>
                                                    </div>
                                                )
                                            }
                                            )}
                                            {this.state.blocked.filter(item => item.priority === 'low').map(item => {
                                                return (
                                                    <div className="col-auto"
                                                        onDragEnd={() => this.update(item.taskId, item.status)}
                                                    >

                                                        <div id="i7" className="col-lg-4 col-md-4 col-sm-4 a" >
                                                            <i onClick={() => this.showvis(item, item.userBean)} class="fas fa-info-circle"></i>
                                                        </div>
                                                        <p id="drag6" draggable="true" class="prLow ">
                                                            < textarea id="d2" className="textarea" value={item.description} rows="5" cols="5" readOnly></textarea> </p>
                                                    </div>
                                                )
                                            }
                                            )}
                                        </div>
                                    </div>
                                </div>

                            </div>

{/*End Of blocked */}
                        </center>

                        <Footer />
                    </div>

                </div>
                <div> </div>
            </div>


        )
    }
}
export default withRouter(HomePage)
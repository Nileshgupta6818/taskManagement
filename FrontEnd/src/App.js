import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import * as Axios from 'axios';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'

import Login from './components/login/Login'
import HomePage from './components/homePage/HomePage'
import createTask from './components/createTask/createTask'
import createUser from './components/createUser/createUser'
import myprofile from './components/createUser/MyProfile'

import navBar from './components/navBar/NavBar'

import completedTask from './components/homePage/CompletedTask';

import welcomePage from './components/welcome/welcomePage';
import ConfirmPassword from './components/login/confirmpassword';

import forgotPasswordEmailCheck from './components/login/forgotPasswordEmailCheck'

import SearchNavabar from './components/navBar/SearchNavBar';
import Byme from './components/homePage/Byme';
import createProject from './components/createTask/createProject';
import ProjectHomePage from './components/Architect/ProjectHomePage';
import Projectmembers from './components/Architect/Projectmembers';
import GetPeople from './components/People/GetPeople';
import { userInfo } from 'os';
import MyVerticallyCenteredModal from './components/Architect/SideData';
import SearchPage from './components/navBar/SearchPage';


let search = false
let emailData = null
export class App extends Component {
  constructor(props) {
    let email = JSON.parse(window.localStorage.getItem('beans'))

    super(props);
    this.state = {
      search: false,
      isValid: false,
      searchtask: null,
      taskData: null,
      email: JSON.parse(window.localStorage.getItem('beans')),
      architect: false,
      lead: false,
      emp: false,
      role: JSON.parse(window.localStorage.getItem('role')),
      userBean: []


    }
  }
  getLoginData = (data) => {
    this.setState({
      email: data,
      isValid: localStorage.getItem("isValid") === 'true' ? true : false,
    })
    return (data)
  }

  getEmail() {
    let email = null
    if ((!this.state.email)) {
      email = JSON.parse(window.localStorage.getItem('beans'))
      if (email != null) {
        emailData = email
        this.setState({
          email: email
        }, () => {
          console.log("object")
        })
      }
    }
  }
  componentDidMount() {
    let email = ''
    let isValid;
    let page;
    if (localStorage.getItem("isValid") === 'true') {
      isValid = true
    } else {
      isValid = false
    }
    this.setState({
      isValid: isValid
    })

    if (this.state.role === "architect") {
      this.setState({
        architect: true
      })
    } else if (this.state.role === "lead") {
      this.setState({
        lead: true
      })
    } else {
      this.setState({
        emp: true
      })
    }

    this.getEmail();

  }

  setVal = () => {
    this.setState({
      isValid: localStorage.getItem("isValid") === 'true' ? true : false,
    })
    this.props.history.push('/')
  }

 
  profile = (data) => {
    console.log("object===========", data)
    this.setState({
      userBean: data
    })
  }




  render() {
    const page = JSON.parse(window.localStorage.getItem('pages'));
    let isValid = JSON.parse(window.localStorage.getItem('isValid'));
    let role = JSON.parse(window.localStorage.getItem('role'));
    return (
      <div>
        {isValid ? <SearchNavabar
          setVal={this.setVal}
          sendToApp={this.searchPage}
          byme={this.byme} /> : <div>  {(this.props.location.pathname != '/' &&
            this.props.location.pathname != '/Login'
            && this.props.location.pathname != '/getEmail'
            && this.props.location.pathname != '/createUser'
            && this.props.location.pathname != '/confirmPassword' && !isValid) ? this.props.history.push('/') : null}    </div>
        }
        {this.state.isValid ?
          <div><Route exact path='/taskPage' render={() => { return <HomePage value={this.state.email}  byme={this.byme} /> }} ></Route>
            <Route exact path='/navBar' component={navBar}></Route>
            {this.state.emp ? <Redirect to='/homePage' /> : <Route exact path='/createProject' component={createProject}></Route>}
            {/*  {this.state.architect?<Route exact path='/createProject' component={createProject}></Route>:null} 
         {this.state.lead?<Route exact path='/createProject' component={createProject}></Route>:null}  */}
            <Route exact path='/getPeople' render={() => { return <GetPeople sendToProfile={this.profile} /> }}></Route>
            <Route exact path='/searchPage' component={SearchPage}></Route>
            <Route exact path='/userInfo' component={userInfo}></Route>
            <Route exact path='/homePage' component={ProjectHomePage}></Route>
            <Route exact path='/byme' render={() => {
              return <Byme byme={this.byme} searchData={this.state.taskData} />
            }}></Route>

            <Route exact path='/members' component={Projectmembers}></Route>

            <Route exact path='/completedTask' component={completedTask}></Route>
            <Route exact path='/myprofile' profileData={this.state.userBean} component={myprofile}></Route>
            {(isValid && this.props.location.pathname === '/') ? <Redirect to='/homePage' /> : null}
            <Route exact path='/createTask' component={createTask}></Route>
          </div>:null
        }
        {isValid ? null :
          <Route exact path='/' component={welcomePage}></Route>
        }
        <Route exact path='/confirmPassword' component={ConfirmPassword}></Route>
        <Route exact path='/getEmail' component={forgotPasswordEmailCheck}></Route>
        <Route exact path='/createUser' component={createUser}></Route>
        <Route exact path='/Login' render={() => { return <Login clicked={this.getLoginData.bind(this)} /> }}></Route>
      </div>
    )
  } //End of render
}

export default withRouter(App); 
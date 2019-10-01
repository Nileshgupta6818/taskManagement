import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link ,withRouter} from 'react-router-dom'
import Axios from 'axios'
import SimpleNavBarCreate from '../navBar/simplenavbarcreate';
import Footer from '../navBar/footer';
import $ from 'jquery';


export class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: '',
			showInvalid: false,
			showServer: false,
			showEmail: false,
			showPassword: false,
			type: 'password',
			beans:null

		}
	}

	hideEmail = () => {
		this.setState({
			showEmail: false
		})
	}
	
	hidePassword = () => {
		this.setState({
			showPassword: false
		})
	}


	handleClick = () => this.setState(({ type }) => ({
		type: type === 'text' ? 'password' : 'text'
	}))

	login(event) {
		event.preventDefault();
		Axios.post('http://localhost:8080/login', null,
			{
				params: {
					email: this.state.email,
					password: this.state.password
				},
				credentials: 'same-origin'
			}
		).then((response) => {
			console.log('RESPONSE DATA', response)
			console.log(response.data.message)

			if (response.data.statusCode === 201) {
				console.log('data', response.data)
				this.setState({
					isValid: true,
					beans:response.data.userBean[0].email
				})
				console.log(localStorage.setItem("isValid", JSON.stringify(this.state.isValid)));

				console.log(localStorage.setItem("beans", JSON.stringify(response.data.userBean[0].email)));
					this.props.clicked(this.state.beans)
				this.props.history.push('/homePage')
			}
			else if (response.data.statusCode === 401) {

				this.setState({ showInvalid: true })

				setTimeout((() => {
					this.setState({
						showInvalid: false
					})
				}), 3000);

			}
			else if(response.data.statusCode === 501) {
				this.setState({ showInvalid: true })

				setTimeout((() => {
					this.setState({
						showInvalid: false
					})
				}), 3000);
			}
		}).catch((error) => {
			this.setState(
				{
					showServer: true
				}
			)
			setTimeout(() => {
				this.setState({
					showServer: false
				})
			}, 2000);
		})
	}
	forgot = () => {
		this.props.history.push("/getEmail")
	}
	componentDidMount() {
		var that = this;
		$(document).ready(function () {
			$('#Loginbtn').click(function (e) {
				var email = (document.getElementById("email").value).trim();
				var password = (document.getElementById("password").value).trim();

				if (password === "") {
					that.setState({ showPassword: true })
				}
				if (email === "") {
					that.setState({ showEmail: true })
				}

				if (email !== "" && password !== "") {
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
			<div id="form-container">
				<div id="content-wrap">
				<SimpleNavBarCreate />
				<div className="container-fluid mt-5 pb-3">
					<div style={{ textAlign: '"center"' }}>
						<div id="success" className="alert alert-success" role="success" hidden="true">
							<h6 id="successMessage" />
						</div>
					</div>
					<div className="row">
						<div id="container" className="col-auto container mt-5">
							<div id="create" className="card shadow-lg ">
								<div id="cardHead" className="card-header text-center">
									<h3>Login</h3>
									<p>Enter your email and password</p>
								</div>
								<div className="card-body">
									<form role="form" onSubmit={this.login.bind(this)}>
										<div className="input-group mb-3">
											<div className="input-group-prepend">
												<label className="input-group-text"><i className="fas fa-at" /></label>
											</div>
											<input className="form-control" autoComplete="off" type="email" name="email"  onKeyPress={this.hideEmail} title="Enter Email" id="email" placeholder="Enter Email" onChange={(event) => {
												this.setState({
													email: event.target.value
												})
											}} />
											
										</div>
										{this.state.showEmail ? <div id="errordiv" className="container-fluid">Please enter Email** </div> : null}
										<div className="input-group mb-3">
											<div className="input-group-prepend">
												<label className="input-group-text"><i className="fas fa-key" /></label>
											</div>
											<input className="form-control border border-right-0"  onKeyPress={this.hidePassword} autoComplete="off" type={this.state.type} name="password" title="Enter Password" id="password" placeholder="Enter Password" onChange={(event) => {
												this.setState({
													password: event.target.value
												})
											}} />

											<div className="input-group-append btn" style={{ borderRadius: '0px 5px 5px 0px', border: "1px solid #ced4da" }} onClick={this.handleClick}>{this.state.type === 'text' ? <i class="far fa-eye-slash mt-1 "></i> : <i class="far fa-eye mt-1"></i>}</div>
											
										</div>
										{this.state.showPassword ? <div id="errordiv" className="container-fluid">Please enter password** </div> : null}
										{this.state.showInvalid ? <div>
											<small className="alert alert-danger container-fluid text-center font-weight-bold d-block" >Invalid Email and/or Password</small>
										</div> : null}
										{this.state.showServer ? <div>
											<small className="alert alert-danger container-fluid text-center font-weight-bold d-block" >Server Not Responding</small>
										</div> : null}
										<div className="input-group mb-2 mt-2 container-fluid">
										</div>
										<div>
											<input type="submit" id="Loginbtn" title="submit" value="Login" className=" form-control-plaintext btn btn-outline-primary btn-sm " />
										</div>
									</form>
									<div>
										<Link to="/getEmail">Forgot Password </Link>
									</div>
								</div>
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
export default withRouter(Login);
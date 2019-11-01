import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom'
import Axios from 'axios'
import "react-toastify/dist/ReactToastify.css";
import './homepage.css';
import { Architect, Employee, Lead } from './SideData';
import LeadHome from '../Lead/LeadHome';


export class ArchitectHomePage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: JSON.parse(window.localStorage.getItem('beans')),
			projectData: [],
			role:JSON.parse(window.localStorage.getItem('role')),
			architect:false,
			lead:false,
			emp:false,
		}

	}

	componentDidMount() {
	
		Axios.get('http://localhost:8080/get-projects-by-email?email=' + this.state.email)
			.then((response) => {
				if (response.data.statusCode === 201) {
					this.setState({
						projectData: response.data.projectBeans
					})
					console.log("===============", response.data.projectBeans)
				}
			}).catch((error) => {
				console.log(error)
			})

			if(this.state.role==="architect"){
				this.setState({
					architect:true
				})
			}else if(this.state.role==="lead"){
				this.setState({
					lead:true
				})
			}else{
				this.setState({
					emp:true
				})
			}
	}
	setPage(group) {
		console.log("object",group.groupId)
		localStorage.setItem("groupId", group.projectId)
	}
	page(group) {
		this.setPage(group)
		this.props.history.push('/taskPage')
	}

	render() {

		return (
			<div className="container-fluid">
			{console.log("object",this.state.projectData.email)}

				<div className="row">
					<div className="col-md-12">
						<div className="row">
							<div className="col-md-2 cssCard" >
								<div class=" card-body  h-75">
									<div className="input-group mb-3 option">
										{this.state.architect?Architect():null}
										{this.state.lead?Lead():null}
										{this.state.emp?Employee():null}
									</div>
								</div>
							</div>
							<div className="col-md-8">
								<div id="card" >
									<div class=" card-body ">
										<div>
											<div className="row">
												{this.state.projectData.map(item => {
													return (
														<div onClick={() => {
															this.page(item.projectPkBean)
														}} className='col-sm-4'>
															<p id="drag1" className="stickys">
																< textarea id="d2" className="textarea" rows="5" readOnly>{item.projectName}</textarea> </p>
															<p />
														</div>
													)
												})
												}

											</div>
											{this.state.projectData[0]?
											<div style={{ marginLeft: "2%", marginTop: '5%' }}>
												<table class="table table-hover">
													<thead>
														<tr>
															<th scope="col">#</th>
															<th scope="col">Project Name</th>
															<th scope="col">People</th>
															<th scope="col">Creation Date</th>
															<th scope="col">Deadline</th>
														</tr>
													</thead>
													<tbody>
														{
															this.state.projectData.map((projectData) => {
																console.log('tabledate', projectData.id)
																return (
																	<tr>
																		<th scope="row">{projectData.id}</th>
																		<td onClick={() => {
																			{
																				this.page(projectData.projectPkBean)
																			}
																		}}>{projectData.projectName}</td>
																		<td>{projectData.people}</td>
																		<td>{projectData.createdDate}</td>
																		<td>{projectData.deadline}</td>
																	</tr>
																)
															})
														}
													</tbody>
												</table>
											</div>:<h1>No Project assigned</h1>}
										</div>


									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>


		)
	}
}
export default withRouter(ArchitectHomePage)

package com.taskmanagement.service;

import com.taskmanagement.dto.ProjectBean;
import com.taskmanagement.dto.Response;

public interface ProjectService {
	public Response createProject(ProjectBean bean) ;
	public Response updateProject(ProjectBean bean);
	public Response getProject(int projectId);
	
}

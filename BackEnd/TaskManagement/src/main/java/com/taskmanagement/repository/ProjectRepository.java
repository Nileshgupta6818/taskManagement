package com.taskmanagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.taskmanagement.dto.ProjectBean;
import com.taskmanagement.dto.ProjectPKBean;

public interface ProjectRepository extends JpaRepository<ProjectBean,ProjectPKBean>{
	
	  @Query("select c from ProjectBean c where c.projectPkBean=:pkbean")
	  boolean findUserById( ProjectPKBean pkbean);
	  
	  @Query("select c from ProjectBean c where c.projectPkBean.groupId=:projectId")
	  List<ProjectBean> getAll( int projectId);
	  
	 
}

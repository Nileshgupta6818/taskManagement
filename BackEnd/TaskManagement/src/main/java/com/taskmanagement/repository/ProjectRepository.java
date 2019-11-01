package com.taskmanagement.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.taskmanagement.dto.ProjectBean;
import com.taskmanagement.dto.ProjectPKBean;

public interface ProjectRepository extends JpaRepository<ProjectBean, ProjectPKBean> {

	@Query("select c from ProjectBean c where c.projectPkBean=:pkbean")
	Optional<ProjectBean> findUserById(ProjectPKBean pkbean);

	@Query("select c from ProjectBean c where c.projectPkBean.projectId=:projectId")
	List<ProjectBean> getAll(int projectId);

	@Query("select c from ProjectBean c where c.projectPkBean.projectId=:projectId")
	List<ProjectBean> getAllMembers(int projectId);

	@Query("select count(*) from ProjectBean c where c.projectPkBean.projectId=:projectId")
	int findProjectById(int projectId);

	@Query("select count(*) from ProjectBean c where c.projectPkBean.userBean.email=:email")
	int getProjectsByEmail(String email);

	@Query("select c from ProjectBean c where c.projectPkBean.userBean.email=:email")
	List<ProjectBean> getProjectsByEmaill(String email);

	@Query("select c from ProjectBean c where c.projectPkBean.projectId=:projectId and :pId= (select c.projectPkBean.projectId from  ProjectBean c where c.projectPkBean.userBean.employeeName=:name)")
	List<ProjectBean> searchMember(String name, int pId);

	@Query("select c from ProjectBean c where c.projectPkBean.userBean.email=:email and c.projectPkBean.projectId=:groupId ")
	Optional<ProjectBean> getProjectsByEmaill(String email, int groupId);

	@Modifying
	@Transactional
	@Query(value = "alter table project change project_id project_id INT(10) AUTO_INCREMENT", nativeQuery = true)
	int alterProjectId();


	@Modifying
	@Transactional
	@Query(value = "update assign_task set assigned_to=:newEmail , e_id=(select emp_id from user where email=:newEmail) where e_id=(select emp_id from user where email=:removeEmail) and           project_id=:groupId ",nativeQuery = true)
	int updateTask(int groupId, String newEmail, String removeEmail );
}

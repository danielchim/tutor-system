package com.com2202.assigment.services;

import com.com2202.assigment.dto.JobHistoryInput;
import com.com2202.assigment.dto.JobInput;
import com.com2202.assigment.dto.SkillInput;
import com.com2202.assigment.entity.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;
import java.util.Date;

@Service
public class JobService {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    private EmployerService employerService;
    private SkillsService skillsService;

    public JobService(EmployerService employerService, SkillsService skillsService) {
        this.employerService = employerService;
        this.skillsService = skillsService;
    }

    @Transactional
    public void createJob(JobInput jobInput) {
        // Get employer id and company id based on user id
        int userId = jobInput.getUser().getId();
        Employer employer = employerService.getEmployerByUserId(userId);
        int employerId = employer.getId();
        int companyId = employer.getCompany().getId();

        // Create the job
        Date now = new Date();
        Jobs job = new Jobs();
        job.setName(jobInput.getName());
        job.setCreated_at(now);
        job.setDescription(jobInput.getDescription());
        job.setEmployer(employer);
        job.setCompany(employer.getCompany());
        jdbcTemplate.update("INSERT INTO jobs (name, created_at, Employer_idEmployer, Company_idCompany, description) VALUES (?, ?, ?, ?, ?)",
                job.getName(), now, employerId, companyId, job.getDescription());
        int jobId = jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);

        // Create or get the skills and link them to the job
        for (SkillInput skillInput : jobInput.getSkills()) {
            Skills skill = null;
            if (skillInput.getIdSkills() != null) {
                // Skill already exists in database, get it
                skill = skillsService.getSkillsById(skillInput.getIdSkills());
            } else {
                // Skill does not exist in database, create it
                skill = new Skills();
                skill.setName(skillInput.getName());
                // skillsService.createSkills(skill);
                skill = skillsService.getSkillsByName(skillsService.createSkills(skill).getName());
                System.out.println(skill.getName());

            }
            // Link the skill to the job
            jdbcTemplate.update("INSERT INTO skills_jobs_link (skills_idskills, jobs_idjobs) VALUES (?, ?)", skill.getIdSkills(), jobId);
        }
    }

    @Transactional
    public void updateJob(int jobId, JobInput jobInput) {
        // Get employer id and company id based on user id
        int userId = jobInput.getUser().getId();
        Employer employer = employerService.getEmployerByUserId(userId);
        int employerId = employer.getId();
        int companyId = employer.getCompany().getId();

        // Update the job
        Jobs job = new Jobs();
        job.setIdjobs(jobId);
        job.setName(jobInput.getName());
        job.setCreated_at(getJobById(jobId).getCreated_at());
        job.setDescription(jobInput.getDescription());
        job.setEmployer(employer);
        job.setCompany(employer.getCompany());
        jdbcTemplate.update("UPDATE jobs SET name=?, Employer_idEmployer=?, Company_idCompany=?, description=? WHERE idjobs=?",
                job.getName(), employerId, companyId, job.getDescription(), job.getIdjobs());

        // Delete all existing links between skills and the job
        jdbcTemplate.update("DELETE FROM skills_jobs_link WHERE jobs_idjobs=?", jobId);

        // Create or get the skills and link them to the job
        for (SkillInput skillInput : jobInput.getSkills()) {
            Skills skill = null;
            if (skillInput.getIdSkills() != null) {
                // Skill already exists in database, get it
                skill = skillsService.getSkillsById(skillInput.getIdSkills());
            } else {
                // Skill does not exist in database, create it
                skill = new Skills();
                skill.setName(skillInput.getName());
                skill = skillsService.getSkillsByName(skillsService.createSkills(skill).getName());
            }
            // Link the skill to the job
            jdbcTemplate.update("INSERT INTO skills_jobs_link (skills_idskills, jobs_idjobs) VALUES (?, ?)", skill.getIdSkills(), jobId);
        }
    }



    public List<Jobs> getAllJobs() {
        String sql = "SELECT j.*, (SELECT GROUP_CONCAT(DISTINCT s.idskills, ',', s.name ORDER BY s.idskills) FROM skills_jobs_link sj JOIN skills s ON sj.skills_idskills = s.idskills WHERE sj.jobs_idjobs = j.idjobs) AS required_skills, u.name AS employer_name, c.idCompany AS company_id, c.name AS company_name FROM jobs j JOIN employer e ON j.Employer_idEmployer = e.idEmployer JOIN user u ON e.User_idUser = u.idUser JOIN company c ON j.Company_idCompany = c.idCompany GROUP BY j.idjobs;";
        return jdbcTemplate.query(sql, new JobRowMapper());
    }

    public Jobs getJobById(int jobId) {
        String sql = "SELECT j.*, (SELECT GROUP_CONCAT(DISTINCT s.idskills, ',', s.name ORDER BY s.idskills) FROM skills_jobs_link sj JOIN skills s ON sj.skills_idskills = s.idskills WHERE sj.jobs_idjobs = j.idjobs) AS required_skills, u.name AS employer_name, c.idCompany AS company_id, c.name AS company_name FROM jobs j JOIN employer e ON j.Employer_idEmployer = e.idEmployer JOIN user u ON e.User_idUser = u.idUser JOIN company c ON j.Company_idCompany = c.idCompany WHERE j.idjobs = ? GROUP BY j.idjobs;";
        return jdbcTemplate.queryForObject(sql, new Object[]{jobId}, new JobRowMapper());
    }

        public List<Jobs> getJobByName(String name) {
            String sql = "SELECT j.*, (SELECT GROUP_CONCAT(DISTINCT s.idskills, ',', s.name ORDER BY s.idskills) FROM skills_jobs_link sj JOIN skills s ON sj.skills_idskills = s.idskills WHERE sj.jobs_idjobs = j.idjobs) AS required_skills, u.name AS employer_name, c.idCompany AS company_id, c.name AS company_name FROM jobs j JOIN employer e ON j.Employer_idEmployer = e.idEmployer JOIN user u ON e.User_idUser = u.idUser JOIN company c ON j.Company_idCompany = c.idCompany WHERE j.name LIKE :name GROUP BY j.idjobs";
            SqlParameterSource namedParameters = new MapSqlParameterSource("name", "%" + name + "%");
            List<Jobs> jobs = namedParameterJdbcTemplate.query(sql, namedParameters, new JobRowMapper());
            if (jobs.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Jobs not found");
            }
            return jobs;
        }


    public List<JobHistory> getJobHistoryByUser(int userId) {
        String sql = "SELECT jh.*, j.name AS j_name, e.idEmployer AS e_idEmployer, e.Company_idCompany AS e_Company_idCompany, u.name AS e_name, c.name AS c_name, c.created_at AS c_created_at \n" +
                "FROM job_history jh \n" +
                "INNER JOIN jobs j ON jh.jobs_idjobs = j.idjobs \n" +
                "INNER JOIN employer e ON j.Employer_idEmployer = e.idEmployer \n" +
                "INNER JOIN company c ON j.Company_idCompany = c.idCompany \n" +
                "INNER JOIN user u ON e.User_idUser = u.idUser \n" +
                "WHERE jh.User_idUser = ?\n";
        return jdbcTemplate.query(sql, new Object[]{userId}, new JobHistoryRowMapper());
    }

    public List<User> getJobHistoryByJob(int jobId) {
        String sql = "SELECT jh.*, u.name AS u_name, u.email AS u_email FROM job_history jh INNER JOIN user u ON jh.User_idUser = u.idUser WHERE jh.jobs_idjobs = ?";
        return jdbcTemplate.query(sql, new Object[]{jobId}, new UserRowMapper());
    }


    public void deleteJob(int jobId) {
        jdbcTemplate.update("DELETE FROM jobs WHERE idjobs = ?", jobId);
    }

    public List<Jobs> getJobsByDateRange(Date startDate, Date endDate) {
        String sql = "SELECT j.*, (SELECT GROUP_CONCAT(DISTINCT s.idskills, ',', s.name ORDER BY s.idskills) FROM skills_jobs_link sj JOIN skills s ON sj.skills_idskills = s.idskills WHERE sj.jobs_idjobs = j.idjobs) AS required_skills, u.name AS employer_name, c.idCompany AS company_id, c.name AS company_name FROM jobs j JOIN employer e ON j.Employer_idEmployer = e.idEmployer JOIN user u ON e.User_idUser = u.idUser JOIN company c ON j.Company_idCompany = c.idCompany WHERE j.created_at BETWEEN ? AND ? GROUP BY j.idjobs";
        Object[] params = {startDate, endDate};
        List<Jobs> jobs = jdbcTemplate.query(sql, params, new JobRowMapper());
        if (jobs.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Jobs not found");
        }
        return jobs;
    }

    public boolean createJobHistory(int id, JobHistoryInput jobHistory) {
        // Get the current date
        Date now = new Date();

        // Insert a new row into the job_history table
        int rowsAffected = jdbcTemplate.update("INSERT INTO job_history (User_idUser, jobs_idjobs, apply_date) VALUES (?, ?, ?)",
                id, jobHistory.getUserId(), now);

        // Return true if one row was affected
        return rowsAffected == 1;
    }

    private static class JobRowMapper implements RowMapper<Jobs> {
        @Override
        public Jobs mapRow(ResultSet rs, int rowNum) throws SQLException {
            Jobs job = new Jobs();
            job.setIdjobs(rs.getInt("idjobs"));
            job.setName(rs.getString("name"));
            job.setCreated_at(rs.getDate("created_at"));

            User user = new User();
            user.setName(rs.getString("employer_name"));

            // create new employer object and set it on the job
            Employer employer = new Employer();
            employer.setId(rs.getInt("employer_idEmployer"));
            employer.setUser(user);
            job.setEmployer(employer);

            // create new company object and set it on the job
            Company company = new Company();
            company.setId(rs.getInt("company_id"));
            company.setName(rs.getString("company_name"));
            job.setCompany(company);

            job.setDescription(rs.getString("description"));

            // create list of skills and add each skill to it
            if(rs.getString("required_skills") != null){
                List<Skills> skillsList = new ArrayList<>();
                String[] skillValues = rs.getString("required_skills").split(",");
                for (int i = 0; i < skillValues.length; i+=2) {
                    Skills skill = new Skills();
                    skill.setIdSkills(Integer.parseInt(skillValues[i]));
                    skill.setName(skillValues[i+1]);
                    skillsList.add(skill);
                }
                job.setSkills(skillsList);
            }
            return job;
        }
    }

    private static class JobHistoryRowMapper implements RowMapper<JobHistory> {
        @Override
        public JobHistory mapRow(ResultSet rs, int rowNum) throws SQLException {
            JobHistory jobHistory = new JobHistory();
            jobHistory.setId(rs.getInt("idjob_history"));
            jobHistory.setApplyDate(rs.getDate("apply_date").toLocalDate());

            Employer employer = new Employer();
            User user = new User();
            user.setId(rs.getInt("User_idUser"));
            user.setName(rs.getString("e_name"));
            employer.setUser(user);

            Company company = new Company();
            company.setId(rs.getInt("e_Company_idCompany"));
            company.setName(rs.getString("c_name"));

            Jobs job = new Jobs();
            job.setIdjobs(rs.getInt("jobs_idjobs"));
            job.setCompany(company);
            job.setName(rs.getString("j_name"));
            job.setEmployer(employer);
            jobHistory.setJob(job);

            return jobHistory;
        }
    }
    public static class UserRowMapper implements RowMapper<User> {
        @Override
        public User mapRow(ResultSet rs, int rowNum) throws SQLException {
            User user = new User();
            user.setId(rs.getInt("User_idUser"));
            user.setName(rs.getString("u_name"));
            user.setEmail(rs.getString("u_email"));

            return user;
        }
    }
}



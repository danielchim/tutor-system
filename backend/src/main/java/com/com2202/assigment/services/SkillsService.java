package com.com2202.assigment.services;

import com.com2202.assigment.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Service
public class SkillsService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Skills> getAllSkills() {
        String sql = "SELECT * FROM skills";
        return jdbcTemplate.query(sql, new SkillsRowMapper());
    }

    public Skills getSkillsById(int id) {
        String sql = "SELECT * FROM skills WHERE idskills = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, new SkillsRowMapper());
    }

    public Skills getSkillsByName(String name) {
        String sql = "SELECT * FROM skills WHERE name = ?";
        Skills skills = null;
        try {
            skills = jdbcTemplate.queryForObject(sql, new Object[]{name}, new SkillsRowMapper());
        } catch (EmptyResultDataAccessException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Skills not found");
        }
        return skills;
    }

    public Skills createSkills(Skills skills) {
        String sql = "INSERT INTO skills (name) VALUES (?)";
        jdbcTemplate.update(sql, skills.getName());
        return skills;
    }

    public Skills updateSkills(int id, Skills skills) {
        String sql = "UPDATE skills SET name = ? WHERE idskills = ?";
        jdbcTemplate.update(sql, skills.getName(), id);
        return skills;
    }

    public void deleteSkills(int id) {
        String sql = "DELETE FROM skills WHERE idskills = ?";
        jdbcTemplate.update(sql, id);
    }

    public int countJobsBySkill(int skillId) {
        String sql = "SELECT COUNT(*) FROM jobs j JOIN skills_jobs_link sj ON j.idjobs = sj.jobs_idjobs WHERE sj.skills_idskills = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{skillId}, Integer.class);
    }

    public List<Jobs> getJobsBySkills(int skillId) {
        String sql = "SELECT j.*, c.name AS c_name, u.name AS e_name " +
                "FROM jobs j " +
                "INNER JOIN skills_jobs_link sj ON j.idjobs = sj.jobs_idjobs " +
                "INNER JOIN employer e ON j.Employer_idEmployer = e.idEmployer " +
                "INNER JOIN company c ON j.Company_idCompany = c.idCompany " +
                "INNER JOIN user u ON e.User_idUser = u.idUser " +
                "WHERE sj.skills_idskills = ?";
        return jdbcTemplate.query(sql, new Object[]{skillId}, new JobRowMapper());
    }

    private static class SkillsRowMapper implements RowMapper<Skills> {
        @Override
        public Skills mapRow(ResultSet rs, int rowNum) throws SQLException {
            Skills skills = new Skills();
            skills.setIdSkills(rs.getInt("idskills"));
            skills.setName(rs.getString("name"));
            return skills;
        }
    }

    private static class JobRowMapper implements RowMapper<Jobs> {
        @Override
        public Jobs mapRow(ResultSet rs, int rowNum) throws SQLException {
            Jobs job = new Jobs();
            job.setIdjobs(rs.getInt("idjobs"));
            job.setName(rs.getString("name"));
            job.setCreated_at(rs.getDate("created_at"));
            job.setDescription(rs.getString("description"));

            Employer employer = new Employer();
            employer.setId(rs.getInt("Employer_idEmployer"));

            Company company = new Company();
            company.setId(rs.getInt("Company_idCompany"));
            company.setName(rs.getString("c_name"));
            company.setCreatedAt(rs.getDate("created_at"));

            User user = new User();
            user.setName(rs.getString("e_name"));

            employer.setUser(user);
            job.setEmployer(employer);
            job.setCompany(company);

            return job;
        }
    }
}

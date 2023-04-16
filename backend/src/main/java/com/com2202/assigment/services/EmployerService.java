package com.com2202.assigment.services;

import com.com2202.assigment.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Service
public class EmployerService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Employer> getAllEmployers() {
        String sql = "SELECT e.*, c.name AS c_name, u.name AS u_name FROM employer e "
                + "INNER JOIN company c ON e.Company_idCompany = c.idCompany "
                + "INNER JOIN user u ON e.User_idUser = u.idUser";
        return jdbcTemplate.query(sql, new EmployerRowMapper());
    }


    public Employer getEmployerById(int id) {
        String sql = "SELECT e.*, c.name AS c_name, u.name AS u_name "
                + "FROM employer e "
                + "JOIN company c ON e.Company_idCompany = c.idCompany "
                + "JOIN user u ON e.User_idUser = u.idUser "
                + "WHERE e.idEmployer = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, new EmployerRowMapper());
    }

    public Employer getEmployerByUserId(int id) {
        String sql = "SELECT e.*, c.name AS c_name, u.name AS u_name "
                + "FROM employer e "
                + "JOIN company c ON e.Company_idCompany = c.idCompany "
                + "JOIN user u ON e.User_idUser = u.idUser "
                + "WHERE u.idUser = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, new EmployerRowMapper());
    }

    public List<Jobs> getJobsByEmployerId(int id) {
        String sql = "SELECT e.*, c.name AS c_name, u.name AS u_name "
                + "FROM employer e "
                + "JOIN company c ON e.Company_idCompany = c.idCompany "
                + "JOIN user u ON e.User_idUser = u.idUser "
                + "WHERE u.idUser = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, new EmployerRowMapper());
    }

    // TODO: fix idEmployer to be set by database
    public boolean saveEmployer(Employer employer) {
        String sql = "INSERT INTO employer (idEmployer, Company_idCompany, User_idUser) VALUES (?, ?, ?)";
        int result = jdbcTemplate.update(sql, employer.getId(), employer.getCompany().getId(), employer.getUser().getId());
        return result == 1;
    }

    public boolean updateEmployer(Employer employer) {
        String sql = "UPDATE employer SET Company_idCompany = ?, User_idUser = ? WHERE idEmployer = ?";
        int result = jdbcTemplate.update(sql, employer.getCompany().getId(), employer.getUser().getId(), employer.getId());
        return result == 1;
    }

    public boolean deleteEmployerById(int id) {
        String sql = "DELETE FROM employer WHERE idEmployer = ?";
        int result = jdbcTemplate.update(sql, id);
        return result == 1;
    }

    static class EmployerRowMapper implements RowMapper<Employer> {
        @Override
        public Employer mapRow(ResultSet rs, int rowNum) throws SQLException {
            Employer employer = new Employer();
            employer.setId(rs.getInt("idEmployer"));

            User user = new User();
            user.setId(rs.getInt("User_idUser"));
            user.setName(rs.getString("u_name"));
            employer.setUser(user);

            Company company = new Company();
            company.setId(rs.getInt("Company_idCompany"));
            company.setName(rs.getString("c_name"));
            employer.setCompany(company);

            return employer;
        }
    }
}


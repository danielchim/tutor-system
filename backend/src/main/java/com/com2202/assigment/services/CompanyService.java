package com.com2202.assigment.services;

import com.com2202.assigment.dto.CompanyInput;
import com.com2202.assigment.entity.Company;
import com.com2202.assigment.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;

import static com.com2202.assigment.util.UidGenerator.generateUid;

@Service
public class CompanyService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Company> getAllCompanies() {
        String sql = "SELECT c.*, u.* FROM company c JOIN user u ON c.owner_id = u.idUser";
        List<Company> companies = jdbcTemplate.query(sql, new CompanyRowMapper());
        if (companies.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No companies found");
        }
        return companies;
    }

    public boolean createCompany(CompanyInput companyInput) {
        String sql = "INSERT INTO company (name, status, created_at, owner_id) VALUES (?, ?, ?, ?)";
        int result = jdbcTemplate.update(sql, companyInput.getName(), companyInput.getStatus(), new Date(), companyInput.getOwner().getId());
        return result == 1;
    }


    public boolean updateCompany(int id, CompanyInput company) {
        String sql = "UPDATE company SET name = ?, status = ?, owner_id = ? WHERE idCompany = ?";
        int rowsUpdated = jdbcTemplate.update(sql, company.getName(), company.getStatus(), company.getOwner().getId(), id);
        if (rowsUpdated == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Company not found");
        }else {
            return true;
        }
    }

    public Company getCompanyById(int companyId) {
        String sql = "SELECT c.*, u.* FROM company c JOIN user u ON c.owner_id = u.idUser WHERE c.idCompany = ?";
        List<Company> companies = jdbcTemplate.query(sql, new Object[]{companyId}, new CompanyRowMapper());
        if (companies.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Company not found");
        }
        return companies.get(0);
    }

    public boolean deleteCompany(int companyId) {
        int rowsDeleted = jdbcTemplate.update("DELETE FROM company WHERE idCompany = ?", companyId);
        if (rowsDeleted == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Company not found");
        }
        return true;
    }


    private static class CompanyRowMapper implements RowMapper<Company> {
        @Override
        public Company mapRow(ResultSet rs, int rowNum) throws SQLException {
            Company company = new Company();
            company.setId(rs.getInt("idCompany"));
            company.setName(rs.getString("c.name"));
            company.setStatus(rs.getBoolean("status"));
            company.setCreatedAt(rs.getDate("c.created_at"));

            User owner = new User();
            owner.setId(rs.getInt("owner_id"));
            owner.setName(rs.getString("u.name"));

            company.setOwner(owner);

            return company;
        }
    }


}

package com.com2202.assigment.services;

import com.com2202.assigment.entity.Date;
import com.com2202.assigment.entity.Role;
import com.com2202.assigment.entity.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;

import static com.com2202.assigment.util.UidGenerator.generateUid;

@Service
public class DateService {

    private final JdbcTemplate jdbcTemplate;

    public DateService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Date> getAllDates() {
        String sql = "SELECT * FROM system_date";
        return jdbcTemplate.query(sql, new DateMapper());
    }

    public boolean updateSystemDate(Date systemDate) {
        String sql = "UPDATE system_date SET startdate = ?, endate = ? WHERE id = 1";
        int result = jdbcTemplate.update(sql, systemDate.getStartDate(), systemDate.getEndDate());
        return result == 1;
    }

    private static class DateMapper implements RowMapper<Date> {
        @Override
        public Date mapRow(ResultSet rs, int rowNum) throws SQLException {
            Date date = new Date();
            date.setId(rs.getInt("id"));
            date.setStartDate(rs.getDate("startdate").toLocalDate());
            date.setEndDate(rs.getDate("endate").toLocalDate());
            return date;
        }
    }
}



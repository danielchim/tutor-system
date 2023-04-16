package com.com2202.assigment.services;

import com.com2202.assigment.entity.SystemDate;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Service
public class DateService {

    private final JdbcTemplate jdbcTemplate;

    public DateService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<SystemDate> getAllDates() {
        String sql = "SELECT * FROM system_date";
        return jdbcTemplate.query(sql, new DateMapper());
    }

    public boolean updateSystemDate(SystemDate systemDate) {
        String sql = "UPDATE system_date SET startdate = ?, endate = ? WHERE id = 1";
        int result = jdbcTemplate.update(sql, systemDate.getStartDate(), systemDate.getEndDate());
        return result == 1;
    }

    private static class DateMapper implements RowMapper<SystemDate> {
        @Override
        public SystemDate mapRow(ResultSet rs, int rowNum) throws SQLException {
            SystemDate date = new SystemDate();
            date.setId(rs.getInt("id"));
            date.setStartDate(rs.getDate("startdate").toLocalDate());
            date.setEndDate(rs.getDate("endate").toLocalDate());
            return date;
        }
    }
}



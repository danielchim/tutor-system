package com.com2202.assigment.services;

import com.com2202.assigment.dto.InterviewInput;
import com.com2202.assigment.entity.Employer;
import com.com2202.assigment.entity.Interview;
import com.com2202.assigment.entity.Jobs;
import com.com2202.assigment.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class InterviewService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Interview createInterview(InterviewInput input) {
        LocalDateTime dateTime = LocalDateTime.now().withHour(10).withMinute(30).plusDays(1); // Set to tomorrow

        try {
            int userId = input.getUser().getId();
            int jobId = input.getJob().getIdjobs();
            int employerId = input.getEmployer().getId();

            // Find the first available interview time
            while (!isEmployerAvailable(employerId, dateTime) || !isUserAvailable(userId, dateTime) || !isValidInterviewTime(dateTime)) {
                dateTime = dateTime.plusDays(1).withHour(10).withMinute(30);

                if (dateTime.getHour() >= 17) {
                    dateTime = dateTime.plusDays(1).withHour(10).withMinute(30);
                }
            }

            // Schedule interview
            String sql = "INSERT INTO interview (date, User_idUser, jobs_idjobs, Employer_idEmployer) VALUES (?, ?, ?, ?)";
            KeyHolder keyHolder = new GeneratedKeyHolder();
            LocalDateTime finalDateTime = dateTime;
            int result = jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
                ps.setTimestamp(1, Timestamp.valueOf(finalDateTime));
                ps.setInt(2, userId);
                ps.setInt(3, jobId);
                ps.setInt(4, employerId);
                return ps;
            }, keyHolder);

            if (result == 1) {
                int interviewId = keyHolder.getKey().intValue();
                return getInterviewById(interviewId);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    private boolean isEmployerAvailable(int employerId, LocalDateTime dateTime) throws SQLException {
        // Check if employer is available for a 1.5 hour slot starting at the given time
        String query = "SELECT * FROM interview WHERE Employer_idEmployer = ? AND date >= ? AND date < ?";
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(query, employerId, Timestamp.valueOf(dateTime), Timestamp.valueOf(dateTime.plusMinutes(90)));
        return rows.isEmpty();
    }

    private boolean isUserAvailable(int userId, LocalDateTime dateTime) throws SQLException {
        // Check if user is available for a 1.5 hour slot starting at the given time
        String query = "SELECT * FROM interview WHERE User_idUser = ? AND date >= ? AND date < ?";
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(query, userId, Timestamp.valueOf(dateTime), Timestamp.valueOf(dateTime.plusMinutes(90)));
        return rows.isEmpty();
    }


    private boolean isValidInterviewTime(LocalDateTime dateTime) {
        // Check if the interview time is valid
        return dateTime.getDayOfWeek().getValue() >= 1 && dateTime.getDayOfWeek().getValue() <= 5 &&
                ((dateTime.getHour() >= 10 && dateTime.getHour() < 12) || (dateTime.getHour() >= 13 && dateTime.getHour() < 17));
    }


    public Interview updateInterview(int interviewId, InterviewInput input) {
        LocalDateTime newDateTime = input.getDate();
        if (!isValidInterviewTime(newDateTime)) {
            throw new IllegalArgumentException("Invalid interview time");
        }

        String sql = "UPDATE interview SET date=?, User_idUser=?, jobs_idjobs=?, Employer_idEmployer=? WHERE idInterview=?";
        int result = jdbcTemplate.update(sql, Timestamp.valueOf(newDateTime), input.getUser().getId(), input.getJob().getIdjobs(), input.getEmployer().getId(), interviewId);

        if (result == 1) {
            Interview updatedInterview = getInterviewById(interviewId);
            return updatedInterview;
        } else {
            return null;
        }
    }



    public List<Interview> getAllInterviews() {
        String sql = "SELECT i.*, j.name AS job_name, u.name AS employer_name FROM interview i " +
                "JOIN jobs j ON i.jobs_idjobs = j.idjobs " +
                "JOIN employer e ON i.Employer_idEmployer = e.idEmployer " +
                "JOIN user u ON e.User_idUser = u.idUser";
        List<Interview> interviews = jdbcTemplate.query(sql, new InterviewRowMapper());
        if (interviews.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No interviews found");
        }
        return interviews;
    }



    public Interview getInterviewById(int interviewId) {
        String sql = "SELECT i.*, j.name AS job_name, u.name AS employer_name FROM interview i \n" +
                "JOIN jobs j ON i.jobs_idjobs = j.idjobs \n" +
                "JOIN employer e ON i.Employer_idEmployer = e.idEmployer \n" +
                "JOIN user u ON e.User_idUser = u.idUser \n" +
                "WHERE i.idInterview=?\n";
        Interview interview = null;
        try {
            interview = jdbcTemplate.queryForObject(sql, new Object[]{interviewId}, new InterviewRowMapper());
        } catch (EmptyResultDataAccessException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Interview not found");
        }
        return interview;
    }

    public boolean deleteInterview(int interviewId) {
        String sql = "DELETE FROM interview WHERE idInterview=?";
        int result = jdbcTemplate.update(sql, interviewId);
        return result == 1;
    }

    private static class InterviewRowMapper implements RowMapper<Interview> {
        @Override
        public Interview mapRow(ResultSet rs, int rowNum) throws SQLException {
            Interview interview = new Interview();
            interview.setId(rs.getInt("idInterview"));
            interview.setDate(rs.getTimestamp("date"));

            User user = new User();
            user.setId(rs.getInt("User_idUser"));
            user.setName(rs.getString("employer_name"));
            interview.setUser(user);

            Jobs job = new Jobs();
            job.setIdjobs(rs.getInt("jobs_idjobs"));
            job.setName(rs.getString("job_name"));
            interview.setJob(job);

            Employer employer = new Employer();
            employer.setId(rs.getInt("Employer_idEmployer"));
            interview.setEmployer(employer);

            return interview;
        }
    }

}

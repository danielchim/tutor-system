package com.com2202.assigment.services;

import com.com2202.assigment.dto.AuthInput;
import com.com2202.assigment.entity.Role;
import com.com2202.assigment.entity.User;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;

@Service
public class UserService {

    private final JdbcTemplate jdbcTemplate;

    public UserService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<User> getAllUsers() {
        String sql = "SELECT u.*, r.name AS r_name FROM user u INNER JOIN role r ON u.Role_idRole = r.idRole";
        return jdbcTemplate.query(sql, new UserRowMapper());
    }

    public User getUserById(int id) {
        String sql = "SELECT u.*, r.name AS r_name FROM user u INNER JOIN role r ON u.Role_idRole = r.idRole WHERE u.idUser = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, new UserRowMapper());
    }

    public boolean addUser(User user) {
        String sql = "INSERT INTO user (name, email, password, created_at, Role_idRole) VALUES (?, ?, ?, ?, ?)";
        int result = jdbcTemplate.update(sql, user.getName(), user.getEmail(), user.getPassword(), Date.valueOf(LocalDate.now()), user.getRole().getId());
        return result == 1;
    }

    public boolean updateUser(User user) {
        String sql = "UPDATE user SET name = ?, email = ?, password = ?, Role_idRole = ? WHERE idUser = ?";
        System.out.println(user.getRole().getId());
        int result = jdbcTemplate.update(sql, user.getName(), user.getEmail(), user.getPassword(), user.getRole() == null ? null :user.getRole().getId(), user.getId());
        return result == 1;
    }

    public void deleteUser(int id) {
        String sql = "DELETE FROM user WHERE idUser = ?";
        jdbcTemplate.update(sql, id);
    }

    public User auth(AuthInput input) {
        String sql = "SELECT u.*, r.name AS r_name FROM user u INNER JOIN role r ON u.Role_idRole = r.idRole WHERE email = ? AND password = ?";
        try {
            return jdbcTemplate.queryForObject(sql, new Object[]{input.getEmail(),input.getPassword()}, new UserRowMapper());
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }


    static class UserRowMapper implements RowMapper<User> {
        @Override
        public User mapRow(ResultSet rs, int rowNum) throws SQLException {
            User user = new User();
            user.setId(rs.getInt("idUser"));
            user.setName(rs.getString("name"));
            user.setEmail(rs.getString("email"));
            user.setPassword(rs.getString("password"));
            user.setCreatedAt(rs.getDate("created_at"));

            Role role = new Role();
            role.setId(rs.getInt("Role_idRole"));
            role.setName(rs.getString("r_name"));
            user.setRole(role);

            return user;
        }
    }
}



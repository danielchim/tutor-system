package com.com2202.assigment.services;

import com.com2202.assigment.entity.Role;
import com.com2202.assigment.entity.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import static com.com2202.assigment.util.UidGenerator.generateUid;

@Service
public class RoleService {

    private final JdbcTemplate jdbcTemplate;

    public RoleService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Role> getAllRoles() {
        String sql = "SELECT * FROM role";
        return jdbcTemplate.query(sql, new RoleMapper());
    }

    public Role getRoleById(int id) {
        String sql = "SELECT * FROM role WHERE idRole = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, new RoleMapper());
    }

    public boolean saveRole(Role role) {
        String sql = "INSERT INTO role (idRole, name) VALUES (?, ?)";
        int result = jdbcTemplate.update(sql, generateUid(), role.getName());
        return result == 1;
    }


    public boolean updateRole(Role role) {
        String sql = "UPDATE role SET name = ? WHERE idRole = ?";
        int result = jdbcTemplate.update(sql, role.getName(), role.getId());
        return result == 1;
    }

    public boolean deleteRoleById(int id) {
        String sql = "DELETE FROM role WHERE idRole = ?";
        int result = jdbcTemplate.update(sql, id);
        return result == 1;
    }

    public boolean existsRoleById(int id) {
        String sql = "SELECT COUNT(*) FROM role WHERE idRole = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, Integer.class) > 0;
    }

    public List<Role> findRolesByName(String name) {
        String sql = "SELECT * FROM role WHERE name = ?";
        return jdbcTemplate.query(sql, new Object[]{name}, new RoleMapper());
    }
    public List<User> getUserByRoleId(int id) {
        String sql = "SELECT u.*, r.name AS r_name FROM user u INNER JOIN role r ON u.Role_idRole = r.idRole WHERE Role_idRole = ?";
        return jdbcTemplate.query(sql, new Object[]{id}, new UserService.UserRowMapper());
    }


    private static class RoleMapper implements RowMapper<Role> {
        @Override
        public Role mapRow(ResultSet rs, int rowNum) throws SQLException {
            Role role = new Role();
            role.setId(rs.getInt("idRole"));
            role.setName(rs.getString("name"));
            return role;
        }
    }
}



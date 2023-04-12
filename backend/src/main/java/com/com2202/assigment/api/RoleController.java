package com.com2202.assigment.api;

import com.com2202.assigment.entity.Role;
import com.com2202.assigment.entity.User;
import com.com2202.assigment.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping("/")
    public List<Role> getAllRoles() {
        return roleService.getAllRoles();
    }

    @GetMapping("/{id}")
    public Role getRoleById(@PathVariable int id) {
        return roleService.getRoleById(id);
    }

    @GetMapping("/{id}/users")
    public List<User> getUserByRoleId(@PathVariable int id) {
        return roleService.getUserByRoleId(id);
    }

    @PostMapping("/")
    public boolean createRole(@RequestBody Role role) {
        return roleService.saveRole(role);
    }

    @PostMapping("/update/{id}")
    public boolean updateRole(@PathVariable int id, @RequestBody Role role) {
        Role existingRole = roleService.getRoleById(id);
        if (existingRole == null) {
            return false;
        }
        existingRole.setName(role.getName());
        return roleService.updateRole(existingRole);
    }

    @PostMapping("/delete/{id}")
    public void deleteRoleById(@PathVariable int id) {
        roleService.deleteRoleById(id);
    }

    // other API endpoint methods

}


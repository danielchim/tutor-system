package com.com2202.assigment.api;

import com.com2202.assigment.entity.Jobs;
import com.com2202.assigment.entity.Skills;
import com.com2202.assigment.services.SkillsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.* ;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/skills")

public class SkillsController {

    @Autowired
    private SkillsService skillsService;

    @GetMapping("/")
    public List<Skills> getAllSkills() {
        return skillsService.getAllSkills();
    }

    @GetMapping("/{id}")
    public Skills getSkillsById(@PathVariable int id) {
        return skillsService.getSkillsById(id);
    }
    @GetMapping("/search")
    public Skills getSkillsByName(@RequestParam(name = "name") String name) {
        String decodedName = null;
        decodedName = URLDecoder.decode(name, StandardCharsets.UTF_8);
        // Your logic to retrieve skills by name
        return skillsService.getSkillsByName(decodedName);
    }

    @GetMapping("/{id}/count")
    public int countJobsBySkill(@PathVariable int id) {
        return skillsService.countJobsBySkill(id);
    }

    @GetMapping("/{id}/jobs")
    public List<Jobs> getJobsBySkills(@PathVariable int id) {
        return skillsService.getJobsBySkills(id);
    }

    @PostMapping("/")
    public Skills createSkills(@RequestBody Skills skills) {
        return skillsService.createSkills(skills);
    }

    @PostMapping("/{id}/update")
    public Skills updateSkills(@PathVariable int id, @RequestBody Skills skills) {
        return skillsService.updateSkills(id, skills);
    }

    @PostMapping("/{id}/delete")
    public void deleteSkills(@PathVariable int id) {
        skillsService.deleteSkills(id);
    }
}


package com.jobportal.service;

import com.jobportal.entity.Application;
import com.jobportal.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    public Application applyJob(Application application) {
        return applicationRepository.save(application);
    }

    public List<Application> getUserApplications(Long userId) {
        return applicationRepository.findByUserId(userId);
    }
}
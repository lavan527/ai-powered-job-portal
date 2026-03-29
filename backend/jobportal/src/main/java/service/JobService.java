package com.jobportal.service;

import com.jobportal.entity.Job;
import com.jobportal.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    // Save job
    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    // Get all jobs
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    // Get job by id
    public Job getJobById(Long id) {
        return jobRepository.findById(id).orElse(null);
    }

    // Delete job
    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }
}
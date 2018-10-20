package com.qa.cv.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.qa.cv.models.Delegate;

public interface DelegateRepository extends MongoRepository<Delegate, String> {


    

}

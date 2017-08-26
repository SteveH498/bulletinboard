package com.sorj.bulletinboard.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.sorj.bulletinboard.model.Bulletin;

public interface BulletinRepository extends CrudRepository<Bulletin, Long> {

	Optional<Bulletin> findById(Long id);

}

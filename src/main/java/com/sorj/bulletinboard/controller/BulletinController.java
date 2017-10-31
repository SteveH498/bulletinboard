package com.sorj.bulletinboard.controller;

import java.net.URI;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import com.sorj.bulletinboard.model.Bulletin;
import com.sorj.bulletinboard.repository.BulletinRepository;

@RestController
@RequestMapping(path = "/bulletinboard/api/v1")
public class BulletinController {

	@Autowired
	BulletinRepository bulletinRepository;

	private Optional<String> getAuthentictedUserName() {
		return Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication()).map( a -> a.getName() );
	}

	@RequestMapping(path = "/check", method = RequestMethod.GET)
	public String healthCheck() {
		return "Hello " + getAuthentictedUserName().orElse("Anonymous") + "! Service is up and running! ";
	}

	// Read all Bulletins
	@RequestMapping(method = RequestMethod.GET, path = "/bulletins")
	ResponseEntity<Iterable<Bulletin>> getBulletins() {
		return ResponseEntity.ok(this.bulletinRepository.findAll());
	}

	// Create a bulletin
	@RequestMapping(method = RequestMethod.POST, path = "/bulletin")
	ResponseEntity<Bulletin> addBulletin(@RequestBody Bulletin bulletin) {

		Bulletin newBulletin = new Bulletin(bulletin.getMessage(), getAuthentictedUserName().orElse("Anonymous"));

		Bulletin savedBulletin = bulletinRepository.save(newBulletin);

		URI uri = MvcUriComponentsBuilder.fromController(getClass()).path("/{id}").buildAndExpand(savedBulletin.getId())
				.toUri();
		return ResponseEntity.created(uri).body(savedBulletin);
	}

	// Delete a bulletin
	@RequestMapping(value = "/bulletin/{id}", method = RequestMethod.DELETE)
	ResponseEntity<?> delete(@PathVariable Long id) {

		return this.bulletinRepository.findById(id).map(b -> {
			bulletinRepository.delete(b.getId());
			return ResponseEntity.noContent().build();
		}).orElseThrow(() -> new RuntimeException("Bulletin not found"));
	}

}

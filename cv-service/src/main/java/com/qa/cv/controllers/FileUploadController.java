package com.qa.cv.controllers;

import static org.springframework.data.mongodb.core.query.Query.query;
import static org.springframework.data.mongodb.gridfs.GridFsCriteria.whereMetaData;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.bson.BsonObjectId;
import org.bson.BsonValue;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mongodb.client.MongoCursor;
import com.mongodb.client.gridfs.GridFSFindIterable;
import com.mongodb.client.gridfs.model.GridFSFile;
import com.qa.cv.models.Delegate;

@RestController
@CrossOrigin
public class FileUploadController {

	@Autowired
	private GridFsOperations gridFsOperations;

	@GetMapping("/getAll")
	public List<String> getAll() {

		GridFSFindIterable fileList = gridFsOperations
				.find(Query.query(whereMetaData("_class").is("com.qa.cv.models.Delegate")));

		MongoCursor<GridFSFile> docsCursor = fileList.iterator();

		List<String> aList = new ArrayList<>();

		String fileName = "";

		while (docsCursor.hasNext()) {

			GridFSFile dump = docsCursor.next();

			fileName = dump.getFilename();
			
			
			aList.add(fileName);

		}

		return aList;
	}
	
	

	@GetMapping("/getAllMeta")
	public List<String> getAllMeta() {

		GridFSFindIterable fileList = gridFsOperations
				.find(Query.query(whereMetaData("_class").is("com.qa.cv.models.Delegate")));

		MongoCursor<GridFSFile> docsCursor = fileList.iterator();
		
		ArrayList<String> returnList = new ArrayList<>();

		while (docsCursor.hasNext()) {

			GridFSFile dump = docsCursor.next();

			org.bson.Document metadata = dump.getMetadata();
			
			BsonValue dumpID = dump.getId();
			
			BsonObjectId dumpObjectID = dumpID.asObjectId();
			
			ObjectId dumpObjectIDAsString = dumpObjectID.getValue();
			
		returnList.add(	(String) metadata.get("firstName"));
			
			returnList.add((String)metadata.get("lastName"));
			
			returnList.add(dumpObjectIDAsString.toString());

		}

		return returnList;
	}

	@GetMapping("/{arg1}")
	public ResponseEntity<GridFsResource> serveFileByLastBespoke(@PathVariable String arg1) throws Exception {

		GridFsResource file = gridFsOperations.getResource(arg1);

		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + arg1 + "\"")
				.body(file);
	}


	@PostMapping("/{firstName}/{lastName}")
	public void handleFileUpload(@RequestParam("file") MultipartFile file, @PathVariable String firstName,
			@PathVariable String lastName) throws IOException {

		try (InputStream is = file.getInputStream()) {

			Delegate customerMetaData = new Delegate(firstName, lastName);
			gridFsOperations.store(is, firstName + lastName + "CV.docx", customerMetaData);

		}

	}

	@DeleteMapping("/{firstName}/{lastName}")
	public void deleteFile(@PathVariable String lastName, @PathVariable String firstName) {
		
		gridFsOperations.delete(
				query(whereMetaData("lastName").is(lastName)).addCriteria(whereMetaData("firstName").is(firstName)));

	}

}

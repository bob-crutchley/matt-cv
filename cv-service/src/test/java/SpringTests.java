package test;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.qa.cv.Application;
import com.qa.cv.controllers.FileUploadController;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)

public class SpringTests {

	@Autowired
	FileUploadController fuc;

	@Test
	public void metaTest() {

		assertEquals("[Matthew, Hunt, 5bbb70baa7b11b000132bc14, Matthew, hghghg, 5bbb79b3a7b11b000132bc16, Clive, Smith, 5bc6f3bfa7b11b000132bc18]",
				fuc.getAllMeta().toString());

		System.out.println(fuc.getAllMeta());

	}
	
	@Test
	public void allTest() {

		assertEquals("[MatthewHuntCV.docx, MatthewhghghgCV.docx, CliveSmithCV.docx]",
				fuc.getAll().toString());

		System.out.println(fuc.getAll());

	}

}

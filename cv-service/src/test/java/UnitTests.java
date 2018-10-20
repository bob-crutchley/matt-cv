package test;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.qa.cv.controllers.FileUploadController;
import com.qa.cv.models.Delegate;

public class UnitTests {

	Delegate del = null;

	@Before
	public void setup() {

		del = new Delegate();
	}

	@Test
	public void simpleDelTest() {

		assertEquals("This should be the formatted String for the Delegate Class", del.toString());

	}

}

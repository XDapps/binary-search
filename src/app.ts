
import { BinarySearch } from './models/BinarySearch';
import { SQLite3 } from './models/SQLite3';

//******* Binary Search with Text File Input Space Delimited********/
const inputFilePathSpace = 'src/files/inputSpace.txt';
const outputFilePathSpace = 'src/files/outputSpace.txt';
const delimiterSpace = ' '; // Delimiter used to separate numbers in the file, " ", "," etc...
const targetNumberSpace = 22; // The number you are going to search (key)
const searcherSpaceDelimiter = new BinarySearch(targetNumberSpace, inputFilePathSpace, outputFilePathSpace, delimiterSpace);
searcherSpaceDelimiter.search();

//******* Binary Search with Text File Input Comma Delimited ********/
const inputFilePathComma = 'src/files/inputComma.txt';
const outputFilePathComma = 'src/files/outputComma.txt';
const targetNumberComma = 7; // The number you are going to search (key)
const delimiterComma = ','; // Delimiter used to separate numbers in the file, " ", "," etc...
const searcherCommaDelimiter = new BinarySearch(targetNumberComma, inputFilePathComma, outputFilePathComma, delimiterComma);
searcherCommaDelimiter.search();

//****** Connect to the Database and Query Previous Searches ********/
const db = new SQLite3();
const searchId = 1;
const searchedValue = 22;
const searchResult = 7;
const limitRecords = 5;

const searchRecordsById = db.querySearchRecordsById(searchId);
const searchRecordsByResult = db.querySearchRecordsByResult(searchResult, limitRecords);
const searchRecordsBySearchedValue = db.querySearchRecordsBySearchedValue(searchedValue, limitRecords);
const searchRecentRecords = db.querySearchRecordsByMostRecent(limitRecords);

searchRecordsById.then((result) => {
	console.log('searchRecordsById', result);
});

searchRecordsByResult.then((result) => {
	console.log('searchRecordsByResult', result);
});

searchRecordsBySearchedValue.then((result) => {
	console.log('searchRecordsBySearchedValue', result);
});

searchRecentRecords.then((result) => {
	console.log('searchRecentRecords', result);
});


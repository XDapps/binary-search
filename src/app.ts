
import { BinarySearch } from './models/BinarySearch';
import { SQLite3 } from './models/SQLite3';

//******* Binary Search with Text File Input Space Delimited********/
const inputFilePath = 'src/files/input.txt';
const outputFilePath = 'src/files/output.txt';
const delimiter = ' '; // Delimiter used to separate numbers in the file, " ", "," etc...
const targetNumber = 22; // The number you are going to search (key)
const searcher = new BinarySearch(targetNumber, inputFilePath, outputFilePath, delimiter);
searcher.search();

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


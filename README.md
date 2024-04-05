# Simple Binary Search

This is a simple binary search implementation with a SQLite3 database to store and query the results.

## Project Requirements

There is a requirements.js file that was provided to me outlining the requirements. This is the only information I was given for the task.

## Installation

```js
npm install
or
yarn 
```

## Run Locally

```js
npm run dev
```

## Run Production

```js
npm run build
npm start
```

### How To Use

1. Create a text file in the files folder.
2. Add an array of sorted values to the text file with a delimiter.

Example usage for comma delimiter.
Text file data...

```js
1,3,5,8,11,15,23,25
```

```js
import { BinarySearch } from './models/BinarySearch';

const inputFilePath = 'src/files/input.txt'; // Path of the text file that holds the sorted array to search.
const outputFilePath = 'src/files/output.txt'; // Path where the result output will be written.
const targetNumber = 7; // The number you are going to search for in the array.
const delimiter = ','; // Delimiter used to separate numbers in the array being searched, "," etc...

const searcher = new BinarySearch(targetNumber, inputFilePath, outputFilePath, delimiter);
searcher.search();
```

Results will be stored in the text file at the specified output path and will also be stored in the database.

### How To Search The Database

```js
import { SQLite3 } from './models/SQLite3';

const db = new SQLite3();
const searchId = 1;
const searchedValue = 22;
const searchResult = 7;
const limitRecords = 5;

const searchRecordsById = await db.querySearchRecordsById(searchId);
const searchRecordsByResult = await db.querySearchRecordsByResult(searchResult, limitRecords);
const searchRecordsBySearchedValue = await db.querySearchRecordsBySearchedValue(searchedValue, limitRecords);
const searchRecentRecords = await db.querySearchRecordsByMostRecent(limitRecords);

console.log("searchRecordsById", searchRecordsById);
console.log("searchRecordsByResult", searchRecordsByResult);
console.log("searchRecordsBySearchedValue", searchRecordsBySearchedValue);
console.log("searchRecentRecords", searchRecentRecords);

```

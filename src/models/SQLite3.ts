import sqlite3 from 'sqlite3';

export class SQLite3 {
	db: sqlite3.Database;

	constructor() {
		this.db = this._initDb();
		this._createTable();
	}

	private _initDb = (): sqlite3.Database => {
		const dbInit = new sqlite3.Database('./src/database/search_database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
			if (err) {
				console.error("Error Initializing DB: ", err.message);
			}
		});
		return dbInit;
	}

	private _createTable = (): void => {
		this.db.run(`CREATE TABLE IF NOT EXISTS search_results (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			searched_value INTEGER NOT NULL,
			result INTEGER NOT NULL
		)`, (err) => {
			if (err) {
				return console.error(err.message);
			}
		});

	}

	insertSearchRecord(searchedValue: number, result: number): void {
		this.db.run(`INSERT INTO search_results (searched_value, result) VALUES (?, ?)`, [searchedValue, result], function (err) {
			if (err) {
				return console.error(err.message);
			}
			console.log(`A row has been inserted with rowId ${this.lastID}`);
		});
	}

	async querySearchRecordsById(searchId: number): Promise<Record<string, number>[]> {
		const query = `SELECT * FROM search_results WHERE id = ${searchId}`;
		return this._executeSearchQuery(query);
	}

	async querySearchRecordsByResult(resultToFind: number, limitRecords: number): Promise<Record<string, number>[]> {
		const query = `SELECT * FROM search_results WHERE result = ${resultToFind} LIMIT ${limitRecords}`;
		return this._executeSearchQuery(query);
	}

	async querySearchRecordsBySearchedValue(searchId: number, limitRecords: number): Promise<Record<string, number>[]> {
		const query = `SELECT * FROM search_results WHERE searched_value = ${searchId} LIMIT ${limitRecords}`;
		return this._executeSearchQuery(query);
	}

	async querySearchRecordsByMostRecent(limitRecords: number): Promise<Record<string, number>[]> {
		const query = `SELECT * FROM search_results ORDER BY id DESC LIMIT ${limitRecords}`;
		return this._executeSearchQuery(query);
	}

	private _executeSearchQuery = async (query: string): Promise<Record<string, number>[]> => {
		return new Promise((resolve, reject) => {
			this.db.all(query, [], (err, rows) => {
				if (err) {
					reject(err);
				} else {
					const results: Record<string, number>[] = rows.map(row => row as Record<string, number>);
					resolve(results);
				}
			});
		});
	};

}

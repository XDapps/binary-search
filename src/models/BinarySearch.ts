import { FSUtils } from "./FSUtils";
import { SQLite3 } from "./SQLite3";

export class BinarySearch {
	arrayToSearch: number[] = [];
	targetNumber: number = 0;
	inputFilePath: string;
	outputFilePath: string;
	delimiter: string;

	constructor(targetNumber: number, inputFilePath: string, outputFilePath: string, delimiter: string) {
		this.inputFilePath = inputFilePath;
		this.outputFilePath = outputFilePath;
		this.targetNumber = targetNumber;
		this.delimiter = delimiter;
	}

	search(): void {
		this._loadDataToSearch();
		const indexResult = this._performSearch();
		this._saveSearchResult(indexResult);
	}

	private _loadDataToSearch = async (): Promise<void> => {
		this.arrayToSearch = FSUtils.readTextFile(this.inputFilePath, this.delimiter);
	}

	private _performSearch = (): number => {
		let left = 0;
		let right = this.arrayToSearch.length - 1;
		while (left <= right) {
			const mid = Math.floor((left + right) / 2);
			if (this.arrayToSearch[mid] === this.targetNumber) {
				return mid;
			} else if (this.arrayToSearch[mid] < this.targetNumber) {
				left = mid + 1;
			} else {
				right = mid - 1;
			}
		}
		return -1;
	}

	private _saveSearchResult = (indexResult: number): void => {
		FSUtils.writeTextFile(this.outputFilePath, indexResult);
		const db = new SQLite3();
		db.insertSearchRecord(this.targetNumber, indexResult);
	}
}
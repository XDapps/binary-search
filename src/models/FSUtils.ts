import fs from "fs";
import * as path from 'path';

export class FSUtils {

	private static  createDirectory(filePath: string): void {
		fs.mkdirSync(filePath, { recursive: true });
	}

	private static fileExists(filePath: string, createPath: boolean): boolean {
		try {
			const exists: boolean = fs.existsSync(filePath);
			if (!exists && createPath) {
				const directoryPath = path.dirname(filePath);
				this.createDirectory(directoryPath);
			}
			return exists;
		} catch (err) {
			console.error(err);
			if (createPath) {
				this.createDirectory(filePath);
				return true;
			}
			return false;
		}
	}

	static writeTextFile(textFilePath: string, foundIndex: number): void {
		this.fileExists(textFilePath, true);
		fs.writeFile(textFilePath, foundIndex.toString(), err => {
			if (err) {
				console.error(err);
				return;
			}
			console.log(`Search result written to ${textFilePath}`);
		});
	}

	static readTextFile = (path: string, delimiter: string): number[] => {
		let sortedArray: number[] = [];
		if (!this.fileExists(path, false)) {
			return sortedArray;
		} try {
			const data: string = fs.readFileSync(path, 'utf8');
			const lines: string[] = data.split('\n');
			sortedArray = lines[0].split(delimiter).map(Number);
		} catch (err) {
			console.error("An error occurred while reading the file. ", err);
			throw err;
		}
		return sortedArray;
	}
}



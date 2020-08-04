import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '@config/app.config';

@Injectable({ providedIn: 'root' })
export class UploadService {
	constructor(private http: HttpClient) {}

	upload(payload: FileList) {
		const data = new FormData();
		data.append('file', payload[0], payload[0].name);
		return this.http.post(`${Config.api}/upload`, data);
	}
}

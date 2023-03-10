import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Log } from '../domain/log';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  api = environment.apiJava;

  constructor(private httpClient:HttpClient) { }

  getLogs() {
    let url = this.api + "log/findAll";
    return this.httpClient.get(url);
  }

  createLog(log:Log) {
    let url = this.api + "logs/log/save";
    return this.httpClient.post(url, log)
  }

  updateLog(log:Log) {
    let url = this.api + "log/update";
    return this.httpClient.put(url, log)
  }

  deleteLog(id:number) {
    let url = this.api + "log/" + id;
    return this.httpClient.delete(url);
  }
}

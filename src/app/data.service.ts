import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class DataService {
  baseUrl = "http://message-list.appspot.com";
  constructor(private http: HttpClient) {}

  getMessagesCall(page: any) {
    return this.http.get(
      page
        ? `${this.baseUrl}/messages?pageToken=${page}`
        : `${this.baseUrl}/messages`
    );
  }
}

import { Injectable } from "@angular/core";
import { Contact } from "../model/contact";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import "rxjs/add/operator/map";
//npm install rxjs-compat

const baseUrl = "http://localhost:4300/contacts/";

@Injectable({
  providedIn: "root"
})
export class PhonebookService {
  constructor(private http: HttpClient) {}

  getContactDetails(id: number): Observable<Contact> {
    return this.http.get(baseUrl + id).map(data => data as Contact);
  }

  addNewContact(contact: Contact): Observable<Contact> {
    return this.http.post(baseUrl, contact).map(data => data as Contact);
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http
      .put(baseUrl + contact.id, contact)
      .map(data => data as Contact);
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete(baseUrl + id);
  }

  getAllContacts(pageNumber: number = 1): Observable<Contact[]> {
    let params = {
      _page: "" + pageNumber
    };
    return this.http.get(baseUrl, { params }).map(resp => resp as Contact[]);
  }
}

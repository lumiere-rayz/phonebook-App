import { Component, OnInit } from "@angular/core";
import { Contact } from "src/app/model/contact";
import { PhonebookService } from "src/app/service/phonebook.service";
import { ActivatedRoute, Router } from "@angular/router";

const swal = window["swal"];
@Component({
  selector: "pb-contact-details",
  templateUrl: "./contact-details.component.html",
  styleUrls: ["./contact-details.component.css"]
})
export class ContactDetailsComponent implements OnInit {
  contact: Contact = new Contact();

  constructor(
    private service: PhonebookService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(paramsData => {
      this.service
        .getContactDetails(paramsData["id"])
        .subscribe(data => (this.contact = data));
    });
  }
  testSwal() {
    //swal("Hello");
    //swal("phonebook App", "hello friend", "warning");
    // swal({
    //   title: "Phonebook App",
    //   icon: "info",
    //   text: "you are in the contact details page"
    // });
  }
  deleteContact() {
    swal({
      title: "you are about to delete contact",
      text: "please confirm",
      buttons: [
        {
          text: "Yes, i am sure",
          visible: "true",
          value: "true"
        },
        {
          text: "cancel",
          visible: "true",
          value: "false"
        }
      ]
    }).then(result => {
      if (result === true) {
        this.service.deleteContact(this.contact.id).subscribe(() => {
          this.router.navigate(["/contact-list"]);
        });
      }
    });
  }
}

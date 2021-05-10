import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { IPageInfo } from "ngx-virtual-scroller";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.scss"],
  animations: [
    trigger("enterAnimation", [
      transition(":enter", [
        style({ transform: "translateX(-100%)", opacity: 0 }),
        animate("200ms", style({ transform: "translateX(0)", opacity: 1 })),
      ]),
    ]),
  ],
})
export class MessagesComponent implements OnInit {
  messageList = [];
  pageToken: string;
  imgPath: string;
  loading: boolean;
  SWIPE_ACTION = { LEFT: "swipeleft", RIGHT: "swiperight" };

  constructor(private service: DataService) {
    this.imgPath = this.service.baseUrl;
  }

  ngOnInit(): void {
    this.getMessages();
  }

  // Method to fetch the next chunk of Message
  fetchMore(event: IPageInfo) {
    if (
      !this.messageList.length ||
      event.endIndex !== this.messageList.length - 1
    )
      return;
    this.getMessages();
  }

  getMessages() {
    this.loading = true;
    this.service.getMessagesCall(this.pageToken).subscribe(
      (res: any) => {
        this.pageToken = res.pageToken;
        this.messageList = [...this.messageList, ...res.messages];
        this.loading = false;
      },
      (err) => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  // Display Delete and Edit button when swiped horizontally
  swipe(currentIndex: number, action) {
    console.log(action);
    if (
      action === this.SWIPE_ACTION.RIGHT ||
      action === this.SWIPE_ACTION.LEFT
    ) {
      this.messageList[currentIndex - 1]["isDeleteVisible"] = true;
      this.messageList[currentIndex - 1]["isEditVisible"] = true;
    }
  }
}

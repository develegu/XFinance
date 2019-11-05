import { Component } from "@angular/core";

@Component({
  selector: "app-pending",
  templateUrl: "pending.component.html",
  styleUrls: ["pending.component.scss"]
})
export class PendingComponent {
  private icons = [
    "flask",
    "wifi",
    "beer",
    "football",
    "basketball",
    "paper-plane",
    "american-football",
    "boat",
    "bluetooth",
    "build"
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor() {
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: "Item " + i,
        note: "This is item #" + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  ngOnInit() {}
}

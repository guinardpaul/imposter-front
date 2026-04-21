import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebSocketService } from './core/ws/web-socket-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('imposter-front');

  private webSocketService: WebSocketService;

  constructor(WebSocketService: WebSocketService) {
    this.webSocketService = WebSocketService;
  }

  ngOnInit() {
    this.webSocketService.connect();
  }
}

import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebSocketService } from './core/ws/web-socket-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  private webSocketService = inject(WebSocketService);

  ngOnInit() {
    this.webSocketService.connect();
  }
}

import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebSocketService } from './core/ws/web-socket-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('imposter-front');

  private webSocketService = inject(WebSocketService);

  ngOnInit() {
    this.webSocketService.connect();
  }
}

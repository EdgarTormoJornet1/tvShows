import { Component } from '@angular/core';
import { TvshowListComponent } from '../../tvshows/tvshow-list/tvshow-list.component';

@Component({
  selector: 'app-main',
  imports: [TvshowListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}

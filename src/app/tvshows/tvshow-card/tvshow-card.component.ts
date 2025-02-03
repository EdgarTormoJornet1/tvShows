import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ItvShow } from '../i-tvshow';

@Component({
  selector: 'app-tvshow-card',
  imports: [RouterLink],
  templateUrl: './tvshow-card.component.html',
  styleUrl: './tvshow-card.component.css'
})
export class TvshowCardComponent {

  @Input({ required: true,  }) tvshow!: ItvShow;

}


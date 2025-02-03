import { Pipe, PipeTransform } from '@angular/core';
import { ItvShow } from '../tvshows/i-tvshow';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(tvshows: ItvShow[], filterBy: string): ItvShow[] { // el primer argument és el que cal filtrar i després una llista d'arguments
    // en aquest cas sols és un, el criteri de búsqueda
      const filter = filterBy ? filterBy.toLocaleLowerCase() : null; // passem el filtre a minúscules o a null si no està
      return filter ?  // Si no és null filtra
      tvshows.filter(tv => `${tv.name}`.toLocaleLowerCase().includes(filter))
      : tvshows; // si és null trau l'array sense filtre
    }
   
    /*${tv.overview}*/

}

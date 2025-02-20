import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BehaviorSubject, forkJoin, from, interval, map, mergeMap, Observable, switchMap, take, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { ItvShow } from '../tvshows/i-tvshow';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  createTvshow(tvshowData: any) {
    throw new Error('Method not implemented.');
  }
  updateTvshow(tvshowID: string, tvshowData: any) {
    throw new Error('Method not implemented.');
  }


  private supabase: SupabaseClient;
  static loggedSubject: any;

  constructor(private http: HttpClient) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  getDataObservable<T>(table: string, search?: Object, ids?: string[], idField?: string): Observable<T[]> {
    return from(this.getData(table, search, ids, idField));
  }

  async getData(table: string, search?: Object, ids?: string[], idField?: string): Promise<any[]> {
    let query = this.supabase.from(table).select('*');
    if (search) {
      query = query?.match(search);
    }
    if (ids) {
      console.log(idField);

      query = query?.in(idField ? idField : 'id', ids);
    }
    const { data, error } = await query
    if (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
    return Array.isArray(data) ? data.flat() : [];
  }


  getTvshowsID(search?: string): Observable<ItvShow[]>{
    return this.getDataObservable<ItvShow>('tv_shows',search ? {id: search}: undefined).pipe(
      map((data) => data.flat())
    );
  }

  /*

  getIngredients(ids: (string | null)[]): Observable<Ingredient>{
    return this.getDataObservable<Ingredient>('ingredients', undefined, ids.filter(id => id !== null) as string[], 'idIngredient')
    .pipe(
      mergeMap(ingredients => from(ingredients)),
      mergeMap(async ingredient => {
            const { data, error } = await this.supabase
              .storage
              .from('recipes')
              .download(`${ingredient.strStorageimg}?rand=${Math.random()}`);
            if (data) {
              ingredient.blobimg = URL.createObjectURL(data);
            }
            return ingredient;
          })
        
      )
  }

  */

// VERSIO PROMESES
/*
  async login(email: string, password: string){
    let {data, error} = await this.supabase.auth.signInWithPassword({
      email,
      password
    })
  }
*/

  login(email: string, password: string){
    const loginResult = from(this.supabase.auth.signInWithPassword({
      email,
      password
    })).pipe(
      map(({data, error}) => {
        if (error) {
          throw error;
        }
        return data;
      }),
      tap(() => this.isLogged())
    )
   return loginResult;
  }

  //todo register

  register(email: string, password: string) {
    const registerResult = from(this.supabase.auth.signUp({
      email,
      password
    })).pipe(
      map(({ data, error }) => {
        if (error) {
          throw error;
        }
        return data;
      })
    );
    return registerResult;
  }

  /*
  async insertTvShow(tvShowData: any){
    const { data, error } = await this.supabase
      .from('tv_shows')
      .insert([
        {
          name: tvShowData.name,
          number_of_seasons: tvShowData.number_of_seasons,
          number_of_episodes: tvShowData.number_of_episodes,
          first_air_date: tvShowData.first_air_date,
          vote_average: tvShowData.vote_average,
          genres: tvShowData.genres,
          created_by: tvShowData.created_by,
          networks: tvShowData.networks,
          origin_country: tvShowData.origin_country
        }
      ])
      .select();

    return { data, error };
  }
  */

  insertTvShow(table: string, data: any) {
    return from(this.supabase
      .from(table)
      .insert([data])).pipe(
        tap(({data, error}) => {
          if (error !== null) {
            console.log("Error en la inserción: ",error);
            throw error;
          } else {
            console.log(data);
          }
        })
      );
  }
  








  loggedSubject = new BehaviorSubject(false);


  async isLogged(){
    const {data: {user }} = await this.supabase.auth.getUser()
    if (user) {
      this.loggedSubject.next(true);
    }
    else
    this.loggedSubject.next(false);
  }

  logout() {
    this.supabase.auth.signOut().then(() => {
      this.loggedSubject.next(false);
    }).catch(error => {
      console.log("Eroor al cerrar sesión: ", error);
      
    })
  }
  



  getRecipes(){
    return 'hola';
  }


  getCharacters(): Observable<any[]>{
        return this.http.get<{results: any[]}>('https://rickandmortyapi.com/api/character/?page=19')
        .pipe(
          map((data: {results: any[]}) => data.results)
        )
  }

  getInterval(): Observable<number>{
    return interval(1000)
  }




  deleteTvShow(tvshowID: string) {
    return from(
      this.supabase
        .from('tv_shows')
        .delete()
        .match({ id: tvshowID })
    ).pipe(
      tap(({ data, error }) => {
        if (error) {
          console.log('Error al eliminar el tv-show:', error);
          throw error;
        } else {
          console.log('Tv-show eliminado exitosamente:', data);
        }
      })
    );
  }

  // getTvshows(search?: string, nombre: string = ""): Observable<ItvShow[]> {
  //   let query = this.supabase.from('tv_shows').select('*');
  //   if (search) {
  //     if (nombre === "") {
  //       query = query.or('name.ilike.' + search); // Modifica esto para buscar por nombre
        
  //     } else {

  //     }
  //     query = query.ilike(nombre, `%${search}%`);
  //      // Modifica esto para buscar por nombre
  //   }
  //   return from(query).pipe(
  //     map(({ data, error }) => {
  //       if (error) {
  //         console.error('Error fetching tv shows:', error);
  //         return [];
  //       }
  //       return data as ItvShow[];
  //     })
  //   );
  // }

  getTvshows(search: string = "", nombre: string = "", page: number = 1, pageSize: number = 10): Observable<ItvShow[]> {
    let query = this.supabase.from('tv_shows').select('*');

    if (search) {
        if (nombre === "") {
            query = query.or(`name.ilike.%${search}%`);
        } else {
            query = query.ilike(nombre, `%${search}%`);
        }
    }

    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;
    query = query.range(start, end);

    return from(query).pipe(
        map(({ data, error }) => {
            if (error) {
                console.error('Error fetching tv shows:', error);
                return [];
            }
            return data as ItvShow[];
        })
    );
}



  

  // getTvShow(attribute: string, value: number): Observable<any> {
  //   return from(
  //     this.supabase
  //       .from('tv_shows')
  //       .select()
  //       .eq(attribute, value) // Convierte el valor a número si es necesario
  //   );
  // }

  getTvShowByAttribute(atributo: string, searchText: string, page: number = 1, pageSize: number = 10): Observable<{ data: ItvShow[] }> {
    let query = this.supabase
      .from('tv_shows')
      .select('*')
      .ilike(atributo, `%${searchText}%`);
  
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;
    query = query.range(start, end);
  
    return from(query).pipe(
      map(({ data, error }) => {
        if (error) {
          console.error('Error en la búsqueda de TV Shows:', error);
          return { data: [] };
        }
        return { data: data as ItvShow[] };
      })
    );
  }
  


  updateTvShow(tvshowID?: string, tvshowData?: any): Observable<any> {
    return from(
      this.supabase
        .from('tv_shows')
        .update(tvshowData)
        .eq('id', tvshowID)
    );
  }
  
}

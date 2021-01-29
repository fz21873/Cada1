import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { Usuario } from '../_model/usuario';
@Injectable()
export class UsuarioService {
  baseURL = 'https://localhost:44317/api/usuario';

constructor(private http: HttpClient) { }

getAllUsuario() {
  return this.http.get(this.baseURL);
}

getUsuarioByNome(nome: string): Observable<Usuario[]> {

  return this.http.get<Usuario[]>(`${this.baseURL}/getByNome/${nome}`);
}

getUsuarioByAtivo(ativo: string): Observable<Usuario[]> {

  return this.http.get<Usuario[]>(`${this.baseURL}/getByAtivo/${ativo}`);
}

getUsuarioById(id: number): Observable<Usuario[]> {

  return this.http.get<Usuario[]>(`${this.baseURL}/${id}`);
}
postUsuario(usuario: Usuario) {
  return this.http.post(this.baseURL, usuario );
}

putUsuario(usuario: Usuario) {

  return this.http.put(`${this.baseURL}/${usuario.idUsuario}`, usuario);
}

 deleteEvento(id: number) {

  return this.http.delete(`${this.baseURL}/${id}`);
}

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {
  LoginDto,
  RegisterDto,
  AuthenticationDto,
  RefreshTokenRequestDto,
  PersonnelDto,
  CongeDto,
  DepartementDto,
  PayeDto,
  HoraireDto,
  SupplementaireDto,
  RetardDto,
  PermissionDto,
  AbsenceDto
} from '../dto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:5053/api/'; // Base URL for the API

  constructor(private http: HttpClient) { }

  private getHttpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      })
    };
  }

  // Authentication APIs
  login(loginDto: LoginDto): Observable<AuthenticationDto> {
    return this.http.post<AuthenticationDto>(`${this.apiUrl}auth/login`, loginDto, this.getHttpOptions()).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      }),
      catchError(this.handleError<AuthenticationDto>('login'))
    );
  }

  register(registerDto: RegisterDto): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}auth/register`, registerDto, this.getHttpOptions())
      .pipe(catchError(this.handleError<boolean>('register')));
  }

  refreshToken(refreshTokenRequest: RefreshTokenRequestDto): Observable<AuthenticationDto> {
    return this.http.post<AuthenticationDto>(`${this.apiUrl}auth/refresh`, refreshTokenRequest, this.getHttpOptions())
      .pipe(catchError(this.handleError<AuthenticationDto>('refreshToken')));
  }

  getCurrentUserDetails(): Observable<PersonnelDto> {
    return this.http.get<PersonnelDto>(`${this.apiUrl}auth/current`, this.getHttpOptions())
      .pipe(catchError(this.handleError<PersonnelDto>('getCurrentUserDetails')));
  }

  // Personnel APIs
  getPersonnelByMatricule(matricule: number): Observable<PersonnelDto> {
    return this.http.get<PersonnelDto>(`${this.apiUrl}personnel/${matricule}`, this.getHttpOptions())
      .pipe(catchError(this.handleError<PersonnelDto>('getPersonnelByMatricule')));
  }

  addPersonnel(personnelDto: PersonnelDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}personnel`, personnelDto, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('addPersonnel')));
  }

  updatePersonnel(personnelDto: PersonnelDto): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}personnel`, personnelDto, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('updatePersonnel')));
  }

   // Méthode pour obtenir la liste du personnel
   getPersonnelList(): Observable<PersonnelDto[]> {
    return this.http.get<PersonnelDto[]>(`${this.apiUrl}personnel`, this.getHttpOptions())
      .pipe(catchError(this.handleError<PersonnelDto[]>('getPersonnelList', [])));
  }

  // Méthode pour supprimer un employé
  deletePersonnel(matricule: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}personnel/${matricule}`, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('deletePersonnel')));
  }

  // Conge APIs
  getConges(): Observable<CongeDto[]> {
    return this.http.get<CongeDto[]>(`${this.apiUrl}conge`, this.getHttpOptions())
      .pipe(catchError(this.handleError<CongeDto[]>('getConges')));
  }

  addConge(congeDto: CongeDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}conge`, congeDto, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('addConge')));
  }

  updateConge(congeDto: CongeDto): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}conge`, congeDto, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('updateConge')));
  }

  deleteConge(congeId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}conge/${congeId}`, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('deleteConge')));
  }

  // Departement APIs
  getDepartements(): Observable<DepartementDto[]> {
    return this.http.get<DepartementDto[]>(`${this.apiUrl}departement`, this.getHttpOptions())
      .pipe(catchError(this.handleError<DepartementDto[]>('getDepartements')));
  }

  addDepartement(departementDto: DepartementDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}departement`, departementDto, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('addDepartement')));
  }

  updateDepartement(departementDto: DepartementDto): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}departement`, departementDto, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('updateDepartement')));
  }

  deleteDepartement(departementId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}departement/${departementId}`, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('deleteDepartement')));
  }

  // Paye APIs
  getAllPaye(): Observable<PayeDto[]> {
    return this.http.get<PayeDto[]>(`${this.apiUrl}paye/all`, this.getHttpOptions())
      .pipe(
        tap(payes => {
          payes.forEach(paye => {
            paye.datepaiement = new Date(paye.datepaiement);
            paye.periode = new Date(paye.periode);
          });
        }),
        catchError(this.handleError<PayeDto[]>('getAllPaye'))
      );
  }

  calculatePaye(matricule: number, periode: string, salaireBase: number, tauxHoraire: number, tauxSupplementaire: number, tauxAbsence: number): Observable<PayeDto> {
    return this.http.get<PayeDto>(`${this.apiUrl}paye/calcule/${matricule}/${periode}/${salaireBase}/${tauxHoraire}/${tauxSupplementaire}/${tauxAbsence}`, this.getHttpOptions())
      .pipe(
        tap(paye => {
          paye.datepaiement = new Date(paye.datepaiement);
          paye.periode = new Date(paye.periode);
        }),
        catchError(this.handleError<PayeDto>('calculatePaye'))
      );
  }
  addPaye(payeDto: PayeDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}paye`, payeDto, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('addPaye')));
  }

  updatePaye(payeDto: PayeDto): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}paye`, payeDto, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('updatePaye')));
  }

  deletePaye(payeId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}paye/${payeId}`, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('deletePaye')));
  }

  getPayeById(payeId: number): Observable<PayeDto> {
    return this.http.get<PayeDto>(`${this.apiUrl}paye/${payeId}`, this.getHttpOptions())
      .pipe(catchError(this.handleError<PayeDto>('getPayeById')));
  }

 

  printPaye(payeId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}paye/imprime/${payeId}`, { responseType: 'blob', ...this.getHttpOptions() })
      .pipe(catchError(this.handleError<Blob>('printPaye')));
  }

  // Absence APIs
  addAbsence(absenceDto: AbsenceDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}absence`, absenceDto, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('addAbsence')));
  }

  updateAbsence(absenceDto: AbsenceDto): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}absence`, absenceDto, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('updateAbsence')));
  }

  deleteAbsence(absenceId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}absence/${absenceId}`, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('deleteAbsence')));
  }

  // Retard APIs
  addRetard(retardDto: RetardDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}retard`, retardDto, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('addRetard')));
  }

  updateRetard(retardDto: RetardDto): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}retard`, retardDto, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('updateRetard')));
  }

  deleteRetard(retardId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}retard/${retardId}`, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('deleteRetard')));
  }

  // Permission APIs
  addPermission(permissionDto: PermissionDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}permission`, permissionDto, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('addPermission')));
  }

  updatePermission(permissionDto: PermissionDto): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}permission`, permissionDto, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('updatePermission')));
  }

  deletePermission(permissionId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}permission/${permissionId}`, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('deletePermission')));
  }

  // Supplementaire APIs
  addSupplementaire(supplementaireDto: SupplementaireDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}supplementaire`, supplementaireDto, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('addSupplementaire')));
  }

  updateSupplementaire(supplementaireDto: SupplementaireDto): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}supplementaire`, supplementaireDto, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('updateSupplementaire')));
  }

  deleteSupplementaire(supplementaireId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}supplementaire/${supplementaireId}`, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('deleteSupplementaire')));
  }

  // Horaire APIs
  getHoraires(assiduiteId: number): Observable<HoraireDto[]> {
    return this.http.get<HoraireDto[]>(`${this.apiUrl}assiduite/${assiduiteId}/horaires`, this.getHttpOptions())
      .pipe(catchError(this.handleError<HoraireDto[]>('getHoraires')));
  }

  addHoraire(horaireDto: HoraireDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}assiduite/horaire`, horaireDto, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('addHoraire')));
  }

  // More Assiduite APIs
  getSupplementaires(assiduiteId: number): Observable<SupplementaireDto[]> {
    return this.http.get<SupplementaireDto[]>(`${this.apiUrl}assiduite/${assiduiteId}/supplementaires`, this.getHttpOptions())
      .pipe(catchError(this.handleError<SupplementaireDto[]>('getSupplementaires')));
  }

  getPermissions(assiduiteId: number): Observable<PermissionDto[]> {
    return this.http.get<PermissionDto[]>(`${this.apiUrl}assiduite/${assiduiteId}/permissions`, this.getHttpOptions())
      .pipe(catchError(this.handleError<PermissionDto[]>('getPermissions')));
  }

  getRetards(assiduiteId: number): Observable<RetardDto[]> {
    return this.http.get<RetardDto[]>(`${this.apiUrl}assiduite/${assiduiteId}/retards`, this.getHttpOptions())
      .pipe(catchError(this.handleError<RetardDto[]>('getRetards')));
  }

  getAbsences(assiduiteId: number): Observable<AbsenceDto[]> {
    return this.http.get<AbsenceDto[]>(`${this.apiUrl}assiduite/${assiduiteId}/absences`, this.getHttpOptions())
      .pipe(catchError(this.handleError<AbsenceDto[]>('getAbsences')));
  }

  // Handling Errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return throwError(error); // propagate the error
    };
  }  
  
}
// Utility function for safe localStorage access
function getLocalStorageItem(key: string): string | null {
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem(key);
  }
  return null;
}
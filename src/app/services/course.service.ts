import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:8080/api/courses';
  private subscriptionUrl = 'http://localhost:8080/api/subscriptions';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  createCourse(course: FormData): Observable<Course> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post<Course>(`${this.apiUrl}/create`, course, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error}`;
    }
    return throwError(errorMessage);
  }


  updateCourse(id: number, course: Course): Observable<Course> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course, { headers });
  }

  deleteCourse(id: number): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  subscribe(courseId: number, userId: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post(`${this.subscriptionUrl}/create?consumerId=${userId}&courseId=${courseId}`, {}, { headers });
  }

  getCoursesByCreator(creatorId: number): Observable<Course[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<Course[]>(`${this.apiUrl}/creator/${creatorId}`, { headers });
  }

  getPendingCourses(): Observable<Course[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<Course[]>(`${this.apiUrl}/pending`, { headers });
  }

  approveCourse(courseId: number): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put<void>(`${this.apiUrl}/approve/${courseId}`, {}, { headers });
  }

  rejectCourse(courseId: number): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put<void>(`${this.apiUrl}/reject/${courseId}`, {}, { headers });
  }
}

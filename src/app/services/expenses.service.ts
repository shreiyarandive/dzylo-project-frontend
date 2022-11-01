import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  constructor(private http: HttpClient) {}

  getAllExpenses() {
    return this.http.get(environment.backendUrl + 'expenses/getAllExpenses');
  }

  getExpenseById(id: number) {
    return this.http.get(
      environment.backendUrl + `expenses/getExpensebyId?id=${id}`
    );
  }
  bookExpense(body: any) {
    return this.http.post(
      environment.backendUrl + 'expenses/bookExpense',
      body
    );
  }

  updateExpense(body: any) {
    return this.http.post(
      environment.backendUrl + 'expenses/updateExpense',
      body
    );
  }
  deleteExpense(id: number) {
    return this.http.delete(
      environment.backendUrl + `expenses/deleteExpenseById?id=${id}`
    );
  }
}

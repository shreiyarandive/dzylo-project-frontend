import { Component } from '@angular/core';
import { ExpensesService } from './services/expenses.service';
import * as $ from 'jquery';
import { Modal } from 'bootstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import { formatDate } from '@angular/common';

interface jsPDFWithPlugin extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'dzylo-project-frontend';
  expenses: any = [];
  newExpense: any = {};
  testModal: Modal | undefined;
  constructor(private expenseService: ExpensesService) {}

  ngOnInit(): void {
    this.getAllExpenses();
  }

  getAllExpenses() {
    this.expenseService.getAllExpenses().subscribe(
      (res) => {
        console.log('res', res);
        this.expenses = res;
        this.expenses.forEach((elem: any) => {
          elem.date = formatDate(elem.date, 'dd-MMM-yyyy hh:mm a', 'en');
        });
      },
      (err) => {
        console.log('err', err);
      }
    );
  }

  getExpenseById(id: number) {
    this.expenseService.getExpenseById(id).subscribe(
      (res) => {
        console.log('res', res);
      },
      (err) => {
        console.log('err', err);
      }
    );
  }

  bookExpense() {
    this.expenseService.bookExpense(this.newExpense).subscribe(
      (res) => {
        this.getAllExpenses();
        this.closeModal();
        alert('New Expense added');
      },
      (err) => {
        console.log('err', err);
      }
    );
  }
  updateExpense() {
    this.expenseService.updateExpense(this.newExpense).subscribe(
      (res) => {
        this.getAllExpenses();
        alert('Expense Updated');
      },
      (err) => {
        console.log('err', err);
      }
    );
  }

  deleteExpense(id: number) {
    let conf = confirm('Are you sure?');
    if (!conf) return;

    this.expenseService.deleteExpense(id).subscribe(
      (res) => {
        this.getAllExpenses();
        alert('Expense Deleted');
      },
      (err) => {
        console.log('err', err);
      }
    );
  }

  getWidthData() {
    return window.innerWidth < 992 ? '100%' : '';
  }

  getMarginData() {
    return window.innerWidth < 992 ? '0' : '40%';
  }

  openModal() {
    $('.modal').addClass('active');
  }

  closeModal() {
    $('.modal').removeClass('active');
  }

  exportAsPDF() {
    console.log('this.expenses', this.expenses);
    let docName = 'expense.pdf';
    const doc = new jsPDF('portrait', 'px', 'a4') as jsPDFWithPlugin;
    let rows: any = [];
    this.expenses.forEach((elem: any) => {
      let temp = [];
      temp[0] = elem.id;
      temp[1] = elem.item;
      temp[2] = elem.price;
      temp[3] = elem.date;
      rows.push(temp);
    });
    doc.autoTable({
      head: [['Id', 'Item', 'Price', 'Date']],
      body: rows,
    });
    doc.save(docName);
  }
}

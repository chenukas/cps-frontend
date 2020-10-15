import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
// import { OrderService } from "src/app/services/order.service";
import { Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subject } from 'rxjs';
import { EventEmitter } from 'protractor';
// import { APIResponse } from 'src/app/models/apiresponse';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css']
})
export class ManageOrderComponent implements OnInit {
  displayedColumns: string[] = ["id", "name", "class", "mail", "action"];
  dataSource: MatTableDataSource<any>;
  students;
  dataIsLoaded = false;
  private filters: {
    limit: number,
    page: number
  };
  count: number;
  isLoading: boolean;

  constructor(
    private studentService: orderService,
    private snackbar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    // this.filters = { limit: 5, page: 0 };
    this.viewStudents(this.filters.page, this.filters.limit);
  }

  // changePage($event) {
  //   this.filters = {
  //     page: $event.pageIndex,
  //     limit: $event.pageSize
  //   };
  //   this.viewStudents($event.pageIndex, $event.pageSize);
  // }

  //   ngAfterViewInit() {
  //     this.paginator.page
  //         .pipe(
  //             tap(() => this.loadPage())
  //         )
  //         .subscribe();
  // }

  // loadPage() {
  //     this.dataSource(
  //         this.studentService.getStudentId._id,
  //         '',
  //         'asc',
  //         this.paginator.pageIndex,
  //         this.paginator.pageSize);
  // }


  //search

  // applyFilter(keyword) {
  //   this.dataSource.filter = keyword.trim().toLowerCase();
  // }

  viewStudents(page: number, limit: number) {
    this.isLoading = true;
    this.orderService.viewStudents(page, limit).subscribe(
      (res: any) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.count = res.count;
        this.dataIsLoaded = true;
        this.students = res.data;
        this.isLoading = false;
      },
      (err) => {
        console.log(err.message);
      }
    );
  }

  /**
   * viewDetails
   */
  public viewDetails(id: string) {
    this.router.navigate(["dashboard/student/view"], { queryParams: { id } });
  }

  openDialog(_id: string, fname: string, lname: string) {
    const dialogRef = this.dialog.open(DialogBox, {
      data: { _id, fname, lname },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.unenroll(_id);
      }
    });
  }

  public unenroll(_id: string) {
    this.orderService.unenrollStudent(_id).subscribe(
      (res) => {
        this.viewStudents(this.filters.page, this.filters.limit);
        //notify
        this.snackbar.open("Unenrolled successfully!", "", { duration: 2000 });
      },
      (err) => {
        //error msg
        this.snackbar.open(err.message, "", {
          duration: 2000,
        });
      }
    );
  }

  // public toPDF(studentId: string) {
  //   this.studentService.getPdf([studentId]).subscribe((response: APIResponse) => {
  //     window.open(response.data.filename, '_blank');
  //   });
  // }
}

@Component({
  selector: "dialogBox",
  templateUrl: "dialogBox.html",
})
export class DialogBox {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { _id: string; fname: string; lname: string }
  ) {}

  public unenroll() {}
}

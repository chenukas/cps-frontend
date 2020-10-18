import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddStocksComponent } from './add-stocks.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddStocksComponent', () => {
  let component: AddStocksComponent;
  let fixture: ComponentFixture<AddStocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddStocksComponent],
      imports: [
        RouterTestingModule,
        MatSnackBarModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

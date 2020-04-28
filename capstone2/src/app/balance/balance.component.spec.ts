import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceComponent } from './balance.component';
import { MaterialModule } from '../material.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CircuitData } from './balance.component'
describe('BalanceComponent', () => {
  let component: BalanceComponent;
  let fixture: ComponentFixture<BalanceComponent>;

  let givenData: CircuitData = {
    circuit1: [[1, 18], [3, 6], [5, 16], [7, 3], [9, 15]],
    circuit2: [[2, 19], [4, 5], [6, 11], [8, 20], [10, 12]],
    circuitUsage: [58, 67]
  };
  let balancedData: CircuitData = {
    circuit1: [[8, 20], [5, 16], [9, 15], [3, 6], [4, 5]],
    circuit2: [[2, 19], [1, 18], [10, 12], [6, 11], [7, 3]],
    circuitUsage: [62, 63]
  }
  let expectedSavings: number = 8;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceComponent],
      imports: [MaterialModule, NgxSpinnerModule, HttpClientTestingModule, BrowserAnimationsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate savings', () => {
    let result: number = component.calculateSavings(givenData);
    expect(result).toEqual(expectedSavings);
  });

  it('should balance sensors', () => {
    component.balanceSensors(givenData);
    expect(givenData).toEqual(balancedData);
  });
});

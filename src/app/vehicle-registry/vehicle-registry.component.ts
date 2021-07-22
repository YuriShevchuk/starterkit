import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { VehicleRegistryService } from '../services/vehicle-registry.service';
import { VehicleCode, ITableHeader } from '../shared/interface';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-vehicle-registry',
  templateUrl: './vehicle-registry.component.html',
  styleUrls: ['./vehicle-registry.component.scss'],
})
export class VehicleRegistryComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  vehicleRegistry: VehicleCode[];
  dataSource = new MatTableDataSource<ITableHeader>();
  displayedColumns = [
    'vehicle',
    'organization',
    'department',
    'contragent',
    'code',
    'trailer',
    'drivers',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private readonly destroy$ = new Subject<void>();
  constructor(private vehicleRegistryService: VehicleRegistryService) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateData(vehicleCodes: VehicleCode[]): void {
    this.dataSource.data = vehicleCodes.map((vehicleCode) => ({
      vehicle: vehicleCode.Vehicle?.name,
      organization: vehicleCode.Vehicle?.Organization?.name,
      department: vehicleCode.Vehicle?.Department?.name,
      contragent: vehicleCode.Vehicle?.Contragent?.name,
      code: vehicleCode.code1c,
      trailer: vehicleCode.Aggregate?.name,
      drivers: vehicleCode.Drivers.map((driver) => driver.name).filter(
        (v) => !!v
      ),
    }));
  }

  ngOnInit(): void {
    this.vehicleRegistryService.getData().subscribe((data) => {
      this.vehicleRegistry = data;
      this.updateData(this.vehicleRegistry);
      console.log(this.vehicleRegistry);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

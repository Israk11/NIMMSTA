import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorLayout, NimmstaConnectionManager, ScanEvent } from 'nimmsta-web-library';
import { PickingLayout } from '../layouts/PickingLayout';
import { Order } from '../orders';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  private device = new NimmstaConnectionManager().devices[0];
  order?: Order = undefined;
  currentIndex = 0;

  sub?: any;

  constructor(private route: ActivatedRoute, private router: Router, private orderService: OrderService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.orderService.getOrder(id).then(order => {
        this.order = order;
        this.setLayoutForCurrentIndex();
      });
    });
    this.sub = this.device.scanEvent.subscribe(event => this.handleScanEvent(event));
  }

  ngOnDestroy(): void {
    this.sub?.cancel();
  }

  setLayoutForCurrentIndex() {
    const item = this.order?.items[this.currentIndex];
    if (item) {
      this.device.setLayout(new PickingLayout(item.name, item.ean));
    }
  }

  handleScanEvent(event: ScanEvent) {
    if (event.barcode === this.order?.items[this.currentIndex].ean) {
      // Correct barcode was scanned
      this.currentIndex++;
      if (this.currentIndex < this.order?.items.length) {
        this.setLayoutForCurrentIndex();
      } else {
        this.order.done = true;
        this.router.navigate(['/orders']);
      }
    } else {
      // Trigger Sos and display error layout for 2.5 seconds
      // to inform user about wrong scan
      this.device.triggerSOS();
      this.device.setLayoutFor(2500, new ErrorLayout('Wrong item!'));
    }
  }
}

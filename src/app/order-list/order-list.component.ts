import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NimmstaConnectionManager, NimmstaDevice, SuccessLayout } from 'nimmsta-web-library';
import { StartLayout } from '../layouts/StartLayout';
import { Order } from '../orders';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = []
  isLoading = true;
  private device: NimmstaDevice | null = null;

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    // Get first connected device
    this.device = new NimmstaConnectionManager().devices[0];
    this.orderService.getOrders().then(orders => {
      if (this.device) {
        this.isLoading = false;
        this.orders = orders;
        if (this.getUndoneOrders().length > 0) {
          this.device.setLayout(new StartLayout("Orders"));
        } else {
          this.device.setLayout(new SuccessLayout("All done!"));
        }
        // Subscribe to button presses on HS-50
        // event.name is the name of the button in the current layout
        this.device.buttonEvent.subscribe(event => {
          if (event.name === "NEXT") {
            const nextOrder = this.getNextOrder();
            if (nextOrder) {
              this.displayOrder(nextOrder);
            }
          } else {
            console.error("Unknown button pressed! Is the correct layout set?");
          }
        });
      }
    });
  }

  private getNextOrder(): Order | undefined {
    const filtered = this.getUndoneOrders();
    if (filtered.length > 0) {
      return filtered[0];
    } else {
      return undefined;
    }
  }

  getUndoneOrders(): Order[] {
    return this.orders.filter(order => !order.done);
  }

  displayOrder(order: Order): void {
    this.router.navigate(['/orders', order.id]);
  }
}

import { identifierName } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Order, orders } from "../orders";

@Injectable({ providedIn: 'root' })
export class OrderService {

  getOrders(): Promise<Order[]> {
    const promise = new Promise<Order[]>((resolve, _) => {
      // Simulate loading data from service with setTimeout
      setTimeout(() => {
        resolve(orders);
      }, 1000);
    });
    return promise;
  }

  getOrder(id: number): Promise<Order | undefined> {
    const promise = new Promise<Order | undefined>((resolve, _) => {
      orders.forEach(order => {
        if (order.id === id) {
          resolve(order);
        }
      })
      resolve(undefined);
    });
    return promise;
  }
}

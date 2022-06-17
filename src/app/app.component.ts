import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NIMMSTA, NimmstaConnectionManager } from 'nimmsta-web-library';

/**
 * This component waits for NIMMSTA.onReady() and displays a
 * loading screen in the mean time.
 * After onReady is called we navigate to a component that can then
 * interact with the HS-50
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoading = true;
  noScannerConnected = false;
  error: String | unknown;
  connectionManager = new NimmstaConnectionManager();

  constructor(private router: Router) {
    this.checkInit();
    if (!NIMMSTA.isReady) {
      this.router.navigate(['/']);
    }
  }

  /**
   * This function subscribes to the onReady function of
   * the web library. The onReady function is called if the
   * web library is successfully connected to the NIMMSTA App.
   * onError is called if no connection can be established.
   */
  checkInit() {
    this.isLoading = true;
    this.noScannerConnected = false;
    this.error = null;
    NIMMSTA.onReady(() => {
      this.isLoading = false;
      if (this.connectionManager.devices.length > 0) {
        this.router.navigate(['/orders']);
      } else {
        this.noScannerConnected = true;
      }
    });
    NIMMSTA.onError((error) => {
      this.isLoading = false;
      this.error = error;
    });
  }

  @HostListener('window:focus', ['$event'])
  onFocus(_: FocusEvent): void {
    this.checkInit();
  }

  displayConnectActivity() {
    this.connectionManager.displayConnectActivity();
  }
}

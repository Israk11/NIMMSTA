# Nimmsta Angular Demo

This project is a demo showcase to show how the NIMMSTA Web Library can be used with Angular. It uses a small picking workflow as a use case.

Feel free to download this project and try it out yourself.

You will need the Android or Windows App and one HS-50 for this Demo to work.

## Development server

On this page the package manager `yarn` is used. But you can also use `npm` if you want to.

To install all dependencies run `yarn install`

Run `yarn start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code

The `AppComponent` contains a loading screen that waits for `NIMMSTA.onReady()` after that we can route to a Component that uses the `NimmstaConnectionManager`.

In the `OrderListComponent` and the `OrderDetailComponent` you can see some use cases that interact and control the HS-50.
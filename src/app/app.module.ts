import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FooterComponent } from './footer/footer.component';
import { GoogleAnalyticsService } from './shared/ga.service';

const routes: Routes = [
  {
    path: 'bubbles',
    loadChildren: './universe/universe.module#UniverseModule',
  },
];

@NgModule({
  declarations: [AppComponent, FooterComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true }),
    StoreModule.forRoot({}),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
  ],
  providers: [HttpClient, GoogleAnalyticsService],
  bootstrap: [AppComponent],
})
export class AppModule {}

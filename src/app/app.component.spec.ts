import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {provideMockStore} from '@ngrx/store/testing';
import {initialTestState} from './store';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ServiceWorkerModule.register('', {enabled: false})
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        provideMockStore({initialState: initialTestState})
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'DXC RUN 4U'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('DXC RUN 4U');
  });

});

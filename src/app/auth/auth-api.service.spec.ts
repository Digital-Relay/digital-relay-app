import {TestBed} from '@angular/core/testing';

import {AuthApiService} from './auth-api.service';
import {AuthService} from '../api/services/auth.service';

describe('AuthApiService', () => {
  let service: AuthApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AuthService, useValue: null}
      ]
    });
    service = TestBed.inject(AuthApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

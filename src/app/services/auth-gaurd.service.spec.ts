import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGaurdService } from './auth-gaurd.service';

// describe('AuthGaurdService', () => {
//   beforeEach(() => TestBed.configureTestingModule({}));

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [ RouterTestingModule ],
    providers: [ AuthGaurdService ]
  })
  .compileComponents();


  it('should be created', () => {
    const service: AuthGaurdService = TestBed.get(AuthGaurdService);
    expect(service).toBeTruthy();
  });
});

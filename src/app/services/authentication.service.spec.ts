import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [ AuthenticationService ]
  })
  .compileComponents();


// describe('AuthenticationService', () => {
//   beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });
});

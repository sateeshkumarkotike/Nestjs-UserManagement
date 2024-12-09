import { IsLoginGuard } from './is-login.guard';

describe('IsLoginGuard', () => {
  it('should be defined', () => {
    expect(new IsLoginGuard()).toBeDefined();
  });
});

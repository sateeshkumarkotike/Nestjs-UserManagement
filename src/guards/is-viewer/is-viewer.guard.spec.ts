import { IsViewerGuard } from './is-viewer.guard';

describe('IsViewerGuard', () => {
  it('should be defined', () => {
    expect(new IsViewerGuard()).toBeDefined();
  });
});

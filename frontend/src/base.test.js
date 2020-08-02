import app, {analytics} from './base.js';

describe('Validate firebase config', () => {
  test('Make sure that firebase config env var exists', () => {
    expect(process.env.FIREBASE_CONFIG).not.toBeUndefined();
  });

  test('Make sure that firebase config is a valid JSON', () => {
    const config = JSON.parse(process.env['FIREBASE_CONFIG']);
    expect(config).not.toBeNull();
  });

})

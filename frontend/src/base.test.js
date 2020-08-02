import app, {analytics} from './base.js';


test('Make sure that firebase config env var exists', () => {
  expect(process.env.FIREBASE_CONFIG).not.toBeUndefined();
})

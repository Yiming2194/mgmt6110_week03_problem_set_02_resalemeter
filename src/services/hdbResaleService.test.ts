import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateMedian } from './hdbResaleService';

test('calculateMedian returns 0 and isInterpolated: false for empty array', () => {
  const result = calculateMedian([]);
  assert.deepStrictEqual(result, { value: 0, isInterpolated: false });
});

test('calculateMedian handles single observation (odd-sized sample)', () => {
  const result = calculateMedian([775000]);
  assert.deepStrictEqual(result, { value: 775000, isInterpolated: false });
});

test('calculateMedian handles 2 observations: averages central values and signals interpolation', () => {
  // Finding case: 775k and 1.40M in Central Area 5-room
  const result = calculateMedian([775000, 1400000]);
  assert.strictEqual(result.value, 1087500);
  assert.strictEqual(result.isInterpolated, true);
});

test('calculateMedian works with unsorted arrays without mutating input', () => {
  const input = [1400000, 775000];
  const result = calculateMedian(input);
  assert.strictEqual(result.value, 1087500);
  assert.strictEqual(result.isInterpolated, true);
  // Input array preserved
  assert.strictEqual(input[0], 1400000);
  assert.strictEqual(input[1], 775000);
});

test('calculateMedian handles 3 observations (odd-sized sample)', () => {
  const result = calculateMedian([500000, 650000, 900000]);
  assert.deepStrictEqual(result, { value: 650000, isInterpolated: false });
});

test('calculateMedian handles 4 observations (even-sized sample)', () => {
  const result = calculateMedian([400000, 500000, 600000, 700000]);
  assert.strictEqual(result.value, 550000);
  assert.strictEqual(result.isInterpolated, true);
});

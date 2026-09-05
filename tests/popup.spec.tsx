import { test, expect } from '@playwright/experimental-ct-react';
import React from 'react';
import { Popup } from '../src/popup/index';

test.use({ viewport: { width: 400, height: 600 } });

test('renders the popup UI under simulated deal payloads', async ({ mount }) => {
  const mockData = {
    historicalLow: 9.99,
    bestPrice: 14.99,
    discountPercent: 25,
    vouchers: ['TESTVOUCHER'],
    loading: false
  };

  const component = await mount(<Popup initialData={mockData} />);

  await expect(component.locator('text=Game Deals')).toBeVisible();
  await expect(component.locator('text=$14.99')).toBeVisible();
  await expect(component.locator('text=$9.99')).toBeVisible();
  await expect(component.locator('text=-25%')).toBeVisible();
  await expect(component.locator('text=TESTVOUCHER')).toBeVisible();
});

test('handles voucher copy interaction flow', async ({ page, mount }) => {
  // Grant clipboard write permissions
  await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);

  const mockData = {
    historicalLow: 9.99,
    bestPrice: 14.99,
    discountPercent: 25,
    vouchers: ['TESTVOUCHER'],
    loading: false
  };

  const component = await mount(<Popup initialData={mockData} />);

  const copyButton = component.locator('button', { hasText: 'Copy' });
  await expect(copyButton).toBeVisible();

  await copyButton.click();

  await expect(component.locator('button', { hasText: 'Copied!' })).toBeVisible();

  // Verify clipboard contents
  const handle = await page.evaluateHandle(() => navigator.clipboard.readText());
  const clipboardText = await handle.jsonValue();
  expect(clipboardText).toBe('TESTVOUCHER');
});

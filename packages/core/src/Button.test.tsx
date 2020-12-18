import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('should display a welcome text', async () => {
    render(<Button text="Welcome!" />);

    expect(screen.getByText('Welcome!')).toBeDefined();
  });
});

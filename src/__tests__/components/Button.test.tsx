import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '@/components/Button';

describe('Button Component', () => {
    it('renders button with text', () => {
        render(<Button onClick={() => {}}>Click me</Button>);
        const button = screen.getByRole('button', { name: /click me/i });
        expect(button).toBeInTheDocument();
    });

    it('calls onClick handler when clicked', async () => {
        const handleClick = vi.fn();
        const user = userEvent.setup();

        render(<Button onClick={handleClick}>Click me</Button>);
        const button = screen.getByRole('button', { name: /click me/i });

        await user.click(button);
        expect(handleClick).toHaveBeenCalledOnce();
    });
});

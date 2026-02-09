/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom';

declare module 'vitest' {
    interface Assertion<T = any> {
        toBeInTheDocument(): T;
        toBeVisible(): T;
        toBeDisabled(): T;
        toBeEnabled(): T;
        toBeEmptyDOMElement(): T;
        toBeInvalid(): T;
        toBeValid(): T;
        toBeRequired(): T;
        toBePartiallyChecked(): T;
        toHaveAttribute(attr: string, value?: string): T;
        toHaveClass(className: string): T;
        toHaveFormValues(values: Record<string, any>): T;
        toHaveStyle(css: string | Record<string, any>): T;
        toHaveTextContent(text: string | RegExp): T;
        toHaveValue(value: string | number | string[]): T;
        toBeChecked(): T;
        toBeInTheDOM(): T;
        toHaveDisplayValue(value: string | string[]): T;
        toHaveErrorMessage(message: string): T;
    }
}

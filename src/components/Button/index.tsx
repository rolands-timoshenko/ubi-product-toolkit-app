type ButtonType = {
    onClick: () => void;
    label: string;
    variant?: 'primary' | 'secondary';
};

const Button = () => {
    return <button>Click me</button>;
};

export default Button;

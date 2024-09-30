
interface ButtonProps {
    children: React.ReactNode,
    onClick?: () => void,
    type: "button" | "submit",

} 

export const ButtonAddMovement = ({children, onClick, type}: ButtonProps) => {
    return (
        <button
          onClick={onClick}
          type={type}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-500 transition-colors"
        >
          {children}
        </button>
      );
}


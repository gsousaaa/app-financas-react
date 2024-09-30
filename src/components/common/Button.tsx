
interface ButtonProps {
    children: React.ReactNode,
    onClick?: () => void,
    type: "button" | "submit",
    disabled?: boolean

} 

export const Button = ({children, disabled, onClick, type}: ButtonProps) => {

    return (
        <button disabled={disabled} className="text-white px-20 py-3 bg-green-500 rounded-md text-base font-semibold" onClick={onClick} type={type}>{children}</button>
    ) 
}


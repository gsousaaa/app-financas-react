import { FinancesContext } from "@/contexts/FinancesContext";
import { ReactNode, useContext } from "react";
import { MdClose } from "react-icons/md";

 interface ModalProps {
    children: ReactNode
 }

export const ModalAdd = ({children}: ModalProps) => {
    const financesContext = useContext(FinancesContext)
    if(!financesContext?.isModalAddOpen) return null

    const closeModal = () => financesContext.setIsModalAddOpen(false)

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg">
                <button 
                    onClick={closeModal} 
                    className="absolute top-4 right-4 text-green-500 hover:text-gray-700"
                >
                   <MdClose size={30} />
                </button>
                {children}
            </div>
        </div>
    );

}
import SliderToggle from "@/components/util/slider/SliderToggle";
import { UseAuth } from "@/hooks/useAuth";
import axios from "axios";
import { Check, CircleNotch, X } from "phosphor-react";
import { useState } from "react";
import Cookies from "js-cookie";

interface ListagemProps {
    titulo: string;
    listaObj: { [key: string]: any }[];
    listaCampos: string[];
    pendente: boolean
    handleListaObj?: (value: any) => void;
    handleForceUpdate?: () => void;
  }

export default function AdminTemplate({
    titulo,
    listaCampos,
    listaObj,
    pendente,
    handleListaObj,
    handleForceUpdate
}: ListagemProps) {

    let filteredListaObj = filter()

    const [isStatusTempLoading, setIsStatusTempLoading] = useState(false)

    function filter() {
        return listaObj.filter((item) => {
            if (!pendente) {
                return item.isNew === true;
            } else {
                return item.isNew === false;
            }
        });
    }

    const [currentId, setCurrentId] = useState<any>(-1)
    const [statuses, setStatuses] = useState(
        filteredListaObj.map((item) => item.status)
    );

    const {config} = UseAuth()

    async function handleStatusChange  (index: number, newStatus: boolean, template: any) {
        
        setIsStatusTempLoading(true)

        const ip = process.env.NEXT_PUBLIC_IP || "localhost"
        
        const updatedStatuses = [...statuses];
        updatedStatuses[index] = newStatus;
        setStatuses(updatedStatuses);

        const updatedListaObj = [...listaObj];
        updatedListaObj[index].status = newStatus;

        try {
            const response = await axios.put(`http://${ip}:8080/api/admin/template/changeStatus/${template.id}`,{status: true}, config)
            if(response.status === 200) {
                setIsStatusTempLoading(false)  
                return 
            }
            else{
                setIsStatusTempLoading(false)  
                return 
            }
            
        } catch (error) {
            setIsStatusTempLoading(false)  
            console.error(error)
        }
    };
    
    async function aproveTemplate  (index: number, template: any) {
        
        const ip = process.env.NEXT_PUBLIC_IP || "localhost"
        console.log(Cookies.get("token"))
        
        try {
            const response = await axios.put(`http://${ip}:8080/api/admin/template/aprove/${template.id}`, {status: true}, config)
            if(response.status === 200) {
                if(handleForceUpdate)
                    handleForceUpdate()
                statuses.push(true)
                return console.log(response.data)
            }
            else{
                return console.log(response.data)
            }
            
        } catch (error) {
            console.error(error)
        }
        
    };

    async function denieTemplate  (index: number, template: any) {
        
        const ip = process.env.NEXT_PUBLIC_IP || "localhost"

        try {
            const response = await axios.delete(`http://${ip}:8080/api/admin/template/denie/${template.id}`, config)
            if(response.status === 200) {
                if(handleForceUpdate)
                    handleForceUpdate()
                return console.log(response.data)
            }
            else{
                return console.log(response.data)
            }
            
        } catch (error) {
            console.error(error)
        }
        
    };


    if(isStatusTempLoading) {
        setTimeout(() => {
            return (
                <tr className="w-screen h-screen grid place-items-center bg-white">
                    <td>
                        <CircleNotch className="h-8 w-8 text-yellow-600 animate-spin"/>
                    </td>
                </tr>
            )
        }, 1000)
    }
   
    return (
        <> 
            {filteredListaObj.map((lista: any, index: any) => (
                <tr key={index} className={`rounded-md border-y-2 text-xs md:text-md lg:text-lg hover:bg-green-100`}>
                {Object.keys(lista).map((lista2, innerIndex) => (
                    <td key={innerIndex} className={`w-1/5 p-1 `}>
                    {lista2 === "id" ? "" : lista2 === "id_criador" ? "" &&  setCurrentId(lista2) : lista2 === "status" ? (
                        pendente != true ? (
                            <div className="flex gap-5 items-center justify-center">
                                <span title="Aceitar solicitação">
                                    <Check onClick={() => aproveTemplate(index, lista)} className="w-7 h-7 text-green-500 cursor-pointer"/>
                                </span>
                                <span title="Recusar solicitação">
                                    <X onClick={() => denieTemplate(index, lista)} className="w-7 h-7 text-red-500 cursor-pointer"/>
                                </span>
                            </div>
                        ) :
                        <SliderToggle
                            isChecked={statuses[index]}
                            onChange={(newStatus) =>
                                handleStatusChange(index, newStatus, lista)
                            }
                            />
                    ) : (
                        <span className="cursor-default">{lista[lista2]}</span>
                    )}
                    </td>
                ))}
                </tr>
            ))}
        </>
    )

}
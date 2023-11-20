import Options from "./option/Option";

interface SelectProps {
    name: string;
    id: string;
    options: string[];
    value: string; // Adicione uma propriedade para o valor selecionado
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Adicione um manipulador de evento onChange
  
}

export default function Select(props: SelectProps) {
    return (
        <>
            <select
                name={props.name}
                id={props.id}
                className="outline-none border-2 rounded-2xl font-semibold bg-zinc-200 overflow-hidden cursor-pointer"
                value={props.value} // Defina o valor selecionado
                onChange={props.onChange} // Defina a função onChange
            >
                    {props.options.map((option) => (
                    <Options key={option} value={option} />
                ))}
            </select>
        </>
    );
}

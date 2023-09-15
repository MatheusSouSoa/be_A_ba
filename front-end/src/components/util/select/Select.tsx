import Options from "./option/Option";

interface SelectProps {
    name: string;
    id: string;
    options: string[];
}

export default function Select(props: SelectProps) {
    return (
        <>
            <select name={props.name} id={props.id} className="outline-none border-2 rounded-2xl font-semibold bg-zinc-200">
                {props.options.map((option) => (
                    <Options key={option} value={option} />
                ))}
            </select>
        </>
    );
}

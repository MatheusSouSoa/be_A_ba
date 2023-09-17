interface optionProps {
    value: string
}

export default function Options(props: optionProps){
    return (
        <option className="font-semibold" value={props.value}>
            {props.value}
        </option>
    )
}
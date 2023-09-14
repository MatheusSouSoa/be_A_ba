interface optionProps {
    value: string
}

export default function Options(props: optionProps){
    return (
        <option value={props.value}>
            {props.value}
        </option>
    )
}
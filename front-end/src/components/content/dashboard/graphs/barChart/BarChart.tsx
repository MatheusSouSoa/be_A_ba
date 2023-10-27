import {Bar} from 'react-chartjs-2'
import {CategoryScale, Chart as ChartJS} from 'chart.js/auto'

ChartJS.register(CategoryScale)
interface BarProps{
    data: any
}

export default function BarChartComponent({data} : BarProps) {
    return (
        <div className='h-[100%] '>
            <Bar data={data}/>
        </div>
    )
}


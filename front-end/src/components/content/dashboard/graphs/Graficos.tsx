import { useEffect, useState } from "react";
import DonutChartComponent from "./donuts/Donuts";
import axios from "axios";
import BarChartComponent from "./barChart/BarChart";
import { Sheet } from "lucide-react";
import { UseAuth } from "@/hooks/useAuth";

interface Semana {
    count: number;
    date: string | null;
}

export default function Graficos() {

    const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const today1 = new Date();
    const labels = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today1);
        date.setDate(today1.getDate() - i);
        const dayOfWeek = date.getDay(); // Obtém o índice do dia da semana
        const formattedDate = `${daysOfWeek[dayOfWeek]}`;
        labels.push(formattedDate);
    }
    
    const today = new Date();
    const dayNameAbbreviations:any = {
        "Sun": "Sunday",
        "Mon": "Monday",
        "Tue": "Tuesday",
        "Wed": "Wednesday",
        "Thu": "Thursday",
        "Fri": "Friday",
        "Sat": "Saturday"
    };
    
    const [data, setData] = useState<any>()

    const [periodSelect, setPeriodSelect] = useState("últimos 7 dias")
    const [graphicsSelect, setGraphicsSelect] = useState("arquivos")
    const {config} = UseAuth()

    function handlePeriod(value: any) {
        setPeriodSelect(value)
    }

    function handleGraphicsSelect(value: any) {
        setGraphicsSelect(value)
    }

    useEffect(() => {
        async function fetchDashboard() {
            try {
                const response = await axios.get("http://127.0.0.1:5000/api/dashboard", config);

                if (response.status === 200) {
                    setData(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchDashboard();
    }, []);

    const totalFiles7Days: number[] = data?.total_files_7_dias

    let reverse7DaysFiles:number[] = []
    
    if(totalFiles7Days)
    reverse7DaysFiles =
    [
        totalFiles7Days[6],
        totalFiles7Days[5],
        totalFiles7Days[4],
        totalFiles7Days[3],
        totalFiles7Days[2],
        totalFiles7Days[1],
        totalFiles7Days[0],
    ]

    const sevenDays = {
        labels: labels,
        datasets: [
            {
                label: "Arquivos enviados nos últimos 7 dias",
                data: reverse7DaysFiles,
                backgroundColor: 'green'
            }
        ]
    };
    
    let total4Semanas: number[] = data?.total_por_semana

    let reverse4Semanas: number[] = []

    if(total4Semanas)
        reverse4Semanas = [total4Semanas[3], total4Semanas[2], total4Semanas[1], total4Semanas[0]]

    const fourWeeks = {
    labels: ["Antepenúltima", "Penúltima", "Última", "Atual"],
    datasets: [
            {
            label: "Arquivos nas últimas 4 semanas",
            data: reverse4Semanas,
            backgroundColor: 'green'
            },
        ],
    };
    
    const totalAno: number[] = data?.total_por_mes
    
    const totalyear = {
        labels: ["Jan", "Fev", "Mar", "Abr", "Mai","Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez" ],
        datasets: [
            {
            label: "Arquivos no ano",
            data: totalAno,
            backgroundColor: 'green'
        },
    ],
    };

    const totalTemp7Days: number[] = data?.total_temp_7_dias

    let reverse7Daystemp:number[] = []
    
    if(totalTemp7Days)
    reverse7Daystemp =
    [
        totalTemp7Days[6],
        totalTemp7Days[5],
        totalTemp7Days[4],
        totalTemp7Days[3],
        totalTemp7Days[2],
        totalTemp7Days[1],
        totalTemp7Days[0],
    ]

    const sevenTempDays = {
        labels: labels,
        datasets: [
            {
            label: "Templates últimos7 dias",
            data: reverse7Daystemp,
            backgroundColor: 'green'
            },
        ],
    };

    let total4TempSemanas: number[] = data?.total_temp_4_semanas

    let reverse4TempSemanas: number[] = []

    if(total4TempSemanas)
        reverse4TempSemanas = [total4TempSemanas[3], total4TempSemanas[2], total4TempSemanas[1], total4TempSemanas[0]]

    const fourTempWeeks = {
    labels: ["Antepenúltima", "Penúltima", "Última", "Atual"],
    datasets: [
            {
            label: "Templates nas últimas 4 semanas",
            data: reverse4TempSemanas,
            backgroundColor: 'green'
            },
        ],
    };

    const totalTempAno: number[] = data?.total_temp_12_meses

    const totalTempYear = {
        labels: ["Jan", "Fev", "Mar", "Abr", "Mai","Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez" ],
        datasets: [
            {
            label: "Templates no ano",
            data: totalTempAno,
            backgroundColor: 'green'
            },
        ],
    };

    const csvCount = data?.quantidade_arquivos_por_formato?.csv;
    const xlsxCount = data?.quantidade_arquivos_por_formato?.xlsx;

    const donutData = {
        labels: ["Arquivos EXCEL", "Arquivos CSV"],
        datasets: [
          {
            data: [xlsxCount, csvCount],
            backgroundColor: ["green", "lime"],
            hoverBackgroundColor: ["green", "lime"],
          },
        ],
      };

    const tempAtivoCount = data?.quantidade_templates_ativos;
    const tempInativoCount = data?.quantidade_templates_inativos;

    const tempActivesData = {
        labels: ["Templates ativos", "Templates inativos"],
        datasets: [
          {
            data: [tempAtivoCount, tempInativoCount],
            backgroundColor: ["green", "lime"],
            hoverBackgroundColor: ["green", "lime"],
          },
        ],
      };

    return (
        <div className="flex items-center justify-between w-full h-full bg-white rounded-2xl ">
            <div className="flex-1 h-full flex flex-col p-2 px-10 ">
                <div className="flex text-zinc-700 font-semibold gap-2">
                    <div>
                        <select 
                            value={graphicsSelect} 
                            onChange={(event) => handleGraphicsSelect(event.target.value)}  
                            className="outline-none bg-gray-200 rounded-2xl cursor-pointer"
                        >
                            <option value="arquivos">Arquivos</option>
                            <option value="templates">Templates</option>
                        </select>
                    </div>
                    <div>enviados</div>
                    <div>
                        <select 
                            value={periodSelect} 
                            onChange={(event) => handlePeriod(event.target.value)} 
                            className="outline-none bg-gray-200 rounded-2xl cursor-pointer"
                        >
                            <option value="últimos 7 dias">Últimos 7 dias</option>
                            <option value="últimas 4 semanas">Últimas 4 semanas</option>
                            <option value="no ano">No ano</option>
                        </select>
                    </div>
                </div>
                <BarChartComponent 
                    data={
                        periodSelect == "últimos 7 dias" && graphicsSelect == "arquivos"  ? sevenDays : 
                        periodSelect == "últimas 4 semanas" && graphicsSelect == "arquivos" ? fourWeeks :
                        periodSelect == "no ano" && graphicsSelect == "arquivos" ? totalyear :
                        periodSelect == "últimos 7 dias" && graphicsSelect == "templates"  ?  sevenTempDays: 
                        periodSelect == "últimas 4 semanas" && graphicsSelect == "templates" ? fourTempWeeks :
                        totalTempYear 
                    } 
                />
                <div className="flex justify-start gap-28 items-center">
                    <div className="text-sm font-bold">
                        Total {periodSelect}: {
                            periodSelect == "últimos 7 dias" && graphicsSelect == "arquivos"  ? (
                                data?.total_files_7_dias.reduce((acum:number, dia:any) => acum + dia, 0 )
                            ) : 
                            periodSelect == "últimas 4 semanas" && graphicsSelect == "arquivos" ? (
                                total4Semanas.reduce((accum:number, dia:any) => accum + dia)
                            ) : 
                            periodSelect == "no ano" && graphicsSelect == "arquivos" ? (
                                totalAno.reduce((accum:number, dia:any) => accum + dia)
                            ) :
                            periodSelect == "últimos 7 dias" && graphicsSelect == "templates"  ? (
                                totalTemp7Days.reduce((accum:number, dia:any) => accum + dia)
                            ) :
                            periodSelect == "últimas 4 semanas" && graphicsSelect == "templates" ? (
                                total4TempSemanas.reduce((accum:number, dia:any) => accum + dia)
                            ) :
                            totalTempAno.reduce((accum:number, dia:any) => accum + dia)
                        }
                    </div>
                    <a href="http://localhost:5000/api/dashboard-relatorios" className="flex justify-center items-center bg-gray-200 px-2  text-zinc-700 font-semibold cursor-pointer hover:bg-zinc-400 hover:text-white rounded-full" download>
                        <span>Relatório</span>
                        <div>
                            <Sheet className="w-5"/>
                        </div>
                    </a>
                </div>
            </div>
            <div className="h-full flex flex-1 justify-center items-center">
                <DonutChartComponent data={donutData} />
                <DonutChartComponent data={tempActivesData} />
            </div>
        </div>
    );
}

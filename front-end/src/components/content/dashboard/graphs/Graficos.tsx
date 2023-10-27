import { useEffect, useState } from "react";
import DonutChartComponent from "./donuts/Donuts";
import axios from "axios";
import BarChartComponent from "./barChart/BarChart";

export default function Graficos() {

    const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
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

    useEffect(() => {
        async function fetchDashboard() {
            try {
                const response = await axios.get("http://127.0.0.1:5000/api/dashboard");

                if (response.status === 200) {
                    setData(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchDashboard();
    }, []);

    // Função para associar os valores ao dia da semana
    const mapDataToDaysOfWeek = (data: any) => {
        const daysOfWeek:any = {
            "Invalido": 0,
            "invalido": 0,
            "Sunday": 0,
            "Monday": 0,
            "Tuesday": 0,
            "Wednesday": 0,
            "Thursday": 0,
            "Friday": 0,
            "Saturday": 0
        };

        data?.quantidade_arquivos_7_dias?.forEach((item: any) => {
            const date = new Date(item.date);
            const dayOfWeek = dayNameAbbreviations[date.toDateString().split(' ')[0]];

            if (dayOfWeek) {
                daysOfWeek[dayOfWeek] = item.count;
            }
        });

        return daysOfWeek;
    };

    const sevenDays = {
        labels: labels,
        datasets: [
            {
                label: "Arquivos enviados nos últimos 7 dias",
                data: Object.values(mapDataToDaysOfWeek(data)),
                backgroundColor: 'green'
            }
        ]
    };

    const csvCount = data?.quantidade_arquivos_por_formato?.csv;
    const xlsxCount = data?.quantidade_arquivos_por_formato?.xlsx;

    const donutData = {
        labels: ["Arquivos XLSX", "Arquivos CSV"],
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
        <div className="flex items-center justify-between w-full h-full bg-white rounded-2xl">
            <div className="flex-1 h-full flex flex-col p-2 px-10 ">
                <h1>Barras</h1>
                <BarChartComponent data={sevenDays} />
            </div>
            <div className="h-full flex-1 flex justify-center items-center">
                <DonutChartComponent data={donutData} />
                <DonutChartComponent data={tempActivesData} />
            </div>
        </div>
    );
}

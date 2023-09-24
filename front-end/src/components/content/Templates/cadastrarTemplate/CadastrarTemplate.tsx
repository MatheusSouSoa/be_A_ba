import { Pencil, Trash } from "phosphor-react";
import { useEffect, useState } from "react";

const tiposDados = ["texto", "data", "inteiro", "decimal", "booleano", "moeda"];
const tipoArquivos = ["csv", "xls", "xlsx"];

interface TemplateProps {
    nome: string;
    numero_colunas: number;
    tipo_arquivo: string;
    limite_linhas?: number | null;
    colunas: ColunasProps[]
}
interface ColunasProps {
  nome_coluna: string;
  tipo_dado: string;
  nulo?: boolean;
}

export default function CreateTemplate() {

  const templateNome = localStorage.getItem("NomeTemplate") || "";    
  
  useEffect(() => {
    setNomeTemplate(templateNome)
  }, [])

  const [colunas, setColunas] = useState<ColunasProps[]>([]) 
  const [NomeTemplate, setNomeTemplate] = useState("");
  const [NomeColuna, setNomeColuna] = useState("");
  const [numColunas, setNumColunas] = useState(0);
  const [selectValueDado, setSelectValueDado] = useState(tiposDados[0]);
  const [limiteNumber, setLimiteNumber] = useState(0);
  const [tipo, setTipo] = useState(tipoArquivos[0]);
  const [isNull, setIsNull] = useState(false);
  const [NomeColunaError, setNomeColunaError] = useState("");
  const [NomeColunaPH, setNomeColunaPH] = useState("Nome da Coluna");

  function addColuna() {
    if (NomeColuna === "") {
      setNomeColunaError("border border-red-500");
      setNomeColunaPH("O nome da coluna não pode estar em branco.");
      return;
    }

    const novaColuna: ColunasProps = {
      nome_coluna: NomeColuna,
      tipo_dado: selectValueDado,
      nulo: isNull,
    };

    setColunas([...colunas, novaColuna]);
    setNumColunas(numColunas + 1);

    setNomeColuna("");
    setSelectValueDado(tiposDados[0]);
    setLimiteNumber(0);
    setIsNull(false);
    setNomeColunaError("");
    setNomeColunaPH("Nome da Coluna");

  }

  function salvarBtn() {

    const NovoTemplate: TemplateProps = {
      nome: NomeTemplate,
      numero_colunas: numColunas,
      tipo_arquivo: tipo,
      limite_linhas: limiteNumber > 0 ? limiteNumber : null,
      colunas: colunas
    }
    console.log(NovoTemplate)
  }

  return (
    <div className="flex text-black w-full h-full rounded-3xl items-center justify-around flex-col gap-4 px-5 py-5">
      <div className="flex max-h-[35%] flex-col w-full h-full items-cente bg-white rounded-2xl gap-4 px-7 py-3  ">
        <div className="flex justify-between ">
          <div className="text-xl font-bold flex">Cadastro do Template: {NomeTemplate}</div>
          <div className="text-lg">N° de colunas: {numColunas}</div>
        </div>
        <div className="flex flex-col justify-around h-full">
          <div className="text-lg flex gap-3">
            <span>Nome da coluna:</span>
            <input
                type="text"
                value={NomeColuna}
                onChange={(e) => {
                    setNomeColuna("")
                    setNomeColunaPH("Nome da coluna")
                    setNomeColunaError("")
                    setNomeColuna(e.target.value)
                }}
                className={`outline-none rounded-2xl border pl-3 w-[70%] h-8 ${NomeColunaError}`}
                placeholder={NomeColunaPH}
            />
          </div>
          <div className="text-lg flex justify-around">
            <div className="flex gap-3 justify-center items-center">
              <span>Tipo de dado:</span>
              <select
                className="outline-none border rounded-2xl px-1"
                name="tipoDado"
                id="tipoDado"
                value={selectValueDado}
                onChange={(event) => setSelectValueDado(event.target.value)}
              >
                {tiposDados.map((tipoDado, index) => (
                  <option key={index} value={tipoDado}>
                    {tipoDado}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-center items-center gap-3">
              <label className="flex justify-center items-center gap-3 cursor-pointer">
                <span>É campo nulo?</span>
                <input
                  checked={isNull}
                  onChange={() => setIsNull(!isNull)}
                  type="checkbox"
                  className="outline-none rounded-2xl border pl-3 w-5 h-5"
                />
              </label>
            </div>
            <div className="flex justify-end items-center gap-3">
              <button
                className="bg-green-500 rounded-2xl border px-2 py-1 text-white font-semibold hover:bg-green-600"
                onClick={addColuna}
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex max-h-[65%] flex-col w-full h-full  items-center justify-between bg-white rounded-2xl   ">
        <div className="flex justify-between p-5 items-center w-full">
            <div className="font-bold text-xl">Colunas do template:</div>
            <div className="flex gap-1 justify-center items-center">
                <span>Limite de linhas?</span>
                <input
                value={limiteNumber}
                onChange={(event) => setLimiteNumber(+event.target.value)}
                type="number"
                className="outline-none rounded-2xl border pl-3 w-20 h-8"
            />
        </div>
            <div className="flex gap-2 justify-center items-center">
                <div>Tipo de Arquivo:</div>
                <div>
                    <select
                        name="tipo_arquivo"
                        id="tipo_arquivo"
                        value={tipo}
                        onChange={(event) => setTipo(event.target.value)}
                        className="outline-none border rounded-2xl p-1"
                    >
                        {tipoArquivos.map((tipo, index) => (
                        <option key={index} value={tipo} id={tipo}>
                            {tipo}
                        </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
        <div className="flex-1 w-full grid grid-cols-2 place-items-center overflow-y-auto gap-5 p-6 scrollbar-custom">
          {colunas.map((coluna, i) => (
            <>
              <div key={i} className="flex gap-2 justify-center items-center">
                <div className="flex gap-2 p-1 w-full  text-white font-bold px-2 rounded-2xl bg-green-800 justify-around">
                  <span>{i+1}.</span>
                  <div className="flex gap-5 ">
                    <span> {coluna.nome_coluna}</span>
                    <span className="bg-white rounded-2xl text-black px-2 flex gap-2 justify-center items-center"> {coluna.nulo ? "Nulo" : "Não Nulo"}
                    <div className="p-1 w-1 h-1 rounded-full bg-yellow-500"></div>
                    </span>
                    <span className="bg-white rounded-2xl text-black px-2 flex gap-2 justify-center items-center"> {coluna.tipo_dado}
                    <div className="p-1 w-1 h-1 rounded-full bg-yellow-500"></div>
                    </span>
                  </div>
                </div>
                <ul className="flex gap-2">
                  <li title="Editar coluna"><Pencil className="w-7 h-7 cursor-pointer"/> </li>
                  <li title="excluir coluna"><Trash className="w-7 h-7 cursor-pointer"/> </li>
                </ul>
              </div>
            </>
          ))}
        </div>
        <div className="p-2">
          <button
            className="bg-green-500 rounded-2xl border px-5 py-2 text-white font-semibold hover:bg-green-600"
            onClick={salvarBtn}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
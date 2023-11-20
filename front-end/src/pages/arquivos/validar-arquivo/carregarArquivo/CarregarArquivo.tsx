import { FileInput } from "@/components/util/FileInput/FileInput"
import Modal from "@/components/util/modal/Modal"
import { UseAuth } from "@/hooks/useAuth"
import axios from "axios"
import { Check, Eye, EyeOff, FolderClosed, FolderPlus, Trash2, X } from "lucide-react"
import { ArrowArcLeft, Folder, XCircle } from "phosphor-react"
import { useEffect, useRef, useState } from "react"

interface CarregarArquivoProps {
    templateSelecionado: any
}

export default function CarregarArquivo({templateSelecionado} : CarregarArquivoProps) {

    const [diretorio, setDiretorio] = useState("")
    const [selectedTemplate, setSelected] = useState<any | null>()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [diretorios, setDir] = useState<any[]>()
    const [dirClicked, setDirClicked] = useState<number | null>(null)
    const [createFolder, setCreateFolder] = useState(false);
    const [newFolderName, setNewFolderName] = useState("")
    const [path, setPath] = useState("")
    const [root, setRoot] = useState<number>(-1)
    const [ activeFolder, setActiveFolder] = useState<any>()
    const [isFolderDel, setFolderDel] = useState(false)
    const {config, user, userIsAdmin} = UseAuth()
    const [activeDirId, setActiveDirId] = useState<any>()
    const inputRef = useRef<any>();

    async function fetchDir() {
        const ip = process.env.PUBLIC_NEXT_IP || "localhost"
    
        try {
            const dir = await axios.get(`http://${ip}:8080/api/diretorios-root`, config)
            
            if(dir.status === 200) {
                setDir(dir.data)
                setPath("")
                setFolderDel(false)
                setActiveDirId(dir.data.id)
            }
    
        } catch (error) {
            console.error(error)
        }

    }
    useEffect(() =>{
        fetchDir()
    }, [])

    const setActiveDir = async (id: number) => {
        const ip = process.env.PUBLIC_NEXT_IP || "localhost"
        createFolder && setCreateFolder(false)
        try {
            const dir = await axios.get(`http://${ip}:8080/api/diretorios/${id}`, config)
            
            if(dir.status === 200) {
                setDir(dir.data.subdiretorios)
                setPath(dir.data.caminho)
                setRoot(dir.data.raiz?.id) 
                setActiveDirId(dir.data.id)
            }
    
        } catch (error) {
            fetchDir()
        }
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setNewFolderName("")
        setCreateFolder(false);
        fetchDir()
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const createDir = () => {
        !createFolder && setDirClicked(null)
        setCreateFolder(!createFolder)
        if(inputRef.current)
            inputRef.current.focus();
    }

    const saveDir = async () => {
        const ip = process.env.PUBLIC_NEXT_IP || "localhost"
        try {
            const dir = await axios.post(`http://${ip}:8080/api/diretorios`,{
                caminho: path,
                nome: newFolderName,
                userId: user.id,
                raiz: root >= 1 ? `${root+"/"+newFolderName}` : null
            }, config)
            
            if(dir.status === 201) {
                setNewFolderName("")
                setCreateFolder(false)
                path == "" ?
                fetchDir() :
                setActiveDir(activeFolder)
            }
    
        } catch (error) {
            setNewFolderName("")
            setCreateFolder(false)
            fetchDir()
        }
    }

    const deleteDir = async(id: number, caminho: string) => {
        console.log("AQUI: ",id, caminho)
        try {
            const response = await axios.delete(`http://127.0.0.1:5000/api/dir/delete/${id}?dir_path=${caminho}`)
            console.log(response)
            if(response.status === 200) {
                setActiveDir(root)
            }
        } catch (error) {
            fetchDir()
        } 
        setFolderDel(false)
    }
    return ( 
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center bg-green-800 py-3 px-10">
                <div className="flex items-center justify-center gap-5">
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <div className="">
                            <div className="flex items-end justify-end">
                                <X className=" text-red-500 w-10 h-10 cursor-pointer" onClick={closeModal}/>
                            </div>
                            <div className="font-bold text-xl flex justify-between items-center gap-10">
                                <h2>Escolha o diretório destino:</h2>
                                <div>
                                    <FolderPlus className="fill-yellow-400 w-12 h-12 cursor-pointer hover:fill-yellow-300" onClick={createDir}/>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-start items-center">
                                    <div className="rounded-full w-5 flex justify-center items-center cursor-pointer">
                                        {path != "" && 
                                            <ArrowArcLeft className="w-10 h-10" onClick={() => setActiveDir(root)}/>
                                        }
                                    </div>
                                    <h5>/{path}</h5>
                                    {path != "" && userIsAdmin && (
                                        <>
                                            <div title="Deletar diretório" className="cursor-pointer">
                                                <Trash2 onClick={() => {
                                                    setFolderDel(!isFolderDel)
                                                    
                                                }} className="ml-2 w-5 h-5"/>
                                            </div>
                                        </>
                                        )
                                    }
                                </div>
                                <div className=" grid grid-cols-2 max-h-64 p-2 overflow-y-auto gap-2">
                                    {!isFolderDel && createFolder &&
                                        <div className="flex justify-between bg-zinc-100 p-2 rounded-md cursor-pointer hover:bg-zinc-300 border border-blue-600 select-none">
                                            <div>
                                                <input type="text" ref={inputRef} value={newFolderName} onChange={(event) => 
                                                    setNewFolderName(event.target.value)
                                                } className="w-[90%] rounded-lg outline-none text-zinc-600 px-2" placeholder="nome da pasta" />
                                            </div>
                                            <div className="flex">
                                                <FolderClosed className="fill-yellow-500"/>
                                            </div>
                                        </div>
                                    }
                                    {!isFolderDel && diretorios && diretorios.map((dir, index) => (
                                        <div key={dir.id} className={`flex justify-between bg-zinc-100 p-2 rounded-md cursor-pointer hover:bg-zinc-300  select-none`} onClick={() => {
                                            setDirClicked(dir.id)
                                            setCreateFolder(false)
                                            setActiveDir(dir.id)
                                            setActiveFolder(dir.id)
                                        }}
                                        onDoubleClick={() => setActiveDir(dir.id)}>
                                            <div>
                                                {dir.nome}
                                            </div>
                                            <div>
                                                <FolderClosed className="fill-yellow-500"/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-center items-center">
                                    {!isFolderDel ?
                                        <>
                                            {createFolder ?
                                                <button onClick={() => {
                                                    saveDir()
                                                }} className="bg-green-600 hover:bg-green-500 px-4 py-2 mt-5 text-white font-bold rounded-md">
                                                    Criar
                                                </button>
                                            : 
                                                <button onClick={() => {
                                                    setSelected(`.../${path}`)
                                                    setDiretorio(path)
                                                    closeModal()
                                                }} className="bg-green-600 hover:bg-green-500 px-4 py-2 mt-5 text-white font-bold rounded-md">
                                                    escolher
                                                </button>
                                            }
                                        </>
                                        :
                                        <div className="grid place-items-center">
                                            <div className="grid place-items-center">
                                                <h1 className="font-bold text-xl">Você está prestes a remover esta pasta. Deseja prosseguir mesmo assim?</h1>
                                                <XCircle className="w-20 h-20 text-red-500"/>
                                            </div>
                                            <div>
                                                <button className="bg-green-600 rounded-lg hover:bg-green-500 px-4 py-2 text-white font-bold mt-5" onClick={() => deleteDir(activeDirId, path)}>Confirmar</button>
                                                <button className="bg-red-600 rounded-lg hover:bg-red-500 px-4 py-2 text-white font-bold mt-5 ml-5" onClick={() => setFolderDel(false)}>Cancelar</button>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </Modal>
                    <button onClick={openModal} className="flex justify-center items-center gap-2 font-bold text-md bg-white rounded-lg cursor-pointer px-2 hover:bg-gray-300">
                        {selectedTemplate ? selectedTemplate : "Escolha o destino"}
                        <Folder fill="#D97706" size={25} color="#D97706" />
                    </button>
                </div>
                <div>
                    <div className="flex bg-green-500 p-2 rounded-3xl gap-3 ">
                        <span className="font-bold text-white cursor-default hidden md:block">
                            Template
                        </span>
                        <div className="bg-white rounded-3xl md:w-56 overflow-y-hidden text-center px-2 font-semibold cursor-default">
                            {templateSelecionado ? 
                                templateSelecionado.nome :
                                "Não selecionado"
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className=" h-full flex flex-col justify-center items-center">
                <FileInput template={templateSelecionado} diretorio={diretorio}/>
            </div>
        </div>
    )
}

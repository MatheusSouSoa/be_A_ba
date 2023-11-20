import { useCallback, useState } from 'react';
import { DropzoneState, useDropzone } from 'react-dropzone';
import { CloseIcon } from "../../../../public/icons/CloseIcon"
import { FileIcon } from "../../../../public/icons/FileIcon"
import { UploadIcon } from "../../../../public/icons/UploadIcon"
import { Check, CircleNotch, FileCsv, FileXls, WarningCircle, X } from 'phosphor-react';
import Modal from '../modal/Modal';
import { UseAuth } from '@/hooks/useAuth';
import axios from 'axios';
import Cookies from 'js-cookie';

interface InputProps {
  dropzone: DropzoneState;
}

interface FileInputProps {
    template: any;
    diretorio: string;
}

interface HasFileProps {
  file?: File;
  removeFile: () => void;
  template: any;
  diretorio: string;
}

export const FileInput = ({template, diretorio} : FileInputProps) => {
  const [file, setFile] = useState<File | null>(null);

  const removeFile = useCallback(() => {
    setFile(null);
  }, [file]);

  const onDrop = useCallback((files: File[]) => {
    setFile(files[0]);
  }, []);

  const dropzone = useDropzone({
    onDrop,
    accept: {
      'application/xlsx': ['.xlsx'],
      'application/xls': ['.xls'],
      'application/csv': ['.csv'],
    },
  });

  if (file) return <HasFile diretorio={diretorio} file={file} removeFile={removeFile} template={template}/>;

  return <Input dropzone={dropzone} />;
};

const Input = ({ dropzone }: InputProps) => {
  const { getRootProps, getInputProps, isDragActive } = dropzone;

  return (
    <div
      {...getRootProps()}
      className={`w-full h-full rounded-lg border-dashed border-2 hover:border-zinc-500 bg-white hover:bg-zinc-200 transition-all
      ${isDragActive ? 'border-blue-500' : 'border-gray-600'}`}
    >
      <label htmlFor="dropzone-file" className="cursor-pointer w-full h-full">
        <div className="flex flex-col items-center justify-center pt-5 pb-6 w-full h-full">
          <UploadIcon
            className={`w-10 h-10 mb-3 ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`}
          />
          {isDragActive ? (
            <p className="font-bold text-lg text-blue-400">Solte para adicionar</p>
          ) : (
            <>
              <p className="mb-2 text-lg text-gray-400">
                <span className="font-bold">Clique para enviar</span> ou arraste até aqui
              </p>
              <p className="text-gray-400 text-sm">XLS, XLSX, CSV</p>
            </>
          )}
        </div>
      </label>
      <input {...getInputProps()} className="hidden" />
    </div>
  );
};

const HasFile = ({ file, removeFile, template, diretorio }: HasFileProps) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ modalErrs, setModalErrs] = useState(false);
  const [modalErrsMsg, setModalErrsMsg] = useState("");
  const [isModalLoading, setIsModalLoading] = useState(false);
  const {user, config} =UseAuth()

  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    modalErrs ? removeFile() : null
    setIsModalOpen(false);
  };

  const handleUpload = async () => {
    
    try {
      const ip = process.env.NEXT_PUBLIC_IP || "localhost"
      
      const campos = await axios.get(`http://${ip}:8080/api/campos/${template.id}`, config)

      const formData = new FormData();
      formData.append('user_id', user.id);
      formData.append('template', JSON.stringify(template));
      formData.append('campos', JSON.stringify(campos));
      formData.append('diretorio', JSON.stringify(diretorio));
      
      if(file)
        formData.append('file', file);

      const token = Cookies.get('token') || null;
      const response = await axios.post('http://127.0.0.1:5000/api/files/upload', formData, {headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }});

      if (response.status === 200) {
        console.log("ok no if: ",response)
        return {
          valid: true,
          response: "Arquivo validado com sucesso!"
        }
      } 
      else {
        console.log("Erro no else: ",response.data)
        return {
          valid: false,
          response: "asiodhaodho"
        }
      }
    } catch (error) {
      if(axios.isAxiosError(error))
      if (error.response) {
        console.error('Erro ao enviar o arquivo 1:', error);
        return {
          valid: false,
          response: error.response.data.message
        }
      } else {
        console.error('Erro ao enviar o arquivo 2:', error);
        return {
          valid: false,
          response: "Arquivo não atende ao template utilizado"
        }
      }
    }
  };
  
  async function validarTemplate(file: any, template: any) {
    setIsModalOpen(true)
    setIsModalLoading(true)
    
    if(template === "Não Selecionado"){
      setModalErrsMsg("Selecione um template")
      setIsModalLoading(false)
      return
    }

    try{
      const response = await handleUpload()
      if(template) {
        if(response && response.valid === true) {
          setModalErrs(true)
          console.log(template)
          console.log(file)
          setModalErrsMsg(response.response)
          setIsModalLoading(false)
          return
        }
      }
      else{
        setIsModalLoading(false)
        setModalErrsMsg("Selecione um template")
      }
      setIsModalLoading(false)
      if(response)
      setModalErrsMsg(response.response)
    
  }catch(err){
    setIsModalLoading(false)
    console.log("entrou no: ",err)
    if(err instanceof Error)
    setModalErrsMsg(err.message)
  else
  setModalErrsMsg("Ocorreu um erro desconhecido.");
  }
  setIsModalLoading(false)
    // setIsModalOpen(true)
    setModalErrs(false)
  }

  return (
    <div className="w-full h-full rounded-lg gap-5 border-dashedborder-2 hover:border-zinc-500 bg-white hover:bg-zinc-200 flex flex-col justify-center items-center">
      <div className="bg-white w-96 rounded-md shadow-md flex gap-3 items-center justify-center">
        {file?.name.includes("xlsx") ? <FileXls weight='fill' className=" text-green-500 w-10 h-10 my-4 ml-4"/> :
        file?.name.includes("csv") ? <FileCsv weight='fill' className=" text-green-500 w-10 h-10 my-4 ml-4"/> :
        <FileIcon className="w-10 h-10 my-4 ml-4" />
        }
        <span className="text-3xl text-gray-500 my-4 place-items-center">{file?.name}</span>
        <button type="button" onClick={removeFile} title='Remover Arquivo' className=" place-items-center mt-1 p-1 ">
          <CloseIcon className="w-10 h-10 text-red-500" />
        </button>
      </div>
      <div>
        <button 
          className='bg-green-500 px-5 p-2 rounded-xl font-black text-white hover:bg-green-600'
          onClick={() => validarTemplate(file, template)}  
        >
            Validar
        </button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {isModalLoading ? 
              <div className="grid place-items-center bg-white">
                  <CircleNotch className="h-8 w-8 text-yellow-600 animate-spin"/>
              </div>
            :
            <div className="flex flex-col gap-5 justify-center items-center">
                <h2 className="text-2xl font-semibold">
                  {/* {modalErrs == true ?
                    "Arquivo validado com sucesso" : 
                    "Erro ao validar o arquivo. Por favor, selecione um template"
                  }     */}
                  {modalErrsMsg}
                </h2>
                <div className={`w-44 h-44 rounded-full flex justify-center items-center 
                  ${modalErrs ? "border border-green-500" : ""}
                `}>
                  {modalErrs ? 
                    <Check className="text-green-500 h-32 w-32"/> :
                    <WarningCircle className="text-red-500 h-44 w-44"/>
                  }
                </div>
                <button
                    onClick={closeModal}
                    className={`
                    modal-close ${modalErrs ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline text-3xl
                    `}
                >
                    {modalErrs ? "Ok" : "Fechar"}
                </button>
              </div>
              }
        </Modal>
      </div>
    </div>
  );
};

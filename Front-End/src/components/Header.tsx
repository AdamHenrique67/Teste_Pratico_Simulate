import { Logo } from './Logo'
import { CreateSimulate } from './CreateSimulate'
import * as Dialog from '@radix-ui/react-dialog';
import { Input } from './Form/Input'
import { FormEvent, useState } from 'react';
import axios, {AxiosError} from 'axios'


type Pessoa = {
  id: number
  nome: string
  idade: number
}

export function Header () {
  

  const [pessoas, setPessoas] = useState<Pessoa[]>([]);  

  function addPessoa() {
    setPessoas((prevState) => [
      ...prevState,
      {
        id: Date.now(),
        nome: '',
        idade: 0,
      },
    ])
  }

  function remove(id: number) {
    setPessoas((prevState) =>
    prevState.filter((pessoa) => pessoa.id !== id)
    );
  }

  function handleInputChange(id: number, event: React.ChangeEvent<HTMLInputElement>) {
    setPessoas((prevState) => {
      const newState = prevState.map((pessoa) => {
        if(pessoa.id === id) {
          return {
            ...pessoa,
            [event.target.name]: event.target.value,
          }
        }
        return pessoa

      })
      return newState;
    })
  }

  async function handleSimulate(event: FormEvent){
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)
    
    console.log(pessoas)
    try {
      await axios.post('http://localhost:8080/simulate',{
        "registro": data.registro,
        "quantidadeBeneficiarios": pessoas.length,
        "pessoas": pessoas
      })
    } catch(err: AxiosError | any) {
      console.log(err)
      alert(err.response.data.message)
    }
    
  }

  return(
    <div className="bg-black/90 h-60 mt-0 pt-0  flex items-center flex-auto">
      <Logo />
      <h1 className="text-6xl text-cyan-600 font-black mr-36">Simule um Plano</h1>
      
      <Dialog.Root>
        <CreateSimulate />
        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/30 inset-0 fixed'>
            <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[800px] shadow-lg shadow-black/25'>

              <Dialog.Title className='text-3xl font-black mt-2'>Simule o valor do Plano</Dialog.Title>
                <form onSubmit={handleSimulate} className="className='mt-8 flex flex-col gap-4'">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="reg">Qual o registro do Plano?</label>
                    <Input 
                      id="registro" 
                      name="registro"
                      type="text" 
                      placeholder="Selecione o registro do plano"
                    />
                  </div>
                  
                  <h1 className='mt-2'>Pessoas</h1>
                  {pessoas.map((pessoa) => (
                    <div className='grid grid-cols-3 gap-6 mt-2'>
                      <div className='flex flex-col gap-2'>
                        <Input id='nome' name='nome' type='text' value={pessoa.nome} placeholder='Informe o nome' 
                        onChange={(event) => handleInputChange(pessoa.id, event)}/>
                      </div>

                      <div className='flex flex-col gap-2'>
                        <Input id='idade' name='idade' type='number' value={Number(pessoa.idade)} placeholder='Informe a idade'
                        onChange={(event) => handleInputChange(pessoa.id, event)}/>
                      </div>

                      <div className='flex flex-1 gap-2'>
                        <button  type="button" onClick={() => remove(pessoa.id)} className='bg-red-600 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-red-700' >
                        Apagar
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex-1 mt-2">
                    <button type="button" onClick={addPessoa} className='bg-green-600 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-green-700'>
                      Adicionar Pessoas
                    </button>                  
                  </div>

                  <footer className='mt-4 flex justify-end gap-4'>
                    <Dialog.Close 
                      className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'
                      >
                        Cancelar
                    </Dialog.Close>
                    <button className='bg-cyan-600 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-cyan-700' 
                      type='submit'>
                      Calcular
                    </button>
                  </footer>
                </form>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
      
    </div>

  )
}
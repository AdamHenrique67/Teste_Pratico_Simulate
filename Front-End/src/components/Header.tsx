import { Logo } from './Logo'
import { CreateSimulate } from './CreateSimulate'
import * as Dialog from '@radix-ui/react-dialog';
import { Input } from './Form/Input'
import { FormEvent } from 'react';
import axios, {AxiosError} from 'axios'


export function Header () {

  async function handleSimulate(event: FormEvent){
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    try {
      await axios.post('http://localhost:8080/simulate',{
        "registro": data.registro
      })
    } catch(err: AxiosError | any) {
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
            <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>

              <Dialog.Title className='text-3xl font-black'>Simule o valor do Plano</Dialog.Title>
                <form onSubmit={handleSimulate} className="mt-8">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="reg">Qual o registro do Plano?</label>
                    <Input 
                      id="registro" 
                      name="registro"
                      type="text" 
                      placeholder="Selecione o registro do plano"
                      className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"  
                    />
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
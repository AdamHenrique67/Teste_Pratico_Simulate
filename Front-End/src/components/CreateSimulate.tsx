import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog';

export function CreateSimulate(){
  return(
    <div className='ml-3 flex items-center flex-auto'>
        <Dialog.Trigger className="py-3 px-4 bg-cyan-50 rounded flex items-center gap-3 text-cyan-600 font-bold">
          <MagnifyingGlassPlus size={24} className='text-cyan-600'/>
          Simule um Plano
        </Dialog.Trigger>
    </div>   
    
  )
}
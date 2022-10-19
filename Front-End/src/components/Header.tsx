import { Logo } from './Logo'
import { CreateSimulate } from './CreateSimulate'
import * as Dialog from '@radix-ui/react-dialog';
import { Modal } from './ModalForm/Modal';

export function Header () {
  
  return(
    <div className="bg-black/90 h-60 mt-0 pt-0  flex items-center flex-auto">
      <Logo />
      <h1 className="text-6xl text-cyan-600 font-black mr-36">Simule um Plano</h1>
      <Dialog.Root>
        <CreateSimulate />
        <Modal />
      </Dialog.Root>
    </div>

  )
}
import { create } from 'zustand';

type Fot ={
  foto: string;
  setFoto: (valor: string) => void;
}

export const useFot = create<Fot>((set) => ({
  foto: '',
  setFoto: (valor: string) => set(() => ({ foto: valor })),
}));
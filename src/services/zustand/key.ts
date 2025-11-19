import { create } from 'zustand';

type key1 = {
  key1: string;
  setKey1: (valor: string) => void;
};

type key2 ={
     key2: string;
  setKey2: (valor: string) => void;
}



export const useKey1 = create<key1>((set) => ({
  key1: '',
  setKey1: (valor: string) => set(() => ({ key1: valor })),
}));
 
export const useKey2 = create<key2>((set) => ({
  key2: '',
  setKey2: (valor: string) => set(() => ({ key2: valor })),
}));

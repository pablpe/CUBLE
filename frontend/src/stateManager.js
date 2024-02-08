import { create } from "zustand"

const useStore = create((set)=> ({
    numero : 10,
    incrementaNumero : (num) => set((state) => ({ numero : state.numero + num}))
}))

export default useStore;
import { create } from "zustand"

const useStore = create((set)=> ({
    numero : 10,
    incrementaNumero : (num) => set((state) => ({ numero : state.numero + num})),
    method : "roux",
    setMethod : (met) => set((state) => ({method : met})),
    arrNumMovimientos : [],
    setArrNumMovimientos : (num) => set((state) => ({arrNumMovimientos : [...state.arrNumMovimientos, num]})),
    arrTps : [],
    setArrTps : (num) => set((state) => ({arrTps : [...state.arrTps,num]}))
}))

export default useStore;
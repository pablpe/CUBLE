import { create } from "zustand"

const useStore = create((set)=> ({
    numero : 10,
    incrementaNumero : (num) => set((state) => ({ numero : state.numero + num})),
    method : "roux",
    setMethod : (met) => set(() => ({method : met})),
    arrNumMovimientos : [],
    setArrNumMovimientos : (num) => set((state) => ({arrNumMovimientos : [...state.arrNumMovimientos, num]})),
    arrTps : [],
    setArrTps : (num) => set((state) => ({arrTps : [...state.arrTps,num]})),
    resolviendoAlg : false,
    setResolviendoAlg : (estado) => set(() => ({resolviendoAlg : estado})),
    inicioTiempoAlg : false,
    setinicioTiempoAlg : (date) => set(() => ({inicioTiempoAlg : date})),
    tiemposAlg : [],
    setTiemposAlg : (tiempo) => set((state) => ({tiemposAlg : [...state.tiemposAlg, tiempo]}))
}))

export default useStore;
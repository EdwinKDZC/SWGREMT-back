const generarNumBoleta = (serie, numero) => {
    const numStr = numero.toString().padStart(4, '0');
    return `${serie}-${numStr}`;
}

export default generarNumBoleta;

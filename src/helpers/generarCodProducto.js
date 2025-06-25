const generarCodProducto = (producto) => {
    const { category } = producto;
    const categoryCode = category.slice(0, 1).toUpperCase();
    
    const timestamp = Date.now().toString().slice(-4); // Últimos 4 dígitos del timestamp
    const codProducto = `P${categoryCode}-${timestamp}`;

    return codProducto;
}
export default generarCodProducto;
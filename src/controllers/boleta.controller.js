import BoletaModel from '../models/boleta.js';

const createBoleta = async (req, res) => {
    try {
        const boleta = new BoletaModel(req.body);

        // Check if a boleta with the same number already exists
        const existingBoleta = await BoletaModel.findOne({ numero: boleta.numero });
        if (existingBoleta) {
            return res.status(400).json({ message: 'Boleta with this number already exists' });
        }

        // Save the new boleta
        const savedBoleta = await boleta.save();
        res.status(201).json(savedBoleta);
    } catch (error) {
        console.error('Error creating boleta:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getBoletas = async (req, res) => {
    try {
        const boletas = await BoletaModel.find();
        res.status(200).json(boletas);
    } catch (error) {
        console.error('Error fetching boletas:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getBoletaById = async (req, res) => {
    try {
        const { id } = req.params;
        const boleta = await BoletaModel.findById(id);
        if (!boleta) {
            return res.status(404).json({ message: 'Boleta not found' });
        }
        res.status(200).json(boleta);
    } catch (error) {
        console.error('Error fetching boleta by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export { createBoleta, getBoletas, getBoletaById };
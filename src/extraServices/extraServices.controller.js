import ExtraService from './extraServices.model.js'

export const addExtraService = async(req, res) => {
    try {
        let data = req.body;
        let service = new ExtraService(data);
        await service.save();

        return res.status(200).send({
            success: true,
            message: 'Servicio adicional agregado correctamente',
            service
        });

    } catch(e) {
        console.error(e);
        return res.status(500).send({
            success: false,
            message: 'Error al agregar servicio',
            error: e.message
        });
    }
};

export const getExtraServices = async(req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query;
        let services = await ExtraService.find()
            .skip(Number(skip))
            .limit(Number(limit));

        return res.send({
            success: true,
            message: services.length > 0 ? 'Servicios encontrados' : 'No hay servicios registrados',
            services
        });

    } catch(e) {
        console.error(e);
        return res.status(500).send({
            success: false,
            message: 'Error al obtener servicios',
            error: e.message
        });
    }
};

export const getExtraServiceById = async(req, res) => {
    try {
        let { id } = req.params;
        let service = await ExtraService.findById(id);

        if(!service) {
            return res.status(404).send({
                success: false,
                message: 'Servicio no encontrado'
            });
        }

        return res.send({
            success: true,
            message: 'Servicio encontrado',
            service
        });

    } catch(e) {
        console.error(e);
        return res.status(500).send({
            success: false,
            message: 'Error al buscar servicio',
            error: e.message
        });
    }
};

export const updateExtraService = async(req, res) => {
    try {
        let { id } = req.params;
        let data = req.body;
        let updatedService = await ExtraService.findByIdAndUpdate(id, data, { new: true });

        if(!updatedService) {
            return res.status(404).send({
                success: false,
                message: 'Servicio no encontrado para actualizar'
            });
        }

        return res.send({
            success: true,
            message: 'Servicio actualizado correctamente',
            updatedService
        });

    } catch(e) {
        console.error(e);
        return res.status(500).send({
            success: false,
            message: 'Error al actualizar servicio',
            error: e.message
        });
    }
};

export const deleteExtraService = async(req, res) => {
    try {
        let { id } = req.params;
        let deletedService = await ExtraService.findByIdAndDelete(id);

        if(!deletedService) {
            return res.status(404).send({
                success: false,
                message: 'Servicio no encontrado para eliminar'
            })
        }

        return res.send({
            success: true,
            message: 'Servicio eliminado correctamente'
        })

    } catch(e) {
        console.error(e)
        return res.status(500).send({
            success: false,
            message: 'Error al eliminar servicio',
            e
        })
    }
}
const { Service, ServicePriceOption, Category, sequelize } = require("../db");

// Add Service to category
exports.addService = async (req, res) => {
    const { categoryId } = req.params;
    const { name, type, priceOptions } = req.body;

    const transaction = await sequelize.transaction();

    try {
        const category = await Category.findByPk(categoryId);
        if (!category) {
            await transaction.rollback();
            return res.status(404).json({ message: "Category not found" });
        }

        const service = await Service.create({ name, type, CategoryId: categoryId }, { transaction });

        if (priceOptions && Array.isArray(priceOptions)) {
            for (const option of priceOptions) {
                await ServicePriceOption.create(
                    {
                        ServiceId: service.id,
                        duration: option.duration,
                        price: option.price,
                        type: option.type,
                    },
                    { transaction }
                );
            }
        }

        await transaction.commit();

        const createdService = await Service.findByPk(service.id, { include: ServicePriceOption });
        res.status(201).json(createdService);
    } catch (err) {
        await transaction.rollback();
        res.status(400).json({ message: err.message });
    }
};

// Get all services in category
exports.getServices = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const services = await Service.findAll({
            where: { CategoryId: categoryId },
            include: ServicePriceOption,
        });
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update Service
exports.updateService = async (req, res) => {
    const { categoryId, serviceId } = req.params;
    const { name, type, priceOptions } = req.body;

    const transaction = await sequelize.transaction();

    try {
        const service = await Service.findOne({
            where: { id: serviceId, CategoryId: categoryId },
        });
        if (!service) {
            await transaction.rollback();
            return res.status(404).json({ message: "Service not found" });
        }

        service.name = name;
        service.type = type;
        await service.save({ transaction });

        await ServicePriceOption.destroy({ where: { ServiceId: serviceId }, transaction });

        if (priceOptions && Array.isArray(priceOptions)) {
            for (const option of priceOptions) {
                await ServicePriceOption.create(
                    {
                        ServiceId: serviceId,
                        duration: option.duration,
                        price: option.price,
                        type: option.type,
                    },
                    { transaction }
                );
            }
        }

        await transaction.commit();

        const updatedService = await Service.findByPk(serviceId, { include: ServicePriceOption });
        res.json(updatedService);
    } catch (err) {
        await transaction.rollback();
        res.status(400).json({ message: err.message });
    }
};

// Delete service
exports.deleteService = async (req, res) => {
    const { categoryId, serviceId } = req.params;

    try {
        const service = await Service.findOne({
            where: { id: serviceId, CategoryId: categoryId },
        });
        if (!service) return res.status(404).json({ message: "Service not found" });

        await service.destroy();
        res.json({ message: "Service deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

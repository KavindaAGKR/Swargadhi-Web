import AdminOption from '../models/optionModel.js';


export const createAdminOption = async (req, res) => {
  try {
    const { discount, deliveryCharges, email, telephoneNumber1, telephoneNumber2, addressEn, addressSi } = req.body;
    
    const newAdminOption = {
      discount,
      deliveryCharges,
      email,
      telephoneNumber1,
      telephoneNumber2,
      address: { en: addressEn, si: addressSi }
    };
    
    const adminOption = await AdminOption.create(newAdminOption);
    return res.status(201).json(adminOption);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getAllAdminOptions = async (req, res) => {
  try {
    const adminOptions = await AdminOption.find();
    return res.status(200).json({
      count: adminOptions.length,
      data: adminOptions
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const editAdminOption = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid admin option ID' });
    }

    const { discount, deliveryCharges, email, telephoneNumber1, telephoneNumber2, addressEn, addressSi } = req.body;

    const existingAdminOption = await AdminOption.findById(id);
    
    if (!existingAdminOption) {
      return res.status(404).json({ message: 'Admin option not found' });
    }

    existingAdminOption.discount = discount;
    existingAdminOption.deliveryCharges = deliveryCharges;
    existingAdminOption.email = email;
    existingAdminOption.telephoneNumber1 = telephoneNumber1;
    existingAdminOption.telephoneNumber2 = telephoneNumber2;
    existingAdminOption.address = { en: addressEn, si: addressSi };

    const updatedAdminOption = await existingAdminOption.save();
    res.status(200).json({ message: 'Admin option updated successfully', updatedAdminOption });
  } catch (error) {
    console.error('Error updating admin option:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

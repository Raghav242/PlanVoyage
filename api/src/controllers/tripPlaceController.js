// controllers/tripPlaceController.js
import prisma from "../config/db.js";

// Update a specific place in a trip
export const updateTripPlace = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    address,
    latitude,
    longitude,
    category,
    website,
    phone,
    notes,
    order,
  } = req.body;

  try {
    const updated = await prisma.tripPlace.update({
      where: { id: parseInt(id) },
      data: {
        name,
        address,
        latitude: latitude ? parseFloat(latitude) : undefined,
        longitude: longitude ? parseFloat(longitude) : undefined,
        category,
        website,
        phone,
        notes,
        order: order ? parseInt(order) : 0,
      },
    });

    res.json(updated);
  } catch (err) {
    console.error("Error updating trip place:", err);
    res.status(500).json({ message: "Failed to update trip place." });
  }
};

// Delete a specific place from a trip
export const deleteTripPlace = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.tripPlace.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Trip place deleted successfully." });
  } catch (err) {
    console.error("Error deleting trip place:", err);
    res.status(500).json({ message: "Failed to delete trip place." });
  }
};

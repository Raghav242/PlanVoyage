import prisma from "../config/db.js";


// Get all plans for a specific user
export const getPlansByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const plans = await prisma.trip.findMany({
      where: { userId: parseInt(userId) },
      include: { places: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(plans);
  } catch (err) {
    console.error("Error fetching plans:", err);
    res.status(500).json({ message: "Failed to fetch plans." });
  }
};

// Create a new plan
export const createPlan = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user.id;

  try {
    const newPlan = await prisma.trip.create({
      data: {
        name,
        description,
        user: { connect: { id: userId } },
      },
    });
    res.status(201).json(newPlan);
  } catch (err) {
    console.error("Error creating plan:", err);
    res.status(500).json({ message: "Failed to create plan." });
  }
};

// Add a place to an existing plan
export const addPlaceToPlan = async (req, res) => {
  const { planId } = req.params;
  const {
    placeId,
    name,
    address,
    latitude,
    longitude,
    category,
    notes,
    order,
  } = req.body;

  try {
    const newPlace = await prisma.tripPlace.create({
      data: {
        tripId: parseInt(planId),
        placeId,
        name,
        address,
        latitude,
        longitude,
        category,
        notes,
        order,
      },
    });
    res.status(201).json(newPlace);
  } catch (err) {
    console.error("Error adding place:", err);
    res.status(500).json({ message: "Failed to add place to plan." });
  }
};

// Update a plan (e.g., rename or update description)
export const updatePlan = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedPlan = await prisma.trip.update({
      where: { id: parseInt(id) },
      data: { name, description },
    });
    res.json(updatedPlan);
  } catch (err) {
    console.error("Error updating plan:", err);
    res.status(500).json({ message: "Failed to update plan." });
  }
};

// Delete a plan
export const deletePlan = async (req, res) => {
  const { id } = req.params;

  try {
    // Delete associated places first due to foreign key constraint
    await prisma.tripPlace.deleteMany({
      where: { tripId: parseInt(id) },
    });

    await prisma.trip.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Plan deleted successfully." });
  } catch (err) {
    console.error("Error deleting plan:", err);
    res.status(500).json({ message: "Failed to delete plan." });
  }
};

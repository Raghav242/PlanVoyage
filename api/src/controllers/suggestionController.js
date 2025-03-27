import prisma from "../config/db.js";

export const getSuggestions = async (req, res) => {
  try {
    const suggestions = await prisma.tripSuggestion.findMany({
      include: { user: { select: { username: true } } },
    });
    res.json(suggestions);
  } catch (error) {
    console.error("Error fetching trip suggestions:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const addSuggestion = async (req, res) => {
  const { destination, places, description, image, website, category } = req.body;

  if (!destination) {
    return res.status(400).json({ message: "Destination is required" });
  }

  try {
    const newSuggestion = await prisma.tripSuggestion.create({
      data: {
        userId: req.user.id,
        destination,
        places,
        description,
        image,
        website,
        category,
      },
    });

    res.status(201).json(newSuggestion);
  } catch (error) {
    console.error("Error adding suggestion:", error);
    res.status(500).json({ message: "Server error" });
  }
};
import prisma from "../config/db.js";

// Fetch all trip suggestions
export const getSuggestions = async (req, res) => {
  try {
    const suggestions = await prisma.tripSuggestion.findMany({
      include: {
        user: {
          select: {
            username: true, 
          },
        },
      },
    });
    res.json(suggestions); // Return the list of suggestions
  } catch (error) {
    console.error("Error fetching trip suggestions:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch a single trip suggestion by ID
export const getSingleSuggestion = async (req, res) => {
  const { suggestionId } = req.params;

  try {
    // Fetch the suggestion by its ID
    const suggestion = await prisma.tripSuggestion.findUnique({
      where: { id: parseInt(suggestionId) }, // Ensure you're finding by the correct ID
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    // If the suggestion is not found, return a 404
    if (!suggestion) {
      return res.status(404).json({ message: "Suggestion not found" });
    }

    // Return the single suggestion with details
    res.json(suggestion);
  } catch (error) {
    console.error("Error fetching trip suggestion:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new trip suggestion
export const addSuggestion = async (req, res) => {
  const { destination, places, description, image, website, category } = req.body;

  if (!destination) {
    return res.status(400).json({ message: "Destination is required" });
  }

  try {
    const newSuggestion = await prisma.tripSuggestion.create({
      data: {
        userId: req.user.id, // User ID from the authenticated request
        destination,
        places,
        description,
        image,
        website,
        category,
      },
    });

    res.status(201).json(newSuggestion); // Return the created suggestion
  } catch (error) {
    console.error("Error adding suggestion:", error);
    res.status(500).json({ message: "Server error" });
  }
};


//delete
// Delete a trip suggestion
export const deleteSuggestion = async (req, res) => {
  const { suggestionId } = req.params;

  try {
    // Find the suggestion by ID
    const suggestion = await prisma.tripSuggestion.findUnique({
      where: { id: parseInt(suggestionId) },
    });

    // If the suggestion is not found, return a 404
    if (!suggestion) {
      return res.status(404).json({ message: "Suggestion not found" });
    }

    // Check if the logged-in user is the creator of the suggestion
    if (suggestion.userId !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to delete this suggestion" });
    }

    // Delete the suggestion
    await prisma.tripSuggestion.delete({
      where: { id: parseInt(suggestionId) },
    });

    res.status(200).json({ message: "Suggestion deleted successfully" });
  } catch (error) {
    console.error("Error deleting suggestion:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// edit suggestion
// Update a trip suggestion
export const updateSuggestion = async (req, res) => {
  const { suggestionId } = req.params;
  const { destination, places, description, image, website, category } = req.body;

  try {
    // Find the suggestion by ID
    const suggestion = await prisma.tripSuggestion.findUnique({
      where: { id: parseInt(suggestionId) },
    });

    // If the suggestion is not found, return a 404 error
    if (!suggestion) {
      return res.status(404).json({ message: "Suggestion not found" });
    }

    // Check if the logged-in user is the creator of the suggestion
    if (suggestion.userId !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to edit this suggestion" });
    }

    // Update the suggestion
    const updatedSuggestion = await prisma.tripSuggestion.update({
      where: { id: parseInt(suggestionId) },
      data: {
        destination,
        places,
        description,
        image,
        website,
        category,
      },
    });

    res.status(200).json(updatedSuggestion); // Return the updated suggestion
  } catch (error) {
    console.error("Error updating suggestion:", error);
    res.status(500).json({ message: "Server error" });
  }
};




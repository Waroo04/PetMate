export type PetType = "Dog" | "Cat" | "Parrot" | "Turtle";
export type Sex = "Male" | "Female" | "Unknown";

export interface PetBreeds {
  Dog: string[];
  Cat: string[];
  Parrot: string[];
  Turtle: string[];
}

export const BREEDS: PetBreeds = {
  Dog: [
    "Labrador Retriever",
    "German Shepherd",
    "Golden Retriever",
    "Bulldog",
    "Beagle",
    "Poodle",
    "Rottweiler",
    "Yorkshire Terrier",
    "Boxer",
    "Dachshund",
    "Shih Tzu",
    "Mixed/Other",
  ],
  Cat: [
    "Persian",
    "Maine Coon",
    "Siamese",
    "Ragdoll",
    "Bengal",
    "Sphynx",
    "British Shorthair",
    "Abyssinian",
    "Scottish Fold",
    "Bombay",
    "Siberian",
    "Mixed/Other",
  ],
  Parrot: [
    "African Grey",
    "Cockatoo",
    "Macaw",
    "Cockatiel",
    "Budgerigar",
    "Conure",
    "Lovebird",
    "Amazon",
    "Eclectus",
    "Pionus",
    "Lory",
    "Mixed/Other",
  ],
  Turtle: [
    "Red-Eared Slider",
    "Box Turtle",
    "Painted Turtle",
    "Map Turtle",
    "Mud Turtle",
    "Musk Turtle",
    "Spotted Turtle",
    "Wood Turtle",
    "Softshell Turtle",
    "Snapping Turtle",
    "Cooter",
    "Mixed/Other",
  ],
};

export const PET_IMAGES = {
  Dog: {
    "Labrador Retriever":
      "https://images.pexels.com/photos/1118447/pexels-photo-1118447.jpeg",
    "German Shepherd":
      "https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg",
    "Golden Retriever":
      "https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg",
    Bulldog: "https://images.pexels.com/photos/686094/pexels-photo-686094.jpeg",
    Beagle:
      "https://images.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg",
    Poodle:
      "https://images.pexels.com/photos/1458916/pexels-photo-1458916.jpeg",
    Rottweiler:
      "https://images.pexels.com/photos/2695827/pexels-photo-2695827.jpeg",
    "Yorkshire Terrier":
      "https://images.pexels.com/photos/1458925/pexels-photo-1458925.jpeg",
    Boxer: "https://images.pexels.com/photos/1294062/pexels-photo-1294062.jpeg",
    Dachshund:
      "https://images.pexels.com/photos/1139794/pexels-photo-1139794.jpeg",
    "Shih Tzu":
      "https://images.pexels.com/photos/1458925/pexels-photo-1458925.jpeg",
    "Mixed/Other":
      "https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg",
  },
  Cat: {
    Persian:
      "https://images.pexels.com/photos/1056251/pexels-photo-1056251.jpeg",
    "Maine Coon":
      "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg",
    Siamese:
      "https://images.pexels.com/photos/1046359/pexels-photo-1046359.jpeg",
    Ragdoll:
      "https://images.pexels.com/photos/1056251/pexels-photo-1056251.jpeg",
    Bengal:
      "https://images.pexels.com/photos/1643457/pexels-photo-1643457.jpeg",
    Sphynx: "https://images.pexels.com/photos/991831/pexels-photo-991831.jpeg",
    "British Shorthair":
      "https://images.pexels.com/photos/177809/pexels-photo-177809.jpeg",
    Abyssinian:
      "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg",
    "Scottish Fold":
      "https://images.pexels.com/photos/1056251/pexels-photo-1056251.jpeg",
    Bombay:
      "https://images.pexels.com/photos/1521306/pexels-photo-1521306.jpeg",
    Siberian:
      "https://images.pexels.com/photos/127028/pexels-photo-127028.jpeg",
    "Mixed/Other":
      "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg",
  },
  Parrot: {
    "African Grey":
      "https://images.pexels.com/photos/56733/pexels-photo-56733.jpeg",
    Cockatoo: "https://images.pexels.com/photos/97533/pexels-photo-97533.jpeg",
    Macaw: "https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg",
    Cockatiel: "https://images.pexels.com/photos/97533/pexels-photo-97533.jpeg",
    Budgerigar:
      "https://images.pexels.com/photos/97533/pexels-photo-97533.jpeg",
    Conure: "https://images.pexels.com/photos/97533/pexels-photo-97533.jpeg",
    Lovebird: "https://images.pexels.com/photos/97533/pexels-photo-97533.jpeg",
    Amazon: "https://images.pexels.com/photos/97533/pexels-photo-97533.jpeg",
    Eclectus: "https://images.pexels.com/photos/97533/pexels-photo-97533.jpeg",
    Pionus: "https://images.pexels.com/photos/97533/pexels-photo-97533.jpeg",
    Lory: "https://images.pexels.com/photos/97533/pexels-photo-97533.jpeg",
    "Mixed/Other":
      "https://images.pexels.com/photos/97533/pexels-photo-97533.jpeg",
  },
  Turtle: {
    "Red-Eared Slider":
      "https://images.pexels.com/photos/3198041/pexels-photo-3198041.jpeg",
    "Box Turtle":
      "https://images.pexels.com/photos/3198041/pexels-photo-3198041.jpeg",
    "Painted Turtle":
      "https://images.pexels.com/photos/3198041/pexels-photo-3198041.jpeg",
    "Map Turtle":
      "https://images.pexels.com/photos/3198041/pexels-photo-3198041.jpeg",
    "Mud Turtle":
      "https://images.pexels.com/photos/3198041/pexels-photo-3198041.jpeg",
    "Musk Turtle":
      "https://images.pexels.com/photos/3198041/pexels-photo-3198041.jpeg",
    "Spotted Turtle":
      "https://images.pexels.com/photos/3198041/pexels-photo-3198041.jpeg",
    "Wood Turtle":
      "https://images.pexels.com/photos/3198041/pexels-photo-3198041.jpeg",
    "Softshell Turtle":
      "https://images.pexels.com/photos/3198041/pexels-photo-3198041.jpeg",
    "Snapping Turtle":
      "https://images.pexels.com/photos/3198041/pexels-photo-3198041.jpeg",
    Cooter:
      "https://images.pexels.com/photos/3198041/pexels-photo-3198041.jpeg",
    "Mixed/Other":
      "https://images.pexels.com/photos/3198041/pexels-photo-3198041.jpeg",
  },
};

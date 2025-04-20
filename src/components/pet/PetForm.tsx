import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PawPrint } from "lucide-react";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import FormGroup from "../common/FormGroup";
import { PetType, Sex, BREEDS, PET_IMAGES } from "../../types/pet";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { Pet } from "../../types/supabase";

interface PetFormProps {
  pet?: Pet;
  onSubmit?: () => void;
}

const PetForm: React.FC<PetFormProps> = ({ pet, onSubmit }) => {
  const [petType, setPetType] = useState<PetType | "">(pet?.type || "");
  const [breed, setBreed] = useState(pet?.breed || "");
  const [name, setName] = useState(pet?.name || "");
  const [weight, setWeight] = useState(pet?.weight?.toString() || "");
  const [height, setHeight] = useState(pet?.height?.toString() || "");
  const [age, setAge] = useState(pet?.age?.toString() || "");
  const [sex, setSex] = useState<Sex | "">(pet?.sex || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profileChecked, setProfileChecked] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserProfile = async () => {
      if (!user) return;

      try {
        const { data, error: profileError } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", user.id)
          .single();

        if (profileError || !data) {
          setError(
            "Your profile is not set up correctly. Please try logging out and back in."
          );
        }

        setProfileChecked(true);
      } catch (err) {
        console.error("Error checking profile:", err);
        setError("Failed to verify your profile. Please try again later.");
      }
    };

    checkUserProfile();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to add a pet");
      return;
    }

    if (!profileChecked) {
      setError(
        "Still verifying your profile. Please wait a moment and try again."
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();

      if (profileError || !profileData) {
        throw new Error(
          "Your profile does not exist. Please try logging out and back in again."
        );
      }

      const petData = {
        id: pet?.id || uuidv4(),
        owner_id: user.id,
        name,
        type: petType as PetType,
        breed,
        weight: weight ? parseFloat(weight) : null,
        height: height ? parseFloat(height) : null,
        age: age ? parseInt(age, 10) : null,
        sex: (sex as Sex) || "Unknown",
        image_url:
          petType && breed
            ? PET_IMAGES[petType as PetType][
                breed as keyof (typeof PET_IMAGES)[PetType]
              ]
            : null,
        updated_at: new Date().toISOString(),
      };

      if (pet) {
        // Update existing pet
        const { error: updateError } = await supabase
          .from("pets")
          .update(petData)
          .eq("id", pet.id);

        if (updateError) throw updateError;
      } else {
        // Create new pet
        const { error: insertError } = await supabase
          .from("pets")
          .insert([{ ...petData, created_at: new Date().toISOString() }]);

        if (insertError) throw insertError;
      }

      if (onSubmit) {
        onSubmit();
      } else {
        navigate("/");
      }
    } catch (err: any) {
      console.error("Error saving pet:", err);
      setError(err.message || "Failed to save pet. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const petTypeOptions = [
    { value: "Dog", label: "Dog" },
    { value: "Cat", label: "Cat" },
    { value: "Parrot", label: "Parrot" },
    { value: "Turtle", label: "Turtle" },
  ];

  const breedOptions = petType
    ? BREEDS[petType].map((breed) => ({ value: breed, label: breed }))
    : [];

  const sexOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Unknown", label: "Unknown" },
  ];

  return (
    <div className="max-w-xl mx-auto py-6">
      <div className="mb-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-500 mb-4">
          <PawPrint size={32} />
        </div>
        <h1 className="text-2xl font-nunito font-bold text-neutral-800 dark:text-white">
          {pet ? "Edit Pet" : "Add a New Pet"}
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 font-open-sans">
          {pet
            ? "Update your pet's details below"
            : "Enter your pet's details below"}
        </p>
      </div>

      {error && (
        <div className="p-3 mb-4 bg-error-50 dark:bg-error-900 dark:bg-opacity-20 text-error-500 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <h2 className="text-lg font-nunito font-semibold text-neutral-800 dark:text-white mb-4">
            Basic Information
          </h2>

          <Select
            label="Pet Type"
            value={petType}
            onChange={(e) => {
              setPetType(e.target.value as PetType);
              setBreed("");
            }}
            options={petTypeOptions}
            required
          />

          {petType && (
            <Select
              label="Breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              options={breedOptions}
              required
            />
          )}

          <Input
            label="Name"
            type="text"
            placeholder="Pet's name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Weight (kg)"
              type="number"
              step="0.1"
              min="0"
              placeholder="Weight in kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />

            <Input
              label="Height (cm)"
              type="number"
              step="0.1"
              min="0"
              placeholder="Height in cm"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Age (years)"
              type="number"
              min="0"
              placeholder="Age in years"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <Select
              label="Sex"
              value={sex}
              onChange={(e) => setSex(e.target.value as Sex)}
              options={sexOptions}
              required
            />
          </div>
        </FormGroup>

        <div className="mt-6 flex justify-end space-x-3">
          <Button type="button" variant="outline" onClick={() => navigate("/")}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Saving..." : pet ? "Update Pet" : "Save Pet"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PetForm;

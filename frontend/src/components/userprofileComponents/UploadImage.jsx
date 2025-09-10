import { useState } from "react";
import { Pencil, Camera } from "lucide-react";
import Woman from "../../assets/img/woman1.jpg";

export default function ProfileImageUpload() {
  const [image, setImage] = useState(Woman);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label
        htmlFor="imageUpload"
        className="relative group cursor-pointer mt-3"
      >
        {/* Profile Image */}
        <img
          src={image}
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-50 transition-opacity">
          <Pencil className="w-6 h-6 text-white" />
        </div>

        {/* Small Camera Icon Badge (bottom-right) */}
        <div className="absolute bottom-1 right-1 bg-gray-800 p-1 rounded-full border-2 border-white">
          <Camera className="w-4 h-4 text-white" />
        </div>
      </label>

      {/* Hidden File Input */}
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
}

import { useState } from "react";
import { useMainContext } from "../context/MainProvider";
import supabase from "../utils/supabase";
import { ProfileButton } from "./ProfileButton";

export const ProfileImage = () => {
  const { user, updateUserImage } = useMainContext();

  const [profilePhoto, setProfilePhoto] = useState<File>();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const uploadPhoto = async () => {
    if (!profilePhoto) return null;

    // das ist genauso wenn man e.target.value
    const fileName = profilePhoto.name;
    const { data, error } = await supabase.storage
      .from("user-images")
      .upload(fileName, profilePhoto);
    console.log(data);
    console.log(error);

    if (error) {
      console.warn("fehler beim upload des Photos!");
      return null;
    }

    const photoUrl = supabase.storage.from("user-images").getPublicUrl(fileName)
      .data.publicUrl;
    console.log(photoUrl);

    return photoUrl;
  };

  const handleUpload = async () => {
    const uploadedImgUrl = await uploadPhoto();
    console.log("handleUpload:", uploadedImgUrl);

    if (!uploadedImgUrl) {
      return null;
    }
    updateUserImage(uploadedImgUrl);
    setIsEditing(false);
  };

  console.log("user im Profil", user);

  if (!user) return;
  return (
    <>
      <div className="flex items-center gap-10">
        <div className="rounded-full">
          <img
            src={
              user.image_url ??
              "../../public/img/vecteezy_user-avatar-line-style_.jpg"
            }
            alt="hier kommt ein profilbild hin"
            className="mb-2 w-22 rounded-full"
          />
        </div>

        <h1 className="text-dark-green text-2xl font-bold">
          Hi {user.first_name}!
        </h1>
      </div>
      {isEditing ? (
        <div className="flex flex-row gap-3">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                setProfilePhoto(e.target.files[0]);
              }
            }}
            className="border-pink hover:bg-pink text-dark-green w-70 rounded-full border-1 px-3 py-1"
          />
          <button
            className="bg-cream text-pink h-9 w-9 cursor-pointer rounded-full px-3 tracking-widest uppercase"
            onClick={handleUpload}
          >
            +
          </button>
        </div>
      ) : (
        <div className="relative">
          <ProfileButton onClick={() => setIsEditing(true)} name="+" />
        </div>
      )}
    </>
  );
};

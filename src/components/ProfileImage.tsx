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
      <div className="flex items-center gap-5">
        <div className="rounded-full">
          <img
            src={
              user.image_url ??
              "../../public/img/vecteezy_user-avatar-line-style_.jpg"
            }
            alt="hier kommt ein profilbild hin"
            className="w-28"
          />
        </div>

        <h1 className="text-2xl font-bold">{user.first_name}</h1>
      </div>
      {isEditing ? (
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                setProfilePhoto(e.target.files[0]);
              }
            }}
            className="rounded border-1 border-pink-200 px-3 py-1 hover:bg-pink-300"
          />
          <button
            className="bg-cream text-pink cursor-pointer rounded-full px-3 tracking-widest uppercase"
            onClick={handleUpload}
          >
            upload image
          </button>
        </div>
      ) : (
        <ProfileButton onClick={() => setIsEditing(true)} name="Change Image" />
      )}
    </>
  );
};

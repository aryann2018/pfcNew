import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Image,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Avatar,
  CircularProgress,
} from "@chakra-ui/react";
import {
  usePatchCoachProfileMutation,
  useQueryCoachProfile,
} from "./api/hooks";
import { useUploads } from "@/app/common/hooks/uploads/useUploadStore";

function ProfilePage() {
  const { data, isLoading, error, isError } = useQueryCoachProfile();

  const profile = data?.data;

  const { handleSubmit, control, setValue, watch } =
    useForm<CoachProfilePatchRequest>({
      defaultValues: {
        first_name: profile?.first_name,
        last_name: profile?.last_name,
        bio: profile?.bio,
        profile_photo: profile?.profile_photo,
      },
    });

  const profileImage = watch("profile_photo");

  useEffect(() => {
    if (!isLoading) {
      console.log("profile", profile);
      setValue("profile_photo", profile?.profile_photo);
    }
    // keys used in form from useForm
    const keys = Object.keys(control._defaultValues);

    for (const key of keys) {
      setValue(
        key as keyof CoachProfilePatchRequest,
        profile?.[key as keyof CoachProfilePatchRequest]
      );
    }
  }, [isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  const { mutateAsync } = usePatchCoachProfileMutation();

  const { uploadFiles, addFile, clearAllUploads, currentUploads } = useUploads({
    onFileUploadSuccess: ({ file_key }) => {
      console.log("file_key", file_key);
    },
  });

  const onSubmit = async (data: CoachProfilePatchRequest) => {
    if (data.profile_photo) {
      const file_keys = await uploadFiles();
      data.profile_photo = file_keys[0];
    }

    await mutateAsync(data as CoachProfilePatchRequest);

    clearAllUploads();
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setValue("profile_photo", URL.createObjectURL(file));
      addFile(file);
    }
  };

  if (isLoading) {
    return (
      <Flex justify="center" align="center" height="100vh" width={"100%"}>
        <CircularProgress isIndeterminate />
      </Flex>
    );
  }

  return (
    <Flex justify="center" align="center" height="100vh" width={"100%"}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "100%", height: "100%" }}
      >
        <Flex
          direction="column"
          alignItems="center"
          justifyContent={"center"}
          width="100%"
          p="4"
          borderWidth="1px"
          borderRadius="lg"
        >
          <FormControl mb="4" width={"min-content"}>
            <FormLabel htmlFor="image-upload" cursor="pointer">
              <Avatar
                name={"sa"}
                src={profileImage}
                size={"2xl"}
                loading={"lazy"}
              />
            </FormLabel>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              display="none"
              name="profile_photo"
            />
          </FormControl>

          <Controller
            name="first_name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input {...field} placeholder="Last Name" mb="4" />
            )}
          />

          <Controller
            name="last_name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input {...field} placeholder="First Name" mb="4" />
            )}
          />

          <Controller
            name="bio"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <Textarea {...field} placeholder="Bio" mb="4" />
            )}
          />

          <Button type="submit" colorScheme="blue">
            Save Profile
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}

export default ProfilePage;

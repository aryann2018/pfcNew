"use client";
import { PFCColors } from "@/app/common/PFCColors";
import { inter } from "@/app/layout";
import { Box, HStack, IconButton, Text } from "@chakra-ui/react";

import { BiArrowBack } from "react-icons/bi";
import { useGetSubscriptions } from "../api/hooks";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

export const DetailsHeader = ({ id }: { id: string }) => {
  const { data, error, isLoading } = useGetSubscriptions();

  const router = useRouter();
  const subscriptions = data?.data;

  const client = useMemo(
    () =>
      subscriptions?.find((subscription) => subscription.client.id === id)
        ?.client,
    [id, subscriptions]
  );

  if (isLoading) {
    return <></>;
  }
  return (
    <Box>
      <HStack>
        <IconButton
          aria-label="back icon"
          icon={<BiArrowBack />}
          onClick={() => router.back()}
        />
        <Text color={PFCColors.GRAY_900} fontWeight={600} fontSize={30}>
          {client?.first_name + " " + client?.middle_name}
        </Text>
      </HStack>
    </Box>
  );
};

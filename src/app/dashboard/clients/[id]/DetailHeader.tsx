"use client";
import { PFCColors } from "@/app/common/PFCColors";
import { inter } from "@/app/layout";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";

import { BiArrowBack } from "react-icons/bi";
import { useGetSubscriptions } from "../api/hooks";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import PFCSpace from "@/app/common/PFCSpace";

export const DetailsHeader = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetSubscriptions();

  const router = useRouter();
  const subscriptions = data?.data;

  const client = useMemo(
    () =>
      subscriptions
        ?.find((subscription) =>
          subscription.clients.find((client) => client.id === id)
        )
        ?.clients.find((client) => client.id === id),
    [id, subscriptions]
  );

  if (isLoading) {
    return <></>;
  }

  return (
    <Box>
      <HStack justifyContent={"space-between"}>
        <Flex gap={"5"}>
          <IconButton
            aria-label="back icon"
            icon={<BiArrowBack />}
            onClick={() => router.back()}
            size={"md"}
            border={`1px solid ${PFCColors.GRAY_300}`}
            bg={PFCColors.WHITE}
          />
          <Text color={PFCColors.GRAY_900} fontWeight={600} fontSize={30}>
            {`${client?.first_name ?? ""} ${client?.middle_name ?? ""} ${
              client?.last_name ?? ""
            }`}
          </Text>
        </Flex>
        <Flex gap={"20px"}>
          <Flex
            direction={"row"}
            gap={"10px"}
            alignItems={"center"}
            bg={PFCColors.GRAY_100}
            paddingY={"8px"}
            paddingX={"14px"}
          >
            <Text fontWeight={"600"}>Next Call:</Text>
            <Text fontSize={"14px"}>Tomorrow</Text>
            <Text fontSize={"12px"}> 24-02-23</Text>
          </Flex>
          <Button
            variant={"outline"}
            onClick={() => {
              router.push("/dashboard/workoutplans/new/");
            }}
          >
            Assign New workout
          </Button>
          <Button
            variant={"outline"}
            onClick={() => {
              router.push("/dashboard/dietplans/new/");
            }}
          >
            Assign New diet
          </Button>
        </Flex>
      </HStack>
    </Box>
  );
};

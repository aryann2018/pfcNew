"use client";
import React, { useState } from 'react';
import { Box, Text, IconButton, Input, Flex } from '@chakra-ui/react';
import { IoMdArrowForward } from "react-icons/io";
//import { relative } from 'path';

const NoteLists = () => {
  const [notes, setNotes] = useState([
    { date: "February 1, 2023", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { date: "February 2, 2023", content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
    { date: "February 3, 2023", content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." },
    { date: "February 4, 2023", content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." }
  ]);
  const [newNote, setNewNote] = useState('');
  const [isValidNote, setIsValidNote] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddNote = () => {
    if (newNote.trim() !== '') {
      // Add new note locally
      const currentDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
      const formattedDate = currentDate.charAt(0).toUpperCase() + currentDate.slice(1); // Capitalize the first letter
      const note = {
        date: formattedDate,
        content: newNote,
      };

      setNotes([...notes, note]);
      setNewNote('');
    } else {
      setErrorMessage('Please enter a note.');
    }
  };

  const handleNoteChange = (e) => {
    const noteContent = e.target.value;
    setNewNote(noteContent);
    
    // Custom validation: check if the note contains at least 10 words
    setIsValidNote(noteContent.split(/\s+/).length >= 10);
    setErrorMessage('');
  };

  return (
    <Box width="412px" maxW="100%">
      {notes.slice(0, 5).map((note, index) => (
        <Box key={index} py={0} position="relative" gap={40}>
          <Box
            position="absolute"
            left="1px"
            top="3px"
            transform="translateY(-50%)"
            width="8px"
            height="8px"
            borderRadius="50%"
            backgroundColor="#D0D5DD"
          />
          <Box
            borderLeft="1px solid #D0D5DD"
            paddingLeft="15px"
            marginLeft="4px"
            pb={5} 
          >
            <Text fontSize="sm" color="Gray/900" position="relative" top="-7px">{note.date}</Text>
            <Text mb={4}>{note.content}</Text>
          </Box>
        </Box>
      ))}
      <Flex my={5} justify="center">
        <Input
          placeholder="Add a note..."
          value={newNote}
          onChange={handleNoteChange}
          mr={2}
          color="#344054"
          backgroundColor="#FFFFFF"
          borderColor="#E2E8F0"
          _hover={{ borderColor: "#A0AEC0" }}
          _focus={{ borderColor: "#A0AEC0" }}
        />
        <IconButton
          icon={<IoMdArrowForward />}
          colorScheme="white"
          backgroundColor="#344054"
          aria-label="Add Note"
          onClick={handleAddNote}
          disabled={!isValidNote || newNote.trim() === ''}
        />
      </Flex>
      <Text color="red.500" mb={2}>{errorMessage}</Text>
    </Box>
  );
};

export default NoteLists;

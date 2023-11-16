import Image from 'next/image'
import styles from './page.module.css'
import {  Box, CSSReset  } from '@chakra-ui/react';
import AuthCard from './auth/AuthCard';

export default function Home() {
  return (
   <main className={styles.main}>
    <CSSReset/>
     <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <AuthCard />
      </Box>
    </main>
  )
}

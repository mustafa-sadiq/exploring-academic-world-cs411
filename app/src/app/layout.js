import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.css';
import "./globals.css";
import BootstrapClient from '@/components/BootstrapClient.js';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mustafa Sadiq CS411",
  description: "CS411 project by Mustafa Sadiq - exploring Academic World",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}<BootstrapClient /></body>
    </html>
  );
}

import { Roboto, Montserrat } from "next/font/google";

export const montserrat = Montserrat({ subsets: ["latin"] });

export const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

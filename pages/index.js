import { data } from "autoprefixer";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "./components/header";
import { useEffect, useState } from "react";
import PadawanList from "./PadawanList";
import { ConnectWallet } from "@3rdweb/react";

function Home({posts}) {
  return (
    <div className="bg-red ">
      <Header />
      {/* <div className="grid grid-cols-1 lg:grid-cols-3 tablet:grid-cols-2 w-full items-center gap-3"> */}
      <div className="bp-flex-test">
      
        <PadawanList includeEvents = {["ETHDenver", "NFT.NYC"]} sortby="name"/>

      </div>
    </div>
  );
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://www.aleemrehmtulla.com/my.json')
  const pre = await res.json()
  const posts = pre.padawans
  const hi = pre

  return {
    props: {
      posts,
    },
  }
}
export default Home;

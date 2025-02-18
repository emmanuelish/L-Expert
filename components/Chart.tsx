import dynamic from "next/dynamic"

const Chart = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  loading: () => <p>Loading Chart...</p>,
  ssr: false,
})

export default Chart


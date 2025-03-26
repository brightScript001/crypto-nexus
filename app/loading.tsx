import LoadingAnimation from "@/components/loading-animation"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <LoadingAnimation size={80} />
        <h1 className="mt-6 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Crypto Nexus
        </h1>
        <p className="text-gray-400 mt-2">Loading amazing things...</p>
      </div>
    </div>
  )
}


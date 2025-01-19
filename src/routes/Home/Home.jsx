import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="flex h-full items-center justify-center">
            <div className="mx-10 md:mx-26 lg:mx-36 align-center text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-8">
                    Welcome to <span className="text-blue-500 text-nowrap">Stream Share</span>
                </h1>

                <p className="text-base md:text-lg text-gray-600 mb-6">
                    <span className="font-semibold text-blue-500">Effortless File Sharing, Made Simple.</span> Stream
                    Share lets you share files with anyone, anywhere, in real time. No uploads, downloads, or storage
                    worries—just create a room and start sharing instantly.
                </p>

                <p className="text-base md:text-lg font-semibold text-gray-700 mb-8">
                    Ready to experience the simplicity of StreamShare?
                </p>
                <button
                    className="bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-lg hover:bg-blue-500 transition duration-300"
                    onClick={() => navigate("/room")}
                >
                    Create Room
                </button>
            </div>
        </div>
    );
}

export default Home;
